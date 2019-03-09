const builder = require('xmlbuilder');
const prismic = require('prismic-javascript');

class SocialShare {
  constructor(req) {
    this.req = req;
  }
  isBot() {
    const userAgent = this.req.header('User-Agent');
    if(userAgent.match(/facebot|facebookexternalhit/i)) {
      return true;
    }
    return false;
  }
  handle(res) {
    this.getDocument().then(page => {
      const doc = builder.create('html');
      const head = doc.ele('head');

      this.setProps(head, page);

      res.setHeader("Content-Type", "text/html");
      res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
      res.send(doc.toString({pretty: true}));
      res.end();
    });
  }
  setProps(xml, page) {
    if(page && page.type == 'author') {
      this.meta(xml, 'og:title', page.data.name);
      this.meta(xml, 'og:description', page.data.bio[0].text);
    } else if(page && page.type == 'info') {
      this.meta(xml, 'og:title', page.data.title[0].text);
      this.meta(xml, 'og:description', page.data.body[0].text);
    } else if(page && page.type == 'post') {
      this.meta(xml, 'og:title', page.data.title[0].text);
      this.meta(xml, 'og:description', page.data.description[0].text);
    } else {
      this.meta(xml, 'og:title', 'Leftover Bytes');
      this.meta(xml, 'og:description', 'Leftover Bytes is a collection of insights on software and technology.');
    }
  }
  async getDocument() {
    const path = this.req.url.split('/').filter(x => x);

    const q = [];
    if(path.length == 0) {
      q.push(prismic.Predicates.at('document.type', 'home'));
    } else if(path.length == 1) {
      q.push(prismic.Predicates.at('document.type', 'info'));
      q.push(prismic.Predicates.at('my.info.uid', path[path.length-1]));
    } else {
      const type = path[0].replace(/s$/, '');
      q.push(prismic.Predicates.at('document.type', type));
      q.push(prismic.Predicates.at('my.' + type + '.uid', path[path.length-1]));
    }
    const baseurl = 'https://leftoverbytes.cdn.prismic.io/api/v2';
    const page = await (await (await prismic.getApi(baseurl)).query(q)).results[0];

    return page;
  }
  meta(doc, name, val) {
    doc.ele('meta')
      .att('property', name)
      .att('content', val)
  }
};

module.exports = SocialShare;
