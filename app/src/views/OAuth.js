import jwt_decode from 'jwt-decode';

export default {
  render: function(h) {
    return h('p', JSON.stringify([this.id(), this.opts().id_token]));
  },
  methods: {
    opts() {
      const h = {};
      window.location.hash.substr(1).split('&').map(x => {
        const v = x.split('=');
        if(v.length == 2) {
          h[v[0]] = decodeURIComponent(v[1]);
        }
      });
      return h;
    },
    id() {
      return jwt_decode(this.opts().id_token);
    }
  }
}
