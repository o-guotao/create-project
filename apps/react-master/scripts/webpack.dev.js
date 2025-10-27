const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const path = require('path')

module.exports = merge(base(true), {
  mode: 'development',
  // source-map 生成单独的文件 出错了会标识当前报错的列和行 大 打包速度慢
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3000, // 服务端口号
    compress: false, // gzip压缩
    hot: true, // 热更新 只更新当前模块
    historyApiFallback: true, // 解决history路由404问题
    static: {
      // 托管静态资源文件
      directory: path.join(__dirname, '../public'), // 托管public下静态资源
    },
  },
})
