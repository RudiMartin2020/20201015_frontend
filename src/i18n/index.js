import Ko from './ko.js'
import En from './en.js'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
const prop = {
  ko: Ko,
  en: En
}

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'ko',
  messages: prop
})
