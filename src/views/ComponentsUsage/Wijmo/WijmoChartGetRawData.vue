<template>
  <div class="chart-container">
    <h2 class="chart-title">
      Get raw data &amp; combined Tooltip
    </h2>
    <wj-flex-chart
      :items-source="chartData"
      binding-x="date"
      chart-type="Column"
      header="365 Random Data"
      :tooltip-content="formatTooltip"
      :initialized="initialize"
      :palette="palette"
    >
      <wj-flex-chart-legend position="Bottom" />
      <wj-flex-chart-axis
        wj-property="axisX"
        :item-formatter="formatXAxis"
      />
      <wj-flex-chart-series
        binding="series-0"
        name="series-0"
        chart-type="Line"
      />
      <wj-flex-chart-series
        binding="series-3"
        name="series-3"
        chart-type="Area"
      />
    </wj-flex-chart>
    <b-modal :active.sync="isModalVisible">
      <wj-flex-grid
        :items-source="extractedData"
        :initialized="gridInitialized"
        style="width: 100%;"
      />
    </b-modal>
  </div>
</template>

<script>
import ChartData from './chartData'
import Config from '@/miip.config.js'
import * as wjCore from '@grapecity/wijmo'
import Dayjs from 'dayjs'

export default {
  name: 'WijmoChartGetRawData',
  methods: {
    initialize (chart) {
      this.chart = chart
      chart.hostElement.addEventListener('mousedown', e => { this.zoom.ptStart = e })
      chart.hostElement.addEventListener('mousemove', e => {
        if (this.zoom.ptStart) {
          this.zoom.ptEnd = e
          this.updateZoomBox()
        }
      })
      chart.hostElement.addEventListener('mouseup', e => {
        this.applyZoom()
        this.zoom.ptStart = this.zoom.ptEnd = null
        this.updateZoomBox()
      })
    },
    gridInitialized (grid) {
      console.log('@gridInitialized')
    },
    initSeries () {
      console.log('@initSeries')
    },
    /**
     * 챠트를 드래그 할 때 드래그 한 영역을 표시합니다.
     */
    updateZoomBox () {
      // console.log('@updateZoomBox', this.zoom.ptStart, '/', this.zoom.ptEnd)
      if (!this.zoom.box) {
        this.zoom.box = wjCore.createElement('<div class="zoom-box"></div>', document.body)
      }
      if (!this.zoom.ptStart) {
        wjCore.setCss(this.zoom.box, {
          display: 'none'
        })
      } else {
        // updateZoombox는 마우스 커서가 이동할 때 마다 실행됩니다.
        // 마우스 포인터 시작점의 xy값과, 현재 커서의 xy값을 이용해 박스의 좌표를 설정합니다.
        let x = Math.min(this.zoom.ptStart.pageX, this.zoom.ptEnd.pageX)
        let y = Math.min(this.zoom.ptStart.pageY, this.zoom.ptEnd.pageY)
        let width = Math.max(this.zoom.ptStart.pageX, this.zoom.ptEnd.pageX) - x
        let height = Math.max(this.zoom.ptStart.pageY, this.zoom.ptEnd.pageY) - y
        // 그리고, css 속성을 지속적으로 업데이트 합니다.
        wjCore.setCss(this.zoom.box, {
          display: 'block',
          left: x,
          top: y,
          width: width,
          height: height
        })
      }
    },
    applyZoom () {
      console.log('@applyZoom')
      // 기본값들을 초기화합니다.
      let xMin = null
      let yMin = null
      let xMax = null
      let yMax = null
      if (this.zoom.ptStart && this.zoom.ptEnd) {
        let rect = this.chart.hostElement.getBoundingClientRect()
        xMin = Math.min(this.zoom.ptStart.clientX, this.zoom.ptEnd.clientX) - rect.left
        yMin = Math.min(this.zoom.ptStart.clientY, this.zoom.ptEnd.clientY) - rect.top
        xMax = Math.max(this.zoom.ptStart.clientX, this.zoom.ptEnd.clientX) - rect.left
        yMax = Math.max(this.zoom.ptStart.clientY, this.zoom.ptEnd.clientY) - rect.top
        // flexChart의 pointToData Method를 이용해 min, max값의 포인터 좌표에 해당하는 value를 가져옵니다.
        let pMin = this.chart.pointToData(xMin, yMin)
        let pMax = this.chart.pointToData(xMax, yMax)
        xMin = Math.min(pMin.x, pMax.x)
        yMin = Math.min(pMin.y, pMax.y)
        xMax = Math.max(pMin.x, pMax.x)
        yMax = Math.max(pMin.y, pMax.y)
      }
      // 가벼온 min/max값을 이용해 데이터를 추출합니다.
      this.extractedData = this.dataExtractor(this.chart, {
        xMin: xMin,
        yMin: yMin,
        xMax: xMax,
        yMax: yMax
      })
      // 챠트를 클릭만 해도 start/end가 생겨버림.
      // 실제 해당된 구간에서 추출된 데이터가 있을 시에만 모달 표시하기 위해 condition 설정.
      if (this.extractedData.length) this.isModalVisible = true
    },

    /**
     * 챠트에서 데이터를 추출합니다. 현재로서는 y값에 대한 필터링은 하지 않습니다.
     * Miltiple Y Axis를 가진 챠트의 경우 필터링 값에 중복이 발생 할 수 있습니다.
     * @param {FlexChart} chart wijmo FlexChart
     * @param {Object} coords {xMin, yMin, xMax, yMax} 값을 가진 Object
     */
    dataExtractor (chart, coords = {}) {
      let arr = []
      chart.itemsSource.forEach((point, index) => {
        let xVal = (typeof point[chart.bindingX] === 'number') ? point[chart.bindingX] : index
        if (xVal > coords.xMin && xVal < coords.xMax) {
          arr.push(point)
        }
      })
      return arr
    },
    resetZoom () {
      console.log('@resetZoom')
      this.zoom.ptStart = this.zoom.ptEnd = null
      this.updateZoomBox()
      this.applyZoom()
    },
    formatXAxis (engine, label) {
      label.text = Dayjs(label.val).format('YYYY/MM/DD')
      return label
    },
    formatTooltip (info) {
      let val = '<span class="chart-tooltip">'
      val += '<div class="tooltip-header">' + Dayjs(info.item.date).format('YYYY/MM/DD HH:mm:ss') + '</div>'
      for (let key in info.item) {
        if (key !== info.chart.bindingX) {
          val += '<div class="tooltip-body-item">'
          val += '<span class="item-key">' + key + '</span>'
          val += '<span class="item-value">' + info.item[key] + '</span>'
          val += '</div>'
        }
      }
      val += '</span>'
      return val
    }
  },
  data () {
    return {
      palette: Config.PALETTE,
      zoom: {
        ptStart: null,
        ptEnd: null,
        box: null
      },
      chart: {},
      chartData: ChartData.randomTrend(5),
      extractedData: [],
      isModalVisible: false
    }
  }
}
</script>

<style lang="scss">
.zoom-box {
  position: absolute;
  display: block;
  border: 1px dashed #999;
  background-color: rgba(0, 0, 0, .1);
  pointer-events: none;
  z-index: 40;
}

.chart-tooltip {
  .tooltip-header { font-weight: bold; }
  .tooltip-body-item {
    .item-key {
      margin-right: 10px;
    }
  }
}
</style>
