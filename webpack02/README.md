# 安装项目基础依赖

- yarn add webpack webpack-cli @babel/core babel-loader @babel/preset-env @babel/preset-react html-webpack-plugin webpack-dev-server -D

# webpack 优化点

- noParse :打包的时候不去解析第三方引进来的单独模块，如 jquery
- exclude : loader 处理文件时的排除项，例如排除 node_modules 文件夹
- include : loader 处理文件时的包含项，例如只处理 src 文件夹下面的文件
- IgnorePlugin ：webpack 内置的插件，忽略安装的一些依赖包里面多余或者没必要的依赖文件
- dllplugin ：动态链接库,将某些依赖文件提前打包好，放到独立的模块里面
- happypack :可以实现多线程打包
