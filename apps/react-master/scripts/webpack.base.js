const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (isDev) {
  return {
    entry: path.resolve(__dirname, '../src/index.tsx'), // chunk
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'static/js/[name].[chunkhash:8].js', // chunkhash 每次打包的hash值都不一样 浏览器缓存
      clean: true, // 删除上次打包的文件
      publicPath: '/', // 打包后的文件路径
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'], // import xxx from './data'
      alias: {
        '@': path.resolve(__dirname, '../src'), // import xxx from '@/utils'
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        // 目的 匹配了文件 不会继续匹配 节省匹配时间
        {
          oneOf: [
            {
              test: /\.module\.(less|css)$/,
              include: [path.resolve(__dirname, '../src')],
              // loader执行顺序 从右向左 每个loader功能单一
              use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // css => 内敛html  link加载
                {
                  loader: 'css-loader',
                  options: {
                    modules: {
                      localIdentName: '[path][name]__[local]--[hash:base64:5]',
                    },
                  },
                }, // 命名
                'postcss-loader', // css 前缀
                'less-loader', // less => css
              ],
            },
            {
              test: /\.css$/,
              use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
              ],
            },
            {
              test: /\.less$/,
              use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'less-loader',
              ],
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: 'asset', // 小于8kb 转base64  大于8kb 输出图片
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024, // 8kb
            },
          },
          generator: {
            filename: 'static/images/[name].[contenthash:8][ext]', // 输出图片的路径
          },
        },
        // webpack5 内置url|file-loader 可以直接使用asset
        {
          test: /\.(woff2?|eot|ttf|otf)$/,
          type: 'asset', // 字体图标
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024, // 8kb
            },
          },
          generator: {
            filename: 'static/fonts/[name].[contenthash:8][ext]', // 输出图片的路径
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 媒体文件
          type: 'asset', // 字体图标
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024, // 8kb
            },
          },
          generator: {
            filename: 'static/media/[name].[contenthash:8][ext]', // 输出图片的路径
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css', // 提取css的文件名
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'), // 模板文件
      }),
    ],
  }
}
