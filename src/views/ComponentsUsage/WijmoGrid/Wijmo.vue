<template>
  <component-panel
    title="SK Grid"
    class="wijmo-grid-example"
  >
    <div class="panel-content">
      <!-- <grid-columns-update />
      <grid-selection-change />
      <grid-properties /> -->
      <grid-paging-type />
      <grid-column-props />
    </div>
  </component-panel>
</template>

<script>

// import GridColumnsUpdate from './gridColumnsUpdate'
// import GridSelectionChange from './gridSelectionChange'
// import GridProperties from './gridProperties'
// import GridPagingType from './gridPagingType'
// import GridColumnProps from './gridColumnProps'

export default {
  name: 'Wijmo',
  components: {
    // 'grid-columns-update': GridColumnsUpdate,
    // 'grid-selection-change': GridSelectionChange,
    // 'grid-properties': GridProperties,
    // 'grid-paging-type': GridPagingType,
    // 'grid-column-props': GridColumnProps
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
  section.wijmo-grid-example {
    .chart-container {
      height: 500px;
      position: relative;
      margin-bottom: 120px;
      .collapse-trigger {
        .button {
          margin-top: $gap;
        }
      }
      .chart-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: $gap;
      }
      .sk-wijmo-grid {
        margin: $gap-s auto;
        border: 1px solid rgba(0, 0, 0, .3);
      }
    }
  }
</style>
