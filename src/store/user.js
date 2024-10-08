import $ from "jquery";
import { jwtDecode } from "jwt-decode";

const Moduleuser = {
    state: {
        id: "",
        username: "",
        photo: "",
        followerCount: 0,
        access: "",
        refresh: "",
        is_login: false
      },
      getters: {

      },
      mutations: {
        updateUser(state, user) {
          state.id = user.id;
          state.username = user.username;
          state.photo = user.photo;
          state.followerCount = user.followerCount;
          state.access = user.access;
          state.refresh = user.refresh;
          state.is_login = user.is_login;
        },
        updateAccess(state, access) {
          state.access = access;
        },
        logout(state) {
          state.id = "",
          state.username = "",
          state.photo = "",
          state.followerCount = 0,
          state.access = "",
          state.refresh = "",
          state.is_login = false
        }
      },
      actions: {
        login(context, data) {
          $.ajax({
            method: "POST",
            url: "https://app165.acapp.acwing.com.cn/api/token/",
            data: {
              username: data.username,
              password: data.password
            },
            success(resp) {
              const {access, refresh} = resp;
              const access_obj = jwtDecode(access);
              console.log(access_obj, refresh);

              setInterval(() => {
                $.ajax({
                  url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                  method: "POST",
                  data: {
                    refresh: refresh
                  },
                  success(resp) {
                    context.commit("updateAccess", resp.access);
                  }
                });
              }, 4.5 * 60 * 1000);
              $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
                type: "GET",
                data: {
                  user_id: access_obj.user_id
                },
                headers: {
                  'Authorization': "Bearer " + access
                },
                success(resp) {
                  console.log(resp); 
                  context.commit("updateUser", {
                    id: access_obj.user_id,
                    ...resp,
                    access: access,
                    refresh: refresh,
                    is_login: true
                  });
                  data.success()
                },
              })
            },
            error() {
              data.error()
            }
          });
        },


      }
};

export default Moduleuser;