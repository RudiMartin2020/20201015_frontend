import axios from 'axios'

const config = {
  url: 'http://10.250.172.47',
  // url: 'http://61.250.84.93',
  port: '38080'
}
export default {
  getDeptTree: async (payload) => {
    try {
      let response = await axios.get(config.url + ':' + config.port + '/deptTree')
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  createDept: async (payload) => {
    try {
      let response = await axios.post(config.url + ':' + config.port + '/dept', payload)
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  updateDept: async (payload) => {
    try {
      let response = await axios.post(config.url + ':' + config.port + '/dept/updateDept', payload)
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  deleteDept: async (payload) => {
    try {
      let response = await axios.post(config.url + ':' + config.port + '/dept/deleteDept', payload)
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  }
}
