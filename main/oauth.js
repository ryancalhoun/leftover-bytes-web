const Router = require('express').Router();
const qs = require('querystring');
const https = require('https');
const jwtDecode = require('jwt-decode');

Router.get('/', async (req, res) => {

});

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
    };

    console.log(payload);

    const onExchange = (data) => {
      const userData = jwtDecode(data.id_token);
      console.log(userData);

      res.send(JSON.stringify(userData));
      res.end();
    };

    const exchange = https.request(opts, res => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log(body);
        onExchange(JSON.parse(body));
      });
    });
    exchange.write(querystring.stringify(payload));
    exchange.end();
  } else {

  }

  
});

export { Router }
