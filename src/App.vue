<template>
  <NavBar />
  <router-view />
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  }
}

</script>

<style>
/** 可以添加scoped 属性，这样不同组件之间的样式不会影响 */
</style>
