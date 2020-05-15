const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./www/boot.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "boot.js",
  },
  mode: "development",
  plugins: [
    new CopyWebpackPlugin(['www/index.html'])
  ],
};
