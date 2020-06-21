const merge = require("webpack-merge")
const TerserPlugin = require("terser-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")

const common = require("./webpack.common")

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new CompressionPlugin({
      test: /\.[jt]sx*$/,
    }),
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
})
