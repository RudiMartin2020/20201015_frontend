<template>
  <section
    class="sk-chart-basic"
    style="height: 100%"
  >
    <sk-chart
      :items-source="chartData"
      binding-x-type="NUMBER"
      binding-x="order"
    >
      <wj-flex-chart-series
        binding="value"
        name="SeriesName"
      />
    </sk-chart>
  </section>
</template>

<script>
export default {
  name: 'SkChartBasic',
  data () {
    return {
      chartData: [
        { value: 10, order: 1 },
        { value: 12, order: 2 },
        { value: 15, order: 3 },
        { value: 14, order: 4 },
        { value: 20, order: 5 },
        { value: 16, order: 6 },
        { value: 18, order: 7 },
        { value: 12, order: 8 }
      ]
    }
  }
}
</script>
