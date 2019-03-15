export default {
  name: 'TextField',
  props: { text: Array },
  render: function(h) {
    const richText = (type, obj) => {
      const rendered = [];
      let last = 0;
      this.getUniqeRanges(obj).forEach(r => {
        if(last < r.start) {
          rendered.push(obj.text.substring(last, r.start));
        }
        const types = Object.keys(r.spans);

        let m = obj.text.substring(r.start, r.end);
        types.forEach(t => m = h(t, {props: r.spans[t].data}, [m]));
        rendered.push(m);

        last = r.end;
      });
      if(last < obj.text.length) {
        rendered.push(obj.text.substring(last));
      }

      return h(type, rendered);
    };
    const image = (type, obj) => {
      return h(type, {attrs: {src: obj.url, alt: obj.alt}});
    };
    const list = (type, obj) => {
      return h(type, obj.items.map(it => richText('li', it)));
    };

    const types = {
      heading1:      { e: 'h1',  r: richText },
      heading2:      { e: 'h2',  r: richText },
      heading3:      { e: 'h3',  r: richText },
      heading4:      { e: 'h4',  r: richText },
      heading5:      { e: 'h5',  r: richText },
      heading6:      { e: 'h6',  r: richText },
      paragraph:     { e: 'p',   r: richText },
      preformatted:  { e: 'pre', r: richText },
      image:         { e: 'img', r: image },
      'list-item':   { e: 'ul',  r: list },
      'o-list-item': { e: 'ol',  r: list },
    };

    const elements = [];

    this.text.forEach(t => {
      if(t.type == 'list-item' || t.type == 'o-list-item') {
        const prev = elements[elements.length - 1];
        if(prev && prev.type == t.type) {
          prev.items.push(t);
        } else {
          elements.push({type: t.type, items: [t]});
        }
      } else {
        elements.push(t);
      }
    });

    return h('div', elements.map(t => {
      const type = types[t.type];
      return type && type.r(type.e, t);
    }));
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
  },
  methods: {
    getUniqeRanges(obj) {
      const spans = [];
      (obj.spans || []).forEach(s => {
        spans.push({ span: s, index: s.start, end: false });
        spans.push({ span: s, data: s.data, index: s.end, end: true });
      });
      spans.sort((a, b) => a.index != b.index ? a.index - b.index : a.end - b.end);

      const types = {};
      const ranges = [];

      for(let i = 0; i < spans.length-1; ++i) {
        const s = spans[i];
        const t = spans[i+1];

        if(s.end) {
          delete types[s.span.type];
        } else {
          types[s.span.type] = s.span;
        }

        const n = s.index + (s.end ? 1 : 0);
        const m = t.index - (t.end ? 0 : 1);

        if(n < m && Object.keys(types).length > 0) {
          ranges.push({spans: JSON.parse(JSON.stringify(types)), start: n, end: m});
        }
      }

      return ranges;
    }
  }
};
