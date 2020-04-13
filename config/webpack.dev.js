const path = require('path')
const webpackCommon = require('./webpack.common')
const { smart } = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath } = require('./paths')

module.exports = smart(webpackCommon, {
  mode: 'development',
  entry: path.join(srcPath, 'index.js'),
  module: {
    rules: [
      {
        test: /\.(jpg|png|jpeg|gif|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      filename: 'index.html'
    })
  ],
  // devServer: {
  //   port: 8080,
  //   proccess: true, // 显示打包进度条
  //   contentBase: distPath, // 根目录
  //   open: true, // 自动打开浏览器
  //   compress: true, // 启动gzip压缩
  //   // 设置代理
  //   proxy: {
  //     // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
  //     '/api': 'http://localhost:3000',
  //     // 将本地 /api2/xxx 代理到 localhost:3000/xxx
  //     '/api2': {
  //       target: 'http://localhost:3000',
  //       pathRewrite: {
  //         '/api2': ''
  //       }
  //     }
  //   }
  // }
})