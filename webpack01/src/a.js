const aModule = {
  a: 'aaaa',
  message: 'a 模块里面的数据'
}

/* http请求 */
let xhr = new XMLHttpRequest()
xhr.open('get', '/user', true)
xhr.onload = function() {
  console.log(xhr.response)
}
xhr.send()

module.exports = aModule
