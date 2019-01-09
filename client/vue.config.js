const path = require('path')

const resolve = p => path.resolve(__dirname, p)

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        'style': resolve('src/style')
      }
    }
  }
}
