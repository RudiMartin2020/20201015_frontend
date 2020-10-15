<template>
  <section class="performance-test-grid">
    <component-panel
      class="grid-options"
      :use-header="false"
    >
      <div class="panel-content level">
        <b-select v-model="itemCount">
          <option
            v-for="count in itemCountOptions"
            :value="count"
            :key="count"
          >
            {{ count | locale }}
          </option>
        </b-select>
        <b-button
          type="is-dark"
          @click="e => { excelExport($refs.grid.$refs.dataGrid) }"
        >
          EXCEL EXPORT
        </b-button>
        <b-switch v-model="showSkGrid">
          SK Grid
        </b-switch>
        <b-switch v-model="showWjGrid">
          Wijmoj Grid
        </b-switch>
        <b-dropdown class="content-keys">
          <b-button
            type="is-dark"
            slot="trigger"
            icon-right="chevron-down"
          >
            Select Keys
          </b-button>
          <b-button
            type="is-dark"
            @click="e => {
              keyList.map(item => {
                item.state = true
                return item
              })
            }"
          >
            전체 선택
          </b-button>
          <br>
          <b-button
            type="is-dark"
            @click="e => {
              keyList.map(item => {
                item.state = false
                return item
              })
            }"
          >
            전체 선택 해제
          </b-button>
          <br>
          <ul class="key-list">
            <li
              class="key-item"
              v-for="key in keyList"
              :key="key.name"
            >
              <b-checkbox v-model="key.state">
                {{ key.name }}
              </b-checkbox>
            </li>
          </ul>
        </b-dropdown>
        <b-button
          type="is-primary"
          @click="e => getItems(itemCount)"
        >
          GET
        </b-button>
      </div>
      <!-- /.panel-content -->
    </component-panel>
    <event-search-grid
      v-if="showSkGrid"
      class="sk-grid-panel"
      ref="grid"
      :data="data"
      @loading-rows="skLoadingRows"
      @loaded-rows="skLoadedRows"
      @refreshing="skRefreshing"
      @refreshed="skRefreshed"
    />
    <component-panel
      class="wj-grid-panel"
      title="Wijmo Grid"
      v-if="showWjGrid"
    >
      <template #header>
        <div class="header-buttons">
          데이터 건수: {{ data.length | locale }}
        </div>
      </template>
      <wj-flex-grid
        :items-source="data"
        :loaded-rows="wjGridLoadedRows"
        :loading-rows="wjGridLoadingRows"
        :refreshing="wjGridRefreshing"
        :refreshed="wjGridRefreshed"
      >
        <wj-flex-grid-filter />
        <wj-flex-grid-column
          v-for="(column, key) in columns"
          :key="'column-' + key"
          :header="column.label"
          :binding="column.binding"
          :width="column.width"
        />
      </wj-flex-grid>
    </component-panel>
  </section>
</template>

<script>
import Axios from 'axios'
import PerformanceTestComponentGrid from './PerformanceTestComponentGrid'

export default {
  name: 'PerfTestGrid',
  components: {
    'event-search-grid': PerformanceTestComponentGrid
  },
  methods: {
    apiConfig () {
      const env = (process.env.NODE_ENV === 'production')
      const port = this.$store.getters.theApis.spc.sitePort
      return {
        url: env ? ((process.env.VUE_APP_HTTPS_ENABLE === 'true' ? 'https://' : 'http://') + store.getters.theApis.spc.siteIp) : 'http://61.250.84.93',
        port: env ? port : '12000'
      }
    },
    async requestPerformance (params) {
      console.log(params)
      try {
        let response = await Axios.get(
          this.apiConfig().url + ':' + this.apiConfig().port + '/performance',
          { params: params }
        )
        return response
      } catch (error) {
        console.error(error)
      }
    },
    excelExport (grid) {
      console.log(this.$refs)
      grid.exportExcel()
    },
    async getItems (count = 5000) {
      performance.mark('sk-grid: request-start')
      performance.mark('wj-grid: request-start')
      let response = await this.requestPerformance({
        limit: count,
        keys: this.keyList.reduce((acc, cur) => {
          if (cur.state) return [...acc, cur.name]
          return [...acc]
        }, []).join(',')
      })
      if (response.data) {
        let result = response.data
        performance.mark('sk-grid: request-end')
        performance.mark('wj-grid: request-end')

        // item에 _idx붙여서 초기 인덱스 보관
        result.forEach((item, i) => {
          item._idx = i
        })

        this.data = result
      }
    },
    skLoadingRows () {
      performance.mark('sk-grid: load-start')
    },

    skLoadedRows () {
      performance.mark('sk-grid: load-end')
    },

    skRefreshing () {
      performance.mark('sk-grid: refresh-start')
    },

    skRefreshed () {
      performance.mark('sk-grid: refresh-end')
      this.perf([
        'sk-grid: request-start', 'sk-grid: request-end', 'sk-grid: load-start', 'sk-grid: load-end', 'sk-grid: refresh-start', 'sk-grid: refresh-end'
      ], [
        { name: 'SK GRID REQUEST 소요시간', from: 'sk-grid: request-start', to: 'sk-grid: request-end' },
        { name: 'SK GRID Data 처리 & 렌더링 소요시간', from: 'sk-grid: request-end', to: 'sk-grid: refresh-end' }
      ])
    },

    wjGridLoadingRows () {
      performance.mark('wj-grid: load-start')
    },

    wjGridLoadedRows () {
      performance.mark('wj-grid: load-end')
    },

    wjGridRefreshing () {
      performance.mark('wj-grid: refresh-start')
    },

    wjGridRefreshed () {
      performance.mark('wj-grid: refresh-end')
      this.perf([
        'wj-grid: request-start', 'wj-grid: request-end', 'wj-grid: load-start', 'wj-grid: load-end', 'wj-grid: refresh-start', 'wj-grid: refresh-end'
      ], [
        { name: 'WJ GRID REQUEST 소요시간', from: 'wj-grid: request-start', to: 'wj-grid: request-end' },
        { name: 'WJ GRID Data 처리 & 렌더링 소요시간', from: 'wj-grid: request-end', to: 'wj-grid: refresh-end' }
      ])
    },

    perf (marks = [], additional = []) {
      for (let mark in marks) {
        if (!performance.getEntriesByName(marks[mark]).length) return
      }
      let perfLog = marks.reduce((acc, cur) => {
        const measured = acc.length ? performance.measure(
          cur, acc[acc.length - 1].to, cur
        ) : 0
        const obj = {
          from: acc.length ? acc[acc.length - 1].to : undefined,
          to: cur,
          duration: measured.duration
        }
        return [...acc, obj]
      }, [])

      const additionalPerfLog = additional.map(item => {
        return {
          from: item.name,
          to: '',
          duration: performance.measure(
            item.name, item.from, item.to
          ).duration
        }
      })

      console.table([...perfLog, ...additionalPerfLog])
      marks.forEach(mark => {
        performance.clearMarks(mark)
      })
      performance.clearMeasures()
    }
  },
  data () {
    return {
      data: [],
      showSkGrid: true,
      showWjGrid: true,
      keyList: [
        { state: true, name: 'grpLvl1Val' },
        { state: true, name: 'grpLvl2Val' },
        { state: true, name: 'grpLvl3Val' },
        { state: true, name: 'grpLvl4Val' },
        { state: true, name: 'grpLvl5Val' },
        { state: true, name: 'grpLvl6Val' },
        { state: true, name: 'grpLvl7Val' },
        { state: true, name: 'grpLvl8Val' },
        { state: true, name: 'grpLvl9Val' },
        { state: true, name: 'grpLvl10Val' },
        { state: true, name: 'key1Val' },
        { state: true, name: 'key2Val' },
        { state: true, name: 'key3Val' },
        { state: true, name: 'key4Val' },
        { state: true, name: 'key5Val' },
        { state: true, name: 'paramVal' },
        { state: true, name: 'paramName' },
        { state: true, name: 'paramType' },
        { state: true, name: 'dataSmry' },
        { state: true, name: 'dataOrginl' },
        { state: true, name: 'paramCrtDttm' }
      ],
      itemCount: 5000,
      itemCountOptions: [
        100,
        500,
        1000,
        5000,
        10000,
        50000,
        100000,
        200000,
        300000,
        400000,
        500000
      ],
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
  section.performance-test-grid {
    padding-left: $gap;
    height: 100%;
    .grid-options {
      margin-bottom: $gap;
      padding-bottom: 0;
      .panel-body {
        overflow: visible;
      }
      .dropdown-content {
        background-color: #333;
        padding: $gap;
      }
    }
    .sk-grid-panel {
      height: 40vh;
    }

    .wj-grid-panel {
      height: 40vh;
      margin-top: $gap;
    }
  }
</style>
