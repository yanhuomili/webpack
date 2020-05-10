import $ from 'jquery'
import calc from './test.js'
import './a.js'
import './b.js'

const a = require('./a.js')
require('@babel/polyfill')
console.log(a)
require('./style/index.css')
require('./style/index.less')
console.log('hello webpack')
let testFn = () => {
  console.log('箭头函数')
}
testFn()
class B {
  a = 1
}

let bb = new B()
console.log(bb)
let p = new Promise((resolve) => {
  resolve({ text: 'promise' })
})
console.log(p, 'p')
p.then((res) => {
  console.log(res, 'promise 回调')
})
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    console.log('finally')
  })
console.log('aaa'.includes('a'), 'dddddd')
const run = () => {
  console.log('run')
}
console.log(run)
console.log($, 'jquery')
console.log($('.scss').html())

import pic from './assets/image/1.png'
let img = new Image()
img.src = pic
img.style.width = '300px'
img.style.height = '300px'
$('body').append(img)
console.log('aa')

console.log(DEV, 'dev')

console.log(calc.sum(1, 2))

document.getElementById('btn').onclick = function() {
  import('./source.js').then((data) => {
    console.log(data.default, 'data.default')
  })
}

import str from './source'
if (module.hot) {
  module.hot.accept('./source', () => {
    console.log('每次更新')
    let str = require('./source')
  })
}

import Vue from 'vue'
import Hellow from './views/hellow.vue'
Vue.component('Hellow', Hellow)
new Vue({
  el: '#app',
  data: {
    msg: 'vue 演示数据',
  },
})
