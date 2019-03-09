const builder = require('xmlbuilder');
const prismic = require('prismic-javascript');

class Sitemap {
  constructor() {
    const baseurl = 'https://leftoverbytes.cdn.prismic.io/api/v2';
    this.api = prismic.getApi(baseurl);
  }

  async generate() {
    const doc = builder.create('urlset');
    doc.att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
    doc.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    doc.att('xsi:schemaLocation', 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd');

    (await (await this.api).query("")).results.forEach((p) => {
      let path = '/';
      if(p.type == 'post') {
        const date = new Date(p.first_publication_date);
        path = '/posts/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + p.uid + '/'
      } else if(p.type == 'info') {
        path = '/' + p.uid + '/';
      } else if(p.type == 'author'){
        path = '/authors/' + p.uid + '/';
      }

      doc.ele('url')
        .ele('loc').txt('https://leftoverbytes.com' + path).up()
        .ele('lastmod').txt(p.last_publication_date.replace("+0000", "+00:00")).up()
      .up();
    });

    return doc.toString({pretty: true});
  }
}
module.exports = Sitemap;
