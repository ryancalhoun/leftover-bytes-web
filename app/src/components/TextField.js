'use strict';
import { PrismicRichText } from './prismic_rich_text'

export default {
  name: 'TextField',
  props: { text: Array },
  render: function(h) {
    const richText = new PrismicRichText(this.text);
    return richText.process(h);
  },
  components: {
    hyperlink: {
      props: { link_type: String, id: String, uid: String, url: String },
      render(h) {
        const children = this.$slots.default;
        if(this.link_type == 'Web') {
          const attrs = { href: this.url, target: '_blank', };
          return h('a', {attrs: attrs}, children);
        } else if(this.link_type == 'Document') {
          const attrs = { to: '/posts/' + this.id + '/' + this.uid, };
          return h('router-link', {attrs: attrs}, children);
        }
      }
    }
  }
};
