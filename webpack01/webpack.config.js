let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
let { CleanWebpackPlugin } = require('clean-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack')
let Happypack = require('happypack')

module.exports = {
  optimization: {
    // webpack4之前通过commonChunkPlugins插件来配置
    minimizer: [
      new UglifyjsWebpackPlugin({
        cache: true, // 是否使用缓存
        parallel: true, // 是否同时压缩多个
        sourceMap: true, // 源码映射
      }),
      /* css文件压缩插件，这个插件跟js压缩配置有冲突，需要使用uglifyjs插件来解决 */
      new OptimizeCssAssetsWebpackPlugin(),
    ],
    /* 多页应用抽离代码 */
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'initial', // 从入口处开始抽离公共模块
          minSize: 0, // 文件多大就要抽离
          minChunks: 2, // 使用多少次以上就抽离
        },
        vendor: {
          priority: 1, // 权重，先抽离公共的第三方模块
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
        },
      },
    },
  },
  devServer: {
    hot: true, //启用热更新
    /* 使用webpack-dev-server来写接口，就不会产生跨域问题，因为我们启动页面的服务跟接口的服务都是同一个 */
    before(app) {
      // app: webpack本地开启的服务webpack-dev-server
      /* 使用wepack-dev-server 来写后端的接口 */
      app.get('/user', (req, res) => {
        res.json({ name: 'lihaohua' })
      })
    },
    port: 9999,
    progress: true, // 进度条
    contentBase: './publish', // 配置静态文件夹目录
    // open:true, // 自动在浏览器打开
    compress: true, // 开启gzip压缩
    proxy: {
      /* 本地服务请求数据的时候，先把请求发到webpack-dev-server,webpack-dev-server再转发到目标服务器上面 */
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          // 重写path,把/api去掉
          '/api': '',
        },
      },
    },
  },
  mode: 'production', // 模式： production development
  // entry: './src/main.js', // 入口文件
  entry: {
    // 多页面应用，抽离公共模块
    main: './src/main.js',
    other: './src/other.js',
  },
  output: {
    filename: '[name].js', // 打包后的文件名,添加hash之后每次打包都会生成新的文件，防止缓存问题，如：appe63cef629097af5ce5db.js?e63cef629097af5ce5db
    path: path.resolve(__dirname, 'dist'), // 打包后的路劲，必须是一个绝对路径
    // publicPath: 'http://www.test.com' // 打包后的js\css\图片资源都加上前缀
  },
  /* source-map ：源码映射，会单独生成一个sourceMap文件，出错了会标记当前报错的列和行
    eval-source-map :不会产生单独的文件，但是可以显示行和列
    cheap-module-source-map :生产后可以保留起来
    cheap-module-eval-source-map: 不会产生文件，集成在打包后的文件中，不会产生列
 */
  // devtool: 'eval-source-map',
  resolve: {
    // 解析第三方包
    // modules: [path.resolve('node_modules')],
    alias: {
      // 配置别名
      views: '@/views',
    },
  },
  // externals: {
  //   // 通过script外部引入的cdn模块，需要做此配置。打包的时候不作为依赖项，否则会打包失败
  //   jquery: '$',
  // },
  performance: {
    /* 去除webpack本地打包运行时，文件过大发出的警告，webpack打包后js文件过大的原因
        一般是应为设置了图片转成base64的原因
     */
    hints: false,
  },
  // watch: true,
  // watchOptions: {
  //   // 对项目代码的监控
  //   poll: 1000, // 每秒监控多少次
  //   aggregateTimeout: 500, // 防抖，毫秒数
  //   ignored: /node_modules/ //不需要监控的文件
  // },
  plugins: [
    // 存放所有配置的插件
    new HtmlWebpackPlugin({
      template: './publish/index.html', // 使用的模板文件
      filename: 'index.html', // 打包后的模板文件名称
      // hash:true, // 打包后的文件名后面添加哈希戳，防止缓存问题，如： app.js?e63cef629097af5ce5db
      minify: {
        removeAttributeQuotes: true, // 删除html文件属性的双引号
        collapseWhitespace: true, // html文件折叠成一行
      },
    }),
    /* css样式抽离插件 */
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css', // 抽离后的文件名称
      chunkFilename: '[id].css',
    }),
    /* 打包前，将之前的打包文件删掉 */
    new CleanWebpackPlugin(),
    /* 打包时将文件夹拷贝过来 */
    new CopyWebpackPlugin([
      {
        from: './static',
        to: './static',
      },
    ]),
    new webpack.BannerPlugin('mark in 2020 by lihaohua'),
    /* 定义环境变量 */
    new webpack.DefinePlugin({
      DEV: JSON.stringify('dev'),
    }),
    new webpack.NamedChunksPlugin(), // 打印热更新的模块路径
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    /* 多线程打包插件，项目大的时候使用 */
    // new Happypack({
    //   id: 'js',
    //   use: [
    //     {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: [
    //           // 预设
    //           /* 用babel-loader需要把es6转成es5 */
    //           '@babel/preset-env',
    //         ],
    //         plugins: [
    //           /* 将更高级的语法转换到低级 */
    //           '@babel/plugin-proposal-class-properties',
    //           /* 可重新使用Babel注入的帮助程序代码 */
    //           '@babel/plugin-transform-runtime',
    //         ],
    //       },
    //     },
    //   ],
    // }),
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
              '@babel/preset-env',
            ],
            plugins: [
              /* 将更高级的语法转换到低级 */
              '@babel/plugin-proposal-class-properties',
              /* 可重新使用Babel注入的帮助程序代码 */
              '@babel/plugin-transform-runtime',
            ],
          },
        },
        include: path.resolve(__dirname, 'src'), // 包含项，只对src文件加下面的js进行转换
        exclude: /node_modules/, // 排除项
      },
      // {
      //   // 多线程打包，配合Happypack插件使用
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   include: path.resolve('src'),
      //   use: 'Happypack/loader?id=js',
      // },
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
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          },
        ],
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
              modules: true,
            },
          },
          'less-loader',
          {
            loader: 'postcss-loader', // autoprefixer依赖postcss-loader
            options: {
              plugins: [require('autoprefixer')],
            },
          },
        ],
      },
      // {
      //   test: /\.html$/,
      //   use: 'html-withimg-loader'
      // },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: 'file-loader',
      //   options: {
      //     outputPath: '/img/'
      //   }
      // },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            /* 小于200k的时候，使用base64来转化，否则用file-loader来产生真实图片 */
            limit: 1,
            // outputPath: '/img/' // 打包后放到img目录下面,一般用于生产
            // publicPath: 'http://www.test.com' // 只针对打包后的图片资源都加上前缀，用于生产
          },
        },
      },
    ],
  },
}
