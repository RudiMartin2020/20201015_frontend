import { mapState, mapGetters } from 'vuex'
// import MiipConfig from '@/miip.config.js'

// TODO 메뉴 선택하면 폴딩 되도록 하기

const trees = {
  spc: {
    title: 'SPC',
    items: [{
      title: 'Home',
      id: 'spc-home',
      to: 'spc-home',
      class: '-spc-home'
    }, {
      title: 'My Para',
      id: 'my-para',
      to: 'my-para',
      class: '-my-para'
    }, {
      title: 'Event Dashboard',
      id: 'event-dashboard',
      to: 'event-dashboard-list',
      class: '-event-dashboard'
    }, {
      title: 'Event Search',
      id: 'event-hub',
      to: 'event-hub',
      class: '-event-hub'
    }, {
      title: 'Event Visualization',
      id: 'event-visualization',
      to: 'event-visualization-list',
      class: '-event-visualization'
    }, {
      title: 'Rule',
      id: 'rule-setup',
      to: 'rule-setup',
      class: '-rule-setup'
    }, {
      title: 'Report',
      id: 'spc-report',
      to: 'spc-report',
      class: '-spc-report'
    }, {
      title: 'Simulation',
      id: 'spc-simulation',
      to: 'spc-simulation',
      class: '-spc-simulation'
    }, {
      title: 'Cause & Effect',
      id: 'spc-cause-effect',
      to: 'spc-cause-effect',
      class: '-spc-cause-effect'
    }]
  },
  mes: {
    title: 'MES',
    items: [{
      title: 'MES MAIN',
      id: 'mes-main2',
      to: 'mes-main2',
      class: '-mes-main2'
    }, {
      title: '기준정보',
      children: [{
        title: 'Site정의',
        id: 'mes-standard-site',
        to: 'mes-standard-site',
        class: '-mes-standard-site'
      }, {
        title: '위치 정의',
        id: 'mes-standard-facility',
        to: 'mes-standard-facility',
        class: '-mes-standard-facility'
      }, {
        title: '생산제품 & 프로세스 매핑',
        id: 'mes-standard-mapping',
        to: 'mes-standard-mapping',
        class: '-mes-standard-mapping'
      }, {
        title: '장비',
        id: 'mes-equipment',
        to: 'mes-equipment',
        class: '-mes-equipment'
      }, {
        title: 'Port',
        id: 'mes-standard-port',
        to: 'mes-standard-port',
        class: '-mes-standard-port'
      }, {
        title: 'Shift 정의',
        id: 'mes-cds-shift',
        to: 'mes-cds-shift',
        class: '-mes-cds-shift'
      }, {
        title: 'PPS-BOM',
        id: 'mes-pps-bom',
        to: 'mes-pps-bom',
        class: '-mes-pps-bom'
      }, {
        title: 'PPS-MBOM',
        id: 'mes-pps-mbom',
        to: 'mes-pps-mbom',
        class: '-mes-pps-mbom'
      }, {
        title: 'PPS-EIN',
        id: 'mes-pps-ein',
        to: 'mes-pps-ein',
        class: '-mes-pps-ein'
      }, {
        title: 'PPS-QTIME',
        id: 'mes-pps-qtime',
        to: 'mes-pps-qtime',
        class: '-mes-pps-qtime'
      }, {
        title: 'PPS-SAMPLE',
        id: 'mes-pps-sample',
        to: 'mes-pps-sample',
        class: '-mes-pps-sample'
      }, {
        title: '제품 사양 정의',
        id: 'mes-pps-prod',
        to: 'mes-pps-prod',
        class: '-mes-pps-prod'
      }, {
        title: '자재 사양 정의',
        id: 'mes-rds-mtrl',
        to: 'mes-rds-mtrl',
        class: '-mes-rds-mtrl'
      }, {
        title: '공정 정의',
        id: 'mes-pms-procsgmt',
        to: 'mes-pms-procsgmt',
        class: '-mes-pms-procsgmt'
      }, {
        title: '공정 Flow 정의',
        id: 'mes-pms-procdef',
        to: 'mes-pms-procdef',
        class: '-mes-pms-procdef'
      }, {
        title: '레시피 정의',
        id: 'mes-pps-recipe',
        to: 'mes-pps-recipe',
        class: '-mes-pps-recipe'
      }, {
        title: 'Recipe Parameter 정의',
        id: 'mes-pps-recipe-para',
        to: 'mes-pps-recipe-para',
        class: '-mes-pps-recipe-para'
      }, {
        title: '설비 정의',
        id: 'mes-rds-eqp-def',
        to: 'mes-rds-eqp-def',
        class: '-mes-rds-eqp-def'
      }, {
        title: '기준정보 / Alarm 정의',
        id: 'mes-cds-alarm',
        to: 'mes-cds-alarm',
        class: '-mes-cds-alarm'
      }, {
        title: '기준정보 / Alarm Action 정의',
        id: 'mes-cds-alarmact',
        to: 'mes-cds-alarmact',
        class: '-mes-cds-alarmact'
      }, {
        title: '기준정보 / 상태 정의',
        id: 'mes-cds-state',
        to: 'mes-cds-state',
        class: '-mes-cds-state'
      }, {
        title: '기준정보 / 상태 전이 정의',
        id: 'mes-cds-statetrans',
        to: 'mes-cds-statetrans',
        class: '-mes-cds-statetrans'
      }, {
        title: '기준정보 / 공장 정의',
        id: 'mes-cds-facility',
        to: 'mes-cds-facility',
        class: '-mes-cds-facility'
      }, {
        title: 'Carrier 정의',
        id: 'mes-rds-carrier',
        to: 'mes-rds-carrier',
        class: '-mes-rds-carrier'
      }, {
        title: '기준정보 / 코드 정의',
        id: 'mes-cds-code',
        to: 'mes-cds-code',
        class: '-mes-cds-code'
      }, {
        title: '기준정보 / 공정 RULE 정의',
        id: 'mes-pms-procsgmtrule',
        to: 'mes-pms-procsgmtrule',
        class: '-mes-pms-procsgmtrule'
      }]
    }, {
      title: 'OIP',
      children: [{
        title: '생산계획 조회 및 확인',
        id: 'mes-pos-prodrder',
        to: 'mes-pos-prodrder',
        class: '-mes-pos-prodrder'
      }, {
        title: '작업계획 조회 및 생성',
        id: 'mes-work-plan',
        to: 'mes-work-plan',
        class: '-mes-work-plan'
      }, {
      //   title: '생산계획',
      //   id: 'mes-production-order',
      //   to: 'mes-production-order',
      //   class: '-mes-production-order'
      // }, {
        title: 'Carrier 정보 조회',
        id: 'mes-pos-carrierinfo',
        to: 'mes-pos-carrierinfo',
        class: '-mes-pos-carrierinfo'
      }, {
        title: 'Carrier 할당 해제',
        id: 'mes-pos-carrierassign',
        to: 'mes-pos-carrierassign',
        class: '-mes-pos-carrierassign'
      }, {
        title: 'Carrier 생성 및 생성 취소',
        id: 'mes-pos-carrierCreate',
        to: 'mes-pos-carrierCreate',
        class: '-mes-pos-carrierCreate'
      }, {
        title: 'Carrier 정보 변경',
        id: 'mes-pos-carrierUpdate',
        to: 'mes-pos-carrierUpdate',
        class: '-mes-pos-carrierUpdate'
      }, {
        title: 'Carrier 폐기 관리',
        id: 'mes-pos-carrierScrapUpdate',
        to: 'mes-pos-carrierScrapUpdate',
        class: '-mes-pos-carrierScrapUpdate'
      }, {
        title: 'Carrier Map 변경',
        id: 'mes-pos-carriermapchange',
        to: 'mes-pos-carriermapchange',
        class: '-mes-pos-carriermapchange'
      }, {
        title: 'Lot Complete',
        id: 'lot-complete',
        to: 'lot-complete',
        class: '-lot-complete'
      }, {
        title: 'Lot 생성',
        id: 'mes-lot-crlt',
        to: 'mes-lot-crlt',
        class: '-mes-lot-crlt'
      }, {
        title: 'Lot 재생성',
        id: 'mes-lot-creation',
        to: 'mes-lot-creation',
        class: '-mes-lot-creation'
      }, {
        title: 'Lot 투입',
        id: 'mes-lot-start',
        to: 'mes-lot-start',
        class: '-mes-lot-start'
      }, {
        title: 'Lot 정보 변경',
        id: 'mes-pos-lotUpdate',
        to: 'mes-pos-lotUpdate',
        class: '-mes-pos-lotUpdate'
      }, {
        title: 'Lot 정보 조회',
        id: 'mes-pos-lotInfo',
        to: 'mes-pos-lotInfo',
        class: '-mes-pos-lotInfo'
      }, {
        title: 'Lot 재공 조회',
        id: 'mes-pos-lotWIPInfo',
        to: 'mes-pos-lotWIPInfo',
        class: '-mes-pos-lotWIPInfo'
      }, {
        title: 'Lot 표준 단어 조회',
        id: 'mes-cds-stndDic',
        to: 'mes-cds-stndDic',
        class: '-mes-cds-stndDic'
      }, {
        title: 'Lot 표준 용어 조회 및 생성',
        id: 'mes-cds-retrieveDic',
        to: 'mes-cds-retrieveDic',
        class: '-mes-cds-retrieveDic'
      }, {
        title: 'Lot 추적',
        id: 'mes-lot-Tracking',
        to: 'mes-lot-Tracking',
        class: '-mes-lot-Tracking'
      }, {
        title: '작업 준비',
        id: 'mes-job-prep',
        to: 'mes-job-prep',
        class: '-mes-job-prep'
      }, {
        title: '재공 조회',
        id: 'viewlotlist',
        to: 'viewlotlist',
        class: '-viewlotlist'
      }, {
        title: 'Lot History',
        id: 'lot-history',
        to: 'lot-history',
        class: '-lot-history'
      }, {
        title: '생산운영 / Lot 작업 이력 조회',
        id: 'mes-pos-lot-history',
        to: 'mes-pos-lot-history',
        class: '-mes-pos-lot-history'
      }, {
        title: '출하 관리 및 생성',
        id: 'mes-ship-lot',
        to: 'mes-ship-lot',
        class: '-mes-ship-lot'
      }, {
        title: 'Lot 공정 변경',
        id: 'mes-Reposition-lot',
        to: 'mes-Reposition-lot',
        class: '-mes-Reposition-lot'
      }, {
        title: 'Lot 분리',
        id: 'mes-Split-lot',
        to: 'mes-Split-lot',
        class: '-mes-Split-lot'
      }, {
        title: 'Lot 머지',
        id: 'mes-Merge-lot',
        to: 'mes-Merge-lot',
        class: '-mes-Merge-lot'
      },
      {
        title: '설비 상태 변경',
        id: 'mes-eqp-change-state',
        to: 'mes-eqp-change-state',
        class: '-mes-eqp-change-state'
      }, {
        title: '설비 정보 조회',
        id: 'mes-eqp-info',
        to: 'mes-eqp-info',
        class: '-mes-eqp-info'
      }, {
        title: '설비 Alarm 등록',
        id: 'mes-eqp-alarm-create',
        to: 'mes-eqp-alarm-create',
        class: '-mes-eqp-alarm-create'
      }, {
        title: '설비 Alarm 해제',
        id: 'mes-eqp-alarm-clear',
        to: 'mes-eqp-alarm-clear',
        class: '-mes-eqp-alarm-clear'
      }, {
        title: 'Port 상태변경',
        id: 'mes-port-changestate',
        to: 'mes-port-changestate',
        class: '-mes-port-changestate'
      }, {
        title: 'Lot Hold',
        id: 'mes-lot-hold',
        to: 'mes-lot-hold',
        class: '-mes-lot-hold'
      }, {
        title: 'Lot Hold Release',
        id: 'mes-lot-hold-release',
        to: 'mes-lot-hold-release',
        class: '-mes-lot-hold-release'
      }, {
        title: 'Lot Scrap',
        id: 'mes-lot-scrap',
        to: 'mes-lot-scrap',
        class: '-mes-lot-scrap'
      }, {
        title: 'Lot Unscrap',
        id: 'mes-lot-unscrap',
        to: 'mes-lot-unscrap',
        class: '-mes-lot-unscrap'
      }, {
        title: 'Rework',
        id: 'mes-rework-lot',
        to: 'mes-rework-lot',
        class: '-mes-rework-lot'
      }, {
        title: 'Q-Time Info',
        id: 'mes-pos-qtime',
        to: 'mes-pos-qtime',
        class: '-mes-pos-qtime'
      }, {
        title: '작업 시작',
        id: 'mes-job-start',
        to: 'mes-job-start',
        class: '-mes-job-start'
      }, {
        title: '작업 시작 취소',
        id: 'mes-job-start-cancel',
        to: 'mes-job-start-cancel',
        class: '-mes-job-start-cancel'
      }]
    }]
  },
  eap: {
    title: 'EAP',
    items: [ {
      title: 'Process Monitor',
      id: 'process-monitor',
      to: 'process-monitor',
      class: '-process-monitor'
    }, {
      title: 'Resource Report',
      id: 'resource-report',
      to: 'resource-report',
      class: '-resource-report'
    }, {
      title: 'Event Master',
      id: 'event-master',
      to: 'event-master',
      class: '-event-master'
    }, {
      title: 'Parameter Master',
      id: 'parameter-master',
      to: 'parameter-master',
      class: '-parameter-master'
    }, {
      title: 'Ec Configuration',
      id: 'ec-configuration',
      to: 'ec-configuration',
      class: '-ec-configuration'
    }, {
      title: 'Event Define',
      id: 'event-define',
      to: 'event-define',
      class: '-event-define'
    }, {
      title: 'Activity',
      id: 'eap-activity',
      to: 'eap-activity',
      class: '-activity'
    }, {
      title: 'Eqp Configuration',
      id: 'eqp-cofiguration',
      to: 'eqp-configuration',
      class: '-eqp-configuration'
    }, {
      title: 'Model Configuration',
      id: 'model-configuration',
      to: 'model-configuration',
      class: '-model-configuration'
    }, {
      title: 'Eap Manager',
      id: 'eap-manager',
      to: 'eap-manager',
      class: '-eap-manager'
    }]
  },
  settings: {
    title: 'Settings',
    items: [{
      title: '사용자',
      id: 'settings-user-list',
      to: 'settings-user-list',
      class: '-settings-user-list'
    }, {
      title: '그룹',
      id: 'settings-role-list',
      to: 'settings-role-list',
      class: '-settings-role-list'
    }, {
      title: '부서',
      id: 'settings-dept-list',
      to: 'settings-dept-list',
      class: '-settings-dept-list'
    }, {
      title: '프로그램',
      id: 'settings-program-list',
      to: 'settings-program-list',
      class: '-settings-program-list'
    }, {
      title: '사이트',
      id: 'settings-site-list',
      to: 'settings-site-list',
      class: '-settings-site-list'
    }]
  }
}

export default {
  name: 'side-nav',
  methods: {
    clickD1 (item) {
      if (
        this.selectedProgram === item.title.toLowerCase() &&
        this.expanded
      ) {
        this.setSideNavState(false)
      } else {
        this.setSideNavState(true)
        this.setSubItem(item)
        this.selectedProgram = item.title.toLowerCase()
      }
    },

    getNavItems () {
      // TODO: navStore의 action 실행
    },
    pathName (depth = 1) {
      return this.$route.path.split('/')[1]
    },
    /* getSubItem (name = 'spc') {
      console.warn('DEPRECATED: login API 붙이면서 이제 안써유. setSubItem 쓰세요')
      if (trees[name]) {
        this.subItem = trees[name]
        this.subItem.items.forEach(item => {
          item.expanded = false
        })
      } else {
        this.$nextTick(function () {
          this.$store.dispatch('setSideNav', false)
        })
      }
      // console.log('@getSubItem', this.subItem)
    }, */
    setSubItem (item = {}) {
      this.subItem = item
    },
    toggleItem (item, parent) {
      parent.forEach(item => {
        if (item.children) item.expanded = false
      })
      item.expanded = true
      this.$forceUpdate()
    },
    setSideNavState (val = undefined) {
      this.expanded = (val === undefined) ? !this.expanded : val
      // console.log('@sideNavSatus', val, '=>', this.expanded)
      // this.$store.dispatch('setSideNav', expanded)
    },
    routerPush (to = '', program = {}, target = '_self') {
      // console.log('@routerPush', to)
      this.setSideNavState(false)
      if (target === '_blank') {
        // let route = this.$router.resolve({ name: to })
        window.open(to, target)
      } else {
        this.$router.push({ path: to, params: { program: program } })
      }
      this.$store.dispatch('resetGlobalSearch')
    },
    bookmarkToggle (e, node) {
      e.stopPropagation()
      node.bookMark = node.bookMark !== true
      if (node.bookMark) {
        this.$store.dispatch('addBookmark', node)
      } else {
        this.$store.dispatch('deleteBookmark', node)
      }
      this.$refs.tree.$forceUpdate()
    },
    makeupNode (node, options) {
      Object.assign(node, options)
      node.title = (
        <span class="side-nav-title">
          <span>{node.title}</span>
          <span
            class="open-in-new"
            onClick={e => {
              console.log(this, this.nodeLink)
              this.nodeLink(e, node, '_blank')
            }}
          >
            <b-icon
              icon="open-in-new"
              size="is-small"
            />
          </span>
        </span>
      )
      node.click = e => {
        this.nodeLink(e, node)
      }
      if (node.children && node.children.length) {
        node.children.forEach(childNode => {
          this.makeupNode(childNode, options)
        })
      }
      return node
    },
    nodeLink (event = {}, node = {}, target = undefined) {
      event.stopPropagation()
      event.preventDefault()
      if (node.children && node.children.length) {
        node.isCollapsed = !node.isCollapsed
      } else {
        if (
          this.selectedProgram === this.subDomain ||
          process.env.NODE_ENV !== 'production'
        ) {
          this.routerPush(node.url, node, target)
        } else {
          let href = process.env.VUE_APP_HTTPS_ENABLE === 'true' ? `https://${this.subDomains[this.selectedProgram.toLowerCase()]}.${this.theDomain}${node.url}` : `http://${this.subDomains[this.selectedProgram.toLowerCase()]}.${this.theDomain}${node.url}`
          console.log('nodeLink href = ', href)
          if (!target) document.location.href = href
          else window.open(href, target)
        }
      }
    }
  },
  watch: {
    programs (newval) {
      console.log('@watch:program', newval)
      newval.forEach(d1 => {
        d1.children.forEach(d2 => {
          d2 = this.makeupNode(d2, {
            class: 'nav-item'
          })
        })
      })
    }
  },
  computed: {
    ...mapState({
      sideNavExpanded: state => state.ui.sideNavExpanded
    }),
    ...mapGetters(['programs', 'user', 'theDomain', 'subDomain', 'subDomains'])
  },
  mounted () {
    // if (process.env.NODE_ENV === 'production') {
    //   let domains = window.location.hostname.split('.')
    //   this.currentSubdomain = domains.splice(0, 1)
    //   this.currentDomain = domains
    // } else {
    //   this.currentSubdomain = MiipConfig.REPOSITORY
    // }
    // console.log('안녕?', this.user)
    // this.getSubItem(this.pathName())

    // LocalStorage의 subdomain간 쉐어링 테스트
    // console.log('@window.location.href:', window.location.href)
    // console.log('@testToken:', window.localStorage.getItem('testToken'))
    // window.localStorage.setItem('testToken', 'skmiip1234')
  },
  data () {
    return {
      // currentDomain: null,
      // currentSubdomain: null,
      selectedProgram: null,
      expanded: false,
      columns: [
        { label: '프로그램', field: 'program' },
        { label: '북마크', field: 'bookmark', width: '40px' }
      ],
      items: [{
        title: 'Notice',
        id: 'notice',
        class: '-notice',
        to: 'notice',
        icon: 'newspaper'
      }, {
        title: 'Demo',
        id: 'demo',
        class: '-demo',
        to: 'demo',
        icon: 'lifebuoy'
      }, {
        title: 'MES',
        id: 'mes',
        class: '-mes',
        to: 'mes-equipment',
        icon: 'monitor-dashboard'
      }, {
        title: 'SPC',
        id: 'spc',
        to: 'my-para',
        class: '-spc',
        icon: 'poll'
        // icon: require(`@/assets/images/ic-spc.svg`)
      }, {
        title: 'EAP',
        id: 'eap',
        to: 'eap',
        class: '-eap',
        icon: 'memory'
        // icon: require(`@/assets/images/ic-eap.svg`)
      }, {
        title: 'Settings',
        id: 'settings',
        to: 'settings',
        class: '-settings',
        icon: 'tune'
        // icon: require(`@/assets/images/ic-eap.svg`)
      }],
      subItem: {}
    }
  }
}
