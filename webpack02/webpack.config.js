let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')
module.exports = {
  mode:'development',
  entry:'./src/index.js',
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist')
  },
  devServer:{
    port: '8888',
    contentBase:'./dist' //打包后的结果存放的文件夹
  },
  module:{
    noParse:'/jquery/', // jquery是一个独立的模块，打包的时候不去解析jquery
    rules:[
        {
          test:/\.js$/,
          exclude: /node_modules/,  // 排除项
          include: path.resolve(__dirname,'src'), // 优化项
          use:{
            loader:'babel-loader',
            options:{
              presets:[
                '@babel/preset-env', // 解析es6
                '@babel/preset-react' // 解析react语法
              ]
            }
          }
        }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './publish/index.html'
    }),
    new webpack.IgnorePlugin(/\.\/locale/,/moment/), // 从moment中引入了locale，就忽略掉
    new webpack.DllReferencePlugin({
      manifest:path.resolve(__dirname,'dist','manifest.json')
    })
  ]
}