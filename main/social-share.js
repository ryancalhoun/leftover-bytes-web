const builder = require('xmlbuilder');
const prismic = require('prismic-javascript');

class SocialShare {
  constructor(req) {
    this.req = req;
  }
  matches() {
    const userAgent = this.req.header('User-Agent');
    if(userAgent.match(/facebot|facebookexternalhit|twitterbot|linkedinbot/i)) {
      return true;
    }
    return false;
  }
  async handle(res) {
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
    this.meta(xml, 'og:type', 'website');
    this.meta(xml, 'twitter:card', 'summary');
    if(page && page.type == 'home') {
      this.setDocumentProps(
        xml,
        page.data.title[0].text,
        page.data.description.map(p => p.text).join(' '),
        page.data.hero.social.url
      );
    } else if(page && page.type == 'author') {
      this.setDocumentProps(
        xml,
        page.data.name,
        page.data.bio[0].text,
        page.data.photo.url
      );
    } else if(page && page.type == 'post') {
      this.setDocumentProps(
        xml,
        page.data.title[0].text,
        page.data.description[0].text,
        page.data.hero.url
      );
    }
  }
  setDocumentProps(xml, title, description, image) {
    this.meta(xml, 'og:title', title);
    this.meta(xml, 'og:description', description);
    this.meta(xml, 'og:image', image);
    this.meta(xml, 'twitter:title', title);
    this.meta(xml, 'twitter:description', description);
    this.meta(xml, 'twitter:image', image);
  }
  async getDocument() {
    const path = this.req.url.split('/').filter(x => x);

    const q = [];
    if(path.length <= 1) {
      q.push(prismic.Predicates.at('document.type', 'home'));
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

export { SocialShare };
