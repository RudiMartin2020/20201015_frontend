<template>
  <section
    class="sk-chart-aggregation"
  >
    <sk-chart
      :items-source="data"
      binding-x="date"
      chart-type="Scatter"
      style="height: 300px"
      date-format="YYYY-MM-DD"
    >
      <wj-flex-chart-series
        binding="series-0"
        name="original data 1"
      />
    </sk-chart>
    <div
      class="level"
      style="padding: 10px"
    >
      <b-field label="x-axis-range">
        <b-select v-model="xRange">
          <option
            v-for="item in xRanges"
            :key="item"
            :value="item"
          >
            {{ item }}
          </option>
        </b-select>
      </b-field>
    </div>
    <sk-chart
      :items-source="data"
      binding-x="date"
      aggregation-type="COUNT"
      :use-aggregation="true"
      :x-axis-range="xRange"
      :y-major-unit="1"
      chart-type="Column"
      style="height: 300px"
    />
  </section>
</template>

<script>
import Dayjs from 'dayjs'

/**
  * Math.cos 파형을 아용한 트렌드를 가진 랜덤 데이타. 최대값과 최소값에 근접하는 적당한 사이즈의 cos 파형을 리턴합니다.
  *
  * @param {number} [series=1] 시리즈의 수
  * @param {number} [count=365] 포인트의 수
  * @param {string} [intervalUnit='days'] date의 간격. moments.js의 manipulation에서 쓰이는 단위를 사용합니다.
  * @param {number} [min=0] 최소값
  * @param {number} [max=10] 최대값
  * @param {number} [maxItemInInterval=1] 한 포인트 최대로 들어갈 수 있는 한 시리즈의 수
  * @returns
  */
const randomTrend = function (series = 1, count = 365, intervalUnit = 'days', min = 0, max = 10, maxItemInInterval = 1) {
  let arr = []
  let range = max - min
  let date = Dayjs(new Date()).subtract(count, intervalUnit)
  for (let i = 0; i < count; i++) {
    let countInInterval = Math.ceil(Math.random() * maxItemInInterval)
    for (let c = 0; c < countInInterval; c++) {
      let obj = {
        date: date.valueOf()
      }
      for (let s = 0; s < series; s++) {
        obj['series-' + s] = Math.round(Math.cos(i * Math.PI / (count / 2) + s) * range) + Math.round(Math.random() * range + min)
      }
      arr.push(obj)
    }
    date = Dayjs(date).add(1, intervalUnit)
  }
  return arr
}

export default {
  name: 'SkChartAggregation',
  watch: {
    xRange () {
      this.$forceUpdate()
    }
  },
  data () {
    return {
      xRanges: ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'],
      xRange: 'day',
      data: randomTrend(2, 100, 'hours', 10, 30, 5)
    }
  }
}
</script>
