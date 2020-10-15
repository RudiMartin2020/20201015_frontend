<template>
  <div class="chart-container">
    <div :class="['chart-title', chartId]">
      FISHBONE CHART
    </div>
  </div>
</template>
<script>
import * as D3 from 'd3'
import ChartData from './chartData'
import Fishbone from '@/components/Utils/Fishbone'

console.log(D3)

export default {
  name: 'D3Fisbone',
  props: {
    data: {
      type: Object,
      default () {
        return {
          title: 'A',
          children: [
            { title: 'A1' },
            {
              title: 'A2',
              children: [
                { title: 'A2-1' },
                { title: 'A2-2' },
                { title: 'A2-3' }
              ]
            }
          ]
        }
      }
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    }
  },
  mounted () {
    D3.json(JSON.stringify(this.data), data => {
      let size = { width: this.width, height: this.height }
      let svg = D3.select('.' + this.chartId)
        .append('svg')
        .attr(size)
        .datum(this.data)
        .call(this.fishbone.defaultArrow)
        .call(this.fishbone)
      this.fishbone.force().start()
    })
  },
  methods: {
    fishbone: Fishbone(D3)
  },
  data () {
    return {
      chartData: ChartData.tree,
      chartId: 'fishbone-' + Math.random().toString(36).substr(2)
    }
  }
}
</script>
