const path = require('path');
const webpack = require('webpack');
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
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: {
    //    drop_console: true
    //  },
    //}),
  ],
}

