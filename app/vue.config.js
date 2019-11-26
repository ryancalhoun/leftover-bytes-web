module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? 'https://storage.googleapis.com/leftoverbytes-content/'
    : '/',

  pwa: {
    name: 'Leftover Bytes',
    themeColor: '#af4212',
  },

  devServer: {
    disableHostCheck: true,
    proxy: {
      '/comments.*': {
        target: 'https://leftoverbytes.appspot.com/',
      },
      '/oauth.*': {
        target: 'https://20191126t171712-dot-leftoverbytes.appspot.com/',
        onProxyRes: res => {
/*
          const loc = new URL(res.headers['location']);
          const redirect = new URL(loc.searchParams.get('redirect_uri'));
          console.log(loc);
          console.log(redirect);
          redirect.protocol = 'http:';
          redirect.hostname = 'localhost';
          console.log(redirect);
    
          loc.searchParams.set('redirect_uri', redirect.toString());
          console.log(loc);
          res.headers['location'] = loc.toString();
*/
        },
      },
    }
  }
}
