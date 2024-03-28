module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? 'https://storage.googleapis.com/leftoverbytes-content/'
    : '/',

  devServer: {
    allowedHosts: "all",
    proxy: {
      '/comments.*': {
        target: 'https://leftoverbytes.appspot.com/',
      },
      '/oauth.*': {
        target: 'https://leftoverbytes.appspot.com/',
      },
    }
  }
}
