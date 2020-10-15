<template>
  <component-panel
    title="Column Properties"
    class="wijmo-grid-example"
  >
    <div
      class="chart-container"
      style="height: auto"
    >
      <!-- <h2 class="chart-title">
        Column Properties
      </h2> -->
      <b-checkbox
        @input="visibleColumn"
      >
        visible column
      </b-checkbox>
      <b-button
        @click="addRow()"
      >
        add row
      </b-button>
      <br>
      <sk-grid
        ref="grid"
        :items-source="data"
        :columns="columns"
        :initial-focus="false"
        :use-checkbox="false"
      />
      <b-collapse
        :open="true"
        aria-id="gridColumnProps"
      >
        <b-button
          type="is-dark"
          slot="trigger"
          aria-controls="gridColumnProps"
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

let viewData =
`<b-checkbox
  @input="visibleColumn"
>
  visible column
</b-checkbox>
<b-button
  @click="addRow()"
>
  add row
</b-button>
<sk-grid
  ref="grid"
  :items-source="data"
  :columns="columns"
  :initial-focus="false"
  :use-checkbox="false"
/>
...
...
methods: {
  visibleColumn () {
    this.columns[4].visible = !this.columns[4].visible
  },
  addRow () {
    this.$refs.grid.addRows([{ required: 'required4', readOnly: 'readOnly4', modifiable: 'modifiable' }])
  }
},
data () {
  return {
    data: [
      { required: 'required1', readOnly: 'readOnly1', dataMap: 'a' },
      { required: 'required2', readOnly: 'readOnly2', dataMap: 'b' },
      { required: 'required3', readOnly: 'readOnly3', dataMap: 'c' }
    ],
    columns: [
      { label: 'required', binding: 'required', required: true },
      { label: 'readOnly', binding: 'readOnly', readOnly: true },
      { label: 'modifiable', binding: 'modifiable', modifiable: false },
      { label: 'dataMap', binding: 'dataMap', dataMap: ['a', 'b', 'c'] },
      { label: 'visible', binding: 'visible', visible: false },
      { label: 'datePicker', binding: 'datePicker', editor: 'datePicker' },
      { label: 'dateTimePicker', binding: 'dateTimePicker', editor: 'dateTimePicker' },
      { label: 'dateTimeMilliPicker', binding: 'dateTimeMilliPicker', editor: 'dateTimeMilliPicker' }
    ],
    viewData: viewData
  }
}`

export default {
  name: 'GridColumnProps',
  components: {
    PrismEditor
  },
  mounted () {},
  watch: {},
  methods: {
    visibleColumn () {
      this.columns[4].visible = !this.columns[4].visible
    },
    addRow () {
      this.$refs.grid.addRows([{ required: 'required4', readOnly: 'readOnly4', modifiable: 'modifiable' }])
    }
  },
  data () {
    return {
      data: [
        { required: 'required1', readOnly: 'readOnly1', dataMap: 'a', count: 1 },
        { required: 'required2', readOnly: 'readOnly2', dataMap: 'b', count: 15 },
        { required: 'required3', readOnly: 'readOnly3', dataMap: 'c', count: 3000 }
      ],
      columns: [
        { label: 'required', binding: 'required', required: true },
        { label: 'readOnly', binding: 'readOnly', readOnly: true },
        { label: 'modifiable', binding: 'modifiable', modifiable: false },
        { label: 'dataMap', binding: 'dataMap', dataMap: ['a', 'b', 'c'] },
        { label: 'visible', binding: 'visible', visible: false },
        { label: 'datePicker', binding: 'datePicker', editor: 'datePicker' },
        { label: 'dateTimePicker', binding: 'dateTimePicker', editor: 'dateTimePicker' },
        { label: 'dateTimeMilliPicker', binding: 'dateTimeMilliPicker', editor: 'dateTimeMilliPicker' },
        { label: 'Numbers', binding: 'count', dataType: 'Number' }
      ],
      viewData: viewData
    }
  }
}
</script>

<style lang="scss">
</style>
