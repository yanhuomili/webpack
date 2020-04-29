# 安装 webpack

```
yarn add webpack webpack-cli -D
```

## 默认配置文件是 webpack.config.js

## webpack 打包出来的文件解析

- webpack 打包出来的文件是一个立即执行函数,将每个依赖的文件以对象的 key 和 value 形式传递进去，key 是依赖的文件的名称，value 是一个函数。

```javascript
(function(module){
  //方法里面的代码省略
  ...
})({
  key:val,
  key2:val2
  ...
})
```

## webpack-dev-server

- webpack 开启本地服务,它是 webpack 内置的一个通过 express 实现的一个服务，将我们的项目进行隐试打包，并且部署到本地服务

```
yarn add webpack-dev-server -D
```

# webpack 插件：

- HtmlWebpackPlugin :html 插件
- MiniCssExtractPlugin :css 样式抽离插件，把 css 文件打保证单独的文件，用 link 方式在 head 标签里面引入
- AutoPreFixer :css 样式自动加上浏览器前缀,这个插件的时候需要使用 postcss-loader 先来处理
- OptimizeCssAssetsWebpackPlugin :css 样式文件压缩优化,该插件跟 js 压缩的配置有冲突，需要使用 uglifyjs 插件来解决
- uglifyjs ：解决使用 css 压缩插件后，js 无法压缩的问题

```
yarn add html-webpack-plugin -D
yarn add mini-css-extract-plugin -D
yarn add postcss-loader autoprefixer -D
yarn add optimize-css-assets-webpack-plugin -D
yarn add uglifyjs-webpack-plugin -D
```

配置要使用的 html 模板，webpack 会自动将打包的文件引入到 html 模板中，并将打包后的文件部署到本地服务中

# loader 处理器

- style-loader ：将 css 标签以 style 标签的方式插到 head 标签里面
- css-loader ：将 css 处理成 webpack 可以识别的语言，以便打包处理
- postcss-loader :autoprefixer 插件需要依赖这个 loader

```
yarn add style-loader css-loader -D
```

# babel js 处理器，将 es6 转成 es5

- balel-loader :babel-loader
- @balel/core : balel 核心模块
- @balel/preset-env : 把标准语法转成低级语法，来兼容浏览器
- @babel/plugin-proposal-class-properties :es 高级语法转换到更低的语法，来兼容浏览器
- @babel/plugin-transform-runtime ：可重新使用 Babel 注入的帮助程序代码
- @babel/runtime ：作为@babel/plugin-transform-runtime 包的依赖项，并且是运行时的所以开发环境和生产环境都需要安装此依赖
- @babel/polyfill :实现一些 es7 高级语法的转换,生产环境也需要依赖,在 main.js 中用 require 引入,在 webpack 进行打包的时候，会重写一些 es7 等更高级的方法,以便在上线后运行时能调用到这些高级方法

```
yarn add balel-loader @balel/core @balel/preset-env @babel/plugin-proposal-class-properties -D
yarn add @babel/plugin-transform-runtime -D
yarn add @babel/runtime
yarn add @babel/polyfill
```

# eslint 语法校验

- eslint
- eslint-loader

```
yarn add eslint eslint-loader
```

# webpack 打包图片

- file-loader :默认会在内部生成一张图片到 dist 目录下，并把图片的名字返回来,使用 file-loader 可以决绝背景图片，以及 js 动态生成的图片问题
- html-withimg-loader :打包 html 标签里面 img 标签引用的图片，如果 html 是引用静态文件里面的图片则不需要打包
- url-loader :

项目中使用图片的方法  
1.js 中创建图片  
2.在 css 中引入 background('url')  
3.img 标签中使用

```
yarn add file-loader -D
yarn add html-withimg-loader -D
yarn add url-loader -D
```

# watch 的用法

- 监控当前代码变化，代码改了，实时编译打包

# webpack 小插件

- cleanWebpackPlugin : 打包前先把打包生成的文件夹清除掉，打包后生成一个新的文件夹
- copyWebpackPlugin : 文件复制插件，打包时候可以把不需要打包的图片、字体文件夹复制到打包后的文件夹里面
- bannerPlugin : 内置的插件，版权生面，在打包后的文件里面会加上注释文字

# webpack 的跨域问题

- proxy : 通过本地服务代理来解决
- 在 webpack 本地服务写接口：在 devServer.before 钩子里面写接口代码，因为接口服务就是 webpack-dev-server,前后端都在同一个服务里面，这时候不会产生跨域问题
- 在后端接口服务里面启动 webpack 服务:

```javascript
/* server.js */

let webpack = require('webpack')
let express = require('express')
let app = express()
/* 中间件 */
let middle = require('webpack-dev-middleware') // 引入中间件
let config = require('./webpack.config.js') // 引入本地的webpack配置
let compiler = webpack(config) // 编译webpack的配置
app.use(middle(compiler))

app.get('/user', (req, res) => {
  res.json({ name: '在后端服务中启动webpack服务' })
})
app.listen(3000)
```

# resolve

- 解析第三方包
