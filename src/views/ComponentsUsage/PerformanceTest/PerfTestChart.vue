<template>
  <section class="performance-test-chart">
    <component-panel
      class="chart-options"
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
        <b-switch v-model="showSkChart">
          SK Chart
        </b-switch>
        <b-switch v-model="showWjChart">
          Wijmo Chart
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
    <event-search-chart
      v-if="showSkChart"
      class="sk-chart-panel"
      ref="chart"
      :data="data"
      @rendering="skChartRendering"
      @rendered="skChartRendered"
      @refreshing="skChartRefreshing"
      @refreshed="skChartRefreshed"
    />
    <component-panel
      v-if="showWjChart"
      title="Wijmo Chart"
      class="wj-chart-panel"
    >
      <wj-flex-chart
        :items-source="wjChartData"
        chart-type="Scatter"
        selection-mode="Point"
        binding-x="paramCrtDttm"
        :rendering="wjChartRendering"
        :rendered="wjChartRendered"
        :refreshing="wjChartRefreshing"
        :refreshed="wjChartRefreshed"
      >
        <wj-flex-chart-series
          binding="paramVal"
          :symbol-size="3"
        />
      </wj-flex-chart>
    </component-panel>
  </section>
</template>

<script>
import Axios from 'axios'
import Dayjs from 'dayjs'
import PerformanceTestComponentChart from './PerformanceTestComponentChart'

export default {
  name: 'PerfTestChart',
  components: {
    'event-search-chart': PerformanceTestComponentChart
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
        // let response = await Axios.get(
        //   this.apiConfig().url + ':' + this.apiConfig().port + '/performance',
        //   { params: params }
        // )
        let response = {
          data: await this.generateData(params.limit)
        }
        return response
      } catch (error) {
        console.error(error)
      }
    },
    async generateData (limit = 100) {
      console.log(limit)
      return new Promise((resolve, reject) => {
        let arr = []
        for (let i = 0; i < limit; i++) {
          arr.push({
            paramVal: Math.round(Math.random() * 100),
            paramCrtDttm: Dayjs((1000 * 60 * 60 * 24 * 365 * 50 + i * 1000 * 60)).format('YYYYMMDDHHmmss')
          })
        }
        resolve(arr)
      })
    },
    async getItems (count = 5000) {
      performance.mark('sk-chart: request-start')
      performance.mark('wj-chart: request-start')
      let response = await this.requestPerformance({
        limit: count,
        keys: this.keyList.reduce((acc, cur) => {
          if (cur.state) return [...acc, cur.name]
          return [...acc]
        }, []).join(',')
      })
      if (response.data) {
        let result = response.data
        performance.mark('sk-chart: request-end')
        performance.mark('wj-chart: request-end')

        // item에 _idx붙여서 초기 인덱스 보관
        // result.forEach((item, i) => {
        //   item._idx = i
        // })

        if (this.showWjChart) {
          performance.mark('wj-chart: makeup-data-start')
          this.wjChartData = result.map(item => {
            item.paramCrtDttm = Dayjs(item.paramCrtDttm).valueOf()
            return item
          })
          performance.mark('wj-chart: makeup-data-end')
        }

        this.data = result
        // this._gridChart(result)
      }
    },

    skChartRendering () {
      performance.mark('sk-chart: rendering')
    },

    skChartRendered () {
      performance.mark('sk-chart: rendered')
    },

    skChartRefreshing () {
      performance.mark('sk-chart: refreshing')
    },

    skChartRefreshed () {
      performance.mark('sk-chart: refreshed')
      this.perf([
        'sk-chart: request-start', 'sk-chart: request-end', 'sk-chart: refreshing', 'sk-chart: rendering', 'sk-chart: rendered', 'sk-chart: refreshed'
      ], [
        { name: 'SK CHART REQUEST 소요시간', from: 'sk-chart: request-start', to: 'sk-chart: request-end' },
        { name: 'SK CHART Data 처리 & 렌더링 소요시간', from: 'sk-chart: request-end', to: 'sk-chart: refreshed' }
      ])
    },

    wjChartRendering () {
      performance.mark('wj-chart: rendering')
    },

    wjChartRendered () {
      performance.mark('wj-chart: rendered')
    },

    wjChartRefreshing () {
      performance.mark('wj-chart: refreshing')
    },

    wjChartRefreshed () {
      performance.mark('wj-chart: refreshed')
      this.perf([
        'wj-chart: request-start', 'wj-chart: request-end', 'wj-chart: makeup-data-start', 'wj-chart: makeup-data-end', 'wj-chart: refreshing', 'wj-chart: rendering', 'wj-chart: rendered', 'wj-chart: refreshed'
      ], [
        { name: 'WIJMO CHART REQUEST 소요시간', from: 'wj-chart: request-start', to: 'wj-chart: request-end' },
        { name: 'WIJMO CHART Data 처리 & 렌더링 소요시간', from: 'wj-chart: request-end', to: 'wj-chart: refreshed' }
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
      wjChartData: [],
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
      showSkChart: true,
      showWjChart: true,
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
      ]
    }
  }
}
</script>

<style lang="scss">
  section.performance-test-chart {
    padding-left: $gap;
    height: 100%;
    .chart-options {
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
    .sk-chart-panel {
      height: 40vh;
    }
    .wj-chart-panel {
      margin-top: $gap;
      height: 40vh;
    }
  }
</style>
