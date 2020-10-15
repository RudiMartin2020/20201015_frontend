<template>
  <div class="chart-container">
    <h2 class="chart-title">
      X/Y축 단위
    </h2>
    <wj-flex-chart
      header="Country GDP"
      binding-x="country"
      selection-mode="Point"
      chart-type="Column"
      :items-source="chartData"
      :palette="palette"
    >
      <!-- <wj-flex-chart-legend position="Bottom" /> -->

      <wj-flex-chart-axis
        wj-property="axisY"
        :item-formatter="formatAY"
      />

      <wj-flex-chart-series
        name="2014"
        binding="2014"
      />
      <wj-flex-chart-series
        name="2015"
        binding="2015"
      />
      <wj-flex-chart-series
        name="2016"
        binding="2016"
      />
    </wj-flex-chart>
  </div>
</template>
<script>
import ChartData from './chartData'
import Config from '@/miip.config.js'

export default {
  name: 'WijmoChartAxisUnit',
  methods: {
    formatAY (engine, label) {
      label.text = '$ ' + this.formatter(label.val)
      return label
    },
    formatter (num, digits = 1) {
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
      return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
    }
  },
  data () {
    return {
      chartData: ChartData.bar,
      palette: Config.PALETTE
    }
  }
}
</script>
