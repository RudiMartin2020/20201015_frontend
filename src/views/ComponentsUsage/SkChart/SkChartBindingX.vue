<template>
  <section
    class="sk-chart-type"
    style="height: 100%"
  >
    <sk-chart
      :items-source="numberSeries"
      binding-x-type="NUMBER"
      binding-x="order"
      chart-type="Line"
      style="height: 200px"
    >
      <wj-flex-chart-series
        binding="value"
        name="Order Series"
      />
    </sk-chart>

    <sk-chart
      :items-source="dateSeries"
      binding-x="order"
      chart-type="Line"
      style="height: 200px"
    >
      <wj-flex-chart-series
        binding="value"
        name="Date Series"
      />
    </sk-chart>
  </section>
</template>

<script>
import Dayjs from 'dayjs'

export default {
  name: 'SkChartType',
  data () {
    return {
      numberSeries: [
        { value: 10, value2: 19, order: 1 },
        { value: 12, value2: 22, order: 2 },
        { value: 15, value2: 21, order: 3 },
        { value: 14, value2: 17, order: 4 },
        { value: 20, value2: 20, order: 5 },
        { value: 16, value2: 24, order: 6 },
        { value: 18, value2: 19, order: 7 },
        { value: 12, value2: 21, order: 8 }
      ],
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
