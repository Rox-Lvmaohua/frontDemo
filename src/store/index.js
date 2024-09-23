import { createStore } from 'vuex'
import Moduleuser from './user'


// vuex创建的全局唯一对象

export default createStore({
  // state是vuex中存储数据的地方，可以理解为data
  state: {
  },

  // getters是vuex中的计算属性，可以理解为computed, 用于计算state中的数据, 
  // 如根据lastname和firstname计算fullname, 只能读取数据，不能修改数据
  getters: {
    fullName(state) {
      return state.user.firstname + " " + state.user.lastname
    }
  },

  // mutations是vuex中的方法，可以理解为methods，用于修改state中的数据
  // 不能处理异步操作，只能处理同步操作
  // 对于简单的业务逻辑，可以在mutations中处理, 直接修改state中的数据
  mutations: {
  },

  // actions是vuex中的异步方法，可以理解为methods，用于处理异步操作，
  // 如请求后端接口，不能直接修改state中的数据，需要通过mutations来修改
  // 对于复杂的业务逻辑，可以在actions中处理
  actions: {
  },

  // modules是vuex中的模块，可以理解为components
  // 用于分割store，将store分割成多个模块，
  // 每个模块有自己的state, getters, mutations, actions
  modules: {
    user: Moduleuser,
  }
});

// 访问user模块中的数据：store.state.user.username
