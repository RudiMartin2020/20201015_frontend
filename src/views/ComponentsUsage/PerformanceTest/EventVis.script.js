import Dayjs from 'dayjs'
import axios from 'axios'
import store from '@/store/'
// import API from '@/views/Spc/Apis/'
import * as wjcChart from '@grapecity/wijmo.chart'
import * as wjcGridXlsx from '@grapecity/wijmo.grid.xlsx'
import * as wjcGrid from '@grapecity/wijmo.grid'
// import SockJS from 'sockjs-client'
// import Stomp from 'webstomp-client'
import * as wjCore from '@grapecity/wijmo'
import _ from 'underscore'
import PieTimer from '@/components/PieTimer/PieTimer'
import domtoimage from 'dom-to-image'

const env = (process.env.NODE_ENV === 'production')

const config = () => {
  const port = store.getters.theApis.spc.sitePort
  return {
    url: env ? ((process.env.VUE_APP_HTTPS_ENABLE === 'true' ? 'https://' : 'http://') + store.getters.theApis.spc.siteIp) : 'http://61.250.84.93',
    // url: 'http://192.168.1.114',
    // url: 'http://10.250.172.47',
    portMyPara: env ? port : '8899',
    // portMyPara: '8899',
    portEventHub: env ? port : '8899',
    // portEventHub: '8899',
    portRule: env ? port : '8899',
    // portRule: '8899',
    portParam: env ? port : '8899',
    // portParam: '8899',
    portDashboard: env ? port : '8899',
    // portDashboard: '8899',
    portRecal: env ? port : '12005',
    portOOC: env ? port : '12006',
    portSpcReport: env ? port : '12007',
    portSpec: env ? port : '12002',
    // portOOC: '8899',
    paramDataSocket: 'http://10.250.172.47:12003/spc-spec',
    ruleDataSocket: 'http://10.250.172.47:12003/spc-rule',
    oocDataSocket: 'http://10.250.172.47:12003/spc-ooc',
    eventDataSocket: 'http://10.250.172.47:12003/spc-eventsearch'
  }
}

const API = {
  spc: {
    eventHub: {
      listDColSearchData: async (params) => {
        try {
          let response = await axios.get(
            config().url + ':' + config().portEventHub + '/performance',
            { params: params }
          )
          return response
        } catch (error) {
          console.error(error)
        }
      },
      listDColVisualAggData: async (params) => {
        try {
          let response = await axios.post(config().url + ':' + config().portEventHub + '/eventsearch/listDColVisualAggData', params.payload)
          return response
        } catch (error) {
          console.error(error)
        }
      },
      saveSearchCondition: async (params) => {
        try {
          let response = await axios.post(config().url + ':' + config().portEventHub + '/eventsearch/saveSearchCondition', params.payload)
          return response
        } catch (error) {
          console.error(error)
        }
      },
      listSearchCondition: async (params) => {
        try {
          let response = await axios.post(config().url + ':' + config().portEventHub + '/eventsearch/listSearchCondition?' + params.urlParams, params.payload)
          return response
        } catch (error) {
          console.error(error)
        }
      },
      deleteSearchCondition: async (params) => {
        try {
          let response = await axios.post(config().url + ':' + config().portEventHub + '/eventsearch/deleteSearchCondition', params.payload)
          return response
        } catch (error) {
          console.error(error)
        }
      },
      saveVisualCondition: async (params) => {
        try {
          let response = await axios.post(config().url + ':' + config().portEventHub + '/eventsearch/saveVisualCondition', params.payload)
          return response
        } catch (error) {
          console.error(error)
        }
      },
      listVisualCondition: async (params) => {
        try {
          let queryString = ''
          for (let i in params.query) {
            queryString += '&' + i + '=' + params.query[i]
          }
          let response = await axios.post(config().url + ':' + config().portEventHub + '/eventsearch/listVisualCondition?' + queryString, params.payload)
          return response
        } catch (error) {
          console.error(error)
        }
      },
      deleteVisualCondition: async (params) => {
        try {
          let response = await axios.post(config().url + ':' + config().portEventHub + '/eventsearch/deleteVisualCondition', params.payload)
          return response
        } catch (error) {
          console.error(error)
        }
      },
      saveDashboardCondition: async (params) => {
        try {
          let response = await axios.post(config().url + ':' + config().portEventHub + '/eventsearch/saveDashboardCondition', params.payload)
          return response
        } catch (error) {
          console.error(error)
        }
      },
      listDashboardCondition: async (params) => {
        try {
          let queryString = ''
          for (let i in params.query) {
            queryString += '&' + i + '=' + params.query[i]
          }
          let response = await axios.post(config().url + ':' + config().portEventHub + '/eventsearch/listDashboardCondition?' + queryString, params.payload)
          return response
        } catch (error) {
          console.error(error)
        }
      },
      deleteDashboardCondition: async (params) => {
        try {
          let response = await axios.post(config().url + ':' + config().portEventHub + '/eventsearch/deleteDashboardCondition', params.payload)
          return response
        } catch (error) {
          console.error(error)
        }
      },
      listIndexName: async (params) => {
        try {
          let response = await axios.post(config().url + ':' + config().portEventHub + '/eventsearch/listIndexName', params.payload)
          return response
        } catch (error) {
          console.error(error)
        }
      },
      listIndexFieldName: async (params) => {
        try {
          let response = await axios.post(config().url + ':' + config().portEventHub + '/eventsearch/listIndexFieldName', params.payload)
          return response
        } catch (error) {
          console.error(error)
        }
      },
      uploadImage: async (params) => {
        try {
          let response = await axios.post(config().url + ':' + config().portEventHub + '/httpfile/uploadFile', params, { headers: { 'Content-Type': 'multipart/form-data' } })
          return response.data
        } catch (error) {
          console.error(error)
          return error.data
        }
      }
    }
  }
}

export default {
  name: 'EventHub',
  components: {
    'pie-timer': PieTimer
  },
  watch: {
    selectedRefreshInterval: function () {
      if (this.selectedRefreshInterval.value !== 0) {
        this.selectedPeriod = 'MONTH'
        this.setIntervalAction()
      } else if (this.selectedRefreshInterval.value === 0) {
        clearInterval(this.intervalAction)
        this.intervalAction = undefined
        // this.stompClient.disconnect()
        // this.stompClient = undefined
        // this.socket = undefined
        this.$store.dispatch('unsubscribe', { url: '/spc/eventsearch/visual' })
      }
    },
    selectedPeriod: function () {
      if (this.selectedPeriod === 'CUSTOM') {
        this.selectedRefreshInterval = this.refreshIntervals[0]
      }
    },
    seriesButtonList: function (value) {
      if (value.indexOf('Others') > -1) {
        value = _.union(value, this.seriesListOrigin.slice(this.seriesLimitCount, this.seriesListOrigin.length))
      }
      if (this.chartType !== 'Pie' && this.chartType !== 'Donut') {
        this.flexChart.collectionView.filter = item => {
          if (this.seriesButtonList && this.seriesButtonList.length > 0) {
            return value.includes(item[this.seriesSeparator])
          }
        }
      } else {
        this.flexPie.collectionView.filter = item => {
          if (this.seriesButtonList && this.seriesButtonList.length > 0) {
            return value.includes(item[this.seriesSeparator])
          }
        }
      }
    },
    endDate: function () {
      if (this.startDate && this.endDate) {
        let sDayjs = Dayjs(this.startDate)
        let eDayjs = Dayjs(this.endDate)
        if (eDayjs.diff(sDayjs) < 0) {
          this.$dialog.alert(this.$t('spc.SPC_EVENT_VISUAL.LABEL_019'))
          // this.endDate = Dayjs(this.startDate).add(1, 'month').toDate()
        } else if (eDayjs.diff(sDayjs, 'month', true) > 1.0) {
          this.$dialog.alert(this.$t('spc.SPC_EVENT_VISUAL.LABEL_021'))
          // this.endDate = Dayjs(this.startDate).add(1, 'month').toDate()
        }
      }
    },
    startDate: function () {
      if (this.startDate && this.endDate) {
        let sDayjs = Dayjs(this.startDate)
        let eDayjs = Dayjs(this.endDate)
        if (eDayjs.diff(sDayjs) < 0) {
          this.$dialog.alert(this.$t('spc.SPC_EVENT_VISUAL.LABEL_020'))
          // this.startDate = Dayjs(this.endDate).subtract(1, 'month').toDate()
        } else if (eDayjs.diff(sDayjs, 'month', true) > 1) {
          this.$dialog.alert(this.$t('spc.SPC_EVENT_VISUAL.LABEL_021'))
          // this.startDate = Dayjs(this.endDate).subtract(1, 'month').toDate()
        }
      }
    }

  },
  mounted () {
    let self = this
    this.listIndexName().then(function (res) {
      if (self.$route.params && self.$route.params.item) {
        let condition = self.$route.params.item
        if (condition.startDttm && condition.startDttm) {
          self.startDate = new Date(Dayjs(condition.startDttm).format('YYYY-MM-DD 00:00:00'))
          self.endDate = new Date(Dayjs(condition.endDttm).format('YYYY-MM-DD 00:00:00'))
          self.selectedPeriod = 'CUSTOM'
        }

        let splitedFileName = condition.fileInfo.originalFileName.split('_')
        localStorage.setItem('visualizationChartType', splitedFileName[splitedFileName.length - 1])
        self.initChartType()
        self.openClickedCondition(self.$route.params.item)
      } else {
        self.initChartType()
      }
    })
  },
  destroyed () {
    this.$store.dispatch('unsubscribe', { url: '/spc/eventsearch/visual' })
    if (this.intervalAction) {
      clearInterval(this.intervalAction)
    }
  },
  methods: {
    perf (marks = [], title = '') {
      console.group(title)
      marks.reduce((acc, cur) => {
        let measured = performance.measure(
          cur, acc, cur
        )
        console.log('@', cur, measured.duration + 'ms')
        return cur
      })
      console.groupEnd()
      performance.clearMarks()
      performance.clearMeasures()
    },
    initChartType () {
      let chartType = 'Scatter'
      if (chartType === 'Pie' || chartType === 'Donut') {
        document.getElementsByClassName('sk-chart')[0].style = 'display:none;'
      } else {
        document.getElementsByClassName('wj-flexpie')[0].style = 'display:none;'
      }
      this.chartType = chartType
    },
    /**
     * Grid Initialized시 실행됩니다.
     *
     * @param {WjFlexGrid} grid
     */
    initGrid (flexGrid) {
      this.flexGrid = flexGrid
    },

    initChart (flexChart) {
      this.flexChart = flexChart
    },

    initPie (flexPie) {
      this.flexPie = flexPie
    },

    /**
     * SPC_EVENTSEARCH_15 Event Index Name 조회
     *
     * @returns {Array} EventIndexName Array
     */
    async listIndexName () {
      let response = await API.spc.eventHub.listIndexName({
        payload: []
      })
      if (response.data) {
        this.eventIndexNames = response.data
        return response.data
      }
    },

    /**
     * SPC_EVENTSEARCH_16 선택된 이벤트명에 대한 정보를 가져옴
     *
     * @param {*} [eventIndexName=this.selectedEventIndexName]
     */
    async listIndexFieldName () {
      let response = await API.spc.eventHub.listIndexFieldName({
        payload: {
          indexKey: this.selectedEventIndexName.indexKey
        }
      })
      if (response.data) {
        this.addedEvents = []
        this.fieldNames = response.data
        this.seriesFields = [ { fieldKey: 'NONE', fieldName: 'NONE', fieldType: 'NONE' } ]
        this.yaxisFields = []
        this.xaxisFields = []
        for (let i in response.data) {
          this.seriesFields.push(response.data[i])
          this.xaxisFields.push(response.data[i])
          if (response.data[i].fieldType === 'NUMBER') {
            this.yaxisFields.push(response.data[i])
          }
        }
      }
    },

    async listDColSearchData (param) {
      performance.mark('request')
      let normalData = await API.spc.eventHub.listDColSearchData(param)
      if (normalData.data) {
        let result = [...normalData.data]
        performance.mark('received')

        // item에 _idx붙여서 초기 인덱스 보관
        result.forEach((item, i) => {
          item._idx = i
        })

        this.perf(['request', 'received'], 'API Request')

        this._gridChart(result)
      }
    },

    async listDColVisualAggData (param) {
      let aggData = await API.spc.eventHub.listDColVisualAggData(param)

      this._gridChart(aggData.data)
    },

    /**
     * 설정한 이벤트 조건을 선택된 이벤트 목록으로 추가합니다.
     *
     * @param {*} [field=this.selectedFieldName]
     */
    addEvent (field = this.selectedFieldName) {
      this.addedEvents.push(field)
      this.fieldNames.forEach(function (originField) {
        if (originField.fieldKey === field.field.fieldKey) {
          originField.disabled = true
        }
      })
      this.resetSelectedFieldName()
    },

    /**
     * Filter의 Add 버튼이 클릭 가능한지 Validating
     *
     * @param {Object} [field=this.selectedFieldName]
     * @returns {Boolean} true면 disable 처리
     */
    isEventAddable (field = this.selectedFieldName) {
      if (!field.field) return true
      if (!field.type) return true
      if (!field.string) return true
      return false
    },

    dataURItoBlob (dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      let byteString
      if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1])
      } else byteString = unescape(dataURI.split(',')[1])

      // separate out the mime component
      const mimeString = dataURI
        .split(',')[0]
        .split(':')[1]
        .split(';')[0]

      // write the bytes of the string to a typed array
      const ia = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ia], { type: mimeString })
    },

    async saveVisualCondition () {
      this.isLoading = true
      let self = this

      // 이미지 저장 전 차트 텍스트 색상 라인, 색상 변경
      for (let i = 0; i < document.getElementsByClassName('wj-label').length; i++) {
        document.getElementsByClassName('wj-label')[i].style = 'fill: #666;'
      }
      for (let i = 0; i < document.getElementsByClassName('wj-gridline').length; i++) {
        document.getElementsByClassName('wj-gridline')[i].style = 'stroke: #666;'
      }

      var chartElName = 'sk-chart'
      // var chartElName = 'chart-main'
      if (this.chartType === 'Donut' || this.chartType === 'Pie') {
        chartElName = 'wj-flexpie'
      }

      let ele = document.querySelector('.' + chartElName)
      ele.style = 'background: white; border: 1px solid black;'
      domtoimage.toJpeg(ele, { quality: 1, width: ele.scrollWidth, height: ele.scrollHeight }).then(function (dataUrl) {
        var img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = dataUrl
        img.onload = function () {
          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')
          // let scaleWidth = 1300
          // let scaleHeight = 600
          let scaleWidth = ele.scrollWidth
          let scaleHeight = ele.scrollHeight
          canvas.width = scaleWidth
          canvas.height = scaleHeight
          ctx.drawImage(img, 0, 0, scaleWidth, scaleHeight)

          let newDataUrl = canvas.toDataURL('image/jpeg', 1)
          let form = new FormData()
          form.append('file', self.dataURItoBlob(newDataUrl), self.condition.title + '_' + Dayjs().format('YYYYMMDDHHmmss') + '_' + self.chartType.replace(' ', ''))

          API.spc.eventHub.uploadImage(form).then(function (response) {
            for (let i = 0; i < document.getElementsByClassName('wj-label').length; i++) {
              document.getElementsByClassName('wj-label')[i].style = 'fill: #fff;'
            }
            for (let i = 0; i < document.getElementsByClassName('wj-gridline').length; i++) {
              document.getElementsByClassName('wj-gridline')[i].style = 'stroke: rgba(139, 176, 238, 0.1);'
            }

            let ele = document.querySelector('.' + chartElName)
            ele.style = 'background: #1c2340;'

            let fileInfo = response
            let startDate = self.selectedPeriod === 'MONTH' ? Dayjs().subtract(1, 'month').toDate() : self.startDate
            let endDate = self.selectedPeriod === 'MONTH' ? new Date() : self.endDate
            let payload = {
              indexKey: self.selectedEventIndexName.indexKey,
              indexName: self.selectedEventIndexName.indexName,
              conditionName: self.condition.title,
              conditionType: self.condition.isPublic ? 'PUBLIC' : 'PRIVATE',
              userId: self.$store.getters.user.userId,
              paramName: '',
              paramVal: '',
              startDttm: Dayjs(startDate).format('YYYYMMDDHHmmss'),
              endDttm: Dayjs(endDate).format('YYYYMMDDHHmmss'),
              fileInfo: fileInfo,
              seriesName: self.seriesField ? self.seriesField.fieldKey : null
            }

            self.addedEvents.forEach(event => {
              payload[event.field.fieldKey] = event.string
            })

            if (self.yaxis.aggregation) {
              payload.aggDefName = self.yaxis.aggregation.key
            }

            if (self.yaxis.field) {
              payload.yaxisName = self.yaxis.field.fieldKey
            }

            if (self.xaxis.field) {
              payload.xaxisName = self.xaxis.field.fieldKey
            }

            API.spc.eventHub.saveVisualCondition({
              payload: payload
            }).then(function (response) {
              self.isSaveModalActive = false
              if (response.data) self.$dialog.alert(self.$t('spc.common.saveCompleted'))
              self.isLoading = false
            })
          })
        }
      })
    },

    /**
     * 검색조건 조회 팝업에서 목록을 불러오기 위해 사용합니다.
     *
     * @param {Object} condition 검색조건의 검색을 위한 컨디션 오브젝트
     *
     */
    async listVisualCondition (condition = this.openCondition, currPageNum) {
      this.paging.currPageNumber = _.isUndefined(currPageNum) ? 1 : currPageNum
      let params = {
        payload: {
          conditionType: condition.isPublic ? 'PUBLIC' : 'PRIVATE',
          userId: this.$store.getters.user.userId
        },
        query: {
          page: this.paging.currPageNumber - 1,
          size: this.paging.pageCount
        }
      }
      if (condition.title !== '') {
        params.payload.conditionName = condition.title
      }
      let response = await API.spc.eventHub.listVisualCondition(params)
      if (response.data) {
        if (!response.data._embedded || response.data._embedded.eventVisualConditionResults === null) {
          response.data._embedded = {}
          response.data._embedded.eventVisualConditionResults = []
          this.$dialog.alert(this.$t('spc.SPC_EVENT_VISUAL.LABEL_018'))
        }
        for (let i in response.data._embedded.eventVisualConditionResults) {
          response.data._embedded.eventVisualConditionResults[i].saveDttm = Dayjs(response.data._embedded.eventVisualConditionResults[i].saveDttm).format('YYYY-MM-DD HH:mm:ss')
        }
        this.paging.maxPageNumber = response.data.page.totalElements
        this.conditions = response.data._embedded.eventVisualConditionResults
      }
    },

    async deleteVisualCondition () {
      let self = this

      this.$dialog.confirm({
        message: this.$t('spc.common.confirmToDelete', { cnt: this.checkedDeleteConditions.length }),
        cancelText: this.$t('spc.common.cancel'),
        confirmText: this.$t('spc.common.ok'),
        onConfirm: function () {
          let arr = []
          self.checkedDeleteConditions.forEach(function (checkedCondition) {
            arr.push({ conditionId: checkedCondition.conditionId })
          })
          API.spc.eventHub.deleteVisualCondition({
            payload: arr
          }).then(function (response) {
            if (response.data) {
              self.$dialog.alert(self.$t('spc.common.deleteCompleted'))
              self.listVisualCondition()
            }
          })
        }
      })
    },

    search () {
      let startDate = this.selectedPeriod === 'MONTH' ? Dayjs().subtract(1, 'month').toDate() : this.startDate
      let endDate = this.selectedPeriod === 'MONTH' ? new Date() : this.endDate

      // 주어진 컨디션이 없을 때를 위한 payload 생성
      let payload = {
        paramName: '', // ==> ?????
        paramVal: '', // ==> ?????
        startDttm: Dayjs(startDate).format('YYYYMMDD000000'),
        endDttm: Dayjs(endDate).format('YYYYMMDD235959')
      }

      this.addedEvents.forEach(event => {
        payload[event.field.fieldKey] = event.string
      })

      if (this.yaxis.aggregation && this.yaxis.aggregation.key !== 'NONE') {
        if (!this.yaxis.field || !this.xaxis.field || this.yaxis.field.fieldKey === 'NONE' || this.xaxis.field.fieldKey === 'NONE') {
          this.$dialog.alert('Y Axis Field, X Axis Field 선택이 필요합니다.')
          return
        }
        this.setColumnHeaders(this.aggregationHeaders)

        payload.aggDefName = this.yaxis.aggregation.name
        payload.yaxisName = this.yaxis.field.fieldKey
        payload.xaxisName = this.xaxis.field.fieldKey

        if (this.seriesField && this.seriesField.fieldKey !== 'NONE') {
          payload.seriesName = this.seriesField.fieldKey
        }

        this.listDColVisualAggData({
          payload: payload
        })
      } else {
        this.setColumnHeaders(this.nonAggregationHeaders)
        this.listDColSearchData({
          limit: this.perfTestItemCount
        })
      }
    },

    gridSelectionChanged: function (grid, ht) {
      let chart = this.chartType === 'Pie' || this.chartType === 'Donut' ? this.flexPie : this.flexChart
      let selectedItem = grid.rows[ht.range.row].dataItem
      selectedItem.isSelected = true
      let index = grid.rows[ht.range.row].dataItem._idx

      if (this.chartType === 'Pie' || this.chartType === 'Donut') {
        this.flexPie.collectionView.currentPosition = index
        this.flexPie._highlightCurrent()
      } else {
        const pStart = performance.now()
        for (let i in grid.rows) {
          if (grid.rows[i] && grid.rows[i].isSelected) {
            grid.rows[i].isSelected = false
            break
          }
        }
        const pRemoveSelected = performance.now()
        wjCore.removeClass(document.querySelector('.wj-state-selected'), 'wj-state-selected')
        const pClassRemoved = performance.now()
        let chartPoint = chart.series[0].getPlotElement(index)
        const pGetPlotElement = performance.now()
        wjCore.addClass(chartPoint, 'wj-state-selected')
        const pAddClass = performance.now()

        console.group('grid selection changed')
        console.log('pRemoveSelected:', pRemoveSelected - pStart)
        console.log('pClassRemoved:', pClassRemoved - pRemoveSelected)
        console.log('pGetPlotElement:', pGetPlotElement - pClassRemoved)
        console.log('pAddClass:', pAddClass - pGetPlotElement)
        console.groupEnd()
      }
      /* for (let i in flexGrid.rows) {
        if (flexGrid.rows[i] && flexGrid.rows[i].dataItem && Number(i) === a.row) {
          flexGrid.rows[i].isSelected = true
          if (_.has(flexGrid.rows[i].dataItem, '_status')) {
            delete flexGrid.rows[i].dataItem._status
          }
          if (this.chartType === 'Pie' || this.chartType === 'Donut') {
            for (let j = 0; j < this.flexPie.collectionView.items.length; j++) {
              if (_.isMatch(this.flexPie.collectionView.items[j], flexGrid.rows[i].dataItem)) {
                this.flexPie.collectionView.currentPosition = j
                this.flexPie._highlightCurrent()
              }
            }
          } else {
            for (let j = 0; j < chart.series.length; j++) {
              for (let k = 0; k < chart.series[j]._getLength(); k++) {
                if (chart.series[j] && _.isMatch(chart.series[j]._getItem(k), flexGrid.rows[i].dataItem)) {
                  if (chart.series[j].getPlotElement(k)) {
                    for (let l in chart.series[j].getPlotElement(k).children) {
                      wjCore.addClass(chart.series[j].getPlotElement(k).children[l], 'wj-state-selected')
                    }
                  }
                } else if (chart.series[j] && !_.isMatch(chart.series[j]._getItem(k), flexGrid.rows[i].dataItem)) {
                  if (chart.series[j].getPlotElement(k)) {
                    for (let l in chart.series[j].getPlotElement(k).children) {
                      wjCore.removeClass(chart.series[j].getPlotElement(k).children[l], 'wj-state-selected')
                    }
                  }
                }
              }
            }
          }
        } else {
          if (this.flexGrid.rows[i] && this.flexGrid.rows[i].isSelected) {
            flexGrid.rows[i].isSelected = false
          }
        }
      } */
    },

    chartSelectionChanged: function (flexChart, args, a, b) {
      // let chartSelectedItem = flexChart.collectionView.currentItem
      console.log('@chartSelectionChanged!!!!')
      performance.mark('start')
      for (let i = 0; i < this.flexGrid.rows.length; i++) {
        if (this.flexGrid.rows[i].isSelected) {
          this.flexGrid.rows[i].isSelected = false
          break
        }
      }
      performance.mark('setIsSelect')

      let position = flexChart.collectionView.currentPosition
      let index = 0
      for (let i = 0; i < this.flexGrid.rows.length; i++) {
        if (this.flexGrid.rows[i].dataItem._idx === position) {
          index = i
          break
        }
      }
      performance.mark('getIndexOfGridRow')
      this.flexGrid.rows[index].isSelected = true
      performance.mark('isSelectedTrue')
      this.scrollToRow(index)
      performance.mark('scrollToRow')

      let marks = [
        'start',
        'setIsSelect',
        'getIndexOfGridRow',
        'isSelectedTrue',
        'scrollToRow'
      ]

      console.group('chartSelectionChanged')
      marks.reduce((acc, cur) => {
        let measured = performance.measure(
          cur, acc, cur
        )
        console.log('@measured:', cur, measured.duration)
        return cur
      })
      console.groupEnd()

      performance.clearMarks()
      performance.clearMeasures()
      /* for (let i in this.flexGrid.rows) {
        if (this.flexGrid.rows[i] && _.has(this.flexGrid.rows[i].dataItem, '_status')) {
          delete this.flexGrid.rows[i].dataItem._status
        }
        if (this.flexGrid.rows[i] && this.flexGrid.rows[i].dataItem && _.isMatch(chartSelectedItem, this.flexGrid.rows[i].dataItem)) {
          this.flexGrid.rows[i].isSelected = true
          this.scrollToRow(Number(i))
        } else {
          if (this.flexGrid.rows[i] && this.flexGrid.rows[i].isSelected) {
            this.flexGrid.rows[i].isSelected = false
          }
        }
      } */
    },

    pieSelectionChanged: function (flexPie) {
      let chartSelectedItem = flexPie.collectionView.currentItem

      for (let i in this.flexGrid.rows) {
        if (this.flexGrid.rows[i] && _.has(this.flexGrid.rows[i].dataItem, '_status')) {
          delete this.flexGrid.rows[i].dataItem._status
        }
        if (this.flexGrid.rows[i] && this.flexGrid.rows[i].dataItem && _.isMatch(chartSelectedItem, this.flexGrid.rows[i].dataItem)) {
          this.flexGrid.rows[i].isSelected = true
          this.scrollToRow(Number(i))
        } else {
          if (this.flexGrid.rows[i] && this.flexGrid.rows[i].isSelected) {
            this.flexGrid.rows[i].isSelected = false
          }
        }
      }
    },

    _gridChart (data) {
      for (let i in this.columns) {
        let notMatched = true
        if (this.yaxis.aggregation && this.yaxis.aggregation.key !== 'NONE') {
          if (this.columns[i].binding === this.yaxis.aggregation.key) {
            this.columns[i].cssClass = 'selected-y'
            notMatched = false
          }
          if (this.columns[i].binding === 'xaxisVal') {
            this.columns[i].cssClass = 'selected-x'
            notMatched = false
          }
        } else {
          if (!this.yaxis.aggregation || this.yaxis.aggregation.key === 'NONE') {
            if (this.columns[i].binding === this.yaxis.field.fieldKey) {
              this.columns[i].cssClass = 'selected-y'
              notMatched = false
            }
          }
          if (this.columns[i].binding === this.xaxis.field.fieldKey) {
            this.columns[i].cssClass = 'selected-x'
            notMatched = false
          }
        }
        if (notMatched) {
          delete this.columns[i].cssClass
        }
      }
      if (data.length === 0) {
        this.chartData = []
        this.tableData = []
        this.seriesList = []
        this.xTitle = ''
        this.yTitle = ''
        this.flexChart.series.clear()
        for (let i in this.columns) {
          delete this.columns[i].cssClass
        }
        this.$dialog.alert(this.$t('spc.SPC_EVENT_VISUAL.LABEL_018'))
        return
      }
      if (!this.xaxis.field || this.xaxis.field.fieldType === 'NONE' || this.xaxis.field.fieldType === 'DATE') {
        this.bindingXType = 'DATE'
      } else if (this.xaxis.field && this.xaxis.field.fieldType === 'STRING') {
        this.bindingXType = 'STRING'
        this.flexChart.axisX.labelAngle = 0
        if (data.length > 10) {
          this.flexChart.axisX.majorUnit = Math.floor(data.length / 7)
        }
      } else if (this.xaxis.field && this.xaxis.field.fieldType === 'NUMBER') {
        this.bindingXType = 'NUMBER'
      }
      let newCahrtData = null
      this.flexGrid.selectionChanged.removeAllHandlers()
      this.flexGrid.selectionChanged.addHandler(this.gridSelectionChanged)
      let self = this
      this.flexGrid.itemFormatter = function (panel, r, c, cell) {
        if (panel.cellType === wjcGrid.CellType.Cell) {
          var col = panel.columns[c]
          if (self.yaxis.aggregation && self.yaxis.aggregation.key !== 'NONE' &&
              self.xaxis.field && self.xaxis.field.fieldType === 'DATE' && col.binding === 'xaxisVal') {
            cell.textContent = Dayjs(panel.rows[r].dataItem.xaxisVal).format('YYYY-MM-DD HH:mm:ss')
          } else {
            if (self.xaxis.field && self.xaxis.field.fieldType === 'DATE' && col.binding === self.xaxis.field.fieldKey) {
              cell.textContent = Dayjs(panel.rows[r].dataItem[self.xaxis.field.fieldKey]).format('YYYY-MM-DD HH:mm:ss')
            } else if (col.binding === 'paramCrtDttm') {
              cell.textContent = Dayjs(panel.rows[r].dataItem.paramCrtDttm).format('YYYY-MM-DD HH:mm:ss')
            }
          }
        }
      }

      // this.flexChart.axisY.majorUnit = 10
      this.flexChart.selectionChanged.removeAllHandlers()
      this.flexChart.selectionChanged.addHandler(this.chartSelectionChanged)
      this.flexChart.itemFormatter = function (engine, hitTestInfo, defaultRenderer) {
        let isOthers = true
        for (let i in self.seriesList) {
          if (self.seriesList[i] === hitTestInfo.item[self.seriesSeparator]) {
            isOthers = false
            engine.stroke = hitTestInfo.chart.palette[i]
            engine.fill = hitTestInfo.chart.palette[i]
            break
          }
        }
        if (isOthers) {
          engine.stroke = hitTestInfo.chart.palette[self.seriesList.length]
          engine.fill = hitTestInfo.chart.palette[self.seriesList.length]
        }
        if (hitTestInfo.chart.chartType === 4) {
          engine.strokeWidth = 3
        }
        defaultRenderer()
      }
      this.flexChart.series.clear()
      let yName = ''
      if (this.yaxis.name && this.yaxis.name !== '' && this.yaxis.name !== 'NONE') {
        yName = this.yaxis.name
      } else if (this.yaxis.field && this.yaxis.field.fieldKey !== 'NONE') {
        yName = this.yaxis.field.fieldName
      } else {
        yName = undefined
      }

      let xName = ''
      if (this.xaxis.name && this.xaxis.name !== '' && this.xaxis.name !== 'NONE') {
        xName = this.xaxis.name
      } else if (this.xaxis.field && this.xaxis.field.fieldKey !== 'NONE') {
        xName = this.xaxis.field.fieldName
      } else {
        xName = undefined
      }

      if (this.chartType === 'Bar') {
        this.yTitle = xName
        this.xTitle = yName
      } else {
        this.yTitle = yName
        this.xTitle = xName
      }

      this.flexPie.selectionMode = 2
      this.flexPie.binding = 'paramVal'
      this.flexPie.bindingName = 'paramName'
      this.flexPie.selectionChanged.removeAllHandlers()
      this.flexPie.selectionChanged.addHandler(this.pieSelectionChanged)
      this.flexPie.isAnimated = true
      this.flexPie.selectedItemOffset = 0.2

      let symbolSize = 3
      if (
        this.chartType === 'LineSymbols' ||
        this.chartType === 'Scatter'
      ) {
        symbolSize = 2
      }

      let series = new wjcChart.Series({ binding: 'paramVal', symbolSize: symbolSize })
      this.seriesSeparator = 'paramVal'

      if (this.yaxis.aggregation && this.yaxis.aggregation.key !== 'NONE') {
        this.bindingXName = 'xaxisVal'

        if (this.xaxis.field && this.xaxis.field.fieldKey !== 'NONE') {
          this.flexPie.binding = data[0].aggDefName
          this.flexPie.bindingName = 'xaxisVal'

          if (this.seriesField && this.seriesField.fieldKey !== 'NONE') {
            this.flexChart.legendToggle = true
            this.flexChart.legend.position = 4
            this.seriesSeparator = 'seriesVal'

            // newCahrtData = []
            this.seriesList = []
            this.seriesListByInternal = {}
            for (let i in data) {
              if (_.isUndefined(this.seriesListByInternal[data[i].seriesVal])) {
                this.seriesListByInternal[data[i].seriesVal] = 0
              } else {
                this.seriesListByInternal[data[i].seriesVal] += 1
              }
            }
            let self = this
            this.seriesListOrigin = Object.keys(this.seriesListByInternal).sort(function (a, b) {
              return self.seriesListByInternal[b] - self.seriesListByInternal[a]
            })
            this.seriesButtonList = []
            for (let j in this.seriesListOrigin) {
              this.seriesButtonList.push(this.seriesListOrigin[j])
              this.seriesList.push(this.seriesListOrigin[j])
            }
            if (this.seriesList.length > this.seriesLimitCount) {
              this.seriesList.splice(this.seriesLimitCount, this.seriesList.length)
              this.seriesButtonList.splice(this.seriesLimitCount, this.seriesList.length)
              this.seriesList.push('Others')
              this.seriesButtonList.push('Others')
            }
            series = new wjcChart.Series({ binding: data[0].aggDefName, symbolSize: symbolSize })
            this.flexChart.series.push(series)
            // for (let i in this.seriesList) {
            //   let symbolSize = 10
            //   if (this.chartType === 'Line') {
            //     symbolSize = 3
            //   }
            //   let newSeries = new wjcChart.Series({ binding: i, name: i, symbolSize: symbolSize })
            //   this.flexChart.series.push(newSeries)
            // }
            // for (let i in data) {
            //   let newData = _.clone(data[i])
            //   for (let j in this.seriesList) {
            //     if (data[i].seriesVal === j) {
            //       newData[j] = newData[newData.aggDefName]
            //     }
            //   }
            //   newCahrtData.push(newData)
            // }
          } else {
            this.seriesList = []
            this.seriesButtonList = []
            this.seriesListByInternal = {}
            series = new wjcChart.Series({ binding: data[0].aggDefName, symbolSize: symbolSize })
            this.flexChart.series.push(series)
          }
        }
      } else {
        this.bindingXName = 'paramCrtDttm'
        if (this.xaxis.field && this.xaxis.field.fieldKey !== 'NONE') {
          this.bindingXName = this.xaxis.field.fieldKey
          this.flexPie.bindingName = this.xaxis.field.fieldKey
        }
        if (this.yaxis.field && this.yaxis.field.fieldKey !== 'NONE') {
          series = new wjcChart.Series({ binding: this.yaxis.field.fieldKey, symbolSize: symbolSize })
          this.flexPie.binding = this.yaxis.field.fieldKey
        }
        if (this.seriesField && this.seriesField.fieldKey !== 'NONE') {
          this.flexChart.legendToggle = true
          this.flexChart.legend.position = 4

          // newCahrtData = []
          this.seriesSeparator = this.seriesField.fieldKey
          this.seriesList = []
          this.seriesListByInternal = {}
          for (let i in data) {
            if (_.isUndefined(this.seriesListByInternal[data[i][this.seriesField.fieldKey]])) {
              this.seriesListByInternal[data[i][this.seriesField.fieldKey]] = 0
            } else {
              this.seriesListByInternal[data[i][this.seriesField.fieldKey]] += 1
            }
          }
          let self = this
          this.seriesListOrigin = Object.keys(this.seriesListByInternal).sort(function (a, b) {
            return self.seriesListByInternal[b] - self.seriesListByInternal[a]
          })
          this.seriesButtonList = []
          for (let j in this.seriesListOrigin) {
            this.seriesButtonList.push(this.seriesListOrigin[j])
            this.seriesList.push(this.seriesListOrigin[j])
          }
          if (this.seriesList.length > this.seriesLimitCount) {
            this.seriesList.splice(this.seriesLimitCount, this.seriesList.length)
            this.seriesButtonList.splice(this.seriesLimitCount, this.seriesList.length)
            this.seriesList.push('Others')
            this.seriesButtonList.push('Others')
          }
          series = new wjcChart.Series({ binding: this.yaxis.field.fieldKey, symbolSize: symbolSize })
          this.flexChart.series.push(series)
          // for (let i in this.seriesList) {
          //   let symbolSize = 10
          //   if (this.chartType === 'Line') {
          //     symbolSize = 3
          //   }
          //   let newSeries = new wjcChart.Series({ binding: i, name: i, symbolSize: symbolSize })
          //   this.flexChart.series.push(newSeries)
          // }
          // for (let i in data) {
          //   let newData = _.clone(data[i])
          //   for (let j in this.seriesList) {
          //     if (data[i][this.bindingXName] === j) {
          //       newData[j] = newData[this.yaxis.field.fieldKey]
          //     }
          //   }
          //   newCahrtData.push(newData)
          // }
        } else {
          this.seriesList = []
          this.seriesButtonList = []
          this.seriesListByInternal = {}
          this.flexChart.series.push(series)
        }
      }

      if (this.chartType === 'Column') {
        this.flexChart.chartType = 0
      } else if (this.chartType === 'Bar') {
        this.flexChart.chartType = 1
      } else if (this.chartType === 'Scatter') {
        this.flexChart.chartType = 2
        // {x: 1, y: 2}
      // } else if (this.chartType === 'Line') {
      //   this.flexChart.chartType = 3
      } else if (this.chartType === 'LineSymbols') {
        this.flexChart.chartType = 4
      } else if (this.chartType === 'Area') {
        this.flexChart.chartType = 5
      } else if (this.chartType === 'Bubble') {
        this.flexChart.chartType = 6
      } else if (this.chartType === 'Candlestick') {
        this.flexChart.chartType = 7
      // } else if (this.chartType === 'HighLowOpenClose') {
      //   this.flexChart.chartType = 8
      } else if (this.chartType === 'Spline') {
        this.flexChart.chartType = 9
      // } else if (this.chartType === 'Spline Symbols') {
      //   this.flexChart.chartType = 10
      } else if (this.chartType === 'SplineArea') {
        this.flexChart.chartType = 11
      // } else if (this.chartType === 'Funnel') {
      //   this.flexChart.chartType = 12
      } else if (this.chartType === 'Pie') {

      } else if (this.chartType === 'Donut') {
        this.flexPie.innerRadius = 0.5
      }
      this.chartData = newCahrtData !== null ? newCahrtData : data
      this.tableData = data
    },

    /**
     * 검색조건 저장 모달 팝업의 저장 버튼의 활성화 여부 체크
     *
     * @returns {Boolean} true면 disable 처리
     */
    isSavable () {
      if (!this.condition.title.length) return true
      return false
    },

    /**
     * this.selectedFieldName.type을 자동 설정합니다.
     *
     * @param {*} [field=this.selectedFieldName]
     */
    setSelectedFieldType (field = this.selectedFieldName) {
      this.selectedFieldName.type = field.fieldType
      // console.log('@setSelectedFieldType', field, this.selectedFieldName.type)
    },

    /**
     * Chart/Grid 데이터를 주기적으로 가져오기 위한 인터벌을 설정합니다.
     */
    setIntervalAction () {
      let self = this
      if (this.intervalAction) clearInterval(this.intervalAction)
      this.intervalAction = setInterval(function () {
        self.search()
        console.log('interval')
        self.recentlyRefreshDate = 'Last Update : ' + Dayjs().format('YYYY-MM-DD HH:mm:ss')

        if (self.yaxis.aggregation && self.yaxis.aggregation.key !== 'NONE') {
          // if (self.stompClient) {
          //   self.stompClient.disconnect()
          //   self.stompClient = undefined
          // }
          // self.socket = undefined
          self.$store.dispatch('unsubscribe', { url: '/spc/eventsearch/visual' })
        } else {
          // if (!self.socket) {
          //   self.socket = new SockJS(API.spc.config().eventDataSocket)

          //   self.stompClient = Stomp.over(self.socket)
          //   self.stompClient.connect({}, frame => {
          //     self.stompClient.subscribe('/spc/eventsearch/visual', tick => {
          //       let parseJsonTickBody = ''
          //       try {
          //         parseJsonTickBody = JSON.parse(tick.body)
          //       } catch (e) {
          //         console.error('tick data json parse error')
          //         console.error(tick.body)
          //       }

          //       if (self.chartData.length > 0) {
          //         parseJsonTickBody.forEach(function (tickData) {
          //           self.chartData.push(tickData)
          //           self.tableData.push(tickData)
          //         })
          //       }
          //     })
          //   })
          // }
          self.$store.dispatch('subscribe', {
            url: '/spc/eventsearch/visual',
            callback: function (tick) {
              console.log('@kyjeon this socket callback')
              let parseJsonTickBody = ''
              try {
                parseJsonTickBody = JSON.parse(tick.body)
              } catch (e) {
                console.error('tick data json parse error')
                console.error(tick.body)
              }

              if (self.chartData.length > 0) {
                parseJsonTickBody.forEach(function (tickData) {
                  self.chartData.push(tickData)
                  self.tableData.push(tickData)
                })
              }
            }
          })
        }
      }, this.selectedRefreshInterval.value * 1000)
    },

    /**
     * Vue Component의 데이터 초기화
     *
     */
    resetData () {
      this.selectedEventindexName = {}
      this.fieldNames = []
      this.resetSelectedFieldName()
      this.startDate = undefined
      this.endDate = undefined
      this.condition.title = ''
      this.condition.isPublic = false
    },

    /**
     * selectedFieldName을 초기화합니다.
     *
     */
    resetSelectedFieldName () {
      this.selectedFieldName = {
        field: undefined,
        type: undefined,
        string: ''
      }
    },

    /**
     * addedEvents 목록으로부터 index에 해당하는 아이템을 제거합니다.
     *
     * @param {*} index
     */
    removeItemFromAddedEvents (index) {
      let self = this
      this.fieldNames.forEach(function (originField) {
        if (originField.fieldKey === self.addedEvents[index].field.fieldKey) {
          delete originField.disabled
        }
      })
      this.addedEvents.splice(index, 1)
    },

    formatXAxis (engine, label) {
      if (Dayjs(label.text).isValid()) {
        label.text = Dayjs(label.text).format('YYYY-MM-DD HH:mm:ss')
      }
      return label
    },

    openClickedCondition (row) {
      for (let i in this.eventIndexNames) {
        if (this.eventIndexNames[i].indexKey === row.indexKey) {
          this.selectedEventIndexName = this.eventIndexNames[i]
        }
      }
      if (row.aggDefName && row.aggDefName !== '') {
        for (let i in this.yaxisCondition) {
          if (row.aggDefName === this.yaxisCondition[i].key) {
            this.yaxis.aggregation = this.yaxisCondition[i]
          }
        }
      } else {
        this.yaxis.aggregation = this.yaxisCondition[0]
      }
      let self = this

      this.listIndexFieldName().then(function () {
        if (row.yaxisName && row.yaxisName !== '') {
          for (let i in self.yaxisFields) {
            if (row.yaxisName === self.yaxisFields[i].fieldKey) {
              self.yaxis.field = self.yaxisFields[i]
            }
          }
        } else {
          self.yaxis.field = self.yaxisFields[0]
        }

        if (row.xaxisName && row.xaxisName !== '') {
          for (let i in self.xaxisFields) {
            if (row.xaxisName === self.xaxisFields[i].fieldKey) {
              self.xaxis.field = self.xaxisFields[i]
            }
          }
        } else {
          self.xaxis.field = self.xaxisFields[0]
        }

        if (row.seriesName && row.seriesName !== '') {
          for (let i in self.seriesFields) {
            if (row.seriesName === self.seriesFields[i].fieldKey) {
              self.seriesField = self.seriesFields[i]
            }
          }
        } else {
          self.seriesField = self.seriesFields[0]
        }

        self.addedEvents = []

        for (let i in row) {
          if (i.startsWith('grpLvl') || i.startsWith('key')) {
            if (row[i] && row[i] !== '' && row[i] !== null && row[i] !== '*') {
              for (let j in self.fieldNames) {
                if (i === self.fieldNames[j].fieldKey) {
                  self.fieldNames[j].disabled = true

                  self.addedEvents.push({ field: self.fieldNames[j], string: row[i], type: '=' })
                }
              }
            }
          }
        }

        if (row.startDttm && row.startDttm) {
          self.startDate = new Date(Dayjs(row.startDttm).format('YYYY-MM-DD 00:00:00'))
          self.endDate = new Date(Dayjs(row.endDttm).format('YYYY-MM-DD 00:00:00'))
          self.selectedPeriod = 'CUSTOM'
        }

        self.search()
        self.isOpenModalActive = false
        return null
      })
    },

    exportExcel () {
      wjcGridXlsx.FlexGridXlsxConverter.saveAsync(
        this.flexGrid,
        {
          includeColumnHeaders: true,
          includeCellStyles: false,
          includeColumns: function (columns) {
            return columns.binding !== '_status.checked'
          },
          formatItem: function (args) {
            let p = args.panel
            let xlsxCell = args.xlsxCell

            if (p.cellType === wjcGrid.CellType.ColumnHeader) {
              xlsxCell.style.fill = {}
              xlsxCell.style.fill.color = '#EEEEEE'
            }
          }
        },
        'Event-Visualization-' + Dayjs().format('YYYYMMDDHHmmss') + '.xlsx'
      )
    },
    setTooltipContent: function (hti) {
      let xTitle = ''
      let yTitle = ''

      if (this.xaxis.field && this.xaxis.field.fieldKey !== 'NONE' && this.xaxis.name && this.xaxis.name !== '') {
        xTitle = this.xaxis.name
      } else {
        xTitle = this.xaxis.field.fieldName
      }

      if (this.yaxis.name && this.yaxis.name !== '') {
        yTitle = this.yaxis.name
      } else {
        yTitle = this.yaxis.field.fieldName
      }
      xTitle += ' : '
      yTitle += ' : '

      if (Dayjs(hti.x).isValid()) {
        return `${xTitle}${Dayjs(hti.x).format('YYYY-MM-DD HH:mm:ss')}</br>${yTitle}${hti.y}`
      } else {
        return `${xTitle}${hti.x}</br>${yTitle}${hti.y}`
      }
    },
    scrollToRow (index) {
      // let rc = this.flexGrid.cells.getCellBoundingRect(index, 0, true)

      // this.flexGrid.scrollPosition = new wjCore.Point(this.flexGrid.scrollPosition.x, rc.top)
      // document.querySelector('.vis-grid .panel-body').scrollTop = rc.top
      // this.$refs.gridPanelBody.$el.scrollTop = rc.top
      // this.$refs.gridPanelBody.$el.children[1].scrollTop = rc.top

      this.flexGrid.scrollIntoView(index, -1)
    },
    setColumnHeaders (list) {
      this.flexGrid.columns.forEach(function (column) {
        if (list.indexOf(column.header) > -1) {
          column.visible = true
        } else {
          column.visible = false
        }
      })
    },
    isButtonDisable () {
      if (!this.selectedEventIndexName || !this.yaxis.field || !this.xaxis.field) {
        return true
      }

      if (this.selectedPeriod === 'CUSTOM') {
        let sDayjs = Dayjs(this.startDate)
        let eDayjs = Dayjs(this.endDate)
        if (eDayjs.diff(sDayjs) < 0 || eDayjs.diff(sDayjs, 'month', true) > 1) {
          return true
        }
      }

      return false
    },
    isSaveButtonDisable () {
      if (this.chartData || !this.yaxis.field || !this.xaxis.field) {
        return true
      }
      return false
    }
  },
  data () {
    return {
      chartData: [],
      tableData: [],
      eventIndexNames: [], // Event Name Selectbox에 표시될 정보
      selectedEventIndexName: undefined, // Event Name Selectbox에서 선택된 값
      fieldNames: [], // Filter의 첫번쨰 Selectbox에 표시될 정보
      selectedFieldName: { // Filter의 첫번째 Selectbox에서 선택된 값
        field: undefined,
        type: undefined,
        string: ''
      },
      fieldTypes: ['=', 'IN', 'LIKE'], // Filter의 두번쨰 selectbox에 표시될 정보
      addedEvents: [], // Filter를 통해 추가된 필터 배열
      selectedPeriod: 'MONTH', // Period 정보. ['MONTH' | 'CUSTOM']
      oneMonthAgo: Dayjs().subtract(1, 'month').toDate(), // 한 달 전 시간
      now: Dayjs().toDate(), // 현재 시간
      startDate: undefined, // From - To 선택상자중 From에 표시될 시간
      endDate: undefined, // From - To 선택상자중 To에 표시될 시간
      yaxisCondition: [
        { key: 'NONE', name: 'NONE', header: 'NONE' },
        { key: 'yaxisAggAvg', name: 'AVG', header: 'Y-AIXIS(AVG)' },
        { key: 'yaxisAggSum', name: 'SUM', header: 'Y-AIXIS(SUM)' },
        { key: 'yaxisAggCount', name: 'COUNT', header: 'Y-AIXIS(COUNT)' },
        { key: 'yaxisAggMin', name: 'MIN', header: 'Y-AIXIS(MIN)' },
        { key: 'yaxisAggMax', name: 'MAX', header: 'Y-AIXIS(MAX)' },
        { key: 'yaxisAggStddev', name: 'STDDEV', header: 'Y-AIXIS(STDDEV)' },
        { key: 'yaxisAggSumofsquare', name: 'SUMOFSQUARE', header: 'Y-AIXIS(SUMOFSQUARE)' },
        { key: 'yaxisAggVariance', name: 'VARIANCE', header: 'Y-AIXIS(VARIANCE)' }
      ],
      yaxisFields: undefined,
      yaxis: {
        aggregation: undefined,
        field: undefined,
        name: undefined
      },
      xaxisFields: undefined,
      xaxis: {
        field: undefined,
        name: undefined
      },
      seriesField: undefined,
      seriesFields: undefined,
      refreshIntervals: [
        { value: 0, label: 'OFF' },
        { value: 5, label: '5' + this.$t('spc.common.second') },
        { value: 30, label: '30' + this.$t('spc.common.second') },
        { value: 60, label: '1' + this.$t('spc.common.minute') },
        { value: 600, label: '10' + this.$t('spc.common.minute') },
        { value: 1800, label: '30' + this.$t('spc.common.minute') },
        { value: 3600, label: '1' + this.$t('spc.common.hour') },
        { value: 86400, label: this.$t('spc.common.day') }
      ], // 상단 리프레시 인터벌에 표시될 정보
      intervalAction: undefined, // refreshInterval Function을 담음
      selectedRefreshInterval: { value: 0, label: 'OFF' }, // 상단 리프레시 인터벌에서 선택된 값
      isSaveModalActive: false, // 컨디션 저장 모달 팝업 Active 여부
      isOpenModalActive: false, // 컨디션 오픈 모달 팝업 Active 여부
      condition: { // 검색조건 저장을 위한 오브젝트
        title: '',
        isPublic: false
      },
      openCondition: { // 검색조건 불러오기를 위한 오브젝트
        title: '',
        isPublic: false
      },
      conditions: {
        count: 0,
        list: []
      },
      conditionsColumns: [
        { field: 'indexName', label: this.$t('spc.SPC_EVENT_VISUAL.GRID_002.indexName') },
        { field: 'userId', label: this.$t('spc.SPC_EVENT_VISUAL.GRID_002.userId') },
        { field: 'saveDttm', label: this.$t('spc.SPC_EVENT_VISUAL.GRID_002.saveDttm') },
        { field: 'conditionName', label: this.$t('spc.SPC_EVENT_VISUAL.GRID_002.conditionName') }
      ],
      chartType: undefined,
      socket: undefined,
      stompClient: undefined,
      checkedDeleteConditions: [],
      zoom: {
        ptStart: null,
        ptEnd: null,
        box: null
      },
      seriesList: undefined,
      seriesButtonList: [],
      seriesSeparator: undefined,
      seriesListOrigin: [],
      seriesListByInternal: {},
      seriesLimitCount: 10,
      bindingXName: 'paramCrtDttm',
      bindingXType: 'DATE',
      xTitle: undefined,
      yTitle: undefined,
      paging: {
        busy: false,
        maxPageNumber: 0,
        currPageNumber: 1,
        pageCount: 50
      },
      recentlyRefreshDate: 'Last Update : ' + Dayjs().format('YYYY-MM-DD HH:mm:ss'),
      nonAggregationHeaders: [ this.$t('spc.SPC_EVENT_VISUAL.GRID_001.grpLvl1Val'), this.$t('spc.SPC_EVENT_VISUAL.GRID_001.grpLvl2Val'), this.$t('spc.SPC_EVENT_VISUAL.GRID_001.grpLvl3Val'), this.$t('spc.SPC_EVENT_VISUAL.GRID_001.grpLvl4Val'), this.$t('spc.SPC_EVENT_VISUAL.GRID_001.grpLvl5Val'), this.$t('spc.SPC_EVENT_VISUAL.GRID_001.key1Val'), this.$t('spc.SPC_EVENT_VISUAL.GRID_001.key2Val'), this.$t('spc.SPC_EVENT_VISUAL.GRID_001.key3Val'), this.$t('spc.SPC_EVENT_VISUAL.GRID_001.paramName'), this.$t('spc.SPC_EVENT_VISUAL.GRID_001.paramVal'), this.$t('spc.SPC_EVENT_VISUAL.GRID_001.paramCrtDttm') ],
      aggregationHeaders: [ this.$t('spc.SPC_EVENT_VISUAL.GRID_002.xaxisVal'), this.$t('spc.SPC_EVENT_VISUAL.GRID_002.seriesVal'), this.$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggAvg'), this.$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggCount'), this.$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggMax'), this.$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggMin'), this.$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggStddev'), this.$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggSum'), this.$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggSumofsquare'), this.$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggVariance') ],
      isLoading: false,
      columns: [
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_001.grpLvl1Val'), binding: 'grpLvl1Val', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_001.grpLvl2Val'), binding: 'grpLvl2Val', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_001.grpLvl3Val'), binding: 'grpLvl3Val', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_001.grpLvl4Val'), binding: 'grpLvl4Val', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_001.grpLvl5Val'), binding: 'grpLvl5Val', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_001.key1Val'), binding: 'key1Val', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_001.key2Val'), binding: 'key2Val', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_001.key3Val'), binding: 'key3Val', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_001.paramName'), binding: 'paramName', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_001.paramVal'), binding: 'paramVal', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_001.paramCrtDttm'), binding: 'paramCrtDttm', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_DETAIL_001.dataOriginl'), binding: 'dataOriginl', width: '1*' },

        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_002.xaxisVal'), binding: 'xaxisVal', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_002.seriesVal'), binding: 'seriesVal', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggAvg'), binding: 'yaxisAggAvg', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggCount'), binding: 'yaxisAggCount', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggMax'), binding: 'yaxisAggMax', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggMin'), binding: 'yaxisAggMin', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggStddev'), binding: 'yaxisAggStddev', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggSum'), binding: 'yaxisAggSum', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggSumofsquare'), binding: 'yaxisAggSumofsquare', width: '1*' },
        { label: this.$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggVariance'), binding: 'yaxisAggVariance', width: '1*' }

      ],
      perfTestItemCount: 500,
      perfTestItemCounts: [
        100,
        500,
        1000,
        5000,
        10000,
        50000,
        100000,
        200000,
        300000,
        400000,
        500000
      ]
    }
  }
}
