<template>
  <div class="chart-container">
    <h2 class="chart-title">
      Random keys in one series
    </h2>
    <wj-flex-chart
      :items-source="chartData"
      binding-x="date"
      chart-type="Line"
      :tooltip-content="formatTooltip"
      :initialized="initialize"
      :palette="palette"
      :legend-toggle="true"
    >
      <wj-flex-chart-axis
        wj-property="axisX"
        :item-formatter="formatAX"
      />
      <wj-flex-chart-legend position="Bottom" />
      <wj-flex-chart-series
        binding="series"
        name="series"
      />
    </wj-flex-chart>
    <b-field>
      <b-checkbox-button
        v-model="seriesVisible"
        :native-value="item"
        v-for="item in series"
        :key="item"
      >
        {{ item }}
      </b-checkbox-button>
    </b-field>
  </div>
</template>

<script>
import ChartData from './chartData'
import Config from '@/miip.config.js'
import Dayjs from 'dayjs'

let series = ['janet', 'xavier', 'johnston', 'shawn', 'tom', 'eric', 'john', 'johanson', 'peter', 'atrthur']
export default {
  name: 'WijmoChartRandomKeysInOneSeries',
  methods: {
    initialize (chart) {
      this.chart = chart
    },
    formatAX (engine, label) {
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
  watch: {
    seriesVisible (newval) {
      let p1 = performance.now()
      this.chart.collectionView.filter = item => {
        return this.seriesVisible.includes(item.random)
      }
      let p2 = performance.now()
      console.log('@watch.seriesVisible:', p2 - p1, 'ms')
    }
  },
  data () {
    return {
      palette: Config.PALETTE,
      chartData: ChartData.randomKeyInOneSeries([...series], 200),
      extractedData: [],
      series: [...series],
      seriesVisible: [...series]
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
