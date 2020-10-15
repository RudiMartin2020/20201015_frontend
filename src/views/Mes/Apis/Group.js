import axios from 'axios'

const config = {
  url: 'http://10.250.172.47',
  // url: 'http://61.250.84.93',
  port: '38080'
}
export default {
  getGroups: async (payload) => {
    try {
      let response
      if (payload) {
        response = await axios.get(config.url + ':' + config.port + '/group', { params: payload })
      } else {
        response = await axios.get(config.url + ':' + config.port + '/group')
      }
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  getGroup: async (index) => {
    try {
      let response = await axios.get(config.url + ':' + config.port + '/group')
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  createGroup: async (payload) => {
    try {
      let response = await axios.post(config.url + ':' + config.port + '/group', payload)
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  updateGroup: async (payload) => {
    try {
      let response = await axios.post(config.url + ':' + config.port + '/group/updateGroup', payload)
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  deleteGroups: async (payload) => {
    try {
      let response = await axios.post(config.url + ':' + config.port + '/group/deleteGroup', payload)
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  getUserList: async (payload) => {
    try {
      let response = await axios.get(config.url + ':' + config.port + '/group/userList', { params: payload })
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  getUserListNotRelated: async (payload) => {
    try {
      let response = await axios.get(config.url + ':' + config.port + '/group/waitUser', { params: payload })
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  addUser: async (payload) => {
    try {
      let response = await axios.post(config.url + ':' + config.port + '/group/addUser', payload)
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  deleteUser: async (payload) => {
    try {
      let response = await axios.post(config.url + ':' + config.port + '/group/deleteUser', payload)
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  }
}
