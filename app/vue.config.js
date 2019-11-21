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
      '/posts/.*/comments': {
        target: 'https://20191121t212725-dot-leftoverbytes.appspot.com/',
      }
    }
  }
}
