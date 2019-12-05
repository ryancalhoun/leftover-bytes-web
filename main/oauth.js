const Router = require('express').Router();
const qs = require('querystring');
const https = require('https');
const jwtDecode = require('jwt-decode');
const {Datastore} = require('@google-cloud/datastore');

const saveUser = async (data) => {
  const ds = new Datastore({ projectId: 'leftoverbytes' });

  const query = data.email ?
    ds.createQuery('User').filter('email', data.email).limit(1) :
    ds.createQuery('User').filter('facebook_id', data.facebook_id).limit(1);
  const [entities, moreResults] = await ds.runQuery(query);

  let keyName;
  if(entities[0]) {
    const entity = entities[0];
    keyName = entity[Datastore.KEY].name;

    Object.assign(entity, data);
    await ds.save({ key: keyName, data: entity });

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

Router.get('/user/:id', async (req, res) => {
  const ds = new Datastore({ projectId: 'leftoverbytes' });
  const [entity] = await ds.get(ds.key(['User', req.params.id]));
  res.send(JSON.stringify({name: entity.name, picture: entity.picture}));
  res.end();
});

Router.get('/google', (req, res) => {
  const returnUrl = new URL(req.query.returnUrl);
  const redirectUrl = new URL(returnUrl.toString());
  redirectUrl.pathname = req.baseUrl + req.path + '/verify';
  redirectUrl.hash = "";

  const opts = {
    client_id: '403632071908-7v9k2mk0cdbqpg698hd1rsklt86rd4k8.apps.googleusercontent.com',
    nonce: "" + Math.random(),
    response_type: 'code',
    redirect_uri: redirectUrl.toString(),
    scope: 'openid profile email',
    state: returnUrl.toString(),
    prompt: 'select_account',
  };

  res.writeHead(302, {Location: `https://accounts.google.com/o/oauth2/v2/auth?${qs.stringify(opts)}`});
  res.end();
});

Router.get('/google/verify', (req, res) => {
  const code = req.query.code;
  const returnUrl = new URL(req.query.state);

  if(code) {
    const redirectUrl = new URL(returnUrl.toString());
    redirectUrl.pathname = req.baseUrl + req.path;
    redirectUrl.hash = "";

    const payload = {
      client_id: '403632071908-7v9k2mk0cdbqpg698hd1rsklt86rd4k8.apps.googleusercontent.com',
      client_secret: 'NffUEV1tF66e79vPrR9aPt3F',
      code: code,
      redirect_uri: redirectUrl.toString(),
      grant_type: 'authorization_code',
    };

    const opts = {
      hostname: 'oauth2.googleapis.com',
      port: 443,
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    };

    const onExchange = async (data) => {
      const userData = jwtDecode(data.id_token);

      const id = await saveUser(userData);
      res.cookie('user_id', id, { maxAge: 30*24*3600*1000 });
      res.writeHead(302, {Location: returnUrl.toString()});
      res.end();
    };

    const exchange = https.request(opts, readJson(onExchange));
    exchange.write(qs.stringify(payload));
    exchange.end();
  } else {

  }
});

Router.get('/facebook', (req, res) => {
  const returnUrl = new URL(req.query.returnUrl);
  const redirectUrl = new URL(returnUrl.toString());
  redirectUrl.pathname = req.baseUrl + req.path + '/verify';
  redirectUrl.hash = "";

  const opts = {
    client_id: '735455096936712',
    response_type: 'code',
    redirect_uri: redirectUrl.toString(),
    scope: 'email',
    state: returnUrl.toString(),
  };

  res.writeHead(302, {Location: `https://www.facebook.com/v5.0/dialog/oauth?${qs.stringify(opts)}`});
  res.end();
});

Router.get('/facebook/verify', (req, res) => {
  const code = req.query.code;
  const returnUrl = new URL(req.query.state);

  if(code) {
    const redirectUrl = new URL(returnUrl.toString());
    redirectUrl.pathname = req.baseUrl + req.path;
    redirectUrl.hash = "";

    const params = {
      client_id: '735455096936712',
      client_secret: '7d82a60712a4db1d42f1cce6a5a659b8',
      code: code,
      redirect_uri: redirectUrl.toString(),
    };

    const dig = (obj, ...keys) => {
      keys.forEach(key => obj = obj && obj[key]);
      return obj;
    };
    const onInfo = async (data) => {
      const userData = {
        facebook_id: data.id,
        name: data.name,
        email: data.email,
        picture: dig(data.picture, 'data', 'url'),
      };
      const id = await saveUser(userData);
      res.cookie('user_id', id, { maxAge: 30*24*3600*1000 });
      res.writeHead(302, {Location: returnUrl.toString()});
      res.end();
    };

    const onExchange = async (data) => {
      const params = {
        access_token: data.access_token,
        fields: 'name,email,picture'
      };
      https.get(`https://graph.facebook.com/me?${qs.stringify(params)}`, readJson(onInfo));
    };

    https.get(`https://graph.facebook.com/v5.0/oauth/access_token?${qs.stringify(params)}`, readJson(onExchange));
  } else {

  }
});

export { Router }
