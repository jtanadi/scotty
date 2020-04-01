const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
const webpack = require("webpack")

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

  // entry = ["webpack-hot-middleware/client", ...entry]
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
