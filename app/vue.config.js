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
        target: 'https://20191126t172616-dot-leftoverbytes.appspot.com/',
      },
    }
  }
}
