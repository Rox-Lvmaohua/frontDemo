<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-3">
                    <img class="img-thumbnail"
                        src="https://cdn.acwing.com/media/user/profile/photo/89539_lg_ea03e1afaf.jpg" alt="用户头像">
                </div>
                <div class="col-9">
                    <div class="username">{{ fullName }}</div>
                    <div class="fans">粉丝数: {{ user.followerCount }}</div>
                    <button @click="follow" v-if="!user.is_followed" type="button"
                        class="btn btn-secondary btn-sm">+关注</button>
                    <button @click="unfollow" v-if="user.is_followed" type="button"
                        class="btn btn-secondary btn-sm">取消关注</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
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
        // computed 可以根据 props.user 的变化自动更新 fullName
        let fullName = computed(() => {
            return props.user.firstName + ' ' + props.user.lastName;
        });

        const follow = () => {
            context.emit('follow');
        }

        const unfollow = () => {
            // 这里emit的是父组件中@xxx中的xxx事件，只要名称对应即可
            context.emit('unfollow');
        }

        return {
            fullName,
            follow,
            unfollow
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
</style>
