<template>
  <component-panel
    title="Grid Properties"
    class="wijmo-grid-example"
  >
    <div
      class="chart-container"
      style="height: auto"
    >
      <h2 class="chart-title">
        UseCheckBox
      </h2>
      <br>
      <div>
        <b-checkbox v-model="useCheckBox" /> useCheckBox
      </div>
      <br>
      <sk-grid
        :items-source="data1"
        :columns="columns"
        :initial-focus="false"
        :use-checkbox="useCheckBox"
      />
      <b-collapse
        :open="false"
        aria-id="gridUseCheckBox"
      >
        <b-button
          type="is-dark"
          slot="trigger"
          aria-controls="gridUseCheckBox"
        >
          샘플 코드 보기
        </b-button>
        <prism-editor
          v-model="useCheckBoxViewData"
          ref="prism"
          language="js"
          :line-numbers="true"
          :auto-style-line-numbers="true"
          class="my-editor"
          readonly
        />
      </b-collapse>
      <br><br>

      <h2 class="chart-title">
        Merge Headers
      </h2>

      <sk-grid
        style="height: inherit"
        :items-source="data2"
        :columns="columns2"
        :initial-focus="false"
        :use-checkbox="false"
        allow-merging="ColumnHeaders"
        :merge-headers="mergeHeaders"
        merge-headers-title="merge"
      />
      <b-collapse
        :open="false"
        aria-id="gridMergeHeaders"
      >
        <b-button
          type="is-dark"
          slot="trigger"
          aria-controls="gridMergeHeaders"
        >
          샘플 코드 보기
        </b-button>
        <prism-editor
          v-model="mergeViewData"
          ref="prism"
          language="js"
          :line-numbers="true"
          :auto-style-line-numbers="true"
          class="my-editor"
          readonly
        />
      </b-collapse>
      <br><br>

      <h2 class="chart-title">
        auto-size-column
      </h2>

      <sk-grid
        style="height: inherit"
        :items-source="data4"
        :columns="columns3"
        :initial-focus="false"
        :use-checkbox="false"
        :auto-size-column="true"
      />

      <b-collapse
        :open="false"
        aria-id="gridAutoSizeColumn"
      >
        <b-button
          type="is-dark"
          slot="trigger"
          aria-controls="gridAutoSizeColumn"
        >
          샘플 코드 보기
        </b-button>
        <prism-editor
          v-model="autoSizeColumnViewData"
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

let useCheckBoxViewData =
`<div>
  <b-checkbox v-model="useCheckBox" /> useCheckBox
</div>
<br>
<sk-grid
  :items-source="data1"
  :columns="columns"
  :initial-focus="false"
  :use-checkbox="useCheckBox"
/>
...
...
data () {
  return {
    useCheckBox: true,
    data1: [
      { column1: 'row1_c1', column2: 'row1_c2', column3: 'row1_c3' },
      { column1: 'row2_c1', column2: 'row2_c2', column3: 'row2_c3', column4: 'row2_c4' }
    ],
    columns: [
      { label: 'column1', binding: 'column1' },
      { label: 'column2', binding: 'column2' },
      { label: 'column3', binding: 'column3' }
    ]
  }
}
`

let mergeViewData =
`<sk-grid
  :items-source="data2"
  :columns="columns2"
  :initial-focus="false"
  :use-checkbox="false"
  allow-merging="ColumnHeaders"
  :merge-headers="mergeHeaders"
  merge-headers-title="merge"
/>
...
...
data () {
  return {
    mergeHeaders: ['column1', 'column4'],
    data2: [
      { column1: 'row1_c1', column2: 'row1_c2', column3: 'row1_c3' },
      { column1: 'row2_c1', column2: 'row2_c2', column3: 'row2_c3' }
    ],
    columns2: [
      { label: 'column1', binding: 'column1' },
      { label: 'column2', binding: 'column2' },
      { label: 'column3', binding: 'column3' },
      { label: 'column4', binding: 'column4' }
    ]
  }
}
`

let autoSizeColumnViewData =
`<sk-grid
  :items-source="data4"
  :columns="columns3"
  :initial-focus="false"
  :use-checkbox="false"
  :auto-size-column="true"
/>
...
...
data () {
  return {
    data4: [
      { column1: 'row1_c1', column2: 'row1_c2', column3: 'row1_c3' },
      { column1: 'row2_c1', column2: 'row2_c2abcdefghijklmnopqrstuvwxyz', column3: 'row2_c3' }
    ],
    columns3: [
      { label: 'column1', binding: 'column1' },
      { label: 'column2', binding: 'column2' },
      { label: 'column3', binding: 'column3', maxWidth: 100 },
      { label: 'column4', binding: 'column4', minWidth: 400 }
    ]
  }
}
`

export default {
  name: 'GridProperties',
  components: {
    PrismEditor
  },
  methods: {
    checkedRows () {
      this.rows = this.$refs.grid.checkedRows
    },
    modifiedRows () {
      this.rows = this.$refs.grid.modifiedRows
    },
    addRows () {
      this.$refs.grid.addRows([{ 'column1': 'newColumn1' }])
    },
    addedRows () {
      this.rows = this.$refs.grid.addedRows
    },
    totalModifiedRows () {
      this.rows = this.$refs.grid.totalModifiedRows
    },
    exportExcel () {
      this.$refs.grid.exportExcel()
    },
    init (flexGrid) {
      this.wjGrid = flexGrid
      this.wjGrid.autoSizeColumns()
      this.wjGrid.columns[0].width = 200
    },
    ddd () {
      this.data4 = [
        { column1: 'row1_c1', column2: 'row1_c2', column3: 'row1_c3' },
        { column1: 'row3_c1', column2: 'row3_c2abcdefghijklmnopqrstuvwxyzabc', column3: 'row3_c3' },
        { column1: 'row2_c1', column2: 'row2_c2abcdefghijklmnopqrstuvwxyz', column3: 'row2_c3' }
      ]
      this.wjGrid.autoSizeColumns()
      // this.wjGrid.autoSizeRows()
    }
  },
  data () {
    return {
      rows: '',
      useCheckBox: true,
      mergeHeaders: ['column1', 'column4'],
      data1: [
        { column1: 'row1_c1', column2: 'row1_c2', column3: 'row1_c3' },
        { column1: 'row2_c1', column2: 'row2_c2', column3: 'row2_c3', column4: 'row2_c4' }
      ],
      data2: [
        { column1: 'row1_c1', column2: 'row1_c2', column3: 'row1_c3' },
        { column1: 'row2_c1', column2: 'row2_c2', column3: 'row2_c3' }
      ],
      // data4: [
      //   { column1: 'row1_c1', column2: 'row1_c2', column3: 'row1_c3' },
      //   { column1: 'row2_c1', column2: 'row2_c2abcdefghijklmnopqrstuvwxyz', column3: 'row2_c3' }
      // ],
      data4: [
        { column1: 'row1_c1', column2: 'row1_c2', column3: 'row1_c3' },
        { column1: 'row3_c1', column2: 'row3_c2abcdefghijklmnopqrstuvwxyzabc', column3: 'row3_c3' },
        { column1: 'row2_c1', column2: 'row2_c2abcdefghijklmnopqrstuvwxyz', column3: 'row2_c3' }
      ],
      columns: [
        { label: 'column1', binding: 'column1' },
        { label: 'column2', binding: 'column2' },
        { label: 'column3', binding: 'column3' }
      ],
      columns2: [
        { label: 'column1', binding: 'column1' },
        { label: 'column2', binding: 'column2' },
        { label: 'column3', binding: 'column3' },
        { label: 'column4', binding: 'column4' }
      ],
      columns3: [
        { label: 'column1', binding: 'column1' },
        { label: 'column2', binding: 'column2' },
        { label: 'column3', binding: 'column3', maxWidth: 100 },
        { label: 'column4', binding: 'column4', minWidth: 400 }
      ],
      useCheckBoxViewData: useCheckBoxViewData,
      mergeViewData: mergeViewData,
      autoSizeColumnViewData: autoSizeColumnViewData
    }
  }
}
</script>

<style lang="scss" scoped>
.sk-grid-methods {
  margin-bottom: $gap-s;
  .button {
    margin-right: $gap-s;
  }
}
</style>
