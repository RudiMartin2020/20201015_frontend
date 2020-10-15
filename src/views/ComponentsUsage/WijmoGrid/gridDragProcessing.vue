<template>
  <component-panel
    title="Drag Processing"
    class="wijmo-grid-example"
  >
    <div
      class="chart-container"
      style="height: auto"
    >
      <sk-grid
        style="height:200px;"
        :items-source="data"
        :columns="columns"
        :initial-focus="false"
        :use-checkbox="false"
        :initialized="initialized"
        @selection-changed="sectionChanged"
      />
      <b-collapse
        :open="false"
        aria-id="gridLoadMore"
      >
        <b-button
          type="is-dark"
          slot="trigger"
          aria-controls="gridLoadMore"
        >
          샘플 코드 보기
        </b-button>
        <prism-editor
          v-model="viewData"
          ref="prism"
          language="js"
          :line-numbers="true"
          :auto-style-line-numbers="true"
          class="my-editor"
          readonly
        />
      </b-collapse>
    </div>
  </component-panel>
</template>

<script>
import PrismEditor from 'vue-prism-editor'
import 'prismjs/themes/prism.css'

import PUtil from '@/components/Utils/PUtil'

let viewData =
`<sk-grid
  style="height:200px;"
  :items-source="data"
  :columns="columns"
  :initial-focus="false"
  :use-checkbox="false"
  :initialized="initialized"
  @selection-changed="sectionChanged"
/>
...
...
methods: {
  getData () {
    let data = []
    for (let start = 0; start <= 10; start++) {
      data.push({ column1: 'row' + start + '_c1', column2: 'row' + start + '_c2', column3: 'row' + start + '_c3' })
    }
    return data
  },
  initialized (flexgrid) {
    flexgrid.hostElement.addEventListener('mouseup', e => {
      if (Object.keys(this.selectData).length > 0) {
        alert('select single row')
      } else {
        alert('drag event')
      }
    })
  },
  _getSelectionStats: function (grid) {
    var val = {}
    let sel = grid.selection
    let range = PUtil.getRange(sel.topRow, sel.bottomRow, sel._row < sel._row2)
    for (let r of range) {
      for (let c = 0; c < grid.columns.length; c++) {
        val[grid.columns[c].binding] = grid.cells.getCellData(r, c, false)
      }
    }
    return val
  },
  sectionChanged (grid, event) {
    if (grid.rows.length > 0 && grid.selectedItems.length === 1) {
      this.selectData = this._getSelectionStats(grid)
      // this.searchMapping('grid', this.processDefinitionSelectData.prodDefId)
    } else {
      this.selectData = {}
    }
  }
},
data () {
  return {
    selectData: {},
      data: [],
      columns: [
        { label: 'column1', binding: 'column1', minWidth: 100 },
        { label: 'column2', binding: 'column2', maxWidth: 100 },
        { label: 'column3', binding: 'column3', width: 150 },
        { label: 'column4', binding: 'column4' }
      ],
      viewData: viewData
  }
}
`

export default {
  name: 'GridPagingType',
  components: {
    PrismEditor
  },
  mounted () {
    this.data = this.getData()
  },
  methods: {
    getData () {
      let data = []
      for (let start = 0; start <= 10; start++) {
        data.push({ column1: 'row' + start + '_c1', column2: 'row' + start + '_c2', column3: 'row' + start + '_c3' })
      }
      return data
    },
    initialized (flexgrid) {
      flexgrid.hostElement.addEventListener('mouseup', e => {
        if (Object.keys(this.selectData).length > 0) {
          alert('select single row')
        } else {
          alert('drag event')
        }
      })
    },
    _getSelectionStats: function (grid) {
      var val = {}
      let sel = grid.selection
      let range = PUtil.getRange(sel.topRow, sel.bottomRow, sel._row < sel._row2)
      for (let r of range) {
        for (let c = 0; c < grid.columns.length; c++) {
          val[grid.columns[c].binding] = grid.cells.getCellData(r, c, false)
        }
      }
      return val
    },
    sectionChanged (grid, event) {
      if (grid.rows.length > 0 && grid.selectedItems.length === 1) {
        this.selectData = this._getSelectionStats(grid)
        // this.searchMapping('grid', this.processDefinitionSelectData.prodDefId)
      } else {
        this.selectData = {}
      }
    }
  },
  data () {
    return {
      selectData: {},
      data: [],
      columns: [
        { label: 'column1', binding: 'column1', minWidth: 100 },
        { label: 'column2', binding: 'column2', maxWidth: 100 },
        { label: 'column3', binding: 'column3', width: 150 },
        { label: 'column4', binding: 'column4' }
      ],
      viewData: viewData
    }
  }
}
</script>

<style lang="scss">
</style>
