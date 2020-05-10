let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')

module.exports = {
  devServer: {
    port: 8080,
    progress: true, // 进度条
    compress: true, // 开启gzip压缩
  },
  mode: 'development', // 模式： production development
  entry: './main.js', // 入口文件
  output: {
    filename: 'app.js', // 打包后的文件名,添加hash之后每次打包都会生成新的文件，防止缓存问题，如：appe63cef629097af5ce5db.js?e63cef629097af5ce5db
    path: path.resolve(__dirname, 'dist'), // 打包后的路劲，必须是一个绝对路径
  },
  devtool: 'eval-source-map',
  resolve: {
    alias: {
      // 配置别名
      views: '@/views',
      vue: 'vue/dist/vue.js',
    },
  },
  plugins: [
    // 存放所有配置的插件
    new HtmlWebpackPlugin({
      template: './index.html', // 使用的模板文件
      filename: 'index.html', // 打包后的模板文件名称
    }),
  ],
  module: {},
}
