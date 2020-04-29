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
