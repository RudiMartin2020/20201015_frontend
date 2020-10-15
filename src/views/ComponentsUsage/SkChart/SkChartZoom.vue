<template>
  <section
    class="sk-chart-type"
    style="height: 100%"
  >
    <sk-chart
      :items-source="dateSeries"
      binding-x="order"
      chart-type="Line"
      style="height: 200px"
      :raw-data-grid-initialized="initGrid"
      :minimum-zoom-distance="100"
    >
      <wj-flex-chart-series
        binding="value"
        name="use-zoom: true / use-raw-data-popup: true"
      />
    </sk-chart>

    <sk-chart
      :items-source="dateSeries"
      binding-x="order"
      chart-type="Line"
      style="height: 200px"
      :raw-data-grid-initialized="initGrid"
      :use-zoom="false"
    >
      <wj-flex-chart-series
        binding="value"
        name="use-zoom: false / use-raw-data-popup: true"
      />
    </sk-chart>

    <sk-chart
      :items-source="dateSeries"
      binding-x="order"
      chart-type="Line"
      :use-zoom="false"
      :use-raw-data-popup="false"
      style="height: 200px"
    >
      <wj-flex-chart-series
        binding="value"
        name="use-zoom: false / use-raw-data-popup: false"
      />
    </sk-chart>
  </section>
</template>

<script>
import Dayjs from 'dayjs'

export default {
  name: 'SkChartZoom',
  methods: {
    initGrid (grid, skGrid) {
      setTimeout(() => {
        skGrid.addRows([{
          value: Math.round(Math.random() * 100),
          value2: Math.round(Math.random() * 100),
          order: '추가된 데이터'
        }])
      }, 1000)
    }
  },
  data () {
    return {
      dateSeries: [
        { value: 10, value2: 19, order: Dayjs().valueOf() },
        { value: 10, value2: 19, order: Dayjs().subtract(1, 'years').valueOf() },
        { value: 12, value2: 22, order: Dayjs().subtract(2, 'years').valueOf() },
        { value: 15, value2: 21, order: Dayjs().subtract(3, 'years').valueOf() },
        { value: 14, value2: 17, order: Dayjs().subtract(4, 'years').valueOf() },
        { value: 20, value2: 20, order: Dayjs().subtract(5, 'years').valueOf() },
        { value: 16, value2: 24, order: Dayjs().subtract(6, 'years').valueOf() },
        { value: 18, value2: 19, order: Dayjs().subtract(7, 'years').valueOf() },
        { value: 12, value2: 21, order: Dayjs().subtract(8, 'years').valueOf() }
      ]
    }
  }
}
</script>
