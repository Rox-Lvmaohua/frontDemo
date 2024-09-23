<template>
    <ContentBase>
        <div class="row">
            <div class="col-3">
                <UserProfileInfoView @follow="follow" @unfollow="unfollow" :user="user" />
                <UserProfileWriteView @submit_post="submit_post" />
            </div>
            <div class="col-9">
                <UserProfilePostsView :posts="posts" />
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
        const route = useRoute();
        const userId = route.params.userId;
        console.log(userId);

        const user = reactive({
            id: 1,
            username: 'Maohua Lv',
            lastName: 'Lv',
            firstName: 'Maohua',
            followerCount: 0,
            is_followed: false,
        });

        const posts = reactive({
            count: 3,
            posts: [
                {
                    id: 1,
                    userid: 1,
                    content: 'Hello World'
                },
                {
                    id: 2,
                    userid: 1,
                    content: 'Vue 3 is awesome'
                },
                {
                    id: 3,
                    userid: 1,
                    content: 'Vue Router 4 is awesome'
                },
            ]
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

        return {
            user,
            follow,
            unfollow,
            posts,
            submit_post
        }
    }
}
</script>

<style scoped></style>