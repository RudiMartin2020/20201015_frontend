<template>
  <component-panel
    title="Columns 변경"
    class="wijmo-grid-example"
  >
    <div
      class="chart-container"
      style="height: auto"
    >
      <!-- <h2 class="chart-title">
        sk-grid columns 변경
      </h2> -->
      <sk-grid
        :items-source="data"
        :columns="columns"
        :initial-focus="false"
        :use-checkbox="false"
      />
      <b-collapse
        :open="true"
        aria-id="gridColumnsUpdate"
      >
        <b-button
          type="is-dark"
          slot="trigger"
          aria-controls="gridColumnsUpdate"
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

let viewdata =
`<sk-grid
  :items-source="data"
  :columns="columns"
  :initial-focus="false"
/>
...
...
data () {
  return {
    columns: [
      { label: 'column1', binding: 'column1', readOnly: true, required: true },
      { label: 'column2', binding: 'column2' },
      { label: 'column3', binding: 'column3', readOnly: true },
      { label: 'column4', binding: 'column4', readOnly: true, visible: false }
    ]
  }
}`

export default {
  name: 'GridDefault',
  components: {
    PrismEditor
  },
  mounted () {},
  methods: {},
  data () {
    return {
      data: [
        { column1: 'row1_c1', column2: 'row1_c2', column3: 'row1_c3' },
        { column1: 'row2_c1', column2: 'row2_c2', column3: 'row2_c3' }
      ],
      columns: [
        { label: 'column1', binding: 'column1', readOnly: true, required: true },
        { label: 'column2', binding: 'column2' },
        { label: 'column3', binding: 'column3', readOnly: true },
        { label: 'column4', binding: 'column4', readOnly: true, visible: false }
      ],
      viewData: viewdata
    }
  }
}
</script>

<style lang="scss">
</style>
