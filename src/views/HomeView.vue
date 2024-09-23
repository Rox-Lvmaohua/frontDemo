<template>
  <ContentBase>
    首页
  </ContentBase>
</template>

<script>
// @ is an alias to /src

import ContentBase from '../components/ContentBase';

export default {
  // name属性用于指定当前组件的名称，用于其他组件引用
  name: 'HomeView',
  // components用于引入组件，这样就可以在模板中使用组件
  components: {
    ContentBase,
  }
}
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>
