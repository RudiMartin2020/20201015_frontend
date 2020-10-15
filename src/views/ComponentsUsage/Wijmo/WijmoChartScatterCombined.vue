<template>
  <div class="chart-container">
    <h2 class="chart-title">
      Scattered chart and trendlines
    </h2>
    <wj-flex-chart
      :items-source="chartData"
      binding-x="x"
      chart-type="Scatter"
      :initialized="initialize"
    >
      <wj-flex-chart-legend position="Bottom" />
      <wj-flex-chart-series
        binding="series-0"
        name="series-0"
      />
      <wj-flex-chart-series
        binding="series-1"
        name="series-1"
      />
      <wj-flex-chart-series
        binding="series-2"
        name="series-2"
      />
      <wj-flex-chart-trend-line
        binding="series-0"
        name="trendLine"
        fit-type="Polynomial"
        :order="4"
        :style="{ stroke: '#38c', 'stroke-width': 2 }"
      />
      <wj-flex-chart-trend-line
        binding="series-1"
        name="trendLine"
        fit-type="Polynomial"
        :order="4"
        :style="{ stroke: '#c90', 'stroke-width': 2 }"
      />
      <wj-flex-chart-trend-line
        binding="series-2"
        name="trendLine"
        fit-type="Polynomial"
        :order="4"
        :style="{ stroke: '#6a9', 'stroke-width': 2 }"
      />
    </wj-flex-chart>
  </div>
</template>

<script>
import * as wjCore from '@grapecity/wijmo'
import ChartData from './chartData'
import Config from '@/miip.config.js'

export default {
  name: 'WijmoChartScatterCombined',
  methods: {
    initialize (chart) {
      this.chart = chart
      // 중요!!!!
      // vue의 data에 chart가 있어서 그 chart에 Vue의 Observer가 붙게 되면, Sorting기능이 동작하지 않습니다 ㅠㅠ
      // Wijmo.ICollectionView가 observer를 따로 가지고 있어서 이친구가 data의 변화를 감지하는데,
      // ICollectionView의 observer와 vue의 observer가 뭐 안맞나봄.
      // 왜 그렇게 되는지는 파볼 필요가 있을듯 합니다.
    },
    initSeries () {
      console.log('@initSeries')
    }
  },
  watch: {
    sortingMethod (newval) {
      let sd = this.chart.collectionView.sortDescriptions
      if (sd.length) sd.shift()
      sd.push(new wjCore.SortDescription(newval, true))
      console.log(sd)
    }
  },
  data () {
    return {
      palette: Config.PALETTE,
      chartData: ChartData.randomScatteredTrend(3, 500, 0, 100),
      extractedData: [],
      sortingMethod: ''
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
