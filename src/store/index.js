import Vue from 'vue'
import Vuex from 'vuex'
import Ui from './Ui.store'

import Auth from './Auth.store'
import Request from './Request.store'
import App from './App.store'
import Alarms from './Alarms.store'
import Bookmark from './Bookmark.store'
import GlobalSearch from './GlobalSearch.store'
import Dashboard from './Dashboard.store'
import Socket from './Socket.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: Auth,
    ui: Ui,
    request: Request,
    app: App,
    alarms: Alarms,
    bookmark: Bookmark,
    globalSearch: GlobalSearch,
    dashboard: Dashboard,
    socket: Socket
  }
})
