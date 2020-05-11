<template>
  <div class="hellow">
    <h6>组件页面</h6>
    <div @click="clickMe">{{message}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'hellow world'
    }
  },
  methods: {
    clickMe () {
      console.log('click dom')
    }
  }
}
</script>

<style lang="scss" scoped>
.hellow {
  background: lightblue;
  color: red;
}
</style>