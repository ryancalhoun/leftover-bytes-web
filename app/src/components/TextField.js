export default {
  name: 'TextField',
  props: {
    text: Array
  },
  render: function(h) {
    const richText = (type, obj) => {
      return h(type, obj.text);
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
      image:         { e: 'img', r: image },
      'list-item':   { e: 'ul',  r: list },
      'o-list-item': { e: 'ol',  r: list },
    };

    let elements = [];

    this.text.forEach(t => {
      if(t.type == 'list-item' || t.type == 'o-list-item') {
        let prev = elements[elements.length - 1];
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
      if(type)
        return type.r(type.e, t);
    }));
  }
};
