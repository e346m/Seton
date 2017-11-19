const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
var ElectronConnectWebpackPlugin = require('electron-connect-webpack-plugin');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new ElectronConnectWebpackPlugin({
      path:path.join(__dirname, "public/js/main.js"),
      logLevel: 0
    }),
  ],
});
