<template>
  <section
    class="sk-chart-live-update"
  >
    <sk-chart
      :items-source="data"
      binding-x="date"
      chart-type="Line"
      style="height: 300px"
      :x-max="xMax"
      :x-min="xMin"
    >
      <wj-flex-chart-series
        binding="value"
      />
    </sk-chart>
  </section>
</template>

<script>
import Dayjs from 'dayjs'

export default {
  name: 'SkChartLiveUpdate',
  watch: {
    xRange () {
      this.$forceUpdate()
    }
  },
  mounted () {
    this.testInterval = setInterval(() => {
      let newPoint = {
        date: Dayjs().valueOf(),
        value: Number((Math.random() * 30).toFixed(2))
      }
      this.data.push(newPoint)
      this.setMinMax(newPoint.date)
    }, 100)
  },
  beforeDestroy () {
    if (this.testInterval) {
      clearInterval(this.testInterval)
    }
  },
  methods: {
    setMinMax (x) {
      let time = 1000 * 30
      // xMin을 newPoint의 시간으로부터 1분간으로 설정.
      if (x - this.xMin > time) this.xMin = x - time
      // xMax는 새로 들어온 포인트의 시간으로 설정
      this.xMax = (x > this.xMax) ? x : this.xMax
      // console.log(x > this.xMax, Dayjs(this.xMax).toDate())
    }
  },
  data () {
    return {
      testInterval: null,
      xRanges: ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'],
      xRange: 'day',
      xMin: new Date().valueOf(),
      xMax: Dayjs().add(30, 'seconds').valueOf(),
      data: []
    }
  }
}
</script>
