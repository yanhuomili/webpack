import $ from 'jquery'

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
let p = new Promise(resolve => {
  resolve({ text: 'promise' })
})
console.log(p, 'p')
p.then(res => {
  console.log(res, 'promise 回调')
})
  .catch(err => {
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
