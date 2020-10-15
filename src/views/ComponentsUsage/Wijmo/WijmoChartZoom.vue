<template>
  <div class="chart-container">
    <h2 class="chart-title">
      Chart Zoom
    </h2>
    <b-button
      size="is-normal"
      @click="resetZoom"
    >
      reset
    </b-button>
    <wj-flex-chart
      :items-source="chartData"
      binding-x="date"
      chart-type="Column"
      header="Zoomable Chart"
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
        name="Series 0"
        chart-type="Line"
      />
      <wj-flex-chart-series
        binding="high"
        name="Average High"
        chart-type="Line"
      />
    </wj-flex-chart>
  </div>
</template>

<script>
import ChartData from './chartData'
import Config from '@/miip.config.js'
import * as wjCore from '@grapecity/wijmo'
import Dayjs from 'dayjs'

export default {
  name: 'WijmoChartZoom',
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
    formatXAxis (engine, label) {
      label.text = Dayjs(label.val).format('YYYY/MM/DD')
      return label
    },
    initSeries () {
      console.log('@initSeries')
    },
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
        let x = Math.min(this.zoom.ptStart.pageX, this.zoom.ptEnd.pageX)
        let y = Math.min(this.zoom.ptStart.pageY, this.zoom.ptEnd.pageY)
        let width = Math.max(this.zoom.ptStart.pageX, this.zoom.ptEnd.pageX) - x
        let height = Math.max(this.zoom.ptStart.pageY, this.zoom.ptEnd.pageY) - y
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
        let pMin = this.chart.pointToData(xMin, yMin)
        let pMax = this.chart.pointToData(xMax, yMax)
        console.log('@applyZoom', rect, pMin, pMax)
        xMin = Math.min(pMin.x, pMax.x)
        yMin = Math.min(pMin.y, pMax.y)
        xMax = Math.max(pMin.x, pMax.x)
        yMax = Math.max(pMin.y, pMax.y)
      }
      this.chart.deferUpdate(() => {
        this.chart.axisX.min = xMin
        this.chart.axisY.min = yMin
        this.chart.axisX.max = xMax
        this.chart.axisY.max = yMax
      })
    },
    resetZoom () {
      console.log('@resetZoom')
      this.zoom.ptStart = this.zoom.ptEnd = null
      this.updateZoomBox()
      this.applyZoom()
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
      chartData: ChartData.randomTrend(1, 365)
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
</style>
