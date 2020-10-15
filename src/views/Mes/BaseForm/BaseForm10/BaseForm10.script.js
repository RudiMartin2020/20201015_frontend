import API from '@/views/Mes/Apis/'
import dayjs from 'dayjs'
import * as wjcGridXlsx from '@grapecity/wijmo.grid.xlsx'
import * as wjcGrid from '@grapecity/wijmo.grid'
import { mapGetters } from 'vuex'
// import * as wjGrid from '@grapecity/wijmo.grid'
import { YYYYMMDDHHMMSSMS } from '@/store/App.store'
export default {
  name: 'BaseForm10',
  props: {
    dayjsDF: {
      type: Object,
      default () {
        return this.$store.state.app.viewDateFormat.dayjs
      }
    },
    gridDF: {
      type: Object,
      default () {
        return this.$store.state.app.viewDateFormat.grid
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'theSite',
      'theApis'
    ])
  },
  watch: {},
  methods: {
    async getTnPosLots () {
      // lotList 초기화
      this.lotList = []
      this.selectedLot = {}

      if (!this.procSgmtId) {
        this.$dialog.alert(this.$t('mes.MESSAGE.W011'))
        return
      }
      if (!this.prodDefId) {
        // W023 제품 선택이 필요합니다.
        this.$dialog.alert(this.$t('mes.MESSAGE.W023'))
        return
      }
      try {
        let payload = []
        this.lotList = []

        payload = [{
          condition: 'Equal',
          key: 'siteId',
          values: this.theSite.siteId
        }, {
          condition: 'Equal',
          key: 'useStatCd',
          values: 'Usable'
        }, {
          condition: 'Equal',
          key: 'statCd',
          values: 'Active'
        }, {
          condition: 'Equal',
          key: 'prodDefId',
          values: this.prodDefId
        }, {
          condition: 'Equal',
          key: 'procSgmtId',
          values: this.procSgmtId
        }, {
          condition: 'Equal',
          key: 'prodOrdId',
          values: this.prodOrdId
        }, {
          condition: 'Equal',
          key: 'workOrdId',
          values: this.workOrdId
        }, {
          condition: 'Equal',
          key: 'procStatCd',
          values: 'WaitForRule'
        }]

        if (this.carrId !== undefined && this.carrId !== '') {
          let carrIdCondition =
          {
            condition: 'Equal',
            key: 'carrId',
            values: this.carrId
          }
          payload.push(carrIdCondition)
        }
        if (this.btchId !== undefined && this.btchId !== '') {
          let btchIdCondition =
          {
            condition: 'Equal',
            key: 'srcBtchId',
            values: this.btchId
          }
          payload.push(btchIdCondition)
        }
        if (this.lotId !== undefined && this.lotId !== '') {
          let lotIdConditon =
          {
            condition: 'Equal',
            key: 'lotId',
            values: this.lotId
          }
          payload.push(lotIdConditon)
        }
        this.lotList = await API.mesPos.postCustomTnPosLots(payload)

        // 조회된 Lot Grid 내에서 check
        var status = Object.assign({
          checked: true,
          modified: false,
          added: false
        }, status)
        this.lotList.forEach(item => {
          item._status = status
        })

        // 선택된 Lot 초기화
        this.lotListColumns = [...this.lotListColumns]
        this.selectedLot = {}
        this.isRefreshButtonAllow = true
        this.getEqpIdList(this.procSgmtId)
      } catch (error) {

      }
    },
    initLotGrid (grid, e) {
      // grid.formatItem.addHandler(function (s, e) {
      //   if (s && s.rows && s.rows[e.row] && s.rows[e.row].dataItem && s.rows[e.row].dataItem.mvoutDt) {
      //     s.rows[e.row].dataItem.mvoutDt = dayjs(s.rows[e.row].dataItem.mvoutDt).format(this.gridDF[YYYYMMDDHHMMSSMS] )
      //     s.rows[e.row].dataItem.mvinDt = dayjs(s.rows[e.row].dataItem.mvinDt).format(this.gridDF[YYYYMMDDHHMMSSMS] )
      //   }
      // })
      this.lotGrid = grid

      this.lotGrid.selectionChanged.addHandler((s, e) => {
        if (e && e.row !== -1 && grid.hostElement.querySelector('.wj-state-selected')) {
          if (grid && grid.selectedItems.length > 0) {
            this.selectedLot = grid.selectedItems[0]
          }
        }
      })
    },
    selectionChanged (grid, e) {
      if (e && e.row !== -1 && grid.hostElement.querySelector('.wj-state-selected')) {
        if (grid && grid.selectedItems.length > 0) {
          this.selectedLot = grid.selectedItems[0]
        }
        // if (this.wjInputDate) {
        //   this.wjInputDate.isReadOnly = false
        // }
      }
    },
  },
  data () {
    return {
      // ETC
      lotList: [],
      lotListColumns: [
        { label: this.$t('mes.DEFAULT_COLUMNS.LOTID'), binding: 'lotId', readOnly: false },
        { label: this.$t('mes.DEFAULT_COLUMNS.PROCSTATCD'), binding: 'procStatCd', readOnly: false, width: 130 },
        { label: this.$t('mes.DEFAULT_COLUMNS.PRODTYP'), binding: 'prodTyp', readOnly: false },
        // ProdId
        { label: this.$t('mes.DEFAULT_COLUMNS.PRODDEFID'), binding: 'prodDefId', readOnly: false, visible: true, width: 130 },
        // FlowId
        { label: this.$t('mes.DEFAULT_COLUMNS.PROCDEFID'), binding: 'procDefId', readOnly: false, visible: true, width: 130 },
        // OperId
        { label: this.$t('mes.DEFAULT_COLUMNS.PROCSGMTID'), binding: 'procSgmtId', readOnly: false, visible: true, width: 130 },
        // { label: this.$t('mes.DEFAULT_COLUMNS.ORGNQTY'), binding: 'orgnQty', readOnly: true },
        { label: this.$t('mes.DEFAULT_COLUMNS.QTY'), binding: 'qty', readOnly: false, dataType: 'Number' },
        { label: this.$t('mes.DEFAULT_COLUMNS.EQPID'), binding: 'eqpId', readOnly: false },
        { label: this.$t('mes.DEFAULT_COLUMNS.DFCTQTY'), binding: 'dfctQty', readOnly: false, dataType: 'Number' },
        { label: this.$t('mes.DEFAULT_COLUMNS.LOSSQTY'), binding: 'lossQty', readOnly: false, dataType: 'Number' },
        { label: this.$t('mes.DEFAULT_COLUMNS.MVINDT'), binding: 'mvinDt', readOnly: false, width: 130, dataType: 'Date', format: this.gridDF[YYYYMMDDHHMMSSMS] },
        { label: this.$t('mes.DEFAULT_COLUMNS.MVOUTDT'), binding: 'mvoutDt', readOnly: false, width: 130, dataType: 'Date', format: this.gridDF[YYYYMMDDHHMMSSMS] },
        { label: this.$t('mes.DEFAULT_COLUMNS.OBJID'), binding: 'objId', readOnly: false, visible: false }
      ],
      chartData: [
        { value: 10, order: 1 },
        { value: 12, order: 2 },
        { value: 15, order: 3 },
        { value: 14, order: 4 },
        { value: 20, order: 5 },
        { value: 16, order: 6 },
        { value: 18, order: 7 },
        { value: 12, order: 8 }
      ]
    }
  }
}
