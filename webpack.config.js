let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({
        cache: true, // 是否使用缓存
        parallel: true, // 是否同时压缩多个
        sourceMap: true // 源码映射
      }),
      /* css文件压缩插件，这个插件跟js压缩配置有冲突，需要使用uglifyjs插件来解决 */
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  devServer: {
    port: 9999,
    progress: true, // 进度条
    contentBase: './publish', // 配置静态文件夹目录
    // open:true, // 自动在浏览器打开
    compress: true // 开启gzip压缩
  },
  mode: 'development', // 模式： production development
  entry: './src/main.js', // 入口文件
  output: {
    filename: 'app.[hash:8].js', // 打包后的文件名,添加hash之后每次打包都会生成新的文件，防止缓存问题，如：appe63cef629097af5ce5db.js?e63cef629097af5ce5db
    path: path.resolve(__dirname, 'dist') // 打包后的路劲，必须是一个绝对路径
  },
  externals: {
    // 通过script外部引入的cdn模块，需要做此配置。打包的时候不作为依赖项，否则会打包失败
    jquery: '$'
  },
  plugins: [
    // 存放所有配置的插件
    new HtmlWebpackPlugin({
      template: './publish/index.html', // 使用的模板文件
      filename: 'index.html', // 打包后的模板文件名称
      // hash:true, // 打包后的文件名后面添加哈希戳，防止缓存问题，如： app.js?e63cef629097af5ce5db
      minify: {
        removeAttributeQuotes: true, // 删除html文件属性的双引号
        collapseWhitespace: true // html文件折叠成一行
      }
    }),
    /* css样式抽离插件 */
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css', // 抽离后的文件名称
      chunkFilename: '[id].css'
    })
  ],
  module: {
    /* loader 处理从右往左，从下往上 */
    rules: [
      // { // eslint 校验
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       enforce: 'pre' // previous:在前面执行 post：在后执行
      //     }
      //   }
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // 预设
              /* 用babel-loader需要把es6转成es5 */
              '@babel/preset-env'
            ],
            plugins: [
              /* 将更高级的语法转换到低级 */
              '@babel/plugin-proposal-class-properties',
              /* 可重新使用Babel注入的帮助程序代码 */
              '@babel/plugin-transform-runtime'
            ]
          }
        },
        include: path.resolve(__dirname, 'src'), // 包含项，只对src文件加下面的js进行转换
        exclude: /node_modules/ // 排除项
      },
      {
        test: /\.css$/,
        use: [
          // {
          //   /* 把cssloader处理好的样式以style标签的形式插入到head标签中 */
          //   loader: 'style-loader'
          // },
          /* css样式抽离插件,会把所有的css打包到一个文件里面 */
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              /* 开启css modules  */
              /* 在<template>模板中通过动态类绑定来使用它($style是个计算属性) */
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          }
        ]
      },
      {
        test: /\.less/,
        use: [
          // {
          //   loader: 'style-loader'
          // },
          /* css样式抽离插件 */
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              /* 开启css modules  */
              /* 在<template>模板中通过动态类绑定来使用它($style是个计算属性) */
              modules: true
            }
          },
          'less-loader',
          {
            loader: 'postcss-loader', // autoprefixer依赖postcss-loader
            options: {
              plugins: [require('autoprefixer')]
            }
          }
        ]
      },
      // {
      //   test: /\.html$/,
      //   use: 'html-withimg-loader'
      // },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader'
      }
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //       /* 小于200k的时候，使用base64来转化，否则用file-loader来产生真实图片 */
      //       limit: 1,
      //       outputPath: 'img/'
      //     }
      //   }
      // }
    ]
  }
}
