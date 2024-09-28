<template>
    <ContentBase>
        <div class="row">
            <div class="col-3">
                <UserProfileInfoView @follow="follow" @unfollow="unfollow" :user="user" />
                <UserProfileWriteView v-if="is_me" @submit_post="submit_post" />
            </div>
            <div class="col-9">
                <UserProfilePostsView :user="user" :posts="posts" @delete_a_post="delete_a_post" />
            </div>
        </div>
    </ContentBase>
</template>

<script>
import { reactive } from 'vue';
import ContentBase from '../components/ContentBase';
import UserProfileInfoView from '../components/UserProfileInfoView';
import UserProfilePostsView from '../components/UserProfilePostsView';
import UserProfileWriteView from '../components/UserProfileWriteView';
import { useRoute } from 'vue-router';
import $ from 'jquery';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
    name: 'UserProfileView',
    components: {
        ContentBase,
        UserProfileInfoView,
        UserProfilePostsView,
        UserProfileWriteView
    },

    // setup 的作用是初始化数据，类似构造器，不能使用 this
    setup() {
        const store = useStore();
        const route = useRoute();
        const userId = parseInt(route.params.userId);

        const user = reactive({

        });

        const posts = reactive({

        });

        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + store.state.user.access,
            },
            data: {
                user_id: userId
            },

            success(resp) {
                user.id = resp.id;
                user.username = resp.username;
                user.photo = resp.photo;
                user.followerCount = resp.followerCount;
                user.is_followed = resp.is_followed;
            }
        });

        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/post/",
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + store.state.user.access,
            },
            data: {
                user_id: userId
            },
            success(resp) {
                posts.count = resp.length;
                posts.posts = resp;
            }
        });

        const is_me = computed(() => {
            return store.state.user.id === userId;
        });

        const follow = () => {
            if (user.is_followed) return;
            user.followerCount++;
            user.is_followed = true;
            console.log('follow');
        }

        const unfollow = () => {
            if (!user.is_followed) return;
            user.followerCount--;
            user.is_followed = false;
            console.log('unfollow');
        }

        const submit_post = (content) => {
            posts.count++;
            posts.posts.unshift({
                id: posts.count,
                userid: user.id,
                content: content
            });
        }

        const delete_a_post = (post_id) => {
            posts.posts = posts.posts.filter(post => post.id !== post_id);
            posts.count = posts.posts.length;
        }

        return {
            user,
            follow,
            unfollow,
            posts,
            submit_post,
            is_me,
            delete_a_post
        }
    }
}
</script>

<style scoped></style>