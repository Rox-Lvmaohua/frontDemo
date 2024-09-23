<template>
    <div class="container">
        <div class="home">
            <div class="card">
                <div class="card-body">
                    <slot></slot>
                    <!-- 通过slot获取子组件传入的值, 可渲染任何内容 -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 公共组件
export default {
    // name属性用于指定当前组件的名称，用于其他组件引用
    name: 'ContentBase',
    // components用于引入组件，这样就可以在模板中使用组件
    components: {}
}
</script>

<style scoped>
.container {
    margin-top: 20px;
}
</style>