<template>
    <div class="card edit-field">
        <div class="card-body">
            <label for="edit-post" class="form-label">编辑</label>
            <!-- v-model将textarea中的内容和content绑定 -->
            <textarea v-model="content" class="form-control" id="edit-post" rows="3"></textarea>
            <button @click="submit_post" type="button" class="btn btn-primary btn-sm">发表</button>
            <!-- <div>{{ content }}</div> -->
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'UserProfileWriteView',
    components: {
    },


    setup(props, context) {
        let content = ref('');
        const submit_post = () => {
            context.emit('submit_post', content.value);
            content.value = '';
        }

        return {
            content,
            submit_post
        }
    }
}
</script>

<style scoped>
.edit-field {
    margin-top: 10px;
}

button {
    margin-top: 10px;
    margin-left: 160px;
}
</style>