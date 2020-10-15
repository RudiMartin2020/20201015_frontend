<template>
  <component-panel
    title="Selection Change"
    class="wijmo-grid-example"
  >
    <div
      class="chart-container"
      style="height: auto"
    >
      <!-- <h2 class="chart-title">
      selection change
    </h2> -->
      <sk-grid
        :items-source="data"
        :columns="columns"
        :initial-focus="true"
        :use-checkbox="false"
        @selection-changing="gridSectionChanging"
        @selection-changed="gridSectionChanged"
      />
      <br>
      <vue-json-pretty
        style="font-size: 10px;"
        :data="selectionRows"
      />
      <b-collapse
        :open="true"
        aria-id="gridSelectionChange"
      >
        <b-button
          type="is-dark"
          slot="trigger"
          aria-controls="gridSelectionChange"
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
import VueJsonPretty from 'vue-json-pretty'
import PrismEditor from 'vue-prism-editor'
import 'prismjs/themes/prism.css'
import 'vue-prism-editor/dist/VuePrismEditor.css'

let viewdata =
`<sk-grid
  :items-source="data"
  :columns="columns"
  :initial-focus="false"
  :use-checkbox="false"
  @selection-changing="gridSectionChanging"
  @selection-changed="gridSectionChanged"
/>
...
...
methods: {
  gridSectionChanging (flexGrid, event) {
    console.log('@gridSectionChanging', flexGrid, event)
    if (!confirm('selection 변경 하시겠습니까?')) {
      event.cancel = true
    }
  },
  gridSectionChanged (flexGrid, event) {
    console.log('@gridSectionChanged', flexGrid, event)
    for (let i in flexGrid.selectedItems) {
      delete flexGrid.selectedItems[i]._status
    }
    this.selectionRows = flexGrid.selectedItems
    alert('gridSectionChanged')
  }
},
data () {
  return {
    selectionRows: 'Row 선택해주세요',
    data: [
      { column1: 'row1_c1', column2: 'row1_c2', column3: 'row1_c3' },
      { column1: 'row2_c1', column2: 'row2_c2', column3: 'row2_c3' }
    ],
    columns: [
      { label: 'column1', binding: 'column1', readOnly: true },
      { label: 'column2', binding: 'column2', readOnly: true },
      { label: 'column3', binding: 'column3', readOnly: true },
      { label: 'column4', binding: 'column4', readOnly: true }
    ]
  }
}`

export default {
  name: 'GridSelectionChange',
  components: {
    VueJsonPretty,
    PrismEditor
  },
  methods: {
    gridSectionChanging (flexGrid, event) {
      console.log('@gridSectionChanging', flexGrid, event)
      if (!confirm('selection 변경 하시겠습니까?')) {
        event.cancel = true
      }
    },
    gridSectionChanged (flexGrid, event) {
      console.log('@gridSectionChanged', flexGrid, event)
      for (let i in flexGrid.selectedItems) {
        delete flexGrid.selectedItems[i]._status
      }
      this.selectionRows = flexGrid.selectedItems
      alert('gridSectionChanged')
    }
  },
  data () {
    return {
      selectionRows: 'Row 선택해주세요',
      data: [
        { column1: 'row1_c1', column2: 'row1_c2', column3: 'row1_c3' },
        { column1: 'row2_c1', column2: 'row2_c2', column3: 'row2_c3' }
      ],
      columns: [
        { label: 'column1', binding: 'column1', readOnly: true },
        { label: 'column2', binding: 'column2', readOnly: true },
        { label: 'column3', binding: 'column3', readOnly: true },
        { label: 'column4', binding: 'column4', readOnly: true }
      ],
      viewData: viewdata
    }
  }
}
</script>

<style lang="scss">

</style>
