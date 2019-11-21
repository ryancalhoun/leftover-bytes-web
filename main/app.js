'use strict';

const express = require('express');
const esm = require('esm')(module);

const MediumImport = esm('./medium-import').MediumImport;
const Sitemap = esm('./sitemap').Sitemap;
const SocialShare = esm('./social-share').SocialShare;
const WebClient = esm('./web-client').WebClient;
const Comments = esm('./comments').Comments;

const app = express();
app.use(express.json());

app.get('/sitemap.xml', (req, res) => {
  res.setHeader("Content-Type", "application/xml");
  res.writeHead(200);
  new Sitemap().generate().then((xml) => {
    res.write(xml);
    res.end();
  });
});

app.get('/posts/:post/comments', async (req, res) => {
  const comments = new Comments();
  console.log(`Get comments on ${req.params.post}`);
  res.writeHead(501);
  res.end();
});
app.post('/posts/:post/comments', async (req, res) => {
  const comments = new Comments();
  console.log(`Post comment on ${req.params.post}: ${JSON.stringify(req.body)}`);
  res.writeHead(501);
  res.end();
});
app.put('/posts/:post/comments/:comment', async (req, res) => {
  const comments = new Comments();
  console.log(`Update comment ${req.params.comment} on ${req.params.post}: ${JSON.stringify(req.body)}`);
  res.writeHead(501);
  res.end();
});
app.delete('/posts/:post/comments/:comment', async (req, res) => {
  const comments = new Comments();
  console.log(`Delete comment ${req.params.comment} on ${req.params.post}`);
  res.writeHead(501);
  res.end();
});

app.get('/*', (req, res) => {
  let host = req.hostname.split('.');
  if(host[0] == 'www') {
    host.shift();
    res.writeHead(301, {Location: '//' + host.join('.') + req.originalUrl});
    res.end();
    return;
  }

  const handlers = [SocialShare, MediumImport, WebClient].map(x => new x(req)).filter(f => f.matches());

  handlers[0].handle(res).catch(() => {
    handlers[handlers.length-1].handle(res);
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
