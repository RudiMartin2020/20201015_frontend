<template>
  <div class="chart-container">
    <div class="chart-title">
      Grid and filtering
    </div>
    <wj-flex-grid
      :items-source="tableData"
      @cell-edit-ended="gridEdited"
    >
      <wj-flex-grid-filter />
      <wj-flex-grid-column
        :header="'Country'"
        :binding="'country'"
        width="2*"
      />
      <wj-flex-grid-column
        :header="'Sales'"
        :binding="'sales'"
        width="*"
        format="n2"
      />
      <wj-flex-grid-column
        :header="'Expenses'"
        :binding="'expenses'"
        width="*"
        format="n2"
      />
    </wj-flex-grid>
  </div>
</template>
<script>
import ChartData from './chartData'

export default {
  name: 'WijmoGridFilter',
  methods: {
    gridEdited (q, w, e) {
      console.log('gridEdited', q, w, e)
    }
  },
  data () {
    return {
      tableData: ChartData.tableData()
    }
  }
}
</script>
