<template>
  <div class="index">
    <h1>vue index.html page</h1>
    <p>{{message}}</p>
    <hellow></hellow>
  </div>
</template>

<script>
import Hellow from './hellow.vue'
export default {
  name: 'index',
  components: {
    Hellow
  },
  data () {
    return {
      message: 'index.html 页面'
    }
  }
}
</script>

<style  lang="scss" scoped>
.index {
  height: 200px;
  background: pink;
  color: #f6f6f6;
}
</style>