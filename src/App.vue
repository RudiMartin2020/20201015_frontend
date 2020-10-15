<template>
  <div
    id="app"
    :class="theme"
  >
    <router-view />
    <b-loading
      :is-full-page="true"
      :active.sync="showLoader"
      :can-cancel="false"
    />
  </div>
</template>

<script>

//import VueCookies from 'vue-cookies'
//import { mapGetters } from 'vuex'
import { REMOVE_LOADER, ADD_LOADER, REQUEST_DATE } from './store/Request.store'
import ResponseErrorModal from './components/Modal/ResponseErrorModal'
/*
let getDomain = (domain = null) => {
  return domain ? domain.split(':')[0] : domain
}
*/
export default {
  name: 'App',
  mounted () {

//    this.checkError()
//    this.oauthCheck()// oauth관련 체크(redirection으로 들어오기 때문에 쿠키 확인을 통해 확인)
    this.enableInterceptor()
//    this.authCheck()
//    this.$store.dispatch('setTheme')

  },
  computed: {
    theme () {
      return '-theme-' + this.$store.state.ui.theme
    }
/*
    ...mapGetters([
      'authed', 'shouldShow', 'theDomain'
    ])
*/
  },
  watch: {
    authed (newval) {
      console.log('@watch: authed', newval)
/*
      if (newval === false) {
        this.$router.push({ name: 'auth' })
      }
*/
    },
/*
    shouldShow (newval) {
      if (newval) {
        // console.log('@shouldShow ==> :', this.shouldShow)
        this.loaderTimeout = setTimeout(() => {
          // console.log('@==> shouldShow:', this.shouldShow)
          if (this.shouldShow) this.showLoader = true
        }, 500)
      } else {
        this.showLoader = false
        // console.log('@===> timeout clear')
        clearTimeout(this.loaderTimeout)
      }
    }
*/
  },
  methods: {
/*
    showResponseError (err) {
      this.$modal.open({
        component: ResponseErrorModal,
        hasModalCard: true,
        props: {
          visible: true,
          title: err.exceptionType || 'Error',
          message: err.exceptionMessage,
          className: err.className,
          methodName: err.methodName,
          lineNumber: err.lineNumber
        }
      })
    },
    // we pass this method as example
    // alertFunc () {
    //   alert('Hello!')
    // },
    async oauthCheck () {
      let result = VueCookies.get('miipResult')
      if (result !== undefined && result !== null) {
        if (result.accessToken !== undefined && result.accessToken !== null) {
          let loginReq = {
            userId: '',
            userPassword: '',
            lang: VueCookies.get('miipLang'),
            site: VueCookies.get('miipSite'),
            timeOut: VueCookies.get('miipTime')
          }
          let payload = {
            loginResult: result,
            loginReq: loginReq
          }
          await this.$store.dispatch('afterLogin', payload)
        }
      }
    },
    async checkError () {
      let error = VueCookies.get('miipError')
      if (error !== undefined && error !== null) {
        switch (error.code) {
          case 3001:
            this.$dialog.alert('연동하기 버튼을 다시 눌러주세요.')
            break
          case 3002:
            this.$dialog.alert('연동에 실패했습니다. 다시 로그인 해주세요.')
            // this.$store.dispatch('logout')
            break
          case 3003:
            this.$dialog.alert('해당 Git 계정은 이미 연동되었습니다. <br>다른 Git 계정을 이용해 주세요.')
            let site = VueCookies.get('miipSite')
            VueCookies.remove('miipError', null, getDomain(process.env.NODE_ENV === 'production' ? site._webUrl : null))
            return
          case 3004:
            this.$dialog.alert('해당 Git 계정에 2개 이상의 계정이 연동되어 있습니다. <br> 관리자에게 문의해주세요.')
            // this.$store.dispatch('logout')
            break
          case 3005:
            this.$dialog.alert('해당 Git 계정에 연동된 계정이 없습니다. <br> 로그인 후 연동해주세요.')
            // this.$store.dispatch('logout')
            break
          default:
            this.$dialog.alert('OAUTH 문제  <br> 관리자에게 문의해주세요.')
            // this.$store.dispatch('logout')
            break
        }
        await this.$store.dispatch('removeOauthResult')
      }
    },
    async authCheck () {
      await this.$store.dispatch('setSite')
      let accessToken = VueCookies.get('miipAccessToken')
      let refreshToken = VueCookies.get('miipRefreshToken')
      let lang = VueCookies.get('miipLang')
      this.$i18n.locale = lang
      let user = VueCookies.get('miipUser')
      if (user) {
        await this.$store.commit('setUser', user)
      }
      let site = VueCookies.get('miipSite')
      if (site !== null) {
        VueCookies.remove('miipResult', null, getDomain(process.env.NODE_ENV === 'production' ? site._webUrl : null))
      }
      if (accessToken !== null && refreshToken !== null) {
        this.axios.defaults.headers.common['AT'] = accessToken
        await this.$store.dispatch('validToken')
      } else {
        this.$store.commit('setAuthState', false)
      }
    },
*/    
    enableInterceptor () {
      this.axios.interceptors.request.use((req) => {
        // console.log('@ App.vue request Interceptor')
        // Object.assign(req.headers, { env: 'dev' }) // TODO only for dev mode
//        req.headers.AT = VueCookies.get('miipAccessToken')
this.showLoader = true
        return new Promise((resolve) => {
          this.$store.dispatch(ADD_LOADER)
          resolve(req)
        })
      }, (error) => {
        return Promise.reject(error)
      })
      this.axios.interceptors.response.use((response) => {
this.showLoader = false
        // console.log('@ App.vue response Interceptor')
        return new Promise((resolve) => {
          this.$store.dispatch(REMOVE_LOADER)
          this.$store.commit(REQUEST_DATE)
          resolve(response)
        })
      }, async error => {
        this.$store.dispatch(REMOVE_LOADER)
console.log('axios.error')
this.showLoader = false
        return error
/*        
        const originalRequest = error.config
        if (error.response !== null && error.response.status === 401) {
          console.log('@@ error Message : ', error.response.data.errorName)
          let accessToken = VueCookies.get('miipAccessToken')
          if (accessToken === null) {
            if (error.response.data.code !== 2001 && error.response.data.code !== 2002 && error.response.data.code !== 3004) {
              await this.$store.dispatch('logout')
              return error
            }
          }
          switch (error.response.data.code) {
            case 1000:
              let result = await this.$store.dispatch('refreshToken')
              if (result.data.accessToken) {
                originalRequest.headers.AT = VueCookies.get('miipAccessToken')
                let result = await this.axios(originalRequest)
                return result
              }
              break
            case 2001:
              this.$dialog.alert('일치하는 ID 정보가 없습니다.')
              break
            case 2002:
              this.$dialog.alert('비밀번호가 일치하지 않습니다.')
              break
            case 2202:
              if (accessToken.length !== 0) {
                this.$dialog.alert('이미 로그아웃 된 사용자입니다. <br> 다시 로그인 해주세요.')
              }
              await this.$store.dispatch('logout')
              break
            case 2203:
              if (accessToken.length !== 0) {
                this.$dialog.alert('다른 로그인이 발생했습니다. <br> 다시 로그인 해주세요.')
              }
              await this.$store.dispatch('logout')
              break
            default:
              if (accessToken.length !== 0) {
                this.$dialog.alert('세션이 만료되었습니다. <br> 다시 로그인 해주세요.')
              }
              await this.$store.dispatch('logout')
              break
          }
          return error
        } else {
          if (error.response.status >= 401) {
            this.showResponseError(error.response.data)
          }
          return Promise.reject(error)
        }
*/        
      })
    }
  },
  data () {
    return {
      originalRequest: '',
      showLoader: false
    }
  }
}
</script>
<style src="./style/style.scss" lang="scss" />
<style src="./style/SkslRMS.scss" lang="scss" />
