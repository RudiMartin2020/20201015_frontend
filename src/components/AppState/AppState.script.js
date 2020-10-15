import { mapGetters, mapActions } from 'vuex'
import API from '@/components/Apis/'
import PushAlarms from '@/components/PushAlarms/PushAlarms'
import draggable from 'vuedraggable'

// import MiipConfig from '@/miip.config.js'

export default {
  name: 'app-state',
  components: {
    draggable,
    'push-alarms': PushAlarms
  },
  computed: {
    crumbs: function () {
      var crumbs = ''
      for (var i in this.$route.meta.breadcrumbs) {
        crumbs += this.$route.meta.breadcrumbs[i] + ' > '
      }
      crumbs = crumbs.substr(0, crumbs.length - 3)
      return crumbs
    },
    formattedRequestDate: function () {
      return this.$store.getters.formattedRequestDate()
    },
    alarmType () {
      return (this.newAlarmCount === 0) ? 'is-dark' : 'is-danger'
    },
    favorites: {
      get () {
        return this.$store.getters['bookmark:bookmarks']
      },
      set (value) {
        this.$store.dispatch('updateBookmark', value)
      }
    },
    userInfo () {
      let user = this.$store.getters['user']
      let site = this.$store.getters['theSite']
      this.getPhoto()
      return [
        { label: '이름', info: user.userNm },
        { label: '부서', info: user.userDty },
        { label: '사번', info: user.userNo },
        { label: '이메일', info: user.userEmail },
        { label: '사이트', info: site.siteId },
        { label: '아이디', info: user.userId },
        { label: 'github 연동', info: '' }
      ]
    },
    ...mapGetters({
      authed: 'authed',
      user: 'user',
      newAlarmCount: 'alarm:newAlarmCount',
      searchResultList: 'globalsearch:searchResultList',
      searchText: 'globalsearch:searchText',
      theDomain: 'theDomain',
      subDomain: 'subDomain',
      subDomains: 'subDomains'
    })
  },
  watch: {
    // 알림이 열리고 닫힐 떄 마다 new Alarm Count를 0으로 만듭니다.
    alarmShow () {
      this.$store.dispatch('alarm:flushNewAlarmCount')
    },
    newAlarmCount (newval) {
      if (this.alarmReceivedTimeout !== null) clearTimeout(this.alarmReceivedTimeout)
      if (newval === 0) {
        this.alarmReceived = false
        return
      }
      this.alarmReceived = true
      this.alarmReceivedTimeout = setTimeout(() => {
        this.alarmReceived = false
        this.alarmReceivedTimeout = null
      }, 3000)
    }
  },
  mounted () {
    this.$store.dispatch('getBookmarks')
    this.$store.dispatch('setTheme')
    this.getPhoto()
    // if (process.env.NODE_ENV === 'production') {
    //   let domains = window.location.hostname.split('.')
    //   this.currentSubdomain = domains.splice(0, 1)
    //   this.currentDomain = domains
    // } else {
    //   this.currentSubdomain = MiipConfig.REPOSITORY
    // }
  },
  methods: {
    routerTo (program) {
      event.stopPropagation()
      event.preventDefault()
      let programDomain = this.subDomains[program.split('/')[1]]
      // console.log(program)
      if (
        programDomain === this.subDomain ||
        process.env.NODE_ENV !== 'production'
      ) {
        this.$router.push({ path: program })
      } else {
        let href = process.env.VUE_APP_HTTPS_ENABLE === 'true' ? `https://${programDomain}.${this.theDomain}${program}` : `http://${programDomain}.${this.theDomain}${program}`
        document.location.href = href
      }
      /* this.bookmarkActive = false
      this.$router.push(obj)
      this.$store.dispatch('resetGlobalSearch') */
    },
    async logout () {
      await API.settings.logout()
      this.$store.dispatch('logout')
      if (process.env.NODE_ENV === 'production') {
        let href = process.env.VUE_APP_HTTPS_ENABLE === 'true' ? `https://iam.${this.theDomain}/auth` : `http://iam.${this.theDomain}/auth`
        setTimeout(() => {
          document.location.href = href
        }, 0)
      } else {
        this.$router.push({ name: 'auth' })
      }
    },
    async getPhoto () {
      if (this.authed === false) {
        return
      }
      let result = await API.settings.getPhoto()
      if (result.userPhoto) {
        this.userAvatar = 'data:image/jpeg;base64,' + result.userPhoto
      } else {
        this.userAvatar = require(`@/assets/images/img-user-profile.png`)
      }
    },
    setTheme (theme) {
      console.log('setTheme', theme)
      this.$store.dispatch('setTheme', theme)
    },
    refresh () {
      this.$store.commit('setRefreshRouter', true)
      this.$nextTick(() => {
        this.$store.commit('setRefreshRouter', false)
      })
    },
    alarmsOpen () {
      this.alarmShow = true
    },
    ...mapActions({
      search: 'search'
    }),
    resetGlobalSearch () {
      if (!this.mouseInGlobalSearchListDiv) {
        this.$store.dispatch('resetGlobalSearch')
      }
    },
    test (url) {
      this.$store.dispatch('search', '')
      this.routerTo(url)
    }
  },
  data () {
    return {
      themes: ['day', 'night'],
      // currentDomain: null,
      // currentSubdomain: null,
      appTitle: 'SK C&C Digital Factory',
      userAvatar: '',
      icons: {
        'SPC': 'poll',
        'MES': 'monitor-dashboard',
        'EAP': 'memory',
        'Settings': 'tune'
      },
      alarmShow: false,
      alarmReceived: false,
      alarmReceivedTimeout: null,
      bookmarkActive: false,
      mouseInGlobalSearchListDiv: false
      // searchResultList: [],
      // searchText: ''
    }
  }
}
