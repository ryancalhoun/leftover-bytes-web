module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? 'https://static.leftoverbytes.com/'
    : '/',

  pwa: {
    name: 'Leftover Bytes',
    themeColor: '#af4212',
  }
}
