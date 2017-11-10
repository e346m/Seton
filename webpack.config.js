const path = require('path');
const webpack = require('webpack');
var ElectronConnectWebpackPlugin = require('electron-connect-webpack-plugin');
module.exports = {
  entry: {
    'main': './src/electron/app.js',
    'r_main': './src/react/app.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public/js')
  },
  target: 'electron-main',
  node: {
    fs: 'empty',
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader', options: {
            presets: ['react', 'stage-0']}
          }
        ],
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ElectronConnectWebpackPlugin({
      path:path.join(__dirname, "public/js/main.js"),
      logLevel: 0
    }),
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: {
    //    drop_console: true
    //  },
    //}),
  ],
}

