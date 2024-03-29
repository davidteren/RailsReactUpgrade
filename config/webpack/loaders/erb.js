module.exports = {
  test: /\.(js|ts)\.erb$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: [{
    loader: 'rails-erb-loader',
    options: {
      runner: (/^win/.test(process.platform) ? 'ruby ' : '') + 'bundle exec bin/rails runner'
    }
  }]
}
