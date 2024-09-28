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
import $ from 'jquery';
import { useStore } from 'vuex';

export default {
    name: 'UserProfileWriteView',
    components: {
    },


    setup(props, context) {
        const store = useStore();
        let content = ref('');
        const submit_post = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: 'POST',
                data: {
                    content: content.value
                },
                headers: {
                    'Authorization': 'Bearer ' + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === 'success') {
                        context.emit('submit_post', content.value);
                        content.value = '';
                        console.log('发表成功');
                    } else {
                        console.log('发表失败');
                    }
                }
            });
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