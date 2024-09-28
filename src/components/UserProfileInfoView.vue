<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-3 img-field">
                    <img class="img-fluid" :src="user.photo" alt="用户头像">
                </div>
                <div class="col-9">
                    <div class="username">{{ user.username }}</div>
                    <div class="fans">粉丝数: {{ user.followerCount }}</div>
                    <button @click="follow" v-if="!user.is_followed && !is_me" type="button"
                        class="btn btn-secondary btn-sm">+关注</button>
                    <button @click="unfollow" v-if="user.is_followed && !is_me" type="button"
                        class="btn btn-secondary btn-sm">取消关注</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import $ from 'jquery';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
    name: 'UserProfileInfoView',
    components: {},
    // 通过 props 接受父组件传入的数据
    props: {
        user: {
            type: Object,
            required: true
        }
    },

    setup(props, context) {
        const store = useStore();
        const follow = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
                type: 'POST',
                data: {
                    target_id: props.user.id
                },
                headers: {
                    'Authorization': 'Bearer ' + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === 'success') {
                        context.emit('follow');
                    }
                    console.log(resp.result);
                },
            });
        }

        const unfollow = () => {
            // 这里emit的是父组件中@xxx中的xxx事件，只要名称对应即可
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
                type: 'POST',
                data: {
                    target_id: props.user.id
                },
                headers: {
                    'Authorization': 'Bearer ' + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === 'success') {
                        context.emit('unfollow');
                    }
                    console.log(resp.result);
                },
            });
        }

        const is_me = computed(() => {
            return store.state.user.id === props.user.id;
        });

        return {
            follow,
            unfollow,
            is_me
        }
    }
}

</script>

<style scoped>
img {
    border-radius: 50%;
}

.username {
    font-size: 24px;
    font-weight: bold;
}

.fans {
    font-size: 12px;
    color: gray;
}

button {
    padding: 2px 4px;
    font-size: 12px;
}

.img-field {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
