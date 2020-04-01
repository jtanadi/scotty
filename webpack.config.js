const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
const webpack = require("webpack")

// Important that this port is 3000
// because of our restrictive S3 bucket
const PORT = 3000
const PROXY = process.env.PROXY || "http://localhost:3030"

let optimization = {}
let resolve = {
  extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
}

let entry = ["./frontend/src/index.tsx"]
if (process.env.NODE_ENV === "development") {
  resolve = {
    ...resolve,
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  }
} else if (process.env.NODE_ENV === "production") {
  optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
}

module.exports = {
  entry,
  devServer: {
    contentBase: path.join(__dirname, "/frontend/"),
    compress: true,
    hot: true,
    port: PORT,
    proxy: {
      "/": PROXY,
    },
  },
  output: {
    filename: "index.js",
    path: path.join(__dirname, "/frontend/dist"),
  },
  mode: process.env.NODE_ENV || "development",
  module: {
    rules: [
      {
        test: /\.tsx*$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve,
  optimization,
}
