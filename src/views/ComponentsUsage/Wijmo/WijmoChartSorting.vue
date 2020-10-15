<template>
  <div class="chart-container">
    <h2 class="chart-title">
      Sort the chart data and average line
    </h2>

    <b-field>
      <b-radio-button
        v-model="sortingMethod"
        native-value="popk"
      >
        POPK
      </b-radio-button>
      <b-radio-button
        v-model="sortingMethod"
        native-value="gdpm"
      >
        GDPM
      </b-radio-button>
      <b-radio-button
        v-model="sortingMethod"
        native-value="gdpcap"
      >
        GDPCAP
      </b-radio-button>
    </b-field>

    <wj-flex-chart
      :items-source="chartData"
      binding-x="country"
      header="GDP of countries"
      chart-type="Column"
      :initialized="initialize"
      :palette="palette"
    >
      <wj-flex-chart-legend position="Bottom" />
      <wj-flex-chart-series
        binding="gdpcap"
        name="GDPCAP"
      />
      <wj-flex-chart-series
        binding="popk"
        name="POPK"
      />
      <wj-flex-chart-series
        binding="gdpm"
        name="GDPM"
      />
      <wj-flex-chart-trend-line
        binding="gdpm"
        name="trendLine"
        fit-type="Polynomial"
        :order="10"
        :style="{ stroke: 'blue', 'stroke-width': 1 }"
      />
    </wj-flex-chart>
  </div>
</template>

<script>
import * as wjCore from '@grapecity/wijmo'
import ChartData from './chartData'
import Config from '@/miip.config.js'

export default {
  name: 'WijmoChartSorting',
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
      chartData: ChartData.gdp,
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
