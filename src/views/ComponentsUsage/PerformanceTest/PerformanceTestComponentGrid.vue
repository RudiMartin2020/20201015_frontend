<template>
  <component-panel
    title="SK Grid"
    class="event-grid"
    name="event-search-grid"
    :payload="condition"
  >
    <template #header>
      <div class="header-buttons">
        <b-switch v-model="readOnly">
          읽기 전용
        </b-switch>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        데이터 건수: {{ data.length | locale }}
      </div>
    </template>
    <div class="chart-grid">
      <sk-grid
        ref="dataGrid"
        selection-mode="ListBox"
        export-date-format="YYYYMMDDHHmmss"
        :use-checkbox="false"
        :items-source.sync="data"
        :item-formatter="gridItemFormatter"
        :columns="columns"
        :initial-focus="false"
        :read-only="readOnly"
        @loading-rows="$emit('loading-rows')"
        @loaded-rows="$emit('loaded-rows')"
        @refreshing="$emit('refreshing')"
        @refreshed="$emit('refreshed')"
      />
    </div>
    <!-- /chart-grid -->
    <b-modal
      :active.sync="originalDataModal.active"
      has-modal-card
    >
      <div class="modal-card -original-data">
        <header class="modal-card-head">
          <span class="modal-card-title">Original Data</span>
        </header>
        <section class="modal-card-body">
          <vue-json-pretty
            :data="originalDataModal.data"
          />
        </section>
        <footer class="modal-card-foot buttons">
          <b-button
            size="is-medium"
            @click="originalDataModal.active = false"
          >
            닫기
          </b-button>
        </footer>
      </div>
      <!-- /.modal-card -->
    </b-modal>
  </component-panel>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import _ from 'lodash'

export default {
  name: 'PerfTestComponentGrid',
  components: {
    'vue-json-pretty': VueJsonPretty
  },
  props: {
    condition: {
      type: Object,
      default () {
        return {}
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    data () {
      // console.log('데이타 바꼈다...')
    },
    condition () {
      // console.log('@condition changed!!!!')
      // this.searchEvent()
    }
  },
  mounted () {
    if (Object.keys(this.condition).length) this.searchEvent()
  },
  methods: {
    /* async searchEvent (condition = this.condition) {
      let response = await API.spc.eventHub.listDColSearchData({
        payload: condition
      })
      this.data = (response && response.data) ? response.data : []
    }, */
    gridItemFormatter (panel, row, column, cell) {
      if (panel.columns[column].binding === 'dataOrginl') {
        if (panel.rows[row].dataItem) {
          cell.innerHTML = '<button type="button" class="button is-small is-gray">상세보기</button>'
          cell.addEventListener('mousedown', () => {
            this.showRawData(this.$refs.dataGrid.grid, { col: column, row: row })
          })
        }
      }
    },
    showRawData (grid, event) {
      let binding = grid.columns[event.col].binding
      let data = grid.itemsSource.items[event.row]
      if (binding === 'dataOrginl') {
        this.setModal(this.originalDataModal, data[binding])
      }
    },
    setModal (modal = this.originalDataModal, data = {}) {
      if (_.isString(data)) data = JSON.parse(data)
      modal.active = true
      modal.data = data
    },
    addRows (rows) {
      this.$refs.dataGrid.setSelection()
      this.$refs.dataGrid.addRows(rows)
    }
  },
  data () {
    return {
      readOnly: true,
      originalDataModal: {
        active: false,
        data: {}
      },
      columns: [
        {
          label: '상세보기',
          width: '1*',
          binding: 'dataOrginl',
          readOnly: true
        },
        {
          label: 'FAB',
          width: '1*',
          binding: 'grpLvl1Val',
          readOnly: true
        },
        {
          label: 'TECH',
          width: '1*',
          binding: 'grpLvl2Val',
          readOnly: true
        },
        {
          label: 'PRODUCT',
          width: '1*',
          binding: 'grpLvl3Val',
          readOnly: true
        },
        {
          label: 'OPER',
          width: '1*',
          binding: 'grpLvl4Val',
          readOnly: true
        },
        {
          label: 'EQ',
          width: '1*',
          binding: 'grpLvl5Val',
          readOnly: true
        },
        {
          label: 'LOT',
          width: '1*',
          binding: 'key1Val',
          readOnly: true
        },
        {
          label: 'WF',
          width: '1*',
          binding: 'key2Val',
          readOnly: true
        },
        {
          label: 'SITE',
          width: '1*',
          binding: 'key3Val',
          readOnly: true
        },
        {
          label: 'PARA NAME',
          width: '1*',
          binding: 'paramName',
          readOnly: true
        },
        {
          label: 'PARA VAL',
          width: '1*',
          binding: 'paramVal',
          readOnly: true
        },
        {
          label: 'TYPE',
          width: '1*',
          binding: 'paramType',
          readOnly: true
        },
        {
          label: 'CREATE DATE',
          width: '1*',
          dataType: 'Date',
          binding: 'paramCrtDttm',
          format: 'yyyy.MM.dd HH:mm:ss',
          readOnly: true
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  .event-grid {
    position: relative;
    .header-content {
      text-align: right;
      vertical-align: center;
      line-height: 46px;
    }
    .chart-grid {
      height: 100%;
    }
  }
</style>
