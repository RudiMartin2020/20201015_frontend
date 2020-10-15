<template>
  <div
    class="sk-chart"
    :class="{
      '-has-minimap': useMinimap,
      '-has-header': header
    }"
  >
    <div
      class="chart-contextmenu"
      :class="[{ '-visible': contextmenu.visible }]"
      @click.stop.prevent="contextmenu.visible = false"
    >
      <div
        class="contextmenu-block"
        :style="{
          'left': contextmenu.left + 'px',
          'top': contextmenu.top + 'px'
        }"
      >
        <ul class="contextmenu-list">
          <li
            class="contextmenu-list-item"
            v-for="(action, i) in contextmenu.actions"
            :key="'action-' + i"
            :class="[action.class]"
            @click="() => action.method()"
          >
            {{ action.label }}
          </li>
        </ul>
      </div>
      <!-- /.contextmenu-block -->
    </div>
    <!-- /.chart-contextmenu -->
    <b-modal
      :active.sync="setSeriesModal.active"
      has-modal-card
    >
      <div class="modal-card -set-series">
        <header class="modal-card-head">
          <span class="modal-card-title">시리즈 설정</span>
        </header>
        <section class="modal-card-body">
          <b-field label="시리즈 표시">
            <b-field>
              <b-radio
                v-model="setSeriesModal.displayMethod"
                naive-value="MERGED"
              >
                통합
              </b-radio>
              <b-radio
                v-model="setSeriesModal.displayMethod"
                naive-value="SEPARATED"
              >
                분리
              </b-radio>
            </b-field>
          </b-field>
          <b-field label="시리즈 선택" />
          <ul class="series-list">
            <li class="series-list-item">
              <b-select
                v-for="(series, i) in setSeriesModal.currentSeries"
                v-model="series.key"
                :key="'currentSeries-' + i"
              >
                <option
                  v-for="(selectableSeries, j) in setSeriesModal.allSeries"
                  :key="'selectableSeries-' + j"
                  :value="selectableSeries.key"
                >
                  {{ selectableSeries }}
                </option>
              </b-select>
            </li>
          </ul>
        </section>
        <footer class="modal-card-foot buttons">
          <b-button
            size="is-medium"
            @click="setSeriesModal = false"
          >
            취소
          </b-button>
          <b-button
            size="is-medium"
            type="is-primary"
          >
            적용
          </b-button>
        </footer>
      </div>
      <!-- /.modal-card -->
    </b-modal>

    <b-modal
      :active.sync="aggregationModal.active"
      has-modal-card
    >
      <div class="modal-card -set-aggregation">
        <header class="modal-card-head">
          <span class="modal-card-title">X축 레인지 설정</span>
        </header>
        <section class="modal-card-body">
          <b-field
            label="Data Range"
            class="aggregation-option -range"
          >
            <b-field>
              <b-radio
                v-for="range in aggregationModal.ranges"
                v-model="aggregationModal.range"
                :key="range.value"
                :native-value="range.value"
                name="aggregation-range"
              >
                {{ range.label }}
              </b-radio>
            </b-field>
          </b-field>
          <!-- <b-field
            label="Aggregation Type"
            class="aggregation-option -type"
          >
            <b-field>
              <b-radio
                v-for="type in aggregationModal.types"
                v-model="aggregationModal.type"
                :key="type.value"
                :native-value="type.value"
                name="aggregation-type"
              >
                {{ type.label }}
              </b-radio>
            </b-field>
          </b-field> -->
        </section>
        <footer class="modal-card-foot buttons">
          <b-button
            size="is-medium"
            type="is-primary"
            @click="aggregationModal.active = false; aggregationModal.apply = true"
          >
            확인
          </b-button>
        </footer>
      </div>
      <!-- /.modal-card -->
    </b-modal>
    <div
      class="chart-header"
      v-if="header"
    >
      {{ header }}
    </div>
    <wj-flex-chart
      v-if="useMinimap"
      :plot-margin="chartPlotMargin"
      class="chart-minimap"
      :items-source="itemsSourceCollection"
      :binding-x="bindingX"
      :chart-type="chartMinimapChartType"
      tooltip-content=""
      :palette="palette"
      :stacking="stacking"
      :item-formatter="itemFormatter"
      :symbol-size="1"
      :interpolate-nulls="interpolateNulls"
    >
      <wj-flex-chart-legend position="None" />
      <wj-flex-chart-axis
        wj-property="axisX"
        position="None"
      />
      <wj-flex-chart-axis
        wj-property="axisY"
        position="None"
      />
      <wj-flex-chart-range-selector
        :initialized="minimapInitialized"
        :seamless="true"
        :range-changed="minimapRangeChanged"
      />
      <slot name="minimap" />
    </wj-flex-chart>
    <wj-flex-chart
      v-if="itemsSource"
      ref="chart"
      class="chart-main has-ctx-menu"
      :items-source="itemsSourceCollection"
      :binding-x="bindingX"
      :chart-type="chartType"
      :tooltip-content="chartTooltipContent"
      :initialized="chartInitialized"
      :palette="palette"
      :item-formatter="itemFormatter"
      :interpolate-nulls="interpolateNulls"
      :legend-toggle="legendToggle"
      :stacking="stacking"
      :selection-mode="selectionMode"
      :plot-margin="chartPlotMargin"
      :rendering="chartRendering"
      :rendered="chartRendered"
      :refreshing="chartRefreshing"
      :refreshed="chartRefreshed"
    >
      <wj-flex-chart-legend
        :position="chartLegendPosition"
      />
      <wj-flex-chart-axis
        wj-property="axisX"
        :max="chartXMax"
        :min="chartXMin"
        :label-align="xAxisLabelAlign"
        :major-unit="chartXMajorUnit"
        :title="xTitle"
        :item-formatter="chartXItemFormatter"
      />
      <wj-flex-chart-axis
        wj-property="axisY"
        :max="chartYMax"
        :min="chartYMin"
        :label-align="yAxisLabelAlign"
        :major-unit="chartYMajorUnit"
        :title="yTitle"
        :item-formatter="chartYItemFormatter"
      />
      <template v-if="useAggregation">
        <wj-flex-chart-series
          v-for="series in chartAggregationSeries"
          :key="series"
          :binding="series"
          :symbol-size="1"
        />
      </template>
      <slot />
    </wj-flex-chart>
    <b-modal
      :active.sync="isRawDataModalVisible"
      width="90vw"
      has-modal-card
    >
      <div class="modal-card -raw-data">
        <header class="modal-card-head">
          <span class="modal-card-title">Raw Data</span>
          <div class="header-buttons">
            <b-button
              type="is-dark"
              @click="e => { excelExport(extractedData) }"
            >
              Excel Export
            </b-button>
          </div>
        </header>
        <section class="modal-card-body">
          <sk-grid
            :items-source="extractedData"
            :initialized="chartRawDataGridInitialized"
            :show-raw-data="rawDataColumns ? false : true"
            :columns="rawDataColumns"
            :auto-size-column="true"
            :use-checkbox="false"
            ref="grid"
            style="width: 100%;"
          />
        </section>
        <!-- /.modal-card-body -->
        <footer class="modal-card-foot buttons">
          <b-button
            size="is-medium"
            type="is-dark"
            @click="e => { isRawDataModalVisible = false }"
          >
            닫기
          </b-button>
        </footer>
      </div>
      <!-- /.modal-card -->
    </b-modal>
  </div>
</template>
<script>
// todo skcc 0814
// contextmenu 이렇게
// 공통기능
// =================
// 화면별 요구사항 받는것

import Dayjs from 'dayjs'
import * as WjCore from '@grapecity/wijmo'
import '@grapecity/wijmo.vue2.input'
import Aggregates from './Aggregates'
import _ from 'lodash'

export default {
  name: 'SkChart',
  props: {
    // SK-Chart Props
    // zoom을 사용할 것인지 여부
    useZoom: {
      type: Boolean,
      default: true
    },

    // zoom & rawDataPopup을 사용할 떄 Zoom을 발생시키기 위한 최소 Distance
    // 클릭만 했는데 줌이 되는 경우를 방지하기 위함.
    minimumZoomDistance: {
      type: Number,
      default: 30
    },

    // raw data popup을 사용할 것인지 여부
    useRawDataPopup: {
      type: Boolean,
      default: true
    },

    rawDataColumns: {
      type: Array,
      default: undefined
    },

    // lagend 표시 여부
    useLegend: {
      type: Boolean,
      default: true
    },

    // lagend 위치
    legendPosition: {
      type: [String, Number],
      default: 'Bottom',
      validator (value) {
        if (Number.isInteger(value) && value < 6) return true
        return ['Auto', 'Top', 'Bottom', 'Left', 'Right', 'None'].includes(value)
      }
    },

    // X축의 label formatter
    xItemFormatter: {
      type: Function,
      default: undefined
    },

    // 툴팁, 혹은 x축이 날짜 형태일 때 날짜의 표현 형태
    dateFormat: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    },

    // X축의 타이틀
    xTitle: {
      type: String,
      default: undefined
    },

    // y축의 label formatter
    yItemFormatter: {
      type: Function,
      default: undefined
    },

    // y축의 formatting 시에 prefix로 붙일것 ex: $, ₩
    yAxisPrefix: {
      type: String,
      default: ''
    },

    // y축 타이틀
    yTitle: {
      type: String,
      default: undefined
    },

    // raw datq 팝업에 표시되는 그리드 initialized시 method 지정
    rawDataGridInitialized: {
      type: Function,
      default: () => {}
    },

    // chart data의 기본 sort 기준
    sortBy: {
      type: String,
      default: undefined
    },

    // xAxis의 label 간격 (Data 기준)
    xMajorUnit: {
      type: Number,
      default: undefined
    },

    // yAxis의 label 간격 (Data 기준)
    yMajorUnit: {
      type: Number,
      default: undefined
    },

    seriesDisplayMethod: {
      type: String,
      default: 'SEPARATED', // ['MERGED', 'SEPARATED']
      validator (value) {
        return ['MERGED', 'SEPARATED'].includes(value)
      }
    },

    // aggregation 사용 여부
    useAggregation: {
      type: Boolean,
      default: false
    },

    // 해당 값이 발생한 'COUNT',
    // range별/특정value의 해당 값을 더한 'SUM',
    // range별/특정value의 값의 평균을 표시하는 'AVERAGE'
    // range별/특정value의 최대값을 표시하는 'MAX'
    // range별/특정value의 최소값을 표시하는 'MIN'
    aggregationType: {
      type: String,
      default: 'COUNT',
      validator (value) {
        return ['COUNT', 'SUM', 'AVERAGE', 'MAX', 'MIN'].includes(value)
      }
    },
    // 복수 시리즈에 대한 어그리게이션 결과를 보여줄 떄 사용
    aggregationSeries: {
      type: Array,
      default () {
        return []
      }
    },

    // xAxis의 range 설정합니다. 이 값을 기준으로 xAxis의 값을 합산해 차트에 표시합니다. aggregation과 결합해 사용할 수 있습니다.
    xAxisRange: {
      type: [Number, String], // x축이 숫자일 경우는 숫자. 날짜는 'second, minute, hour, date, day, isoWeek, week, quarter, month, year'를 받숩니다. dayjs/momentjs의 start of time 참조.
      default: undefined
    },

    // x축 라벨의 정렬
    xAxisLabelAlign: {
      type: String,
      default: undefined,
      validator (value) {
        return ['left', 'right'].includes(value)
      }
    },

    // y축 라벨의 정렬
    yAxisLabelAlign: {
      type: String,
      default: undefined,
      validator (value) {
        return ['top', 'bottom'].includes(value)
      }
    },

    // chart에서 itemsSource를 collectionView로 래핑할 떄 사용할 옵션
    collectionViewOptions: {
      type: Object,
      default () {
        return {}
      }
    },
    // 우클릭을 이용한 컨텍스트 메뉴 표시를 사용할지 여부
    useContextmenu: {
      type: Boolean,
      default: true
    },

    contextmenuActions: {
      type: Array,
      default () {
        return ['reset-zoom', 'show-raw-data']
      },
      validator (value) {
        let flag = true
        value.forEach(item => {
          if (![
            'reset-zoom',
            'aggregation',
            'show-raw-data'
          ].includes(item)) flag = false
        })
        return flag
        // reset-zoom: 줌 초기화
        // aggregation: aggregation 설정
      }
    },

    // binxing-x의 타입을 설정
    // 'DATE', 'NUMBER', 'STRING'. 현재는 DATE냐 아니냐만 판단.
    bindingXType: {
      type: String,
      default: 'DATE'
    },

    // 차트의 y축 maximumminimum 값을 설정합니다.
    yMax: {
      type: Number,
      default: null
    },
    // 차트의 y축 minimum 값을 설정합니다.
    yMin: {
      type: Number,
      default: null
    },

    // 차트의 x축 maximum 값을 설정합니다.
    xMax: {
      type: Number,
      default: null
    },
    // 차트의 x축 minimum 값을 설정합니다.
    xMin: {
      type: Number,
      default: null
    },

    // 컬럼 챠트의 아이템이 몇개 되지 않으면, xMajorUnit 설정등으로 인해,
    // x축의 실제 time과 컬럼의 위치간에 오차가 발생하는것이 눈에 잘 띄이게 됩니다.
    // true로 설정하면 모든 아이템들을 text 형태로,
    // 숫자를 넣게 되면, 해당 갯수 이하의 컬럼 포인트들의 x축 라벨은 모두 텍스트 형태로 표현됩니다.
    // 즉, 1개의 컬럼이, 1개의 x축 라벨을 가지게 됩니다.
    // false로 설정하고, chartDataType이 'DATE'일 경우 모둔 x축 값을 시간으로 간주합니다.
    labelAsText: {
      type: [Number, Boolean],
      default: 15
    },

    useMinimap: {
      type: Boolean,
      default: false
    },

    minimapChartType: {
      type: String,
      default: undefined
    },

    // Wijmo Props
    itemsSource: {
      type: Array,
      default () {
        return []
      }
    },
    bindingX: {
      type: String,
      default: undefined
    },
    chartType: {
      type: String,
      default: 'Column'
    },
    header: {
      type: String,
      default: undefined
    },
    tooltipContent: {
      type: [Function, String, Number, Object, Array],
      default: undefined
    },
    initialized: {
      type: Function,
      default: () => {}
    },
    itemFormatter: {
      type: Function,
      default: undefined
    },
    plotMargin: {
      type: Array,
      default: () => []
    },
    palette: {
      type: Array,
      default () {
        return [
          'rgba(227, 65, 96, .8)',
          'rgba(32, 208, 191, .8)',
          'rgba(47, 141, 250, .8)',
          'rgba(248, 199, 83, .8)',
          'rgba(236, 126, 48, .8)',
          'rgba(26, 168, 121, .8)',
          'rgba(21, 83, 182, .8)',
          'rgba(189, 65, 227, .8)',
          'rgba(204, 145, 124, .8)',
          'rgba(81, 109, 136, .8)'
        ]
      }
    },
    // Line, Area 차트에서 끊어진 부분 연결 사용 여부
    interpolateNulls: {
      type: Boolean,
      default: true
    },

    // legend 토글 사용 여부
    legendToggle: {
      type: Boolean,
      default: false
    },
    // Stack 사용 여부, None=0, Stacked=1, Stacked100pc=2
    stacking: {
      type: String,
      default: 'None'
    },
    selectionMode: {
      type: String,
      default: 'None'
    }
  },
  mounted () {
    if (this.useContextmenu) this.setContextmenu()
  },
  watch: {
    sortBy (newval) {
      // console.log(newval)
      this.chartSort(this.chart, newval)
    },
    itemsSource (newval) {
      this.resetZoom()
    }
  },
  computed: {
    chartPlotMargin () {
      let margins = this.useMinimap ? [NaN, 60, NaN, 60] : this.plotMargin
      return margins.join(' ')
    },
    chartLegendPosition () {
      let position = !this.useLegend ? 'None' : this.legendPosition
      return position
    },
    chartYMin () {
      if (this.yMin) return this.yMin
      let range = this.analysedChartData.yMax - this.analysedChartData.yMin
      if (range < 0.1 && this.yMin === null) return this.analysedChartData.yMin - 0.1
      return this.yMin
    },
    chartYMax () {
      if (this.yMax) return this.yMax
      let range = this.analysedChartData.yMax - this.analysedChartData.yMin
      if (range < 0.1 && this.yMin === null) return this.analysedChartData.yMax + 0.1
      return this.yMax
    },
    chartYMajorUnit () {
      if (this.yMajorUnit) return this.yMajorUnit
      let range = this.analysedChartData.yMax - this.analysedChartData.yMin
      let major = range / 10

      if (major < 0.01) major = 0
      if (Number.isNaN(major)) major = 0
      if (Number.isInteger(this.analysedChartData.yMax)) {
        major = Math.round(major)
      }
      return major
    },
    chartXMin () {
      if (this.xMin) return this.xMin
      /* if (this.bindingXType === 'DATE' && this.getDuration() < 1) {
        let start = this.itemsSourceCollection.items[0][this.bindingX]
        return Dayjs(start).subtract(1, this.aggregationModal.range + 's').valueOf()
      } */
      return this.xMin
    },
    chartXMax () {
      if (this.xMax) return this.xMax
      /* if (this.bindingXType === 'DATE' && this.getDuration() < 1) {
        let end = this.itemsSourceCollection.items[this.itemsSourceCollection.items.length - 1][this.bindingX]
        return Dayjs(end).add(1, this.aggregationModal.range + 's').valueOf()
      } */
      return this.xMax
    },
    chartXMajorUnit () {
      if (this.aggregationModal.range) {
        // return this.durations[this.aggregationModal.range]
      }
      if (!this.xMajorUnit) return undefined
      let range = this.analysedChartData.xMax - this.analysedChartData.xMin
      let major = range / 10
      major = Math.round(major)
      return major
    },
    itemsSourceCollection () {
      this.chartSort(this.sortBy)
      let source
      let series = []
      // 시리즈, 소스 설정
      if (this.useAggregation) {
        source = this.setAggregation()
        series = [{ binding: this.aggregationType }]
      } else {
        series = this.chart ? this.chart.series : []
        source = this.parseBindingXType([...this.itemsSource], this.bindingX)
      }

      this.analyseChart(series, source)

      // aggregation 사용시, itemSource를 대신해 aggregation result로 collection 생성
      let collection = Array.isArray(source) ? this.createCollectionView(source) : this.itemsSource

      if (this.useMinimap) {
        this.resetMinimap(collection)
      }

      //      if (this.chart) console.log(this.chart.legend)
      return collection
    },
    chartAggregationSeries () {
      if (this.aggregationSeries.length) return this.aggregationSeries
      return [this.aggregationType]
    },
    aggregatableSeries () {
      if (!this.itemsSource.length) return []
      let series = Object.keys(this.itemsSource[0])
      return series
    },
    chartMinimapChartType () {
      if (this.minimapChartType) return this.minimapChartType
      return this.chartType
    }
  },
  methods: {
    /**
     * 차트가 initialized 되었을 떄 실행됩니다.
     * @param {WJFlexChart} chart WJ Flex Chart
     */
    chartInitialized (chart) {
      this.chart = chart
      this.chartSort(this.sortBy)

      this.analyseChart()
      // itemsSource가 업데이트 될 떄 마다 data를 분석하지만, 최초로 차트가 생성 될 떄에는 itemsSource => itemsSourceCollection으로의 변형이 initialized 전에 실향되므로, 이 때에는 chart가 없으므로 chart.series에 대한 접근이 불가능. 따라서 차트 최초 생성시에 analyseChart()가 실행되어야 한다.

      chart.tooltip.showDelay = 100
      // chart.tooltip.content = ''
      // tooltip 표시를 위해 cpu usage가 과도하게 치솟는 오류 방지를 위해 100ms delay 설정.

      if (this.useZoom || this.useRawDataPopup) this.setZoombox(chart)
      // if (this.useZoom) this.setChartZoom(chart)
      // if (this.useRawDataPopup) this.setRawDataPopup(chart)
      if (this.stacking) this.chart.stacking = this.stacking

      chart.selectionChanged.addHandler((flexChartBase, eventArgs) => {
        this.$emit('selection-changed', flexChartBase, eventArgs)
      })

      this.initialized(chart)
    },

    chartRendered (renderEventArgs) {
      this.$emit('rendered', renderEventArgs)
    },

    chartRendering (renderEventArgs) {
      this.$emit('rendering', renderEventArgs)
    },

    chartRefreshed (renderEventArgs) {
      this.$emit('refreshed', renderEventArgs)
    },

    chartRefreshing (renderEventArgs) {
      this.$emit('refreshing', renderEventArgs)
    },

    /**
     * computed: itemsSourceCollection에 넣으려 했으나..
     * vue 정책할 computed method에 async function을 사용할 수 없는 관계로
     * 이렇게 독립시킴 ㅠㅠ
     */
    analyseChart (
      series = this.chart.series,
      itemsSource = this.itemsSourceCollection.items
    ) {
      if (!series) return false
      this.analysedChartData = this.analyseChartData(series, itemsSource)
    },

    /**
     * @param {FlexChart} chart Wijmo Flex Chart
     */
    setContextmenu () {
      this.setContextmenuActions()
      this.$el.addEventListener('contextmenu', e => {
        e.preventDefault()
        e.stopPropagation()
        if (this.contextmenu.actions.length) {
          this.contextmenu.visible = true
        }
        // console.log(this.$el, e, this.contextmenu.visible)
        this.contextmenu.left = e.offsetX
        this.contextmenu.top = e.offsetY
      }, true)
    },

    /**
     * wj-menu 가 initialized 되었을 떄 실행됩니다.
     * @param {WjMenu} contextmenu Wijmo Contextmenu
     */
    initContextmenu (contextmenu = this.contextmenu) {
      this.contextmenu = contextmenu
      // console.log('@initContextmenu', contextmenu)
    },

    contextmenuItemClicked (contextmenu = this.contextmenu) {
      // console.log('@contextmenuItemClicked', contextmenu)
    },

    /**
     * itemsSource를 분석해 min, max값을 알아냅니다.
     * wijmo chart는 좌측 yAxis의 표현이 빈약하기 때문에,
     * yAxis의 Label을 바르게 표현하기 위해 사용합니다.
     * !!!!!
     * 차트의 point가 만건단위 이상으로 올라가게 되면 async로 변혈 필요
     * !!!!!
     * @param {FlexChart} chart Wijmo Flexchart
     * @param {Array} itemsSource sk-chart의 itemsSource
     * @return {Object} min, max, range등을 가진 object를 리턴합니다.
     */
    async analyseChartData (
      series = this.chart.series,
      itemsSource = this.itemsSourceCollection.items
    ) {
      let bindings = {}
      let result = {}
      let bindingX = this.bindingX
      let xVals = []

      // 차트의 시리즈로부터 바인딩을 구해 binding에 저장
      series.forEach(item => {
        bindings[item.binding] = []
      })
      // console.log('bindings:', bindings)

      itemsSource.forEach(item => {
        // bindings에 해당하는 value들을 binding에 저장합니다.
        // 값의 비교는 하지 않습니다. 일단 저장 후 sort() 합니다.
        for (let key in bindings) {
          bindings[key].push(item[key])
        }
        xVals.push(item[bindingX])
      })

      for (let key in bindings) {
        bindings[key].sort()
        result[key] = {}
        result[key].min = bindings[key][0]
        result[key].max = bindings[key][bindings[key].length - 1]
      }
      xVals.sort()

      let resultYMin
      let resultYMax

      // 전체 시리즈들의 min/max 찾기
      for (let key in result) {
        if (!resultYMin) resultYMin = result[key].min
        if (result[key].min < resultYMin) resultYMin = result[key].min
        if (!resultYMax) resultYMax = result[key].max
        if (result[key].max > resultYMax) resultYMax = result[key].max
      }

      result.yMin = resultYMin
      result.yMax = resultYMax
      result.xMin = xVals[0]
      result.xMax = xVals[xVals.length - 1]

      return result
    },

    createCollectionView (
      itemsSource = this.itemsSource,
      options = this.collectionViewOptions
    ) {
      return new WjCore.CollectionView(itemsSource, options)
    },

    chartItemFormatter (engine, event, renderer) {
      if (this.itemFormatter) {
        engine = this.itemFormatter(engine, event, renderer)
      }
      renderer()
    },

    getDistance (zoom = this.zoom) {
      // zoom이 된 상태에서 또 줌을 할 겨웅 ptEnd가 null / undefined가 되는 경우가 있음.
      if (!zoom.ptEnd || !zoom.ptStart) return 0
      let distanceX = Math.abs(zoom.ptEnd.clientX - zoom.ptStart.clientX)
      let distanceY = Math.abs(zoom.ptEnd.clientY - zoom.ptStart.clientY)
      return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2))
    },

    /**
     * 차트 줌 기능 설정
     * @param {FlexChart} cahrt wijmo chart를 받습니다.
     */
    setChartZoom (chart = this.chart) {
      console.warn('::DEPRECATED. setZoombox에서 해당 처리를 모두 실행합니다')
      chart.hostElement.addEventListener('mouseup', e => {
        if (this.zoom.type === 'ZOOM') {
          if (this.getDistance(this.zoom) > this.minimumZoomDistance) this.applyZoom(this.chart, this.zoom)
          this.zoom.ptStart = this.zoom.ptEnd = null
          this.updateZoomBox()
        }
        this.zoom.type = undefined
      })
    },

    /**
     * Raw Data를 표시하는 팝업 설정
     * @param {FlexChart} chart wijmo chart를 받습니다.
     */
    setRawDataPopup (chart = this.chart) {
      console.warn('::DEPRECATED. setZoombox에서 해당 처리를 모두 실행합니다')
      chart.hostElement.addEventListener('mouseup', e => {
        // console.log('MOUSEUP', this.zoom.type)
        if (this.zoom.type === 'RAW_DATA_POPUP') {
          if (this.getDistance(this.zoom) > this.minimumZoomDistance) this.getRawDataFromChart(this.cahrt, this.zoom)
          this.zoom.ptStart = this.zoom.ptEnd = null
          this.zoom.type = undefined
          this.updateZoomBox()
        }
      })
    },

    /**
     * 차트의 bindingX 타입이 Date인지 체크하고, 해당 아이템의 시간을 Date 객체로 변형합니다.
     */
    parseBindingXType (
      itemsSource = this.itemsSource,
      bindingX = this.bindingX
    ) {
      itemsSource.forEach(item => {
        if (this.bindingXType === 'DATE') {
          // console.log('@parseBindingXType', item[bindingX])
          item[bindingX] = Dayjs(item[bindingX]).valueOf()
        }
      })
      return itemsSource
    },

    /**
     * 챠트에서 데이터를 추출합니다. 현재로서는 y값에 대한 필터링은 하지 않습니다.
     * Miltiple Y Axis를 가진 챠트의 경우 필터링 값에 중복이 발생 할 수 있습니다.
     * @param {FlexChart} chart wijmo FlexChart
     * @param {Object} coords {xMin, yMin, xMax, yMax} 값을 가진 Object
     */
    dataExtractor (
      chart = this.chart,
      coords = {}
    ) {
      let arr = []
      chart.itemsSource.items.forEach((point, index) => {
        let xVal = (typeof point[chart.bindingX] === 'number') ? point[chart.bindingX] : index
        if (xVal > coords.xMin && xVal < coords.xMax) {
          arr.push(point)
        }
      })
      return arr
    },

    /**
     * zoomBox영역으로부터 받아온 데이타를 통해 raw data를 가져오고 raw data 팝업을 표시합니다.
     * @param {FlexChart} chart wijmo FlexChart
     * @param {Object} zoom zoombox를 받습니다.
     */
    getRawDataFromChart (
      chart = this.chart,
      zoom = this.zoom
    ) {
      // 가져온 min/max값을 이용해 데이터를 추출합니다.
      let present = this.getZoomBoxPresent(chart, zoom)
      let data = this.dataExtractor(chart, {
        xMin: present.xMin,
        yMin: present.yMin,
        xMax: present.xMax,
        yMax: present.yMax
      })
      // 챠트를 클릭만 해도 start/end가 생겨버림.
      // 실제 해당된 구간에서 추출된 데이터가 있을 시에만 모달 표시하기 위해 condition 설정.
      // if (this.extractedData.length) this.isRawDataModalVisible = true
      this.isRawDataModalVisible = true
      this.extractedData = this.formatGridData(data)
      return data
    },

    /**  */
    formatGridData (
      data = this.itemsSource,
      bindingX = this.bindingX,
      bindingXType = this.bindingXType
    ) {
      return data.map(item => {
        let obj = { ...item }
        if (bindingXType === 'DATE') {
          let date = _.get(item, bindingX)
          let formattedDate = Dayjs(date).format('YYYY-MM-DD HH:mm:ss')
          _.set(obj, bindingX, formattedDate)
          // console.log(obj.date, bindingX, formattedDate)
        }
        return obj
      })
    },

    /**
     * ZoomBox의 사이즈와 위치로부터 차트 데이터의 min/max를 추출합니다.
     */
    getZoomBoxPresent (
      chart = this.chart,
      zoom = this.zoom
    ) {
      // 기본값들을 초기화합니다.
      let xMin = null
      let yMin = null
      let xMax = null
      let yMax = null
      if (zoom.ptStart && zoom.ptEnd) {
        let rect = chart.hostElement.getBoundingClientRect()
        xMin = Math.min(zoom.ptStart.clientX, zoom.ptEnd.clientX) - rect.left
        yMin = Math.min(zoom.ptStart.clientY, zoom.ptEnd.clientY) - rect.top
        xMax = Math.max(zoom.ptStart.clientX, zoom.ptEnd.clientX) - rect.left
        yMax = Math.max(zoom.ptStart.clientY, zoom.ptEnd.clientY) - rect.top
        // flexChart의 pointToData Method를 이용해 min, max값의 포인터 좌표에 해당하는 value를 가져옵니다.
        let pMin = chart.pointToData(xMin, yMin)
        let pMax = chart.pointToData(xMax, yMax)
        xMin = Math.min(pMin.x, pMax.x)
        yMin = Math.min(pMin.y, pMax.y)
        xMax = Math.max(pMin.x, pMax.x)
        yMax = Math.max(pMin.y, pMax.y)
      }
      return {
        xMin: xMin,
        yMin: yMin,
        xMax: xMax,
        yMax: yMax
      }
    },

    /**
     * 차트의 위치와 zoombox의 사이즈로부터 데이타를 추출하고 챠트를 크롭합니다.
     */
    applyZoom (chart = this.chart, zoom = this.zoom) {
      let present = this.getZoomBoxPresent(chart, zoom)
      this.chart.deferUpdate(() => {
        // 줌 리셋이면 present.min/max 값에 null이 오게 됩니다.
        // 이 경우 chart.axisX/Y.min/max를 null로 설정하게 되면 시리즈의 value에 따라 자동 크롭이 되므로, 사전 지정되어있는 min/max로 되돌리기 위해 분기 처리 합니다.
        this.chart.axisX.min = ((present.xMin === null) && this.xMin) ? this.xMin : present.xMin
        this.chart.axisY.min = ((present.yMin === null) && this.yMin) ? this.yMin : present.yMin
        this.chart.axisX.max = ((present.xMax === null) && this.xMax) ? this.xMax : present.xMax
        this.chart.axisY.max = ((present.yMax === null) && this.yMax) ? this.yMax : present.yMax
      })
      if (this.useRangeSelector) {
        let xMin = this.chart.axisX.min === null ? this.rangeXInitial[0] : this.chart.axisX.min
        let xMax = this.chart.axisX.max === null ? this.rangeXInitial[1] : this.chart.axisX.max
        let yMin = this.chart.axisY.min === null ? this.rangeYInitial[0] : this.chart.axisY.min
        let yMax = this.chart.axisY.max === null ? this.rangeYInitial[1] : this.chart.axisY.max
        this.rangeX = [xMin, xMax]
        this.rangeY = [yMin, yMax]
      }
    },

    /**
     * Zoom을 초기화시킵니다. 컨텍스트 메뉴나 화면에 있는 reset 버튼을 통해 호출될 수 있습니다.
     */
    resetZoom () {
      // console.log('@resetZoom')
      this.zoom.ptStart = this.zoom.ptEnd = null
      this.updateZoomBox()
      this.applyZoom(this.chart, this.zoom)
    },

    resetMinimap (collection = this.itemsSourceCollection) {
      if (this.minimap) {
        this.minimap.min = collection.getAggregate('Min', 'date')
        this.minimap.max = collection.getAggregate('Max', 'date')
      }
    },

    /**
     * 차트에 마우스 다운/업 이벤트를 등록하고 줌 박스를 표시할 수 있도록 합니다.
     */
    setZoombox (chart = this.chart) {
      chart.hostElement.addEventListener('mousedown', e => {
        this.zoom.hostElement = chart.hostElement.getBoundingClientRect()
        // console.log(chart.hostElement, this.zoom.hostElement)
        if (this.useZoom) {
          this.zoom.type = 'ZOOM'
          if (e.which === 1) this.zoom.ptStart = e
        }
        if (this.useRawDataPopup) {
          if (e.metaKey || e.ctrlKey) {
            this.zoom.type = 'RAW_DATA_POPUP'
            if (e.which === 1) this.zoom.ptStart = e
          }
        }
      })
      chart.hostElement.addEventListener('mousemove', e => {
        if (this.zoom.ptStart && this.zoom.type) {
          // console.log(this.zoom.type)
          this.zoom.ptEnd = e
          this.updateZoomBox(this.zoom)
        }
      })
      chart.hostElement.addEventListener('mouseup', e => {
        if (this.getDistance(this.zoom) > this.minimumZoomDistance) {
          if (this.zoom.type === 'ZOOM') {
            this.applyZoom(this.chart, this.zoom)
          }
          if (this.zoom.type === 'RAW_DATA_POPUP') {
            // console.log('zoom.type:', this.zoom)
            this.getRawDataFromChart(this.chart, this.zoom)
          }
        }
        this.zoom.hostElement = undefined
        this.zoom.type = undefined
        this.zoom.ptStart = this.zoom.ptEnd = null
        this.updateZoomBox()
      })
    },

    /**
     * 차트를 마우스로 드래그 할 때 줌박스의 사이즈를 지속적으로 업데이트 시킵니다
     */
    updateZoomBox (zoom = this.zoom) {
      if (!zoom.box) {
        // let p1 = performance.now()
        // zoom.box = WjCore.createElement(`<div class="zoom-box" />`, document.body)
        if (!zoom.box) {
          zoom.box = document.createElement('div')
          zoom.box.setAttribute('class', 'zoom-box')
          document.body.appendChild(zoom.box)
        }
        // let p2 = performance.now()
        // console.log('@updateZoomox.createElement:', p2 - p1 + 'ms')
      }
      if (!zoom.ptStart) {
        // WjCore.setCss(zoom.box, {
        //   display: 'none'
        // })
        zoom.box.style.display = 'none'
      } else {
        // let ps1 = performance.now()
        let x = Math.min(zoom.ptStart.pageX, zoom.ptEnd.pageX)
        let y = (zoom.type === 'ZOOM') ? Math.min(zoom.ptStart.pageY, zoom.ptEnd.pageY) : zoom.hostElement.top
        let width = Math.max(zoom.ptStart.pageX, zoom.ptEnd.pageX) - x
        let height = (zoom.type === 'ZOOM') ? Math.max(zoom.ptStart.pageY, zoom.ptEnd.pageY) - y : zoom.hostElement.height
        zoom.box.style.display = 'none'
        zoom.box.style.transform = 'translateZ(0)'
        zoom.box.style.position = zoom.type === 'RAW_DATA_POPUP' ? 'fixed' : 'absolute'
        zoom.box.style.left = x + 'px'
        zoom.box.style.top = y + 'px'
        zoom.box.style.width = width + 'px'
        zoom.box.style.height = height + 'px'
        zoom.box.style.display = 'block'
        // if (width > 100) debugger

        /* WjCore.setCss(zoom.box, {
          display: 'block',
          position: zoom.type === 'RAW_DATA_POPUP' ? 'fixed' : 'absolute',
          left: x,
          top: y,
          width: width,
          height: height
        }) */
        // let ps2 = performance.now()
        // console.log('@updateZoombox.setCss:', ps2 - ps1 + 'ms')
      }
    },

    /**
     * 전체 Raw Data를 보려주는 Grid Popup을 푝시합니다.
     * @param {Array} data 표시할 itemsSource
     */
    showAllRawData (
      data = this.itemsSource
    ) {
      this.extractedData = this.formatGridData(data)
      this.isRawDataModalVisible = true
    },

    /**
     * Raw Data Grid에서 보여주는 데이터를 Excel로 출력합니다.
     */
    excelExport () {
      this.$refs.grid.exportExcel()
    },

    /**
     * 시리즈 선택 모달 이니셜라이즈
     * @param {Object} modal setSeriesModal 팝업 데이터 보관용
     */
    initSetSeriesModal (modal = this.setSeriesModal) {
      modal.active = true
    },

    /** 어그리게이션 선택 모달 이니셜라이즈 */
    initAggregationModal (modal = this.aggregationModal) {
      modal.active = true
    },

    /**
     * sortBy가 지정되어 있을 때 sorting을 실행합니다.
     * 차트의 date가 뒤죽박죽으로 올 떄 유용합니다.
     */
    chartSort (chart = this.cahrt, sortBy = this.sortBy) {
      if (!chart) return
      if (!sortBy) return
      this.$nextTick(function () {
        let sd = this.chart.collectionView.sortDescriptions
        if (sd.length) sd.shift()
        sd.push(new WjCore.SortDescription(sortBy, true))
      })
    },

    /**
     * chart의 raw data를 표시하는 grid가 initialized 될 떄 실행됩니다.
     * @param {WjFlexGrid} grid WjFlrxGrid Object
     */
    chartRawDataGridInitialized (grid) {
      this.rawDataGrid = grid
      this.rawDataGridInitialized(grid, this.$refs.grid)
    },

    /**
     * Chart의 툴팁 표시시 실행도비니다.
     * 기본적인 형태는 다음과 같습니다.
     * YYYY-MM-DD HH:mm:ss
     * --------------------
     * key    value
     * --------------------
     * @param {*} data wijmo tooltipContent
     * @return HTML String
     */
    chartTooltipContent (ht) {
      if (this.tooltipContent) {
        return this.tooltipContent(ht)
      } else {
        let val = ''
        if (ht.item.constructor.name === '_BoxPlot') {
          let keys = ['max', 'firstQuartile', 'mean', 'median', 'min']
          let keyValues = (key = '', item = ht.item) => {
            return `
            <div class="tooltip-body-item">
              <span class="item-key">
                ${key}
              </span>
              <span class="item-value">
                ${item[key]}
              </span>
            </div>
            `
          }
          val = `<span class="chart-tooltip">
              ${keys.map(key => keyValues(key)).join('')}
          </span>`
        } else {
          val = '<span class="chart-tooltip">'
          let headerText = Dayjs(ht.item[this.bindingX]).format(this.dateFormat)
          if (this.aggregationModal.range) {
            if (this.bindingXType === 'DATE') {
              headerText = Dayjs(ht.item[this.bindingX]).format(this.dateFormatByRange[this.aggregationModal.range])
            } else {
              headerText = ht.item[this.bindingX]
              if (this.xAxisRange) {
                let next = Number(ht.item[this.bindingX]) + Number(this.xAxisRange)
                headerText = ht.item[this.bindingX] + ' ~ ' + next
              }
            }
          }
          val += '<div class="tooltip-header">' + headerText + '</div>'
          for (let key in ht.item) {
            if (key !== ht.chart.bindingX) {
              val += '<div class="tooltip-body-item">'
              val += '<span class="item-key">' + key + '</span>'
              val += '<span class="item-value">' + ht.item[key] + '</span>'
              val += '</div>'
            }
          }
          val += '</span>'
        }
        return val
      }
    },

    /**
     * X축의 Label을 포멧팅할 떄 실행됩니다.
     * X축은 기본적으로 시계열 데이타를 받을 것으로 간주되므로 지정된 형태의 날짜를 표기합니다.
     */
    chartXItemFormatter (engine, label) {
      if (this.xItemFormatter) {
        return this.xItemFormatter(engine, label)
      } else {
        // console.log(this.useAggregation, _.isString(this.xAxisRange))
        if (this.aggregationModal.range) {
          if (_.isString(this.aggregationModal.range)) {
            if (label.val > this.labelAsText || this.labelAsText === true) {
              label.text = Dayjs(label.val).format(this.dateFormatByRange[this.aggregationModal.range])
            }
            // console.log(this.aggregationModal.range, '=>', label.text, ':::', this.dateFormatByRange[this.aggregationModal.range])
            return label
          } else {
            return label
          }
        } else {
          if (this.bindingXType === 'DATE') {
            label.text = Dayjs(label.val).format(this.dateFormat)
          }
          return label
        }
      }
    },

    /**
     * X축의 Label을 포멧팅할 떄 실행됩니다.
     * Y축은 숫자로 된 데이터를 받을것으로 간주합니다.
     * yItemFormatter가 지정되어있지 않다면 K, M, G 등의 단위를 붙여 표시합니다.
     */
    chartYItemFormatter (engine, label) {
      if (this.yItemForamtter) {
        return this.yItemFormatter(engine, label)
      } else {
        if (this.chartType === 'Bar') return label
        label.text = this.unitFormatter(label.val)
        return label
      }
    },

    /**
     * useAggregation을 사용한다면 데이터를 파싱하기 위해 실행됩니다.
     */
    setAggregation (
      array = this.itemsSource,
      binding = this.bindingX,
      type = this.aggregationModal.apply ? this.aggregationModal.type : this.aggregationType,
      range = this.aggregationModal.apply ? this.aggregationModal.range : this.xAxisRange,
      series = this.aggregationSeries
    ) {
      console.log('@setAggregation', binding, type, series.range)
      let methods = {
        SUM: Aggregates.sum,
        COUNT: Aggregates.count
      }
      if (!series.length) series = [binding]
      let result = methods[type](array, binding, range, series)
      if (result.length < this.labelAsText || this.labelAsText === true) {
        result.forEach(item => {
          item[binding] = Dayjs(item[binding]).format(this.dateFormatByRange[range])
        })
      }
      // this.$emit('update:xAxisRange', range) 동작을 안하네...
      return result
    },

    /**
     * 1,000 -> 1K,
     * 1,000,000 -> 1M
     * 등으로 단위 표기를 변환합니다.
     * @param {Number} num 소스 넘버
     * @param {Number} digits 표시할 소수점 자리
     */
    unitFormatter (num, digits = 1) {
      var si = [
        { value: 1, symbol: '' },
        { value: 1E3, symbol: 'k' },
        { value: 1E6, symbol: 'M' },
        { value: 1E9, symbol: 'G' },
        { value: 1E12, symbol: 'T' },
        { value: 1E15, symbol: 'P' },
        { value: 1E18, symbol: 'E' }
      ]
      var rx = /\.0+$|(\.[0-9]*[1-9])0+$/
      var i
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break
        }
      }
      if (this.chartYMax - this.chartYMin > 1 || num > 999) {
        return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
      }
      return num
    },

    getDuration (
      itemsSource = this.itemsSourceCollection.items,
      bindingX = this.bindingX
    ) {
      let start = itemsSource[0][bindingX]
      let end = itemsSource[itemsSource.length - 1][bindingX]
      return Math.abs(end - start)
    },

    /**
     * 어그리게이션 설정 팝업에서 설정한 옵션을 차트에 적용합니다.
     */
    applyAggregation (condition = this.aggregationModal) {
      condition.active = false
      this.$emit('update:xAxisRange', condition.range)
      this.$emit('update:aggregationType', condition.type)
      this.$emit('update:aggregationSeries', condition.selectedSeries)
    },

    minimapInitialized (minimap) {
      console.log('@minimapInitialized', minimap)
      this.minimap = minimap
    },

    /**
     * 미니맵의 range selector 핸들을 이용해 차트의 레인지를 바꿨을 떄 실행됩니다.
     */
    minimapRangeChanged (sender) {
      // console.log('@minimapRangeChanged', sender)
      let theChart = this.chart
      theChart.beginUpdate()
      theChart.axisX.min = sender.min
      theChart.axisX.max = sender.max
      /* if (this.aggSeries.autoGroupIntervals.length === 1) {
        this.aggSeries.autoGroupIntervals = ['WW', 'MM', 'YYYY']
      } */
      theChart.endUpdate()
    },
    setContextmenuActions (actions = this.contextmenuActions) {
      this.contextmenu.actions = []
      if (actions.includes('reset-zoom')) {
        this.contextmenu.actions.push({
          label: '줌 초기화',
          method: () => {
            this.resetZoom()
          }
        })
      }
      if (actions.includes('show-raw-data')) {
        this.contextmenu.actions.push({
          label: 'Raw Data 확인',
          method: () => {
            this.showAllRawData()
          }
        })
      }
      if (actions.includes('aggregation')) {
        this.contextmenu.actions.push({
          label: 'Aggregation',
          method: () => {
            this.initAggregationModal()
          }
        })
      }
    }
  },
  data () {
    return {
      extractedData: [], // rawData 추출용 Array
      isRawDataModalVisible: false,
      zoom: {}, // zoom 설정을 위한 object,
      contextmenu: {
        visible: false,
        left: 0,
        top: 0,
        actions: []
      }, // contextmenu 저장을 위한 object
      analysedChartData: {},
      setSeriesModal: {
        active: false,
        displayMethod: this.seriesDisplayMethod
      },
      aggregationModal: {
        active: false,
        apply: false, // 이 aggregation 형태를 적용할지 여부
        range: this.xAxisRange,
        ranges: [
          { value: 'hour', label: '1시간' },
          { value: 'day', label: '1일' },
          { value: 'week', label: '1주' },
          { value: 'month', label: '1달' }
        ],
        type: this.aggregationType,
        types: [
          { value: 'COUNT', label: 'COUNT' }
          /* { value: 'SUM', label: 'SUM' } */
        ],
        selectedSeries: this.aggregationSeries
      },
      dateFormatByRange: {
        'minute': 'YYYY-MM-DD HH:mm',
        'hour': 'YYYY-MM-DD HH:mm',
        'day': 'YYYY-MM-DD',
        'week': 'YYYY-MM-DD',
        'month': 'YYYY-MM',
        'year': 'YYYY'
      },
      durations: {
        'minute': 1000 * 60,
        'hour': 1000 * 60 * 60,
        'day': 1000 * 60 * 60 * 24,
        'week': 1000 * 60 * 60 * 24 * 7,
        'month': 1000 * 60 * 60 * 24 * 31,
        'year': 1000 * 60 * 60 * 24 * 365
      }
    }
  }
}
</script>
<style lang="scss">
.zoom-box {
  top: 0;
  left: 0;
  border: 1px dashed #ccc;
  &.-RAW_DATA_POPUP {
    position: fixed;
  }
}
.chart-tooltip {
  .tooltip-body-item {
    .item-key {
      font-weight: bold;
      margin-right: 5px;
    }
    .item-value {
      font-weight: normal;
      word-break: break-all;
    }
  }
}
.sk-chart {
  height: 100%;
  max-height: 80vh;
  width: 100%;
  position: relative;
  display: block;
  transform: translateZ(0);
  &.-has-minimap {
    .chart-main {
      height: calc(100% - 30px);
    }
  }
  &.-has-header {
    .chart-main {
      height: calc(100% - 30px);
    }
  }
  &.-has-minimap.-has-header {
    .chart-main {
      height: calc(100% - 60px);
    }
  }
  .chart-header {
    height: 30px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    line-height: 30px;
  }
  .chart-main {
    // max-height: 80vh;
    height: 100%;
    margin-bottom: 0;
    padding: 0;
    border: none;
  }
  .modal-card.-set-aggregation {
    .aggregation-option {
      margin-bottom: $gap;
      > .field {
        flex-wrap: wrap;
        .b-checkbox {
          margin-left: 0;
          margin-right: $gap;
          margin-bottom: $gap-s;
        }
      }
    }
  }
  .modal-card.-raw-data {
    width: 90vw;
    .modal-card-body {
      padding: 0;
      max-height: 70vh;
      position: relative;
      .sk-wijmo-grid {
        height: 70vh;
      }
    }
  }
  .chart-minimap {
    height: 30px;
    padding: 0;
  }
  .chart-contextmenu {
    display: none;
    z-index: $z-popover;
    flex-direction: column;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    position: fixed;
    &.-visible {
      display: flex;
    }
    .contextmenu-block {
      position: absolute;
      background-color: $c-bg-base;
      border-radius: $radius;
      box-shadow: 0 3px 15px rgba(0, 0, 0, .5);
      padding: $gap-s;
      .contextmenu-list {
        display: flex;
        flex-direction: column;
        .contextmenu-list-item {
          display: block;
          cursor: pointer;
          line-height: 2em;
          &:hover {
            color: $c-primary;
          }
        }
        .contextmenu-list-divider {
          height: 1px;
          background-color: $c-text;
          opacity: .3;
          margin-top: $gap-s;
          margin-bottom: $gap-s;
        }
      }
    }
  }
}
</style>
