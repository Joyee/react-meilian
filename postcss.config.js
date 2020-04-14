const px2rem = require('postcss-px2rem')

module.exports = {
  plugins: [
    require('autoprefixer'),
    px2rem({ remUnit: 75, exclude: /node_modules/i }), // 添加的内容
  ]
}