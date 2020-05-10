<template>
  <div>
    <h2>hellow 页面</h2>
    {{ msg }}
    <test></test>
  </div>
</template>

<script>
import Test from './test.vue'
export default {
  name: 'hellow',
  components: {
    Test,
  },
  data() {
    return {
      msg: 'hellow 页面的数据',
    }
  },
}
</script>
