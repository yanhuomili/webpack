let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports ={
  devServer:{
    port:9999,
    progress:true, // 进度条
    contentBase:'./publish', // 配置静态文件夹目录
    open:true, // 自动在浏览器打开
    compress:true,// 开启gzip压缩
  },
  mode:'production', // 模式： production development 
  entry:'./src/main.js', // 入口文件
  output:{
    filename:'app.[hash:8].js', // 打包后的文件名,添加hash之后每次打包都会生成新的文件，防止缓存问题，如：appe63cef629097af5ce5db.js?e63cef629097af5ce5db
    path:path.resolve(__dirname,'dist') // 打包后的路劲，必须是一个绝对路径
  },
  plugins:[ // 存放所有配置的插件
    new HtmlWebpackPlugin({
      template:'./publish/index.html', // 使用的模板文件
      filename:'index.html', // 打包后的模板文件名称
      // hash:true, // 打包后的文件名后面添加哈希戳，防止缓存问题，如： app.js?e63cef629097af5ce5db
      minify:{
        removeAttributeQuotes:true, // 删除html文件属性的双引号
        collapseWhitespace:true // html文件折叠成一行 
      }
    })

  ]
}