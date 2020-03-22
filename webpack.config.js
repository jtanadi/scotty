const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")

console.log("NODE_ENV:", process.env.NODE_ENV)

let optimization = {}
if (process.env.NODE_ENV === "production") {
  optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
}

module.exports = {
  entry: "./frontend/src/index.tsx",
  output: {
    filename: "index.js",
    path: path.join(__dirname, "/frontend/static"),
  },
  mode: process.env.NODE_ENV || "development",
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
  optimization,
}
