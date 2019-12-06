const Router = require('express').Router();
const qs = require('querystring');
const https = require('https');
const jwtDecode = require('jwt-decode');
const {Datastore} = require('@google-cloud/datastore');

const secret = async (name) => {
  const ds = new Datastore({ projectId: 'leftoverbytes' });
  const [entity] = await ds.get(ds.key(['Secret', name]));
  return entity;
}

const saveUser = async (data) => {
  const ds = new Datastore({ projectId: 'leftoverbytes' });

  const query = data.email ?
    ds.createQuery('User').filter('email', data.email).limit(1) :
    ds.createQuery('User').filter('facebook_id', data.facebook_id).limit(1);
  const [entities, moreResults] = await ds.runQuery(query);

  let keyName;
  if(entities[0]) {
    const entity = entities[0];
    const key = entity[Datastore.KEY];
    keyName = key.name;

    Object.assign(entity, data);
    await ds.save({ key: key, data: entity });

  } else {
    keyName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const entity = {
      key: ds.key(['User', keyName]),
      data: data,
    };
    await ds.save(entity);
  }
  return keyName;
};

const readJson = (cb) => {
  return (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      cb(JSON.parse(body));
    });
  };
};

const get = async (url, params) => {
  console.log("GET", url, params);
  return new Promise((resolve, reject) => {
    console.log("GET", `${url}?{qs.stringify(params)}`);
    const call = https.get(`${url}?{qs.stringify(params)}`, readJson(resolve));
    call.on('error', error => {
      console.log(`Client error on GET ${url}: ${error}`);
      reject(error);
    });
  });
};

const post = async (url, body, headers) => {
  const postUrl = new URL(url);
  const opts = {
    hostname: postUrl.hostname,
    port: postUrl.port || (postUrl.protocol == 'https:' ? 443 : 80),
    path: postUrl.pathname,
    method: 'POST',
    headers: headers,
  };
  return new Promise((resolve, reject) => {
    const call = https.request(opts, readJson(resolve));
    call.on('error', error => {
      console.log(`Client error on GET ${url}: ${error}`);
      reject(error);
    });
    call.write(body);
    call.end();
  });
};

Router.get('/user/:id', async (req, res) => {
  const ds = new Datastore({ projectId: 'leftoverbytes' });
  const [entity] = await ds.get(ds.key(['User', req.params.id]));
  res.send(JSON.stringify({name: entity.name, picture: entity.picture}));
  res.end();
});

Router.get('/google', async (req, res) => {
  const returnUrl = new URL(req.query.returnUrl);
  const redirectUrl = new URL(returnUrl.toString());
  redirectUrl.pathname = req.baseUrl + req.path + '/verify';
  redirectUrl.hash = "";

  const google = await secret('GOOGLE_OAUTH');

  const opts = {
    client_id: google.client_id,
    nonce: "" + Math.random(),
    response_type: 'code',
    redirect_uri: redirectUrl.toString(),
    scope: 'openid profile email',
    state: returnUrl.toString(),
    prompt: 'select_account',
  };

  res.writeHead(302, {Location: `${process.env.GOOGLE_LOGIN_URL}?${qs.stringify(opts)}`});
  res.end();
});

Router.get('/google/verify', async (req, res) => {
  const code = req.query.code;
  const returnUrl = new URL(req.query.state);

  if(code) {
    const redirectUrl = new URL(returnUrl.toString());
    redirectUrl.pathname = req.baseUrl + req.path;
    redirectUrl.hash = "";

    const google = await secret('GOOGLE_OAUTH');
    const payload = {
      client_id: google.client_id,
      client_secret: google.client_secret,
      code: code,
      redirect_uri: redirectUrl.toString(),
      grant_type: 'authorization_code',
    };

    const data = await post(
      process.env.GOOGLE_TOKEN_URL,
      qs.stringify(payload),
      { 'Content-Type': 'application/x-www-form-urlencoded' }
    );

    const userData = jwtDecode(data.id_token);

    const id = await saveUser(userData);
    res.cookie('user_id', id, { maxAge: 30*24*3600*1000 });
    res.writeHead(302, {Location: returnUrl.toString()});
    res.end();
  } else {

  }
});

Router.get('/facebook', async (req, res) => {
  const returnUrl = new URL(req.query.returnUrl);
  const redirectUrl = new URL(returnUrl.toString());
  redirectUrl.pathname = req.baseUrl + req.path + '/verify';
  redirectUrl.hash = "";

  const facebook = await secret('FACEBOOK_OAUTH');
  const opts = {
    client_id: facebook.client_id,
    response_type: 'code',
    redirect_uri: redirectUrl.toString(),
    scope: 'email',
    state: returnUrl.toString(),
  };

  res.writeHead(302, {Location: `${process.env.FACEBOOK_LOGIN_URL}?${qs.stringify(opts)}`});
  res.end();
});

Router.get('/facebook/verify', async (req, res) => {
  const code = req.query.code;
  const returnUrl = new URL(req.query.state);

  if(code) {
    const redirectUrl = new URL(returnUrl.toString());
    redirectUrl.pathname = req.baseUrl + req.path;
    redirectUrl.hash = "";

    const facebook = await secret('FACEBOOK_OAUTH');

    console.log("Debug", code);
    const auth = await get(process.env.FACEBOOK_TOKEN_URL, {
      client_id: facebook.client_id,
      client_secret: facebook.client_secret,
      code: code,
      redirect_uri: redirectUrl.toString(),
    });
    console.log("Debug", auth);

    const info = await get(process.env.FACEBOOK_INFO_URL, {
      access_token: auth.access_token,
      fields: 'name,email,picture'
    });
    console.log("Debug", info);

    const dig = (obj, ...keys) => {
      keys.forEach(key => obj = obj && obj[key]);
      return obj;
    };
    const userData = {
      facebook_id: info.id,
      name: info.name,
      email: info.email,
      picture: dig(info.picture, 'data', 'url'),
    };
    console.log("Debug", userData);

    const id = await saveUser(userData);
    res.cookie('user_id', id, { maxAge: 30*24*3600*1000 });
    res.writeHead(302, {Location: returnUrl.toString()});
    res.end();
  } else {

  }
});

export { Router }
