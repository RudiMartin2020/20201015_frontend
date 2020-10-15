<template>
  <component-panel title="Wijmo Chart">
    <div class="panel-content">
      <!-- <sk-grid-group /> -->

      <!-- <wijmo-grid-filter /> -->

      <wijmo-chart-axis-unit />

      <wijmo-chart-zoom />

      <wijmo-chart-get-raw-data />

      <wijmo-chart-highlight-min-max />

      <wijmo-chart-sorting />

      <wijmo-chart-scatter-combined />

      <wijmo-chart-random-keys-in-one-series />
    </div>
  </component-panel>
</template>

<script>
import ChartData from './chartData'
import Config from '@/miip.config.js'
// import SkGridGroup from './SkGridGroup'
import WijmoChartAxisUnit from './WijmoChartAxisUnit'
// import WijmoGridFilter from './WijmoGridFilter'
import WijmoChartZoom from './WijmoChartZoom'
import WijmoChartGetRawData from './WijmoChartGetRawData'
import WijmoChartHighlightMinMax from './WijmoChartHighlightMinMax'
import WijmoChartSorting from './WijmoChartSorting'
import WijmoChartScatterCombined from './WijmoChartScatterCombined'
import WijmoChartRandomKeysInOneSeries from './WijmoChartRandomKeysInOneSeries'

export default {
  name: 'Wijmo',
  components: {
    // 'sk-grid-group': SkGridGroup,
    'wijmo-chart-axis-unit': WijmoChartAxisUnit,
    // 'wijmo-grid-filter': WijmoGridFilter,
    'wijmo-chart-zoom': WijmoChartZoom,
    'wijmo-chart-get-raw-data': WijmoChartGetRawData,
    'wijmo-chart-highlight-min-max': WijmoChartHighlightMinMax,
    'wijmo-chart-sorting': WijmoChartSorting,
    'wijmo-chart-scatter-combined': WijmoChartScatterCombined,
    'wijmo-chart-random-keys-in-one-series': WijmoChartRandomKeysInOneSeries
  },
  data () {
    return {
      chartData: ChartData,
      palette: Config.PALETTE
    }
  }
}
</script>

<style lang="scss">
  .chart-container {
    height: 500px;
    position: relative;
    margin-bottom: 120px;
    .chart-title {
      font-size: 20px;
      font-weight: bold;
    }
  }
</style>
