import { Application } from "express"
import webpack from "webpack"
import webpackDev from "webpack-dev-middleware"
import webpackHot from "webpack-hot-middleware"

const enableHMR = (app: Application): void => {
  const config = require("../../../webpack.config")
  const compiler = webpack(config)

  app.use(
    webpackDev(compiler, {
      publicPath: config.output.publicPath,
    })
  )

  app.use(webpackHot(compiler))
}

export default enableHMR
