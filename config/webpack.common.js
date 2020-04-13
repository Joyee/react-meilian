const path = require('path')
const { srcPath } = require('./paths')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: srcPath,
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}