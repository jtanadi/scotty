const { HotModuleReplacementPlugin } = require("webpack")
const merge = require("webpack-merge")
const path = require("path")

const common = require("./webpack.common")

// Important that this port is 3000
// because of our restrictive S3 bucket
const PORT = 3000
const PROXY = process.env.PROXY || "http://localhost:3030"

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "/frontend/"),
    compress: true,
    hot: true,
    open: true,
    port: PORT,
    proxy: {
      "/": PROXY,
    },
  },
  plugins: [new HotModuleReplacementPlugin()],
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
})
