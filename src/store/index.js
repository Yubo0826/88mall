import {createStore} from 'vuex'

export default createStore({
    state: {
      // 是否顯示登入模塊
      ifShowLoginModal: false
    },
    mutations: {
      showModal(state) {
        state.ifShowLoginModal = true
      },
      hideModal(state) {
        state.ifShowLoginModal = false
      }
    },
    actions: {

    },
    modules: {

    }
  })