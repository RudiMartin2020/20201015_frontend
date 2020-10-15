import axios from 'axios'

const config = {
  url: process.env.VUE_APP_IAM_IP,
  port: process.env.VUE_APP_IAM_PORT
  // .env 파일에 IP/PORT 정의됨
  // https://cli.vuejs.org/guide/mode-and-env.html#example-staging-mode 참고
}
export default {
  getUserListWithPaging: async payload => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/users',
        { params: payload }
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  getUserSearch: async payload => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/user',
        { params: payload }
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  createUser: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/user',
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response.data === null ? null : response.data
    } catch (error) {
      console.error(error)
    }
  },
  updateUser: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/user/updateUser',
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  deleteUser: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/user/deleteUser',
        payload
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  getDeptTree: async payload => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/deptTree'
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  getProgramList: async () => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/program'
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  getArtbList: async payload => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/user/getArtbName',
        { params: payload }
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  getGroupList: async payload => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/group',
        { params: payload }
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  updateUserDetail: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/user/updateUser',
        payload
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  isOverlap: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/user/overlap',
        payload
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  getSiteList: async payload => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/site',
        { params: payload }
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  getLiveSiteList: async () => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/site/live'
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  overlapSiteId: async payload => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/site/id',
        { params: payload }
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  createSite: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/site',
        payload
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  deleteSite: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/site/updateSttusDelete',
        payload
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  updateSite: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/site/update',
        payload
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  createProgram: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/program',
        payload
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  updateProgram: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/program/update',
        payload
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  updatePrograms: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/program/update/all',
        payload
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  deleteProgram: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/program/delete',
        payload
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  getPermissionStr: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/perm',
        payload
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  getPermissionProgram: async payload => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/programs',
        { params: payload }
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  getLoginResult: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/login',
        payload
      )
      // console.log(response)
      return response
    } catch (error) {
      return error
    }
  },
  tokenValid: async () => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/tokenValid'
      )
      if (response) {
        return response
      }
    } catch (error) {
      return error
    }
  },
  refreshToken: async payload => {
    try {
      delete axios.defaults.headers.common['AT']
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/tokenRefresh',
        {
          headers: {
            RT: payload['RT']
          }
        }
      )
      return response
    } catch (error) {
      console.error('RefreshToken 실패!!', error)
      return error
    }
  },
  createDept: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/dept',
        payload
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  updateDept: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/dept/updateDept',
        payload
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  deleteDept: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/dept/deleteDept',
        payload
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  getGroups: async payload => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/group',
        { params: payload }
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  createGroup: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/group',
        payload
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  updateGroup: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/group/updateGroup',
        payload
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  deleteGroups: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/group/deleteGroup',
        payload
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  getGroupUserList: async payload => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/group/userList',
        { params: payload }
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  getUserListNotRelated: async payload => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/group/waitUser',
        { params: payload }
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  addUserGroup: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/group/addUser',
        payload
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  deleteUserGroup: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/group/deleteUser',
        payload
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  addProgramStats: async payload => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/program/addStat',
        { params: payload }
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  logout: async () => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/logout'
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  getHistName: async payload => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/program/getStatName',
        { params: payload }
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  getHistDailyList: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/program/getDailyStat',
        payload
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  getHistWeeklyList: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/program/getWeeklyStat',
        payload
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  getHistMonthlyList: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/program/getMonthlyStat',
        payload
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  addBookmark: async programIndex => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/program/addMark',
        { params: { progrmIndex: programIndex } }
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
      return error.response.data
    }
  },
  deleteBookmark: async programIndex => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/program/deleteMark',
        { params: { progrmIndex: programIndex } }
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  getBookmarkList: async () => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/program/bookMark',
        {}
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  programOrder: async () => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/program/order'
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  getPhoto: async () => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/user/photo'
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  orderBookmarks: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/bookmark/order',
        payload
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  getDept: async payload => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/dept',
        { params: payload }
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  getRootProgramList: async () => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/program/root'
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  sendAlarm: async (payload) => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/group/alarm', payload
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  getNoticeList: async (payload) => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/notice',
        { params: payload }
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.log(error)
    }
  },
  getNoticeDetail: async payload => {
    try {
      let response = await axios.get(
        config.url + ':' + config.port + '/iam/notice',
        { params: payload }
      )
      return response.data === null ? [] : response.data
    } catch (error) {
      console.error(error)
    }
  },
  deleteNotice: async (payload) => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/notice/delete',
        payload
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  createNotice: async payload => {
    try {
      let response = await axios.post(
        config.url + ':' + config.port + '/iam/notice',
        payload
      )
      return response.data === null ? null : response.data
    } catch (error) {
      console.error(error)
    }
  }
}
