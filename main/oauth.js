const Router = require('express').Router();
const qs = require('querystring');
const https = require('https');
const jwtDecode = require('jwt-decode');
const {Datastore} = require('@google-cloud/datastore');

const saveUser = async (data) => {
  const ds = new Datastore({ projectId: 'leftoverbytes' });

  const query = ds.createQuery('User').filter('email', data.email).limit(1);
  const [entities, moreResults] = await ds.runQuery(query);
  console.log("Entities", entities);
  const entity = entities[0] || {
    key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  };
  entity.data = data;
  console.log("Entity", entity);

  const r = await ds.save(entity);
  console.log(r);

  return entity.key;
};

Router.get('/google', (req, res) => {
  const returnUrl = new URL(req.query.returnUrl);
  const redirectUrl = new URL(returnUrl.toString());
  redirectUrl.pathname = req.baseUrl + req.path + '/verify';

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
      res.cookie('user_id', id);
      res.writeHead(302, {Location: returnUrl.toString()});
      res.end();
    };

    const exchange = https.request(opts, res => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        onExchange(JSON.parse(body));
      });
    });
    exchange.write(qs.stringify(payload));
    exchange.end();
  } else {

  }

  
});

export { Router }
