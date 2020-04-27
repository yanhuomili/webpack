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

- HtmlWebpackPlugin

```
yarn add html-webpack-plugin -D
```

配置要使用的 html 模板，webpack 会自动将打包的文件引入到 html 模板中，并将打包后的文件部署到本地服务中
