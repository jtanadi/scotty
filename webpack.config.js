const webpack = require("webpack")
const path = require("path")

module.exports = {
  entry: "./frontend/src/index.tsx",
  output: {
    filename: "index.js",
    path: path.join(__dirname, "/frontend/static"),
  },
  mode: process.env.MODE || "development",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
}
