<template>
  <section
    class="sk-chart-type"
    style="height: 100%"
  >
    <sk-chart
      :items-source="chartData"
      binding-x-type="NUMBER"
      binding-x="order"
      chart-type="Line"
      style="height: 200px"
    >
      <wj-flex-chart-series
        binding="value"
        name="Line Series"
      />
    </sk-chart>

    <sk-chart
      :items-source="chartData"
      binding-x-type="NUMBER"
      binding-x="order"
      chart-type="LineSymbols"
      style="height: 200px"
    >
      <wj-flex-chart-series
        binding="value"
        name="LineSymbol Series"
      />
    </sk-chart>

    <sk-chart
      :items-source="chartData"
      binding-x-type="NUMBER"
      binding-x="order"
      chart-type="Scatter"
      style="height: 200px"
    >
      <wj-flex-chart-series
        binding="value"
        name="Scatter Series"
      />
      <wj-flex-chart-series
        binding="value2"
        chart-type="Spline"
        name="Spline Series"
      />
      <!-- 하나의 차트에 여러 타입의 데이터를 표기할 수 있습니다 -->
    </sk-chart>

    <sk-chart
      :items-source="chartData"
      binding-x-type="NUMBER"
      binding-x="order"
      chart-type="StepArea"
      style="height: 200px"
    >
      <wj-flex-chart-series
        binding="value2"
        chart-type="Area"
        name="Spline Series"
      />
      <wj-flex-chart-series
        binding="value"
        name="StepArea Series"
      />
    </sk-chart>
    <sk-chart
      :items-source="chartData"
      binding-x-type="NUMBER"
      binding-x="name"
      chart-type="Bar"
      style="height: 400px"
    >
      <wj-flex-chart-series
        binding="value"
        name="사용량"
      />
    </sk-chart>
  </section>
</template>

<script>
export default {
  name: 'SkChartType',
  data () {
    return {
      chartData: [
        { value: 10, value2: 19, order: 1, name: 'A' },
        { value: 12, value2: 22, order: 2, name: 'B' },
        { value: 15, value2: 21, order: 3, name: 'C' },
        { value: 14, value2: 17, order: 4, name: 'D' },
        { value: 20, value2: 20, order: 5, name: 'E' },
        { value: 16, value2: 24, order: 6, name: 'F' },
        { value: 18, value2: 19, order: 7, name: 'G' },
        { value: 12, value2: 21, order: 8, name: 'H' }
      ]
    }
  }
}
</script>
