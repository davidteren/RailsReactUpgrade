const { environment, config } = require('@rails/webpacker')
const { resolve } = require('path')
const erb = require('./loaders/erb')

environment.config.merge({
  externals: {
    gon: "gon"
  },
  resolve: {
    alias: {
      '@': resolve(config.source_path),
    },
  },
})

environment.loaders.append('erb', erb)

module.exports = environment
