<template>
  <component-panel
    title="Methods"
    class="wijmo-grid-example"
  >
    <div
      class="chart-container"
      style="height: auto"
    >
      <div class="sk-grid-methods">
        <b-field>
          <b-button
            outlined
            type="is-light"
            @click="checkedRows"
          >
            checkedRows
          </b-button>
          <b-button
            outlined
            type="is-light"
            @click="modifiedRows"
          >
            modifiedRows
          </b-button>
          <b-button
            outlined
            type="is-light"
            @click="addRows"
          >
            add row
          </b-button>

          <b-button
            outlined
            type="is-light"
            @click="removeAddedRows"
          >
            remove added rows
          </b-button>

          <b-button
            outlined
            type="is-light"
            @click="addedRows"
          >
            addedRows
          </b-button>
          <b-button
            outlined
            type="is-light"
            @click="totalModifiedRows"
          >
            totalModifiedRows
          </b-button>
          <b-button
            outlined
            type="is-light"
            @click="exportExcel"
          >
            Export Excel
          </b-button>
        </b-field>
      </div>
      <sk-grid
        style="height: inherit"
        ref="grid"
        :items-source.sync="data3"
        :columns="columns"
        :initial-focus="false"
        :use-checkbox="true"
        @initialized="gridInitialized"
      />
      <br>
      <vue-json-pretty
        :data="rows"
        :show-line="false"
      />
      rows 데이터
      <vue-json-pretty
        :data="decoupledData"
        :show-line="false"
      />
      <b-collapse
        :open="true"
        aria-id="gridGetMethods"
      >
        <b-button
          type="is-dark"
          slot="trigger"
          aria-controls="gridGetMethods"
        >
          샘플 코드 보기
        </b-button>
        <prism-editor
          v-model="getMethos"
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

let getMethos =
`<div>
  <b-button
    class="button"
    @click="checkedRows"
  >
    checkedRows
  </b-button>
  <b-button
    class="button"
    @click="modifiedRows"
  >
    modifiedRows
  </b-button>
  <b-button
    class="button"
    @click="addRows"
  >
    add row
  </b-button>

  <b-button
    outlined
    type="is-light"
    @click="removeAddedRows"
  >
    remove added rows
  </b-button>

  <b-button
    class="button"
    @click="addedRows"
  >
    addedRows
  </b-button>
  <b-button
    class="button"
    @click="totalModifiedRows"
  >
    totalModifiedRows
  </b-button>
  <b-button
    class="button"
    @click="exportExcel"
  >
    Export Excel
  </b-button>
</div>

<sk-grid
  style="height: inherit"
  ref="grid"
  :items-source.sync="data3"
  :columns="columns"
  :initial-focus="false"
  :use-checkbox="true"
/>

<vue-json-pretty
  :data="rows"
  :show-line="false"
/>
...
...
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
  gridInitialized () {
    this.itemsSourceCollection = this.$refs.grid.itemsSourceCollection.items
  },
  removeAddedRows () {
    this.$refs.grid.itemsSource.forEach((item, i) => {
      if (item._status.checked && item._status.added) {
        this.$refs.grid.itemsSource.splice(i, 1)
      }
    })
  }
},
data () {
  return {
    rows: '',
    data3: [
      { column1: 'row1_c1', column2: 'row1_c2', column3: 'row1_c3' },
      { column1: 'row2_c1', column2: 'row2_c2', column3: 'row2_c3' }
    ],
    columns: [
      { label: 'column1', binding: 'column1' },
      { label: 'column2', binding: 'column2' },
      { label: 'column3', binding: 'column3' }
    ]
  }
}
`

export default {
  name: 'GridProperties',
  components: {
    VueJsonPretty,
    PrismEditor
  },
  computed: {
    decoupledData () {
      return this.itemsSourceCollection.map(row => {
        let obj = { ...row }
        if (row._status) {
          obj._status = {
            added: row._status.added,
            checked: row._status.checked,
            modified: row._status.modified
          }
        }
        return obj
      })
    }
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
      this.itemsSourceCollection = this.$refs.grid.itemsSourceCollection.items
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
    gridInitialized () {
      this.itemsSourceCollection = this.$refs.grid.itemsSourceCollection.items
    },
    removeAddedRows () {
      this.$refs.grid.itemsSource.forEach((item, i) => {
        if (item._status.checked && item._status.added) {
          this.$refs.grid.itemsSource.splice(i, 1)
        }
      })
    }
  },
  data () {
    return {
      rows: '',
      data3: [
        { column1: 'row1_c1', column2: 'row1_c2', column3: 'row1_c3' },
        { column1: 'row2_c1', column2: 'row2_c2', column3: 'row2_c3' }
      ],
      columns: [
        { label: 'column1', binding: 'column1' },
        { label: 'column2', binding: 'column2' },
        { label: 'column3', binding: 'column3' }
      ],
      getMethos: getMethos,
      itemsSourceCollection: []
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
