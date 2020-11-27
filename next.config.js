const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins([
  [{
    webpackDevMiddleware(config) {
      config.watchOptions = {
        ignored: [
          /[\\/]\.next[\\/]/,
          /[\\/]node_modules[\\/]/
        ]
      }

      return config
    }
  }],
  [withImages({ esModule: true })]
])
