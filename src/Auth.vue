<template>
  <section class="auth">
    <div class="auth-box">
      <section class="image-section">
        <div class="login-image image-1">
          <!-- :class="{'active':selectedImage}" -->
          <div class="image-bg">
            <i class="graphline" />
            <i class="hair" />
            <i class="arm" />
            <i class="space" />
            <span class="spin-wheel-small">
              <i class="wheel" />
            </span>
            <span class="spin-wheel-large">
              <i class="wheel" />
            </span>
            <div class="bar-chart">
              <i class="bar-object -bar1" />
              <i class="bar-object -bar2" />
              <i class="bar-object -bar3" />
            </div>
          </div>
        </div>
        <div class="login-image image-2">
          <div class="image-bg">
            <div class="image-logo" />
            <b-icon
              class="lightbulb"
              icon="lightbulb-on-outline"
            />
            <i class="lightbulb" />
            <i class="spin-wheel-large" />
            <i class="spin-wheel-small" />
            <i class="spin-wheel-mid">
              <b-icon icon="settings" />
            </i>
            <div class="bar-chart">
              <i class="bar-object -bar1" />
              <i class="bar-object -bar2" />
              <i class="bar-object -bar3" />
            </div>
            <i class="piechart" />
            <div class="phone-button">
              <i class="hand" />
              <i class="touch" />
            </div>
            <div class="pin-object">
              <i class="pin-item -first" />
              <i class="pin-item -second" />
              <i class="pin-item -third" />
            </div>
            <i class="connect" />
          </div>
        </div>
        <div class="login-image image-3">
          <div class="square-line" />
          <div class="square-fill" />
          <div class="right-side">
            <i class="spin-wheel-small" />
            <i class="spin-wheel-large" />
            <i class="connect-signal">
              <i class="signal" />
              <i class="signal" />
              <i class="signal" />
            </i>
          </div>
          <div class="left-side">
            <i class="lightbulb" />
            <i class="chart-grid" />
            <i class="checklist" />
          </div>
          <i class="chip" />
          <h3 class="sk-miip">
            SK Manufacture Intelligence Integration Platform
          </h3>
        </div>
        <div class="login-image image-4">
          <div class="image-bg">
            <i class="pin-item -first" />
            <i class="pin-item -second" />
            <i class="pin-item -third" />
            <i class="machine-light" />
            <i class="monitor-chart -piechart" />
            <i class="monitor-chart -linechart" />
          </div>
          <i class="spin-wheel-large" />
          <i class="spin-wheel-small" />
          <i class="spin-wheel-mid">
            <b-icon icon="settings" />
          </i>
          <i class="spin-wheel-single" />
          <i class="monitor-check">
            <b-icon icon="check" />
          </i>
          <div class="conveyer-belt">
            <div class="belt" />
            <i class="factory-machine-large">
              <i class="tongs" />
              <i class="tongs" />
            </i>
            <i class="factory-machine-small" />
            <i class="box -first-box" />
            <i class="box -second-box" />
            <i class="box -third-box" />
          </div>
        </div>
      </section>
      <section class="login-section">
        <div class="logo" />
        <div class="box-forms">
          <b-field
            label="ID"
            horizontal
          >
            <b-input
              v-model="userId"
              @keyup.native.enter="login"
            />
          </b-field>
          <b-field
            label="Password"
            horizontal
          >
            <b-input
              type="password"
              v-model="userPw"
              @keyup.native.enter="login"
            />
          </b-field>
          <b-field
            label="Site"
            horizontal
          >
            <b-select
              v-model="selectedSite"
              :data="siteColumns"
            >
              <option :value="null" />
              <option
                v-for="site in siteColumns"
                :value="site"
                :key="site.siteIndex"
              >
                {{ site.siteId }}
              </option>
            </b-select>
          </b-field>
          <b-field
            label="Language"
            horizontal
          >
            <b-select v-model="language">
              <option
                v-for="lang in languages"
                :key="lang.id"
                :value="lang.id"
              >
                {{ lang.label }}
              </option>
            </b-select>
          </b-field>
          <b-field
            label="Timeout"
            horizontal
          >
            <b-select v-model="timeout">
              <option
                v-for="time in timeouts"
                :key="time.hour"
                :value="time.value"
              >
                {{ time.hour }}
              </option>
            </b-select>
          </b-field>
        </div>
        <!-- /box-forms -->
        <div class="box-buttons buttons">
          <b-button
            type="is-dark"
            size="is-large"
            expanded
            @click="e => login()"
          >
            Log in
          </b-button>
          <b-button
            type="is-dark"
            size="is-large"
            icon-left="github-circle"
            expanded
            @click="gitLoginSet"
            disabled
          >
            Github
          </b-button>
        </div>
        <!-- /.box-buttons -->
      </section>
    </div>
    <!-- /.auth-box -->
  </section>
  <!-- /.auth -->
</template>

<script>
import API from '@/components/Apis/'
import { mapGetters } from 'vuex'

export default {
  name: 'Auth',
  mounted () {
    // this.checkError()
    this.getLiveSiteList()
    this.loadImage()
  },
  computed: {
    ...mapGetters(['user', 'authed', 'theDomain'])
  },
  watch: {
    authed (newval) {
      if (newval === true) {
        this.routeTo({
          name: 'home'
        })
      }
    }
  },
  methods: {
    loadImage () {
      let images = document.getElementsByClassName('login-image')
      var idx = Math.floor(Math.random() * images.length)
      for (var i = 0; i < images.length; i++) {
        var e = images[i]
        e.classList.remove('active')
      }
      images[idx].classList.add('active')
    },
    routeTo (to) {
      this.$router.push(to)
    },
    async login () {
      let site = this.selectedSite
      site.siteApiItm = JSON.parse(site._apiItm)
      site.siteWebSocket = JSON.parse(site._webSocketId)
      let payload = {
        userId: this.userId,
        userPassword: this.userPw,
        lang: this.language,
        site: site,
        timeOut: this.timeout
      }
      if (!this.userId || !this.userPw || !this.selectedSite.siteId) {
        this.$dialog.alert('빈칸을 입력해 주세요')
      } else {
        this.$i18n.locale = this.language
        this.$store.dispatch('login', payload)
      }
    },
    async getLiveSiteList () {
      let result = await API.settings.getLiveSiteList()
      this.siteColumns = result
      this.selectedSite = result[0]
    },
    async gitLoginSet () {
      let site = this.selectedSite
      site.siteApiItm = JSON.parse(site._apiItm)
      site.siteWebSocket = JSON.parse(site._webSocketId)
      this.$store.dispatch('setSite', site)
      this.$store.dispatch('setLangCommit', this.language)
      this.$store.dispatch('SET_TIMEOUT', this.timeout)

      let basicUrl = 'https://github.com/login/oauth/authorize?client_id='
      let clientId = 'ad3f0b39ef64d9163377'
      let redirectUri = '&redirect_uri='
      let redirectUriValue = 'http://api.skmip.growthsoft.co.kr/iam/oAuth?miipSiteId='
      let miipLangUri = '%26miipLang='
      let miipTimeUri = '%26miipTime='

      let hrefStr = basicUrl + clientId + redirectUri + redirectUriValue + site.siteId + miipLangUri + this.language + miipTimeUri + this.timeout
      document.location.href = hrefStr
    }
  },
  data () {
    return {
      userId: '',
      userPw: '',
      language: 'ko',
      languages: [
        { id: 'ko', label: '한국어' },
        { id: 'en', label: 'English' },
        { id: 'zh_CN', label: 'Chinese' }
      ],
      timeout: '24',
      timeouts: [
        { hour: '24시간', value: '24' },
        { hour: '12시간', value: '12' },
        { hour: '6시간', value: '6' },
        { hour: '3시간', value: '3' },
        { hour: '1시간', value: '1' }
      ],
      selectedSite: {},
      siteColumns: []
    }
  }
}
</script>

<style src="./Auth.scss" lang="scss" />
