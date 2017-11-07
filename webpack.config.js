const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: './src/electron/app.js',
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'public/js')
  },
  target: 'electron-main',
  node: {
    fs: 'empty',
    __dirname: false,
    __filename: false,
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: {
    //    drop_console: true
    //  },
    //}),
  ],
}

