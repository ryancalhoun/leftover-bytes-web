const baseurl = 'https://leftoverbytes.cdn.prismic.io/api/v2';
const Prismic = require('prismic-javascript')

class ContentApi {
  constructor() {
    this.api = Prismic.getApi(baseurl);
  }
  async home() {
    return await (await this.api).query([
        Prismic.Predicates.at('document.type', 'home'),
    ]);
  }
  async posts() {
    return await (await this.api).query([
        Prismic.Predicates.at('document.type', 'post'),
    ], { fetch: 'post.title, post.description, post.hero' });
  }
  async post(params) {
    const api = await this.api;
    if(params.id) {
      return await api.query([
        Prismic.Predicates.at('document.id', params.id)
      ], {fetchLinks: ['author.name', 'author.photo']});
    } else if(params.uid) {
      return await api.query([
        Prismic.Predicates.at('document.type', 'post'),
        Prismic.Predicates.year('document.first_publication_date', parseInt(params.year)),
        Prismic.Predicates.month('document.first_publication_date', parseInt(params.month)),
        Prismic.Predicates.at('my.post.uid', params.uid)
      ], {fetchLinks: ['author.name', 'author.photo']});
    }
  }
  async info(params, fields) {
    return await (await this.api).query([
        Prismic.Predicates.at('document.type', 'info'),
        Prismic.Predicates.at('my.info.uid', params.uid)
    ], {fetchLinks: fields});
  }
  async author(params) {
    return await (await this.api).query([
        Prismic.Predicates.at('document.type', 'author'),
        Prismic.Predicates.at('my.author.uid', params.uid)
    ]);
  }
}
export default new ContentApi();
