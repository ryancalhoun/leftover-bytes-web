'use strict';
import { h } from 'vue'
import { PrismicRichText } from './prismic_rich_text'

export default {
  name: 'TextField',
  props: { text: Array },
  render() {
    return new PrismicRichText(this.text).process(h);
  },
  components: {
    hyperlink: {
      props: { link_type: String, type: String, id: String, uid: String, url: String, slug: String },
      render() {
        const children = this.$slots.default;
        if(this.link_type == 'Web') {
          const attrs = { href: this.url, target: '_blank', };
          return h('a', {attrs: attrs}, children);
        } else if(this.link_type == 'Document') {
          if(this.type == 'post') {
            const attrs = { to: '/posts/' + this.id + '/' + this.uid, };
            return h('router-link', {attrs: attrs}, children);
          } else if(this.type == 'tag') {
            const attrs = { to: '/topics/' + this.slug, };
            return h('router-link', {attrs: attrs}, children);
          }
        }
      }
    }
  }
};
