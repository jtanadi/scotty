const merge = require("webpack-merge")
const TerserPlugin = require("terser-webpack-plugin")

const common = require("./webpack.common")

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
})
