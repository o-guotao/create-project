const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(base(false), {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ['console.log', 'console.warn'], // 删除console.log
          },
        },
      }),
    ],
    splitChunks: {
      // all async initial 同步 异步 初始
      // import
      chunks: 'all', // 所有的chunk代码公共的部分分离出来成为一个单独的文件
      cacheGroups: {
        // 缓存组
        reactComp: {
          test: /[\\/]node_modules[\\/]_?react(.*)/,
          name: 'react',
          priority: 20,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 优先级
        },
        common: {
          minSize: 0, // 引入的文件大于0就提取出来
          minChunks: 2, // 至少引入2次
          priority: -20,
          reuseExistingChunk: true, // 如果主入口中引入了两个模块，其中一个正好也引用了后一个模块，那么可以直接引用该模块，避免重复打包代码
        },
      },
    },
  },
})
