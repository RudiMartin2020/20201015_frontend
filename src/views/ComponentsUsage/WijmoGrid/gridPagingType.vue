<template>
  <component-panel
    title="Paging Type"
    class="wijmo-grid-example"
  >
    <div
      class="chart-container"
      style="height: auto"
    >
      <h2 class="chart-title">
        load-more
      </h2>
      <sk-grid
        style="height:200px;"
        :items-source="loadMoreData"
        :items-append-source="loadMoreAppendData"
        :columns="columns"
        :initial-focus="false"
        :use-checkbox="false"
        :paging-type="'load-more'"
        :paging-size="50"
        :total-element-count="totalElements"
        :total-page="totalPages"
        :current-page="loadMoreCurrentPage"
        @changed-page="changedLoadMorePage"
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
          v-model="loadMoreViewData"
          ref="prism"
          language="js"
          :line-numbers="true"
          :auto-style-line-numbers="true"
          class="my-editor"
          readonly
        />
      </b-collapse>
      <br>
      <h2 class="chart-title">
        Pagination
      </h2>
      <sk-grid
        ref="paginationGrid"
        style="height:200px;"
        :items-source="paginationData"
        :columns="columns"
        :initial-focus="false"
        :use-checkbox="false"
        :paging-type="'pagination'"
        :paging-size="50"
        :total-element-count="totalElements"
        :total-page="totalPages"
        :current-page="paginationCurrentPage"
        @changing-page="changingPage"
        @changed-page="changedPaginationPage"
      />
      <b-collapse
        :open="false"
        aria-id="gridPagination"
      >
        <b-button
          type="is-dark"
          slot="trigger"
          aria-controls="gridPagination"
        >
          샘플 코드 보기
        </b-button>
        <prism-editor
          v-model="paginationViewData"
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

let loadMoreViewData =
`<sk-grid
  style="height:200px;"
  :items-source="loadMoreData"
  :items-append-source="loadMoreAppendData"
  :columns="columns"
  :initial-focus="false"
  :use-checkbox="false"
  :paging-type="'load-more'"
  :paging-size="50"
  :total-element-count="totalElements"
  :total-page="totalPages"
  :current-page="loadMoreCurrentPage"
  @changed-page="changedLoadMorePage"
/>
...
...
methods: {
  changedLoadMorePage (page, size) {
    this.loadMoreCurrentPage = this.loadMoreCurrentPage+1
    let response = this.getData('load')
    if (page > 0) {
      this.loadMoreAppendData = response
    } else {
      this.loadMoreData = response
    }
  },
  getData (type) {
    let data = []
    let start = type === 'load' ? (this.loadMoreCurrentPage + 1) * 50 - 50 : (this.paginationCurrentPage + 1) * 50 - 50
    let end = type === 'load' ? (this.loadMoreCurrentPage + 1) * 50 - 1 : (this.paginationCurrentPage + 1) * 50 - 1
    for (start; start <= end; start++) {
      data.push({ column1: 'row' + start + '_c1', column2: 'row' + start + '_c2', column3: 'row' + start + '_c3' })
    }
    return data
  },
  changingPage (event) {
    let modifiedRow = this.$refs.paginationGrid.getModifiedRows().length
    if (modifiedRow > 0) {
      let result = confirm(\`\${modifiedRow}개의 수정된 항목이 있습니다. 계속 하시겠습니까?\`)
      if (!result) {
        event.cancel = true
      }
    }
  }
},
data () {
  return {
    loadMoreData: [],
    loadMoreAppendData: [],
    totalElements: 100,
    totalPages: 2,
    loadMoreCurrentPage: 0,
    paginationData: [],
    paginationCurrentPage: 0,
    columns: [
      { label: 'column1', binding: 'column1' },
      { label: 'column2', binding: 'column2' },
      { label: 'column3', binding: 'column3' },
      { label: 'column4', binding: 'column4' }
    ]
  }
}
`

let paginationViewData =
`<sk-grid
  ref="paginationGrid"
  style="height:200px;"
  :items-source="paginationData"
  :columns="columns"
  :initial-focus="false"
  :use-checkbox="false"
  :paging-type="'pagination'"
  :paging-size="50"
  :total-element-count="totalElements"
  :total-page="totalPages"
  :current-page="paginationCurrentPage"
  @changing-page="changingPage"
  @changed-page="changedPaginationPage"
/>
...
...
methods: {
  changedPaginationPage (page, size) {
    this.paginationCurrentPage = page
    let response = this.getData()
    this.paginationData = response
  },
  getData (type) {
    let data = []
    let start = type === 'load' ? (this.loadMoreCurrentPage + 1) * 50 - 50 : (this.paginationCurrentPage + 1) * 50 - 50
    let end = type === 'load' ? (this.loadMoreCurrentPage + 1) * 50 - 1 : (this.paginationCurrentPage + 1) * 50 - 1
    for (start; start <= end; start++) {
      data.push({ column1: 'row' + start + '_c1', column2: 'row' + start + '_c2', column3: 'row' + start + '_c3' })
    }
    return data
  },
  changingPage (event) {
    let modifiedRow = this.$refs.paginationGrid.getModifiedRows().length
    if (modifiedRow > 0) {
      let result = confirm(\`\${modifiedRow}개의 수정된 항목이 있습니다. 계속 하시겠습니까?\`)
      if (!result) {
        event.cancel = true
      }
    }
  }
},
data () {
  return {
    totalElements: 100,
    totalPages: 2,
    paginationData: [],
    paginationCurrentPage: 0,
    columns: [
      { label: 'column1', binding: 'column1' },
      { label: 'column2', binding: 'column2' },
      { label: 'column3', binding: 'column3' },
      { label: 'column4', binding: 'column4' }
    ]
  }
}
`

export default {
  name: 'GridPagingType',
  components: {
    PrismEditor
  },
  mounted () {
    this.loadMoreData = this.getData('load')
    this.paginationData = this.getData()
  },
  methods: {
    changedLoadMorePage (page, size) {
      this.loadMoreCurrentPage = this.loadMoreCurrentPage + 1
      let response = this.getData('load')
      if (page > 0) {
        this.loadMoreAppendData = response
      } else {
        this.loadMoreData = response
      }
    },
    changedPaginationPage (page, size) {
      this.paginationCurrentPage = page
      let response = this.getData()
      this.paginationData = response
    },
    getData (type) {
      let data = []
      let start = type === 'load' ? (this.loadMoreCurrentPage + 1) * 50 - 50 : (this.paginationCurrentPage + 1) * 50 - 50
      let end = type === 'load' ? (this.loadMoreCurrentPage + 1) * 50 - 1 : (this.paginationCurrentPage + 1) * 50 - 1
      for (start; start <= end; start++) {
        data.push({ column1: 'row' + start + '_c1', column2: 'row' + start + '_c2', column3: 'row' + start + '_c3' })
      }
      return data
    },
    changingPage (event) {
      let modifiedRow = this.$refs.paginationGrid.getModifiedRows().length
      if (modifiedRow > 0) {
        let result = confirm(`${modifiedRow}개의 수정된 항목이 있습니다. 계속 하시겠습니까?`)
        if (!result) {
          event.cancel = true
        }
      }
    }
  },
  data () {
    return {
      loadMoreData: [],
      loadMoreAppendData: [],
      totalElements: 100,
      totalPages: 2,
      loadMoreCurrentPage: 0,
      paginationData: [],
      paginationCurrentPage: 0,
      columns: [
        { label: 'column1', binding: 'column1', minWidth: 100 },
        { label: 'column2', binding: 'column2', maxWidth: 100 },
        { label: 'column3', binding: 'column3', width: 150 },
        { label: 'column4', binding: 'column4' }
      ],
      loadMoreViewData: loadMoreViewData,
      paginationViewData: paginationViewData
    }
  }
}
</script>

<style lang="scss">
</style>
