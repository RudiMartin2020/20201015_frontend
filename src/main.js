import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import ComponentPanel from './components/ComponentPanel/ComponentPanel'
import ExampleView from './components/ExampleView/ExampleView'
import Buefy from 'buefy'
import SkComponents from './components/SkComponents/SkComponents'
import '@mdi/font/css/materialdesignicons.min.css'
import './wijmo'
import VueHighlightJS from 'vue-highlightjs'
import VuePrism from 'vue-prism'
import Filters from '@/components/Utils/Filters'
import axios from 'axios'
import VueAxios from 'vue-axios'
import infiniteScroll from 'vue-infinite-scroll'
import i18n from './i18n/'
import VueCookies from 'vue-cookies'
import VeeValidate from 'vee-validate'
// 글로벌 컴포넌트 및 플러그인 설정
Vue.config.productionTip = false

Vue.component('component-panel', ComponentPanel)
Vue.component('example-view', ExampleView)
Vue.use(Buefy, {
  defaultIconPack: 'mdi'
})
Vue.use(SkComponents)
Vue.use(VueHighlightJS)
Vue.use(VuePrism)
Vue.use(VueAxios, axios)
Vue.use(infiniteScroll)
Vue.use(VueCookies)
Vue.use(VeeValidate)
VueCookies.config('7d')

Vue.mixin({
  created () {
    Object.defineProperty(this, '$dialog', {
      value: this.$buefy.dialog
    })
  }
})

new Vue({
  router,
  store,
  Filters,
  i18n,
  render: h => h(App)
}).$mount('#app')
