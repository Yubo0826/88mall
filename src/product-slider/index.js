import VueProductSlider from './VueProductSlider.vue'
import Swipe from './swipe'

// export named components
export {
  VueProductSlider,
    Swipe
}

// export vue component installer
export default {
  install: function (Vue) {
    Vue.component('vue-product-slider', VueProductSlider)
  }
}
