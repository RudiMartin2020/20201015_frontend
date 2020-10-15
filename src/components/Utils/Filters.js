import Vue from 'vue'
import Dayjs from 'dayjs'

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('log', function (value, char) {
  char = char || '↵'
  return value.replace(/\n/g, '<br>')
})

Vue.filter('search', function (source, search) {
  if (!source) return ''
  let regex = new RegExp(search, 'i')
  let isMatch = source.match(regex)
  if (isMatch) {
    return source.replace(regex, '<span class="strong">' + search + '</span>')
  }
  return source
})

Vue.filter('date', function (source, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!source) return ''
  return Dayjs(source).format(format)
})

Vue.filter('locale', function (source) {
  return source.toLocaleString()
})

export default {}
