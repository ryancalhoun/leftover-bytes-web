const Router = require('express').Router();
const qs = require('querystring');

Router.get('/', async (req, res) => {

});

Router.get('/google', (req, res) => {
  const opts = {
    client_id: '403632071908-7v9k2mk0cdbqpg698hd1rsklt86rd4k8.apps.googleusercontent.com',
    nonce: "" + Math.random(),
    response_type: 'code',
    redirect_uri: `${req.hostname}/oauth`,
    scope: 'openid profile email',
    state: '',
    prompt: 'select_account',
  };

  res.writeHead(302, {Location: `https://accounts.google.com/o/oauth2/v2/auth?${qs.stringify(opts)}`});
  res.end();
});

export { Router }
