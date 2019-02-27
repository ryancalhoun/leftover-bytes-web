const baseurl = 'https://leftoverbytes.cdn.prismic.io/api/v2';
const Prismic = require('prismic-javascript')

class Content {
  constructor() {
    this.api = Prismic.getApi(baseurl);
  }
  async posts() {
    return await (await this.api).query("", { fetch: 'post.title, post.description' });
  }
  async post(id) {
    return await (await this.api).getByID(id);
  }
}
export default new Content();
