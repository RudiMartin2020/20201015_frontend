<template>
  <div class="chart-container">
    <div class="chart-title">
      Grid and filtering
    </div>
    <sk-grid
      :items-source="tableData"
      :initialized="initGrid"
      :collection-view-options="collectionViewOptions"
    >
      <wj-flex-grid-column
        header="Country"
        binding="country"
        width="*"
      />
      <wj-flex-grid-column
        header="Product"
        binding="product"
      />
      <wj-flex-grid-column
        header="downloads"
        binding="downloads"
      />
      <wj-flex-grid-column
        header="Sales"
        binding="sales"
      />
      <wj-flex-grid-column
        header="Expenses"
        binding="expenses"
      />
    </sk-grid>
  </div>
</template>
<script>
import ChartData from './chartData'

export default {
  name: 'SkGridGroupedRows',
  methods: {
    initGrid (grid) {
      this.grid = grid
    },
    gridEdited (q, w, e) {
      console.log('gridEdited', q, w, e)
    }
  },
  mounted () {
    this.tableData = ChartData.tableData()
  },
  data () {
    return {
      tableData: [],
      collectionViewOptions: {
        sortDescriptions: ['country', 'product'],
        groupDescriptions: ['country', 'product']
      }
    }
  }
}
</script>
