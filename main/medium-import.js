const builder = require('xmlbuilder');
const dns = require('dns');
const esm = require('esm')(module);
const prismic = require('prismic-javascript');

const PrismicRichText = esm('./prismic_rich_text').PrismicRichText;

class TextProcessor {
  constructor(doc) {
    this.doc = doc;
  }
  process(text) {
    const prismic = new PrismicRichText(text);

    let top;
    const h = (elem, attrs, children) => {
      if(Array.isArray(attrs) && !children) {
        children = attrs;
        attrs = undefined;
      }
      if(attrs) {
        attrs = attrs.attrs || attrs.props;
      }
      if(elem == 'hyperlink') {
        elem = 'a';
        if(attrs.link_type == 'Document') {
          attrs = {
            href: 'https://leftoverbytes.com/posts/' + attrs.id + '/' + attrs.uid,
            target: '_blank',
          };
        } else if(attrs.link_type == 'Web') {
          attrs = {
            href: attrs.url,
            target: '_blank',
          };
        }
      }
      return top = { element: elem, attrs: attrs, children: children };
    }

    prismic.process(h);

    let outer;
    const append = (xml, node) => {
      if(typeof node == 'string') {
        xml.txt(node);
      } else {
        const e = xml.ele(node.element, node.attrs);
        if(!outer) {
          outer = e;
          if(this.onouter) {
            this.onouter(outer);
          }
        }

        (node.children || []).forEach(c => append(e, c));
      }
    }

    append(this.doc, top);

    return outer;
  }
}

class MediumImport {
  constructor(req) {
    this.req = req;
  }
  matches() {
    const userAgent = this.req.header('User-Agent');
    if(userAgent) {
      if(userAgent.indexOf('Embedly') > -1) {
        return true;
      }
      if(userAgent == 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36') {
        return true;
      }
    }
    return false;
  }
  async handle(res) {
    const clientIp = (this.req.header('X-Forwarded-For') || '').split(',').shift();
    return new Promise((resolve, reject) => {
      dns.reverse(clientIp, (e, hostnames) => {
        if(hostnames.filter(h => h.match(/embed.ly|amazonaws.com/)).length > 0) {
          this.getDocument().then((page) => {
            this.render(res, page);
            resolve();
          });
        } else {
          reject();
        }
      });
    });
  }
  render(res, page) {
    const doc = builder.create('html');
    const body = doc.ele('body');


    const header = body.ele('header');
    let processor = new TextProcessor(header);
    processor.process(page.data.title);

    const main = body.ele('main');

    processor = new TextProcessor(main);
    processor.process(page.data.description);

    processor.onouter = (outer) => 
      outer.ele('img', {src: page.data.hero.url, alt: page.data.hero.alt});
    processor.process(page.data.body);

    res.send(doc.toString({pretty: true}));
    res.end();
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
}

export { MediumImport };
