const path = require("path")

module.exports = {
  entry: ["./frontend/src/index.tsx"],
  output: {
    filename: "index.js",
    path: path.join(__dirname, "/frontend/dist"),
  },
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
}
