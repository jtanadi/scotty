const webpack = require("webpack")
const webpackDev = require("webpack-dev-middleware")
const webpackHot = require("webpack-hot-middleware")

module.exports = app => {
  const config = require("../../webpack.config")
  const compiler = webpack(config)

  app.use(
    webpackDev(compiler, {
      publicPath: config.output.publicPath,
    })
  )

  app.use(webpackHot(compiler))
}
