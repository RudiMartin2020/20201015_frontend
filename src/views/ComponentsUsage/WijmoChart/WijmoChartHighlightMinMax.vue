<template>
  <div class="chart-container">
    <h2 class="chart-title">
      Highlight Chart Min/Max
    </h2>
    <wj-flex-chart
      :items-source="chartData"
      binding-x="date"
      chart-type="SplineSymbols"
      header="100 Random Data"
      :tooltip-content="formatTooltip"
      :initialized="initialize"
      :item-formatter="itemFormatter"
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
        binding="series-1"
        name="series-1"
        :symbol-size="3"
      />
      <wj-flex-chart-annotation-layer>
        <wj-flex-chart-annotation-rectangle
          content="Level1 "
          attachment="DataCoordinate"
          position="2"
          :point="{x: chartData[0].date, y: limit.lv1}"
          :style="{ fill: '#33f', 'fill-opacity': .2, 'stroke-width': 0 }"
          :width="10000"
          :height="10000"
        />
        <wj-flex-chart-annotation-rectangle
          content="LV2"
          attachment="DataCoordinate"
          position="1"
          :point="{x: chartData[0].date, y: limit.lv2}"
          :style="{ fill: '#f33', 'fill-opacity': .2, 'stroke-width': 0 }"
          :width="10000"
          :height="10000"
        />
      </wj-flex-chart-annotation-layer>
    </wj-flex-chart>
  </div>
</template>

<script>
import ChartData from './chartData'
import Config from '@/miip.config.js'
import Dayjs from 'dayjs'

export default {
  name: 'WijmoChartMinMax',
  methods: {
    initialize (chart) {},
    initSeries () {
      console.log('@initSeries')
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
    },
    itemFormatter (engine, item, renderer) {
      if (item.y < this.limit.lv1) {
        engine.stroke = '#89f'
        engine.fill = '#89f'
      } else if (item.y > this.limit.lv2) {
        engine.stroke = '#f33'
        engine.fill = '#f33'
      }
      renderer()
    }
  },
  data () {
    return {
      palette: Config.PALETTE,
      chart: {},
      chartData: ChartData.randomTrend(5, 100),
      extractedData: [],
      limit: {
        lv1: -5,
        lv2: 15
      }
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
