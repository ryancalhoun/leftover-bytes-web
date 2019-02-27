const baseurl = 'https://leftoverbytes.cdn.prismic.io/api/v2';
const Prismic = require('prismic-javascript')

class Content {
  constructor() {
    this.api = Prismic.getApi(baseurl);
  }
  async posts() {
    return await (await this.api).query("", { fetch: 'post.title, post.description' });
  }
  async post(params) {
    const api = await this.api;
    if(params.id) {
      return await api.query([
        Prismic.Predicates.at('document.id', params.id)
      ]);
    } else if(params.uid) {
      return await api.query([
        Prismic.Predicates.at('document.type', 'post'),
        Prismic.Predicates.year('document.first_publication_date', parseInt(params.year)),
        Prismic.Predicates.month('document.first_publication_date', parseInt(params.month)),
        Prismic.Predicates.at('my.post.uid', params.uid)
      ]);
    }
      
  }
}
export default new Content();
