const path = require('path')
const webpackCommon = require('./webpack.common')
const { smart } = require('webpack-merge')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { distPath, srcPath } = require('./paths')

module.exports = smart(webpackCommon, {
  mode: 'production',
  entry: {
    index: path.join(srcPath, 'views/home/index.js'),
    album: path.join(srcPath, 'views/album/index.js'),
    my: path.join(srcPath, 'views/my/index.js')
  },
  output: {
    // filename: 'bundle.[contentHash:8].js',
    filename: '[name].[contentHash:8].js',
    path: distPath
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('production')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles/main.[name].css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunks: ['index', 'vendor', 'common']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      filename: 'album.html',
      chunks: ['album', 'vendor', 'common']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      filename: 'my.html',
      chunks: ['my', 'vendor', 'common']
    }),
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: 'all',
      // 缓存分组
      cacheGroups: {
        // 第三方模块
        vendors: {
          name: 'vendor',
          priority: 1,
          minSize: 0,
          minChunks: 1,
          test: /node_modules/
        },
        common: {
          name: 'common',
          priority: 0,
          minSize: 0,
          minChunks: 2
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 小于5kb的图片用base64格式产出
            limit: 5 * 1024,
            outputPath: '/img/'
          }
        }
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ],
      },
    ]
  }
})