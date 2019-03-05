'use strict';

const express = require('express');
const fs = require('fs');
const sitemap = require('./sitemap');

const app = express();

app.get('/sitemap.xml', (req, res) => {
  res.setHeader("Content-Type", "application/xml");
  res.writeHead(200);
  sitemap.generate().then((xml) => {
    res.write(xml);
    res.end();
  });
});

app.get('/*', (req, res) => {
  let host = req.hostname.split('.');
  if(host[0] == 'www') {
    host.shift();
    res.writeHead(301, {Location: '//' + host.join('.') + req.originalUrl});
    res.end();
    return;
  }

  const userAgent = req.header('User-Agent');
  const clientIp = (req.header('X-Forwarded-For') || '').split(',').shift();

  fs.readFile('index.html', 'utf8', (err, contents) => {
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.send(contents);
    res.end();
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
