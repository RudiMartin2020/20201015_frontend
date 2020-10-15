import axios from 'axios'
import store from '@/store/'

const env = (process.env.NODE_ENV === 'production')

const config = () => {
  const port = store.getters.theApis.mes.sitePort
  return {
    url: env ? ((process.env.VUE_APP_HTTPS_ENABLE === 'true' ? 'https://' : 'http://') + store.getters.theApis.mes.siteIp) : 'http://10.250.206.178',
    portSkslTest: env ? port : '1000'
  }
}
export default {
  getStudents: async (payload) => {
    try {
      // let response = await axios.get(config().url + ':' + config().portSkslTest + '/findAllMember', { params: payload })
      let response = await axios.get(config().url + ':' + config().portSkslTest + '/findAllMember', { params: payload })
      return response
    } catch (error) {
      console.error(error)
    }
  },
  saveStudents: async (payload, params) => {
    try {
      // await axios.post('http://10.250.172.38' + ':' + '1000' + '/saveMember?' + params, payload)
      await axios.post(config().url + ':' + config().portSkslTest + '/saveMember?' + params, payload)
      return { result: true }
    } catch (error) {
      console.error(error)
      return { result: false, error: error.message }
    }
  }
}
