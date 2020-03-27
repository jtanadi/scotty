import { Application } from "express"
import webpack from "webpack"
import webpackDev from "webpack-dev-middleware"
import webpackHot from "webpack-hot-middleware"

// Keep this as module.exports because we import with require()
module.exports = (app: Application): void => {
  const config = require("../../../webpack.config")
  const compiler = webpack(config)

  app.use(
    webpackDev(compiler, {
      publicPath: config.output.publicPath,
    })
  )

  app.use(webpackHot(compiler))
}
