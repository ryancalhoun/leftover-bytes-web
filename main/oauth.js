const Router = require('express').Router();
const qs = require('querystring');

Router.get('/', async (req, res) => {

});

Router.get('/cookie', (req, res) => {
  res.cookie('test', 'value');
  res.end();
});

Router.get('/google', (req, res) => {
  const returnUrl = new URL(req.query.returnUrl);
  const redirectUrl = new URL(returnUrl.toString());
  redirectUrl.pathname = req.originalUrl + '/verify';

  const opts = {
    client_id: '403632071908-7v9k2mk0cdbqpg698hd1rsklt86rd4k8.apps.googleusercontent.com',
    nonce: "" + Math.random(),
    response_type: 'code',
    redirect_uri: url.toString(),
    scope: 'openid profile email',
    state: returnUrl,
    prompt: 'select_account',
  };

  res.writeHead(302, {Location: `https://accounts.google.com/o/oauth2/v2/auth?${qs.stringify(opts)}`});
  res.end();
});

Router.get('/google/verify', async (req, res) => {
  const code = req.query.code;
  const returnUrl = new URL(req.query.state);

  if(code) {
    const redirectUrl = new URL(returnUrl.toString());
    redirectUrl.pathname = req.originalUrl;

    const opts = {
      client_id: '403632071908-7v9k2mk0cdbqpg698hd1rsklt86rd4k8.apps.googleusercontent.com',
      client_secret: 'NffUEV1tF66e79vPrR9aPt3F',
      code: code,
      redirect_uri: redirectUrl,
      grant_type: 'authorization_code',
    };
  } else {

  }

  
});

export { Router }
