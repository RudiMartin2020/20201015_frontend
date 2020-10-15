<template>
  <component-panel
    title="SK Chart"
    class="event-chart"
    name="event-search-chart"
    :payload="condition"
  >
    <div class="chart-main">
      <sk-chart
        v-if="data.length"
        :initialized="initChart"
        :items-source="data"
        :y-major-unit="yMajorUnit"
        :contextmenu-actions="['reset-zoom', 'aggregation']"
        selection-mode="Point"
        binding-x="paramCrtDttm"
        @rendering="$emit('rendering')"
        @rendered="$emit('rendered')"
        @refreshing="$emit('refreshing')"
        @refreshed="$emit('refreshed')"
        @selection-changed="selectionChanged"
        chart-type="Scatter"
      >
        <wj-flex-chart-series
          binding="paramVal"
          :symbol-size="3"
        />
      </sk-chart>
    </div>
  </component-panel>
</template>

<script>
// import API from '@/components/Apis/'
import _ from 'lodash'

export default {
  name: 'EventSearchChart',
  props: {
    condition: {
      type: Object,
      default () {
        return {}
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    condition () {
      // this.searchEvent()
    }
  },
  computed: {
    yMajorUnit () {
      if (this.chart) {
        let items = [...this.chart.itemsSource.items]
        let arr = _.sortBy(items, 'COUNT')
        // console.log(arr)
        return Math.round(Number(arr[arr.length - 1].COUNT / 5))
      }
      return 10
    }
  },
  mounted () {
    if (Object.keys(this.condition).length) this.searchEvent()
  },
  methods: {
    initChart (chart) {
      this.chart = chart
    },
    selectionChanged () {
      console.log('@selection-changed')
    }
    /* async searchEvent (condition = this.condition) {
      let response = await API.spc.eventHub.listDColSearchData({
        payload: condition
      })
      if (response && response.data) {
        this.data = response.data
        // this.data = response.data // this.parseChartData(response.data) deprecated 19.08.22
      } else {
        this.data = []
      }
    } */
  },
  data () {
    return {
      chart: null
    }
  }
}
</script>

<style lang="scss">
  .event-chart {
    .panel-body {
      overflow: hidden;
      .chart-main {
        height: 100%;
      }
    }
  }
</style>
