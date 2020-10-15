import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
import I18n from '@/i18n/'

// MES ==============================================================
import SkslTest from './views/Mes/Modeler/SkslTest/SkslTest'
import Store from './store/'
// import Home from './views/Home.vue'

// COMPONENTS USAGE =================================================
import ComponentsUsage from './views/ComponentsUsage/ComponentsUsage'
import ComponentButtons from './views/ComponentsUsage/Button/Button'
import ComponentCheckbox from './views/ComponentsUsage/Checkbox/Checkbox'
import ComponentField from './views/ComponentsUsage/Field/Field'
import ComponentTable from './views/ComponentsUsage/Table/Table'
import ComponentWijmoChart from './views/ComponentsUsage/WijmoChart/Wijmo'
import ComponentWijmoGrid from './views/ComponentsUsage/WijmoGrid/Wijmo'
import ComponentSkGridColumnsUpdate from './views/ComponentsUsage/WijmoGrid/gridColumnsUpdate'
import ComponentSkGridSelectionChange from './views/ComponentsUsage/WijmoGrid/gridSelectionChange'
import ComponentSkGridProperties from './views/ComponentsUsage/WijmoGrid/gridProperties'
import ComponentSkGridPaging from './views/ComponentsUsage/WijmoGrid/gridPagingType'
import ComponentSkGridColumnProps from './views/ComponentsUsage/WijmoGrid/gridColumnProps'
import ComponentSkGridMethods from './views/ComponentsUsage/WijmoGrid/gridMethods'
import ComponentSkGridDragProcessing from './views/ComponentsUsage/WijmoGrid/gridDragProcessing'
import HttpsGuide from './views/ComponentsUsage/HttpsGuide/HttpsGuide'
import ComponentSkGridDesc from './views/ComponentsUsage/WijmoGrid/gridDesc'
// IAM API USAGE =====================================================
import API from './components/Apis'
import Axios from 'axios'

// MES - Base Form ===================================================
import BaseForm01 from './views/Mes/BaseForm/BaseForm01/BaseForm01'
import BaseForm02 from './views/Mes/BaseForm/BaseForm02/BaseForm02'
import BaseForm03 from './views/Mes/BaseForm/BaseForm03/BaseForm03'
import BaseForm04 from './views/Mes/BaseForm/BaseForm04/BaseForm04'
import BaseForm05 from './views/Mes/BaseForm/BaseForm05/BaseForm05'
import BaseForm06 from './views/Mes/BaseForm/BaseForm06/BaseForm06'
import BaseForm07 from './views/Mes/BaseForm/BaseForm07/BaseForm07'
import BaseForm08 from './views/Mes/BaseForm/BaseForm08/BaseForm08'
import BaseForm09 from './views/Mes/BaseForm/BaseForm09/BaseForm09'
import BaseForm10 from './views/Mes/BaseForm/BaseForm10/BaseForm10'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/auth',
    name: 'auth',
    component: () =>
                import(
                  /* webpackChunkName: 'auth' */
                  './Auth'
                )
  },
  {
    path: '/',
    name: 'home',
    component: () =>
                import(
                  /* webpackChunkName: 'auth' */
                  './Home'
                ),
    children: [{
      path: '/',
      name: 'main-dashboard',
      redirect: '/menu'
      // redirect: '/demo'
      // component: () => import(
      //   /* WebpackChunkName: 'main-dashbobard' */ './views/Core/MainDashboard/MainDashboard'
      // )
    },
    {
      path: '/menu',
      component: () => import('@/views/Menu.vue')
    },
    {
      path: '/ECToolRegistration',
      component: () => import('@/views/ECToolRegistration/ECToolRegistration.vue')
    },
    {
      path: '/ECID',
      component: () => import('@/views/ECID/ECID.vue')
    },
    {
      path: '/ECEditor',
      component: () => import('@/views/ECEditor/ECEditor.vue')
    },
    {
      path: '/demo',
      name: 'demo',
      meta: {
        breadcrumbs: ['컴포넌트 사용법']
      },
      component: ComponentsUsage,
      children: [{
        path: 'https-guide',
        name: 'https-guide',
        component: HttpsGuide
      },
      {
        path: 'button',
        name: 'component-buttons',
        component: ComponentButtons
      },
      {
        path: 'checkbox',
        name: 'component-checkbox',
        component: ComponentCheckbox
      },
      {
        path: 'field',
        name: 'component-field',
        component: ComponentField
      },
      {
        path: 'table',
        name: 'component-table',
        component: ComponentTable
      },
      {
        path: 'wijmo',
        name: 'component-wijmo',
        component: ComponentWijmoChart
      },
      {
        path: 'perf/spc-visualize',
        name: 'performance-spc-visualize',
        component: () =>
                                import(
                                  /* webpackChunkName: 'performance-test' */
                                  './views/ComponentsUsage/PerformanceTest/EventVis'
                                )
      },
      {
        path: 'perf/sk-grid',
        name: 'performance-sk-grid',
        component: () =>
                                import(
                                  /* webpackChunkName: 'performance-test' */
                                  './views/ComponentsUsage/PerformanceTest/PerfTestGrid'
                                )
      },
      {
        path: 'perf/sk-chart',
        name: 'performance-sk-chart',
        component: () =>
                                import(
                                  /* webpackChunkName: 'performance-test' */
                                  './views/ComponentsUsage/PerformanceTest/PerfTestChart'
                                )
      },
      {
        path: 'sk-chart',
        name: 'component-sk-chart',
        component: () =>
                                import(
                                  /* webpackChunkName: 'usage-sk-chart' */
                                  './views/ComponentsUsage/SkChart/SkChartUsage'
                                )
      },
      {
        path: 'sk-grid',
        name: 'component-skgrid',
        component: ComponentWijmoGrid
      },
      {
        path: '/demo/sk-grid/columnsUpdate',
        name: 'skgrid-columnsupdate',
        component: ComponentSkGridColumnsUpdate
      },
      {
        path: '/demo/sk-grid/selection',
        name: 'skgrid-selection',
        component: ComponentSkGridSelectionChange
      },
      {
        path: '/demo/sk-grid/properties',
        name: 'skgrid-properties',
        component: ComponentSkGridProperties
      },
      {
        path: '/demo/sk-grid/paging',
        name: 'skgrid-paging',
        component: ComponentSkGridPaging
      },
      {
        path: '/demo/sk-grid/drag/processing',
        name: 'skgrid-dragProcessing',
        component: ComponentSkGridDragProcessing
      },
      {
        path: '/demo/sk-grid/columnProperties',
        name: 'skgrid-columnProperties',
        component: ComponentSkGridColumnProps
      },
      {
        path: '/demo/sk-grid/methods',
        name: 'skgrid-methods',
        component: ComponentSkGridMethods
      },
      {
        path: '/demo/sk-grid/gridDesc',
        name: 'skgrid-gridDesc',
        component: ComponentSkGridDesc
      }
      ]
    },
    {
      path: '/mes/sksl-test',
      name: 'mes-sksl-test',
      meta: {
        breadcrumbs: [I18n.t('mes.MENU.SYSTEM.MES'), I18n.t('mes.MENU.MODELER.SKSLTEST')]
      },
      component: SkslTest,
      props: true
    },
    {
      path: '/mes/baseform01',
      name: 'mes-base-form',
      meta: {
        breadcrumbs: [I18n.t('mes.MENU.SYSTEM.MES'), I18n.t('mes.MENU.BASEFORM.BASEFORM')]
      },
      component: BaseForm01
    },
    {
      path: '/mes/baseform02',
      name: 'mes-base-form',
      meta: {
        breadcrumbs: [I18n.t('mes.MENU.SYSTEM.MES'), I18n.t('mes.MENU.BASEFORM.BASEFORM')]
      },
      component: BaseForm02
    },
    {
      path: '/mes/baseform03',
      name: 'mes-base-form',
      meta: {
        breadcrumbs: [I18n.t('mes.MENU.SYSTEM.MES'), I18n.t('mes.MENU.BASEFORM.BASEFORM')]
      },
      component: BaseForm03
    },
    {
      path: '/mes/baseform04',
      name: 'mes-base-form',
      meta: {
        breadcrumbs: [I18n.t('mes.MENU.SYSTEM.MES'), I18n.t('mes.MENU.BASEFORM.BASEFORM')]
      },
      component: BaseForm04
    },
    {
      path: '/mes/baseform05',
      name: 'mes-base-form',
      meta: {
        breadcrumbs: [I18n.t('mes.MENU.SYSTEM.MES'), I18n.t('mes.MENU.BASEFORM.BASEFORM')]
      },
      component: BaseForm05
    },
    {
      path: '/mes/baseform06',
      name: 'mes-base-form',
      meta: {
        breadcrumbs: [I18n.t('mes.MENU.SYSTEM.MES'), I18n.t('mes.MENU.BASEFORM.BASEFORM')]
      },
      component: BaseForm06
    },
    {
      path: '/mes/baseform07',
      name: 'mes-base-form',
      meta: {
        breadcrumbs: [I18n.t('mes.MENU.SYSTEM.MES'), I18n.t('mes.MENU.BASEFORM.BASEFORM')]
      },
      component: BaseForm07
    },
    {
      path: '/mes/baseform08',
      name: 'mes-base-form',
      meta: {
        breadcrumbs: [I18n.t('mes.MENU.SYSTEM.MES'), I18n.t('mes.MENU.BASEFORM.BASEFORM')]
      },
      component: BaseForm08
    },
    {
      path: '/mes/baseform09',
      name: 'mes-base-form',
      meta: {
        breadcrumbs: [I18n.t('mes.MENU.SYSTEM.MES'), I18n.t('mes.MENU.BASEFORM.BASEFORM')]
      },
      component: BaseForm09
    },
    {
      path: '/mes/baseform10',
      name: 'mes-base-form',
      meta: {
        breadcrumbs: [I18n.t('mes.MENU.SYSTEM.MES'), I18n.t('mes.MENU.BASEFORM.BASEFORM')]
      },
      component: BaseForm10
    }
    ]
  }
  ]
})

/**
 * 현재 편집중인 아이템이 있는지 체크합니다.
 */
let checkContentsOnEditing = () => {
  // console.log('itemsOnEditing:', Store.getters)
  if (Store.getters.itemsOnEditing()) {
    if (confirm('아직 편집중인 아이템이 있습니다. 페이지를 떠나시겠습니까?')) {
      Store.dispatch('setItemsOnEditing')
      return true
    }
    return false
  }
  Store.dispatch('setItemsOnEditing')
  return true
}

/**
 * 접근 가능한 프로그램중 현재 이동하려튼 경로의 readable 권한이 있으는지 리턴합니다.
 * @param {Object} to Vue Router의 Route 객체.
 * @return Boolean
 */
let checkLevels = to => {
  if (Store.getters.programs.length) {
    let toProgram = Store.getters.program({ url: to.path })
    if (toProgram.readable === undefined) return true
    if (!toProgram.readable) alert('접근 권한이 없습니다.')
    return toProgram.readable
  } else {
    return true
  }
}

router.beforeEach((to, from, next) => {
  // console.log(from, to)
  let payload = {
    toPath: to.path,
    fromPath: from.path
  }
  let accessToken = VueCookies.get('miipAccessToken')

  // Page Title 설정.
  // document.title = to.meta.title || 'SK MIIP'
  document.title = to.meta.breadcrumbs || 'SK MIIP'

  if (accessToken !== null) {
    Axios.defaults.headers.common['AT'] = accessToken
    API.settings.addProgramStats(payload)
  }

  if (!checkContentsOnEditing()) return false
  if (!checkLevels(to)) return false

  next()
})

export default router
