import {createStore} from 'vuex'

export default createStore({
    state: {
      itemInCart: 0,
    },
    mutations: {
      setCart(state, val) {
        state.itemInCart = val;
      },
      incrementCart(state) {
        state.itemInCart++;
      },
      reduceCart(state) {
        state.itemInCart--;
      },
    },
    actions: {
      // 由於 mutations只能處理同步函數，所以使用異步函數要在 actions
    },
    modules: {

    }
  })