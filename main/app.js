'use strict';

const express = require('express');
const fs = require('fs');
const prismic = require('prismic-javascript');

const app = express();

app.get('/sitemap.xml', (req, res) => {
  const elem = (e) => {
    res.write('<' + e.tag);

    if(e.attrs) {
      Object.keys(e.attrs).forEach((key) => {
        const val = e.attrs[key];
        res.write(' ' + key + '="' + val + '"');
      });
    }
    res.write('>');

    if(Array.isArray(e.children)) {
      res.write('\n');
      e.children.forEach((c) => {
        elem(c);
      });
    } else if(typeof e.children == "string"){
      res.write(e.children);
    }

    res.write('</' + e.tag + '>\n');
  }

  res.writeHead(200);

  const schema = {
    'xmlns:xsi' : 'http://www.w3.org/2001/XMLSchema-instance',
    'xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
    'xsi:schemaLocation': 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd',
  };

  const baseurl = 'https://leftoverbytes.cdn.prismic.io/api/v2';
  prismic.getApi(baseurl).then((api) => {
    api.query("").then((docs) => {

      const children = [];
      docs.results.forEach((post) => {
        let path = '/';
        if(post.type == 'post') {
          const date = new Date(post.first_publication_date);
          path = '/posts/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + post.uid + '/'
        } else if(post.type == 'info') {
          path = '/' + post.uid + '/';
        } else if(post.type == 'author'){
          path = '/authors/' + post.uid + '/';
        }
        children.push({
          tag: 'url', children: [
            {tag: 'loc', children: 'https://leftoverbytes.com' + path},
            {tag: 'lastmod', children: post.last_publication_date.replace("+0000", "+00:00")},
          ]
        });
      });

      elem({tag: 'urlset', attrs: schema, children: children});
      res.end();
    });
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
