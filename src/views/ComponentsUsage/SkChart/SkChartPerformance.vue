<template>
  <section class="event-hub -performance-test">
    <component-panel
      class="hub-search"
      :use-header="true"
      :multi-row-header="true"
    >
      <template slot="header">
        <div class="header-buttons">
          <pie-timer
            v-if="selectedRefreshInterval.value > 0"
            class="pie-timer"
            :class="'-time-' + selectedRefreshInterval.value"
          />
          <b-select
            v-model="selectedRefreshInterval"
            placeholder="Refresh Interval"
            @input="setIntervalAction"
            :disabled="unIntervalable()"
          >
            <option
              v-for="interval in refreshIntervals"
              :value="interval"
              :key="interval.value"
            >
              {{ interval.label }}
            </option>
          </b-select>
          <b-button
            type="is-gray"
            icon-left="export"
            :disabled="isActionable()"
            @click="exportData(flexGrid)"
          >
            {{ $t('spc.SPC_EVENT_VISUAL.BUTTON_002') }}
          </b-button>
        </div>
        <div class="header-buttons">
          <b-button
            type="is-gray"
            icon-left="folder-open"
            @click="() => { isOpenModalActive = true }"
          >
            {{ $t('spc.SPC_EVENT_VISUAL.BUTTON_003') }}
          </b-button>
          <b-button
            type="is-primary"
            icon-left="content-save"
            @click="() => { isSaveModalActive = true }"
            :disabled="isActionable()"
          >
            {{ $t('spc.SPC_EVENT_VISUAL.BUTTON_004') }}
          </b-button>
          <b-button
            type="is-gray"
            icon-left="magnify"
            :disabled="isSearchable()"
            @click="handleSeachButton()"
          >
            {{ $t('spc.SPC_EVENT_VISUAL.BUTTON_005') }}
          </b-button>
          <b-modal
            :active.sync="isSaveModalActive"
            has-modal-card
          >
            <div class="modal-card -save-condition">
              <header class="modal-card-head">
                <span class="modal-card-title">{{ $t('spc.SPC_EVENT_VISUAL.LABEL_007_1') }}</span>
              </header>
              <section class="modal-card-body">
                <b-field
                  :label="$t('spc.SPC_EVENT_VISUAL.LABEL_006')"
                >
                  <b-input v-model="condition.title" />
                </b-field>
                <b-field>
                  <b-radio
                    v-model="condition.isPublic"
                    :native-value="true"
                  >
                    Public
                  </b-radio>
                  &nbsp;&nbsp;&nbsp;
                  <b-radio
                    v-model="condition.isPublic"
                    :native-value="false"
                  >
                    Private
                  </b-radio>
                </b-field>
              </section>
              <footer class="modal-card-foot">
                <b-button
                  type="is-primary"
                  size="is-medium"
                  @click="saveSearchCondition"
                  :disabled="isSavable()"
                >
                  {{ $t('spc.SPC_EVENT_VISUAL.BUTTON_004') }}
                </b-button>
              </footer>
            </div>
          </b-modal>
          <b-modal
            :active.sync="isOpenModalActive"
            @close="closingOpenModal"
            has-modal-card
          >
            <div class="modal-card -open-condition">
              <header class="modal-card-head">
                <span class="modal-card-title">{{ $t('spc.SPC_EVENT_VISUAL.LABEL_005') }}</span>
              </header>
              <section class="modal-card-body">
                <b-field
                  :label="$t('spc.SPC_EVENT_VISUAL.LABEL_006')"
                >
                  <b-input v-model="openCondition.title" />
                </b-field>
                <div class="level">
                  <b-field>
                    <b-radio
                      v-model="openCondition.isPublic"
                      :native-value="true"
                    >
                      Public
                    </b-radio>
                    &nbsp;&nbsp;&nbsp;
                    <b-radio
                      v-model="openCondition.isPublic"
                      :native-value="false"
                    >
                      Private
                    </b-radio>
                  </b-field>
                  <b-button
                    @click="listSearchCondition(openCondition)"
                    type="is-dark"
                  >
                    {{ $t('spc.SPC_EVENT_VISUAL.BUTTON_005') }}
                  </b-button>
                </div>
                <div
                  class="condition-list"
                  v-if="conditions.length"
                >
                  <div class="table-buttons">
                    <b-button
                      type="is-danger"
                      @click="deleteConditions()"
                      :disabled="conditionsChecked.length === 0"
                    >
                      {{ $t('spc.SPC_EVENT_VISUAL.BUTTON_006') }}
                    </b-button>
                  </div>
                  <b-table
                    :data="conditions"
                    @click="openClickedCondition"
                    :checked-rows.sync="conditionsChecked"
                    :paginated="true"
                    :total="conditionsTotal"
                    :per-page="conditionsPerPage"
                    :current-page.sync="conditionsCurrentPage"
                    :pagination-simple="false"
                    :backend-pagination="true"
                    checkable
                  >
                    <template slot-scope="props">
                      <b-table-column
                        field="indexName"
                        :label="$t('spc.SPC_EVENT_VISUAL.GRID_002.indexName')"
                      >
                        {{ props.row.indexName }}
                      </b-table-column>
                      <b-table-column
                        field="userId"
                        :label="$t('spc.SPC_EVENT_VISUAL.GRID_002.userId')"
                      >
                        {{ props.row.userId }}
                      </b-table-column>
                      <b-table-column
                        field="saveDttm"
                        :label="$t('spc.SPC_EVENT_VISUAL.GRID_002.saveDttm')"
                      >
                        {{ props.row.saveDttm | date }}
                      </b-table-column>
                      <b-table-column
                        field="conditionName"
                        :label="$t('spc.SPC_EVENT_VISUAL.GRID_002.conditionName')"
                      >
                        {{ props.row.conditionName }}
                      </b-table-column>
                    </template>
                  </b-table>
                </div>
                <!-- /.condition-list -->
              </section>
            </div>
          </b-modal>
        </div>
        <!-- /.header-buttons -->
      </template>
      <!-- /header -->
      <section class="panel-body">
        <div class="body-options">
          <ul class="option-body">
            <li class="option-item -data-size">
              <b-field label="Data Size">
                <b-select
                  placeholder="Select Event"
                  v-model="dataSizeSelected"
                  expanded
                >
                  <option
                    v-for="size in dataSizes"
                    :value="size"
                    :key="size"
                  >
                    {{ size | locale }}
                  </option>
                </b-select>
              </b-field>
            </li>
            <!-- ./-event-name -->
            <li class="option-item -event-name">
              <b-field label="Event Name">
                <b-select
                  placeholder="Select Event"
                  v-model="selectedEventIndexName"
                  @input="listIndexFieldName()"
                  expanded
                >
                  <option
                    v-for="name in eventIndexNames"
                    :value="name"
                    :key="name.indexKey"
                  >
                    {{ name.indexName }}
                  </option>
                </b-select>
              </b-field>
            </li>
            <!-- ./-event-name -->
            <li class="option-item -filter">
              <b-field label="Filter">
                <b-field>
                  <b-select
                    v-model="selectedFieldName.field"
                    @input="setSelectedFieldType"
                    expanded
                  >
                    <template
                      v-for="field in fieldNames"
                    >
                      <option
                        :value="field"
                        :key="field.fieldKey"
                        v-if="!field.added"
                      >
                        {{ field.fieldName }}
                      </option>
                    </template>
                  </b-select>
                  <b-select
                    v-model="selectedFieldName.type"
                  >
                    <option
                      v-for="type in fieldTypes"
                      :value="type"
                      :key="type"
                    >
                      {{ type }}
                    </option>
                  </b-select>
                </b-field>
              </b-field>
              <b-field>
                <b-input
                  placeholder="Keyword"
                  v-model="selectedFieldName.string"
                  expanded
                />
                <b-button
                  icon-left="plus-circle"
                  type="is-dark"
                  :disabled="isEventAddable()"
                  @click="addFilter(selectedFieldName)"
                >
                  {{ $t('spc.SPC_EVENT_VISUAL.BUTTON_007') }}
                </b-button>
              </b-field>
              <ul class="options-added">
                <li
                  class="added-item"
                  v-for="(event, i) in addedEvents"
                  :key="i"
                >
                  <div class="item-name">
                    {{ event.field.fieldName }} {{ event.type }} {{ event.string }}
                  </div>
                  <a
                    class="item-remove"
                    @click="removeItemFromAddedEvents(i)"
                  >
                    <b-icon
                      icon="close-circle"
                    />
                  </a>
                </li>
              </ul>
              <!-- options-added -->
            </li>
            <!-- ./-filter -->
            <li class="option-item -period">
              <b-field label="Period" />
              <b-radio
                v-model="selectedPeriod"
                native-value="MONTH"
                @input="setSelectedPeriod"
              >
                1 Month - Current
              </b-radio>
              <div class="period-detail -one-month">
                <b-field grouped>
                  <b-datepicker
                    v-model="oneMonthAgo"
                    placeholder="from"
                    disabled
                    expanded
                  />
                  <div class="control unit">
                    <b-icon icon="minus" />
                  </div>
                  <b-input
                    value="Current"
                    placeholder="to"
                    disabled
                    expanded
                  />
                </b-field>
              </div>
              <b-radio
                v-model="selectedPeriod"
                native-value="CUSTOM"
                @input="setSelectedPeriod"
              >
                From - To
              </b-radio>
              <div class="period-detail -custom-period">
                <b-field grouped>
                  <b-datepicker
                    placeholder="from"
                    v-model="startDate"
                    expanded
                    :disabled="selectedPeriod === 'MONTH'"
                    icon="calendar"
                  />
                  <div class="control unit">
                    <b-icon icon="minus" />
                  </div>
                  <b-datepicker
                    placeholder="to"
                    v-model="endDate"
                    expanded
                    :disabled="selectedPeriod === 'MONTH'"
                    icon="calendar"
                    position="is-bottom-left"
                  />
                </b-field>
              </div>
            </li>
            <!-- ./-period -->
          </ul>
          <!-- /option-body -->
        </div>
        <!-- /body-options -->
      </section>
      <!-- /panel-body -->
    </component-panel>
    <!-- /.hub-panel -->
    <event-search-chart
      ref="chart"
      :data="data"
    />
    <event-search-grid
      ref="grid"
      :data="data"
    />
  </section>
</template>

<script>
// import ChartData from '../../ComponentsUsage/Wijmo/chartData'
import _ from 'lodash'
import PieTimer from '@/components/PieTimer/PieTimer'
import Dayjs from 'dayjs'
import API from '@/components/Apis/'
// import SockJS from 'sockjs-client'
// import Stomp from 'webstomp-client'
import EventSerchChart from '@/views/Spc/EventHub/EventSearchChart'
import EventSerchGrid from '@/views/Spc/EventHub/EventSearchGrid'
import SpcUtils from '@/components/SpcUtils/SpcUtils'

const fieldTypes = ['=', 'LIKE']
const refreshIntervals = [
  { value: 0, label: 'OFF' },
  { value: 5, label: '5초' },
  { value: 30, label: '30초' },
  { value: 60, label: '1분' },
  { value: 600, label: '10분' },
  { value: 1800, label: '30분' },
  { value: 3600, label: '1시간' },
  { value: 86400, label: '하루' }
]

// DONE: Filtre의 fieldKey 한번 사용되면 중복 못하도록 list에서 제거

export default {
  name: 'SkChartPerformance',
  components: {
    'pie-timer': PieTimer,
    'event-search-chart': EventSerchChart,
    'event-search-grid': EventSerchGrid
  },
  props: {},
  async mounted () {
    this.resetData()
    this.eventIndexNames = await this.listIndexName()
    this.setIntervalAction()
  },
  beforeDestroy () {
    clearInterval(this.intervalAction)
    this.disconnectSocket()
  },
  watch: {
    conditionsCurrentPage (newval) {
      this.listSearchCondition()
    }
  },
  methods: {
    formatXAxis (engine, label) {
      console.warn('@formatXAxis: DEPRECATED')
      label.text = Dayjs(label.val).format('YYYY/MM/DD')
      return label
    },

    /**
     * Grid Initialized시 실행도비니다.
     *
     * @param {WjFlexGrid} grid
     */
    initGrid (flexGrid) {
      // this.flexGrid = flexGrid
    },

    formatCreatedDate (grid, row, column, cell) {
      if (grid.columns[column].binding === 'paramCrtDttm') {
        if (grid.rows[row].dataItem) {
          cell.innerHTML = Dayjs(grid.rows[row].dataItem.paramCrtDttm).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    },

    /**
     * SPC_EVENTSEARCH_15 Event Index Name 조회
     *
     * @returns {Array} EventIndexName Array
     */
    async listIndexName () {
      let response = await API.spc.eventHub.listIndexName({
        payload: []
      })
      if (response.data) {
        return response.data
      }
    },

    /**
     * SPC_EVENTSEARCH_16 선택된 이벤트명에 대한 정보를 가져옴
     *
     * @param {*} [eventIndexName=this.selectedEventIndexName]
     */
    async listIndexFieldName (eventIndexName = this.selectedEventIndexName) {
      let response = await API.spc.eventHub.listIndexFieldName({
        payload: {
          indexKey: eventIndexName.indexKey
        }
      })
      if (response && response.data) {
        let data = {}
        response.data.forEach(item => {
          data[item.fieldKey] = item
          data[item.fieldKey].added = false
        })
        this.fieldNames = data
        this.addedEvents = []
        return response.data
      }
    },

    /**
     * 설정한 이벤트 조건을 선택된 이벤트 목록으로 추가합니다.
     *
     * @param {*} [field=this.selectedFieldName]
     */
    addFilter (filter = this.selectedFieldName) {
      filter.field.added = true
      filter.type = filter.type === 'STRING' ? '=' : filter.type
      filter.string = !filter.string.length ? '*' : filter.string
      this.addedEvents.push(filter)
      this.resetSelectedFieldName()
    },

    /**
     * addedEvents 목록으로부터 index에 해당하는 아이템을 제거합니다.
     *
     * @param {*} index
     */
    removeItemFromAddedEvents (index) {
      this.fieldNames[this.addedEvents[index].field.fieldKey].added = false
      this.addedEvents.splice(index, 1)
    },

    /**
     * Filter의 Add 버튼이 클릭 가능한지 Validating
     *
     * @param {Object} [field=this.selectedFieldName]
     * @returns {Boolean} true면 disable 처리
     */
    isEventAddable (field = this.selectedFieldName) {
      // console.log(field.field, field.type, field.string)
      if (!field.field) return true
      if (!field.type) return true
      if (!field.string) return true // 8월 2일 리뷰에서 string은 없이도 보낼 수 있는것으로 설정 => 8월 14일 리뷰에서 string은 있어야 보낼 수 있는것으로 변경
      return false
    },

    /**
     * 화면 상단의 [Save], [Delete] 버튼의 disabled 처리 여부
     *
     * @returns {Boolean} true면 disable 처리
     */
    isActionable () {
      if (!this.selectedEventIndexName.indexKey) return true
      // DONE: 0809 skcc actionable 체크는 fieldName이 있는지 여부로 설정
      return false
    },

    /**
     * 'Search' 버튼의 클릭 가능 여부를 체크합니다.
     *
     * @returns {Boolean} true면 disable 처리
     */
    isSearchable () {
      // console.log('@isSearchable:', this.addedEvents.length, this.startDate, this.endDate)
      /* if (!this.addedEvents.length) return true
      if (this.selectedPeriod === 'CUSTOM') {
        if (!this.startDate) return true
        if (!this.endDate) return true
      } */
      if (!this.selectedEventIndexName.indexKey) return true
      return false
    },

    /**
     * 검색조건 저장 모달 팝업의 저장 버튼의 활성화 여부 체크
     *
     * @returns {Boolean} true면 disable 처리
     */
    isSavable () {
      if (!this.condition.title.length) return true
      return false
    },

    /**
     * this.selectedFieldName.type을 자동 설정합니다.
     *
     * @param {*} [field=this.selectedFieldName]
     */
    setSelectedFieldType (field = this.selectedFieldName) {
      // this.selectedFieldName.type = field.fieldType
      // console.log('@setSelectedFieldType', field, this.selectedFieldName.type)
    },

    /**
     * Chart/Grid 데이터를 주기적으로 가져오기 위한 인터벌을 설정합니다.
     *
     * @param {object} [interval=this.selectedRefreshInterval] 인터벌 주기. { value: second 단위의 숫자, label: 라벨 } 의 오브젝트를  받습니다.
     * @param {*} [condition=() => (this.chartDta.length)] Interval로 데이터를 가져오기 위한 조건. true일 때만 action을 실행합니다.
     * @param {*} [action=this.searchEvent] 인터벌시 위 condition을 만족할 떄 실행될 Function
     */
    setIntervalAction (
      interval = this.selectedRefreshInterval,
      condition = () => (this.selectedRefreshInterval.value > 0),
      action = this.searchEvent
    ) {
      interval = interval.value * 1000
      if (interval <= 0) {
        this.disconnectSocket()
        return
      } else {
        this.selectedPeriod = 'MONTH'
        this.connectSocket()
      }

      if (this.intervalAction) clearInterval(this.intervalAction)
      this.intervalAction = setInterval(function () {
        if (condition()) action()
      }, interval)
    },

    connectSocket (received = this.socketMessageReceived) {
      /* socket = new SockJS(API.spc.config().eventDataSocket)
      stomp = Stomp.over(socket)
      stomp.connect({}, frame => {
        stomp.subscribe('/spc/eventsearch/eventSearchDCOLData', tick => {
          received(tick)
        })
      }) */
      this.$store.dispatch('subscribe', {
        url: '/spc/eventsearch/eventSearchDCOLData',
        callback: tick => {
          received(tick)
        }
      })
    },

    socketMessageReceived (tick) {
      console.log('@socketMessageReceived', tick)
      let data = JSON.parse(tick.body)
      this.$refs.grid.addRows(data)
      this.$refs.chart.data = [data, ...this.$refs.chart.data]
      // this.$refs.chart.data = [...response, ...this.$refs.chart.data]
    },

    disconnectSocket () {
      console.log('@disconnectSocket')
      this.$store.dispatch('unsubscribe', {
        url: '/spc/eventsearch/eventSearchDCOLData'
      })
      // if (this.stomp) {
      //   this.stomp.disconnect()
      //   this.socket = undefined
      // }
    },

    /**
     * 검색버튼을 눌렀을 때 동작
     */
    handleSeachButton () {
      this.searchEvent()
    },

    /**
     * [Search] 버튼 클릭시 동작. 조건에 해당하는 이벤트를 찾아봅니다.
     * ...뭐가 뭔 키인지 전혀 모르겠다
     *
     * @param {Object} condition 검색조건 열기를 통해 Condition을 받을 경우 해당 컨디션으로 데이터 조회
     */
    async searchEvent (condition = false) {
      let startDate = this.selectedPeriod === 'MONTH' ? Dayjs().subtract(1, 'month').toDate() : this.startDate
      let endDate = this.selectedPeriod === 'MONTH' ? new Date() : this.endDate

      // 주어진 컨디션이 없을 때를 위한 payload 생성
      let payload = {}
      if (!condition) {
        payload = {
          paramName: '', // ==> ?????
          paramVal: '', // ==> ?????
          startDttm: Dayjs(startDate).startOf('day').format('YYYYMMDDHHmmss'),
          endDttm: Dayjs(endDate).endOf('day').format('YYYYMMDDHHmmss')
        }

        this.addedEvents.forEach(event => {
          payload[event.field.fieldKey] = event.string
        })
      }

      this.searchCondition = condition ? { ...condition } : { ...payload }

      let response = await API.spc.eventHub.listDColSearchData({
        payload: this.searchCondition
      })
      if (response && response.data) {
        let count = this.dataSizeSelected / 5000
        let data = []
        for (let i = 0; i < count; i++) {
          data = [...data, ...response.data]
        }
        this.data = data
      } else {
        this.data = []
      }
    },

    /**
     * 현재의 검색조건을 저장합니다.
     * createdDttm은 서버에서 생성하는게 맞음. 클라이언트 시간은 부정확.
     *
     * @returns
     */
    async saveSearchCondition () {
      let startDate = this.selectedPeriod === 'MONTH' ? Dayjs().subtract(1, 'month').toDate() : this.startDate
      let endDate = this.selectedPeriod === 'MONTH' ? new Date() : this.endDate
      let payload = {
        conditionName: this.condition.title,
        conditionType: this.condition.isPublic ? 'PUBLIC' : 'PRIVATE',
        userId: this.$store.getters.user.userId,
        paramName: '',
        paramVal: '',
        indexKey: this.selectedEventIndexName.indexKey,
        indexName: this.selectedEventIndexName.indexName,
        // DONE: skcc 0821:
        // indexKey 추가. indexName 추가. // fixed 20190822
        // openSearchCondition 팝업에 indexName, userID 컬럼 추가 // fixed 2190822
        startDttm: Dayjs(startDate).format('YYYYMMDDHHmmss'),
        endDttm: Dayjs(endDate).format('YYYYMMDDHHmmss')
      }

      this.addedEvents.forEach(event => {
        payload[event.field.fieldKey] = event.string
      })

      let response = await API.spc.eventHub.saveSearchCondition({
        payload: payload
      })
      if (response.data) {
        this.$dialog.alert('저장 완료')
        this.isSaveModalActive = false
        this.condition.title = ''
      }
    },

    /**
     * 검색조건 조회 팝업에서 목록을 불러오기 위해 사용합니다.
     *
     * @param {Object} condition 검색조건의 검색을 위한 컨디션 오브젝트
     *
     */
    async listSearchCondition (
      condition = this.openCondition,
      page = this.conditionsCurrentPage - 1,
      size = this.conditionsPerPage
    ) {
      let response = await API.spc.eventHub.listSearchCondition({
        payload: {
          conditionName: condition.title,
          conditionType: condition.isPublic ? 'PUBLIC' : 'PRIVATE',
          userId: this.$store.getters.user.userId,
          saveStartDttm: null,
          saveEndDttm: null
        },
        urlParams: SpcUtils.objToQueryString({
          page: page,
          size: size
        })
      })
      if (response.data) {
        this.conditions = response.data._embedded.eventSearchConditionResults
        this.conditionsTotal = response.data.page.totalElements
      }
    },

    /**
     * 검색조건 조회 모달 팝업에서 테이블의 row를 클릭하면 동작합니다.
     *
     * @param {*} row
     */
    openClickedCondition (row) {
      this.searchEvent(row)
      this.searchCondition = row
      this.setSearchConditions(row)
      this.isOpenModalActive = false
      this.openCondition.title = ''
      this.conditions = []
      return null
    },

    /**
     * 검색조건 Open시 특정 검색조건을 선택할 때 우측의 검색 필터를 설정합니다.
     * @param {Object} condition 선택한 검색조건
     */
    async setSearchConditions (condition) {
      // console.log('@setSearchConditions', condition)
      this.selectedPeriod = 'CUSTOM'
      this.startDate = Dayjs(condition.startDttm, 'YYYYMMDDHHmmss').toDate()
      this.endDate = Dayjs(condition.endDttm, 'YYYYMMDDHHmmss').toDate()
      this.selectedEventIndexName = _.find(this.eventIndexNames, { indexKey: condition.indexKey })
      let fieldNames = await this.listIndexFieldName(this.selectedEventindexName)
      if (fieldNames) {
        for (let key in condition) {
          if (key.substr(0, 6) === 'grpLvl') {
            let field = _.find(this.fieldNames, { fieldKey: key })
            this.addFilter({
              field: field,
              type: '=',
              string: condition[key] || ''
            })
          }
        }
      }
    },

    /**
     * 검색조건 오픈 모달 팝업 종료시 실행
     *
     */
    closingOpenModal () {
      this.openCondition.title = ''
      this.conditions = []
    },

    /**
     * grid를 Excel 파일로 export 합니다. export 버튼의 disabled처리는 isActionable에서 처리합니다.
     *
     * @param {Array} data 챠트/그리드의 raw 데이타
     */
    exportData (grid = this.flexGrid) {
      console.log('@exportData', grid)
      this.$refs.dataGrid.exportExcel('EventSearchResult_' + Dayjs().format('YYYY-MM-DD_HH:mm:ss') + '.xlsx')
    },

    /**
     * Vue Component의 데이터 초기화
     *
     */
    resetData () {
      this.selectedEventindexName = {}
      this.fieldNames = []
      this.resetSelectedFieldName()
      this.startDate = undefined
      this.endDate = undefined
      this.refreshIntervals = refreshIntervals
      this.selectedRefreshInterval = refreshIntervals[0]
      this.selectedRefreshIntervalDisabled = false
      this.condition.title = ''
      this.condition.isPublic = false
    },

    /**
     * selectedFieldName을 초기화합니다.
     *
     */
    resetSelectedFieldName () {
      this.selectedFieldName = {
        field: undefined,
        type: undefined,
        string: ''
      }
    },

    parseChartData (data) {
      console.warn('*** DEPRECATED *** sk-cahrt의 use-aggregation을 사용하세요')
      let dataObj = {}
      data.forEach(item => {
        let date = Dayjs(item.paramCrtDttm, 'YYYYMMDDHHmmss')
        item.paramCrtDttm = date.toDate()
        if (dataObj[date.format('YYYYMMDD')]) {
          dataObj[date.format('YYYYMMDD')]++
        } else {
          dataObj[date.format('YYYYMMDD')] = 1
        }
      })

      for (let key in dataObj) {
        this.chartData.push({ paramCrtDttm: Dayjs(key).toDate(), count: dataObj[key] })
      }
      return data
    },

    formatToDate (engine, label) {
      label.text = Dayjs(label.val, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
      return label
    },

    /* formatTooltip (data) {
      let val = '<div class="chart-tooltip">'
      val += '<div class="tooltip-header">' + Dayjs(data.item[this.bindingX]).format('YYYY-MM-DD') + '</div>'
      val += '<div class="tooltip-body-item">'
      val += '<span class="item-key">Count</span>'
      val += '<span class="item-value">' + param[key] + '</span>'
      val += '</div>'
      val += '</div>'
      return val
    }, */

    /**
     * Period가 from-to로 설정될 경우 인터벌을 중지합니다.
     */
    setSelectedPeriod (event = '') {
      if (event === 'CUSTOM') {
        this.selectedRefreshInterval = refreshIntervals[0]
        this.selectedRefreshIntervalDisabled = true
        clearInterval(this.intervalAction)
      } else {
        this.selectedRefreshIntervalDisabled = false
      }
      this.setIntervalAction()
    },

    unIntervalable () {
      // console.log(this.selectedEventIndexName.indexKey)
      if (this.selectedRefreshIntervalDisabled) return true
      if (!this.selectedEventIndexName.indexKey) return true
      return false
    },

    async deleteConditions (conditions = this.conditionsChecked) {
      let deleteAction = async (conditions) => {
        let payload = []
        conditions.forEach(condition => {
          payload.push({ conditionId: condition.conditionId })
        })
        let response = await API.spc.eventHub.deleteSearchCondition({
          payload: payload
        })
        if (response.data) {
          this.conditions = response.data
          this.$dialog.alert('삭제 완료')
          this.listSearchCondition()
        }
      }
      this.$dialog.confirm({
        message: '선택한 조건을 삭제합니다',
        cancelText: self.$t('mes.common.cancel'),
        confirmText: self.$t('mes.common.ok'),
        onConfirm: () => deleteAction(conditions)
      })
    }
  },
  data () {
    return {
      dataSizes: [
        50000,
        100000,
        200000,
        400000
      ],
      dataSizeSelected: 50000,
      searchCondition: {}, // DCOL Search 하기 전, 검색조건 저장용 컨디션.
      socket: null, // socket 저장
      stomp: null,
      data: [], // 좌측 챠트 & 그리드에 표시할 정보
      chartData: [], // ChartData.randomTrend(), // 기본 챠트 정보
      // tableData: ChartData.tableData(), // 기본 그리드 정보
      eventIndexNames: [], // Event Name Selectbox에 표시될 정보
      selectedEventIndexName: {}, // Event Name Selectbox에서 선택된 값
      fieldNames: [], // Filter의 첫번쨰 Selectbox에 표시될 정보
      selectedFieldName: { // Filter의 첫번째 Selectbox에서 선택된 값
        field: undefined,
        type: fieldTypes[0],
        string: ''
      },
      fieldTypes: fieldTypes, // Filter의 두번쨰 selectbox에 표시될 정보
      addedEvents: [], // Filter를 통해 추가된 필터 배열
      selectedPeriod: 'MONTH', // Period 정보. ['MONTH' | 'CUSTOM']
      oneMonthAgo: Dayjs().subtract(1, 'month').toDate(), // 한 달 전 시간
      now: Dayjs().toDate(), // 현재 시간
      startDate: undefined, // From - To 선택상자중 From에 표시될 시간
      endDate: undefined, // From - To 선택상자중 To에 표시될 시간
      refreshIntervals: refreshIntervals, // 상단 리프레시 인터벌에 표시될 정보
      intervalAction: undefined, // refreshInterval Function을 담음
      selectedRefreshInterval: refreshIntervals[0], // 상단 리프레시 인터벌에서 선택된 값
      selectedRefreshIntervalDisabled: false,
      isSaveModalActive: false, // 컨디션 저장 모달 팝업 Active 여부
      isOpenModalActive: false, // 컨디션 오픈 모달 팝업 Active 여부
      condition: { // 검색조건 저장을 위한 오브젝트
        title: '',
        isPublic: false
      },
      openCondition: { // 검색조건 불러오기를 위한 오브젝트
        title: '',
        isPublic: false
      },
      conditions: [], // 검색조건 불러오기의 검색결과
      conditionsChecked: [], // 검색조건 불러오기시 체크한 rows
      conditionsTotal: 0,
      conditionsPerPage: 20,
      conditionsCurrentPage: 1,
      conditionsColumns: [
        { field: 'saveDttm', label: 'Date' },
        { field: 'conditionName', label: 'Condition name' }
      ],
      dataColumns: [
        {
          label: 'FAB',
          binding: 'grpLvl1Val',
          readOnly: true
        },
        {
          label: 'TECH',
          binding: 'grpLvl2Val',
          readOnly: true
        },
        {
          label: 'PRODUCT',
          binding: 'grpLvl3Val',
          readOnly: true
        },
        {
          label: 'OPER',
          binding: 'grpLvl4Val',
          readOnly: true
        },
        {
          label: 'EQ',
          binding: 'grpLvl5Val',
          readOnly: true
        },
        {
          label: 'LOT',
          binding: 'key1Val',
          readOnly: true
        },
        {
          label: 'WF',
          binding: 'key2Val',
          readOnly: true
        },
        {
          label: 'SITE',
          binding: 'key3Val',
          readOnly: true
        },
        {
          label: 'PARA NAME',
          binding: 'paramName',
          readOnly: true
        },
        {
          label: 'PARA VAL',
          binding: 'paramVal',
          readOnly: true
        },
        {
          label: 'TYPE',
          binding: 'paramType',
          readOnly: true
        },
        {
          label: 'CREATE DATE',
          binding: 'paramCrtDttm',
          readOnly: true
        },
        {
          label: 'Original Data',
          binding: 'dataOriginl',
          readOnly: true
        }
      ]
    }
  }
}

</script>

<style lang="scss">
  section.event-hub.-performance-test {
    width: 100%;
    padding: 0;
    position: relative;
    .hub-search {
      top: 0;
      right: 0;
    }
  }
</style>
