<template>
  <section
    class="sk-chart-display-method"
  >
    <div
      class="level"
      style="padding: 10px"
    >
      <b-field label="x-axis-range">
        <b-select v-model="displayMethod">
          <option
            v-for="item in displayMethods"
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
      :display-method="displayMethod"
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
  name: 'SkChartSeriesDisplayMethod',
  data () {
    return {
      displayMethods: ['SEPARATED', 'MERGED'],
      displayMethod: 'SEPARATED',
      data: randomTrend(2, 100, 'hours', 10, 30, 5)
    }
  }
}
</script>
