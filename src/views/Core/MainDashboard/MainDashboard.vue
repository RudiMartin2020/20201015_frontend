<template>
  <section class="main-dashboard">
    <div class="level dashboard-head">
      <b-button
        icon-left="settings"
        type="is-dark"
      >
        대시보드 편집
      </b-button>
    </div>

    <div class="dashboard-panels">
      <div
        class="panel-item"
        v-for="item in pinned"
        :key="item.name"
      >
        <event-search-chart
          v-if="item.name === 'event-search-chart'"
          :condition="item.payload"
        />
        <event-search-grid
          v-if="item.name === 'event-search-grid'"
          :condition="item.payload"
        />
        <alarm-list
          v-if="item.name === 'cause-effect-alarm-list'"
          :spec-group="item.payload"
        />
      </div>
    </div>
    <!-- /.dasboard-panels -->
  </section>
</template>

<script>
import EventSearchGrid from '@/views/Spc/EventHub/EventSearchGrid'
import EventSearchChart from '@/views/Spc/EventHub/EventSearchChart'
import AlarmList from '@/views/Spc/CauseEffect/AlarmList'
import { mapGetters } from 'vuex'

export default {
  name: 'MainDashboard',
  components: {
    'event-search-grid': EventSearchGrid,
    'event-search-chart': EventSearchChart,
    'alarm-list': AlarmList
  },
  computed: {
    spec1 () {
      return this.specs[0]
    },
    spec2 () {
      return this.specs[1]
    },
    spec3 () {
      return this.specs[2]
    },
    ...mapGetters({
      pinned: 'dashboard:pinned'
    })
  },
  data () {
    return {
      specs: [{ 'specSysJvo': { 'avgVal': 3.63606, 'specCtgrJvo': { 'grpLvl1Name': 'FAB', 'grpLvl2Name': 'TECH', 'grpLvl3Name': 'PRODUCT', 'grpLvl4Name': 'OPER-9', 'grpLvl5Name': null, 'grpLvl6Name': '*', 'grpLvl7Name': '*', 'grpLvl8Name': '*', 'grpLvl9Name': '*', 'grpLvl10Name': '*', 'specId': 'specId_1', 'specName': 'LOT201920', 'gbnName': 'gbnName_1' }, 'specId': 'specId_1', 'currCpkVal': 2.39464, 'uclVal': 3.20619, 'lclVal': 1.7565, 'targetVal': 3.68564, 'calcDttm': '20190916125710', 'fnshDttm': '20190907045519', 'medianVal': 1.40074, 'stdVal': 1.17711, 'startDttm': '20190819053734', 'specEngrJvo': { 'chgDttm': '20190930001613', 'chgUserId': '18d4f4d9-26ab-4ad0-8406-e18c4651c822', 'crtDttm': '20190930001613', 'crtUserId': '1b1a9c8a-d236-44e9-b3f7-089f168552a1', 'elclVal': 0, 'engrSpecId': 'b2ec9bd8-fd76-480d-9d06-8b481c12fff0', 'euclVal': 0, 'specExpln': '65780f87-8a4f-4455-aa14-5049eeb7ebcb', 'specId': '1b8355fa-f586-4b36-9c03-c289bc0239f4', 'targetVal': 0.0 } }, 'ruleData': { 'specId': 'specId_1', 'cntRule': 89 }, 'oocData': { 'specId': 'specId_1', 'cntOoc': 35 }, 'rawDataList': [{ 'paramId': 'P_20190829064613', 'key1Val': 'LOT_20190809061233', 'key2Val': 'WF-5', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190725101946', 'avgVal': 1.62, 'cpkVal': 0.66, 'mrVal': 1.56, 'eqpId': 'eqpId_01' }, { 'paramId': 'P_20190730061043', 'key1Val': 'LOT_20190813114121', 'key2Val': 'WF-2', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190818030158', 'avgVal': 0.98, 'cpkVal': 1.03, 'mrVal': 0.1, 'eqpId': 'eqpId_02' }, { 'paramId': 'P_20190905021905', 'key1Val': 'LOT_20190928015454', 'key2Val': 'WF-5', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190913074155', 'avgVal': 0.75, 'cpkVal': 1.27, 'mrVal': 1.9, 'eqpId': 'eqpId_02' }, { 'paramId': 'P_20190801120341', 'key1Val': 'LOT_20190827050324', 'key2Val': 'WF-3', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190829080151', 'avgVal': 1.3, 'cpkVal': 0.95, 'mrVal': 0.02, 'eqpId': 'eqpId_02' }, { 'paramId': 'P_20190916062208', 'key1Val': 'LOT_20190726061122', 'key2Val': 'WF-2', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190723115100', 'avgVal': 0.39, 'cpkVal': 0.15, 'mrVal': 0.09, 'eqpId': 'eqpId_01' }, { 'paramId': 'P_20190826112438', 'key1Val': 'LOT_20190726033155', 'key2Val': 'WF-5', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190905065844', 'avgVal': 1.48, 'cpkVal': 1.16, 'mrVal': 1.21, 'eqpId': 'eqpId_01' }, { 'paramId': 'P_20190903064844', 'key1Val': 'LOT_20190813011732', 'key2Val': 'WF-1', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190806062326', 'avgVal': 1.39, 'cpkVal': 1.86, 'mrVal': 1.32, 'eqpId': 'eqpId_01' }, { 'paramId': 'P_20190729041549', 'key1Val': 'LOT_20190713060909', 'key2Val': 'WF-7', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190924044901', 'avgVal': 1.94, 'cpkVal': 1.24, 'mrVal': 0.08, 'eqpId': 'eqpId_01' }, { 'paramId': 'P_20190802043315', 'key1Val': 'LOT_20190916055522', 'key2Val': 'WF-2', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190925032213', 'avgVal': 1.38, 'cpkVal': 1.03, 'mrVal': 1.11, 'eqpId': 'eqpId_02' }, { 'paramId': 'P_20190830113101', 'key1Val': 'LOT_20190814051135', 'key2Val': 'WF-7', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190811112049', 'avgVal': 1.43, 'cpkVal': 1.07, 'mrVal': 1.16, 'eqpId': 'eqpId_01' }], 'specLimitData': { 'lsl': 5, 'usl': 4 } }, { 'specSysJvo': { 'avgVal': 9.47832, 'specCtgrJvo': { 'grpLvl1Name': 'FAB', 'grpLvl2Name': 'TECH', 'grpLvl3Name': 'PRODUCT', 'grpLvl4Name': 'OPER-8', 'grpLvl5Name': null, 'grpLvl6Name': '*', 'grpLvl7Name': '*', 'grpLvl8Name': '*', 'grpLvl9Name': '*', 'grpLvl10Name': '*', 'specId': 'specId_2', 'specName': 'LOT2910287AD', 'gbnName': 'gbnName_2' }, 'specId': 'specId_2', 'currCpkVal': 3.90798, 'uclVal': 0.50685, 'lclVal': 0.71561, 'targetVal': 0.07539, 'calcDttm': '20190723092316', 'fnshDttm': '20190917064214', 'medianVal': 0.01249, 'stdVal': 1.29193, 'startDttm': '20190813025621', 'specEngrJvo': { 'chgDttm': '20190930001613', 'chgUserId': 'ee6205aa-03ed-4751-98d7-5fa38063fe76', 'crtDttm': '20190930001613', 'crtUserId': 'cdb37c42-ea0d-41cb-9855-4ab974d8145c', 'elclVal': 0, 'engrSpecId': 'df2f3951-44d4-4f41-8b79-338a3e4edcfb', 'euclVal': 0, 'specExpln': '98c9bd8b-9d94-4d84-af9c-b1e5b8ce2c4b', 'specId': '73627ce2-9ec3-400d-be5a-781e31f0bbd6', 'targetVal': 0.0 } }, 'ruleData': { 'specId': 'specId_2', 'cntRule': 38 }, 'oocData': { 'specId': 'specId_2', 'cntOoc': 84 }, 'rawDataList': [{ 'paramId': 'P_20190813122352', 'key1Val': 'LOT_20190716100018', 'key2Val': 'WF-7', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190829113021', 'avgVal': 0.93, 'cpkVal': 0.55, 'mrVal': 0.73, 'eqpId': 'eqpId_01' }, { 'paramId': 'P_20190830052056', 'key1Val': 'LOT_20190713075653', 'key2Val': 'WF-8', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190814112535', 'avgVal': 1.05, 'cpkVal': 0.75, 'mrVal': 1.89, 'eqpId': 'eqpId_02' }, { 'paramId': 'P_20190814023115', 'key1Val': 'LOT_20190906044216', 'key2Val': 'WF-9', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190919021417', 'avgVal': 1.65, 'cpkVal': 0.74, 'mrVal': 0.3, 'eqpId': 'eqpId_01' }, { 'paramId': 'P_20190808115051', 'key1Val': 'LOT_20190919084154', 'key2Val': 'WF-9', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190814111207', 'avgVal': 1.69, 'cpkVal': 1.19, 'mrVal': 1.97, 'eqpId': 'eqpId_01' }, { 'paramId': 'P_20190921042406', 'key1Val': 'LOT_20190926033710', 'key2Val': 'WF-4', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190731013526', 'avgVal': 0.43, 'cpkVal': 1.08, 'mrVal': 1.54, 'eqpId': 'eqpId_01' }, { 'paramId': 'P_20190928102500', 'key1Val': 'LOT_20190911022626', 'key2Val': 'WF-8', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190726054222', 'avgVal': 1.63, 'cpkVal': 0.86, 'mrVal': 1.37, 'eqpId': 'eqpId_02' }, { 'paramId': 'P_20190704061213', 'key1Val': 'LOT_20190729015119', 'key2Val': 'WF-8', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190830035922', 'avgVal': 1.75, 'cpkVal': 1.16, 'mrVal': 1.51, 'eqpId': 'eqpId_01' }, { 'paramId': 'P_20190806081627', 'key1Val': 'LOT_20190825052556', 'key2Val': 'WF-0', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190704112137', 'avgVal': 0.81, 'cpkVal': 0.68, 'mrVal': 1.97, 'eqpId': 'eqpId_02' }, { 'paramId': 'P_20190805123222', 'key1Val': 'LOT_20190824065227', 'key2Val': 'WF-1', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190724114946', 'avgVal': 0.35, 'cpkVal': 1.14, 'mrVal': 0.49, 'eqpId': 'eqpId_01' }, { 'paramId': 'P_20190711095018', 'key1Val': 'LOT_20190816120421', 'key2Val': 'WF-4', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190820102116', 'avgVal': 1.09, 'cpkVal': 1.58, 'mrVal': 1.42, 'eqpId': 'eqpId_01' }], 'specLimitData': { 'lsl': 2, 'usl': 9 } }, { 'specSysJvo': { 'avgVal': 9.74917, 'specCtgrJvo': { 'grpLvl1Name': 'FAB', 'grpLvl2Name': 'TECH', 'grpLvl3Name': 'PRODUCT', 'grpLvl4Name': 'OPER-8', 'grpLvl5Name': null, 'grpLvl6Name': '*', 'grpLvl7Name': '*', 'grpLvl8Name': '*', 'grpLvl9Name': '*', 'grpLvl10Name': '*', 'specId': 'specId_3', 'specName': 'LOT109ASD9202', 'gbnName': 'gbnName_3' }, 'specId': 'specId_3', 'currCpkVal': 2.85223, 'uclVal': 2.55296, 'lclVal': 0.3734, 'targetVal': 0.00814, 'calcDttm': '20190822111949', 'fnshDttm': '20190828020850', 'medianVal': 1.9939, 'stdVal': 0.47118, 'startDttm': '20190808072328', 'specEngrJvo': { 'chgDttm': '20190930001613', 'chgUserId': '47869253-f5f2-49f1-9aa1-8e8a7031a1ef', 'crtDttm': '20190930001613', 'crtUserId': 'a227a675-8b4d-456a-9161-c2edc50e3d2f', 'elclVal': 0, 'engrSpecId': '86118cb0-920d-488e-9b1d-08fcaa07bddb', 'euclVal': 0, 'specExpln': 'e18eb359-d05f-4e9c-9858-28465d6828f7', 'specId': '4d2945e2-ec85-4412-b9c5-a6e617230c9f', 'targetVal': 0.0 } }, 'ruleData': { 'specId': 'specId_3', 'cntRule': 23 }, 'oocData': { 'specId': 'specId_3', 'cntOoc': 42 }, 'rawDataList': [{ 'paramId': 'P_20190924123112', 'key1Val': 'LOT_20190707041923', 'key2Val': 'WF-6', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190705084447', 'avgVal': 0.81, 'cpkVal': 1.12, 'mrVal': 1.05, 'eqpId': 'eqpId_01' }, { 'paramId': 'P_20190906083302', 'key1Val': 'LOT_20190713105930', 'key2Val': 'WF-0', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190731055941', 'avgVal': 1.85, 'cpkVal': 1.47, 'mrVal': 0.4, 'eqpId': 'eqpId_01' }, { 'paramId': 'P_20190915082730', 'key1Val': 'LOT_20190816044529', 'key2Val': 'WF-3', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190706052228', 'avgVal': 1.02, 'cpkVal': 1.16, 'mrVal': 0.7, 'eqpId': 'eqpId_01' }, { 'paramId': 'P_20190911112544', 'key1Val': 'LOT_20190830111422', 'key2Val': 'WF-9', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190729044407', 'avgVal': 0.17, 'cpkVal': 0.2, 'mrVal': 1.75, 'eqpId': 'eqpId_01' }, { 'paramId': 'P_20190821110430', 'key1Val': 'LOT_20190730084853', 'key2Val': 'WF-0', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190709084212', 'avgVal': 1.13, 'cpkVal': 1.54, 'mrVal': 1.6, 'eqpId': 'eqpId_02' }, { 'paramId': 'P_20190731041044', 'key1Val': 'LOT_20190822110535', 'key2Val': 'WF-8', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190709022749', 'avgVal': 1.04, 'cpkVal': 1.43, 'mrVal': 1.24, 'eqpId': 'eqpId_02' }, { 'paramId': 'P_20190726070606', 'key1Val': 'LOT_20190905052451', 'key2Val': 'WF-0', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190902012518', 'avgVal': 0.81, 'cpkVal': 0.92, 'mrVal': 1.38, 'eqpId': 'eqpId_01' }, { 'paramId': 'P_20190722044349', 'key1Val': 'LOT_20190823023629', 'key2Val': 'WF-1', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190912043110', 'avgVal': 1.73, 'cpkVal': 0.99, 'mrVal': 1.2, 'eqpId': 'eqpId_02' }, { 'paramId': 'P_20190803065938', 'key1Val': 'LOT_20190819122016', 'key2Val': 'WF-2', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190807023154', 'avgVal': 0.39, 'cpkVal': 1.02, 'mrVal': 0.57, 'eqpId': 'eqpId_01' }, { 'paramId': 'P_20190809082619', 'key1Val': 'LOT_20190816103458', 'key2Val': 'WF-9', 'key3Val': '*', 'key4Val': '*', 'key5Val': '*', 'paramCrtDttm': '20190906081421', 'avgVal': 0.72, 'cpkVal': 1.01, 'mrVal': 0.49, 'eqpId': 'eqpId_01' }], 'specLimitData': { 'lsl': 1, 'usl': 4 } }],
      eapManagers: [{ 'eapManagerRowId': 1, 'eapManagerName': 'EapManagerName_1', 'eapManagerStatus': 1, 'eapManagerCpu': 1, 'eapManagerMemory': 1, 'eapList': [{ 'eapServiceRowId': 1, 'eapServiceName': 'EapServiceName_1', 'eapServiceStatus': 2, 'eapServiceCpu': 2, 'eapServiceMemory': 2 }, { 'eapServiceRowId': 2, 'eapServiceName': 'EapServiceName_2', 'eapServiceStatus': 2, 'eapServiceCpu': 1, 'eapServiceMemory': 1 }, { 'eapServiceRowId': 3, 'eapServiceName': 'EapServiceName_3', 'eapServiceStatus': 2, 'eapServiceCpu': 1, 'eapServiceMemory': 1 }, { 'eapServiceRowId': 4, 'eapServiceName': 'EapServiceName_4', 'eapServiceStatus': 2, 'eapServiceCpu': 2, 'eapServiceMemory': 1 }] }, { 'eapManagerRowId': 2, 'eapManagerName': 'EapManagerName_2', 'eapManagerStatus': 2, 'eapManagerCpu': 1, 'eapManagerMemory': 1, 'eapList': [{ 'eapServiceRowId': 1, 'eapServiceName': 'EapServiceName_1', 'eapServiceStatus': 2, 'eapServiceCpu': 2, 'eapServiceMemory': 1 }, { 'eapServiceRowId': 2, 'eapServiceName': 'EapServiceName_2', 'eapServiceStatus': 1, 'eapServiceCpu': 1, 'eapServiceMemory': 1 }, { 'eapServiceRowId': 3, 'eapServiceName': 'EapServiceName_3', 'eapServiceStatus': 1, 'eapServiceCpu': 3, 'eapServiceMemory': 1 }, { 'eapServiceRowId': 4, 'eapServiceName': 'EapServiceName_4', 'eapServiceStatus': 1, 'eapServiceCpu': 1, 'eapServiceMemory': 2 }, { 'eapServiceRowId': 5, 'eapServiceName': 'EapServiceName_5', 'eapServiceStatus': 2, 'eapServiceCpu': 2, 'eapServiceMemory': 3 }, { 'eapServiceRowId': 6, 'eapServiceName': 'EapServiceName_6', 'eapServiceStatus': 2, 'eapServiceCpu': 1, 'eapServiceMemory': 3 }] }]
    }
  }
}
</script>

<style lang="scss">
  .main-dashboard {
    padding: $gap;
    position: relative;
    height: 100%;
    .dashboard-panels {
      .panel-item {
        height: 30vh;
        margin-bottom: $gap;
        .component-panel {
          height: 100%;
        }
      }
    }
    .level {
      display: flex;
      align-content: stretch;
      > * {
        flex: 1 1 auto;
        margin-left: $gap;
        &:first-child {
          margin-left: 0;
        }
      }
      &.dashboard-head {
        justify-content: flex-end;
        .button {
          width: auto;
          flex: none;
        }
      }
    }

    .monitor-manager {
      margin-bottom: $gap;
      .status-list {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 45px;
        .status-item {
          margin-right: $gap;
          &.-level-1 {
            color: $c-level-good;
          }
          &.-level-2 {
            color: $c-level-major;
          }
          &.-level-3 {
            color: $c-level-critical;
          }
          &:last-of-type {
            margin-right: 0;
          }
        }
      }
      .process-list {
        padding: $gap;
        display: flex;
        flex-wrap: wrap;
        margin-top: -$gap-s;
        margin-left: -$gap-s;
        .process-list-item {
          display: block;
          border-radius: $radius;
          flex: 0 1 10%;
          padding: $gap-s;
          .process-body {
            border: 1px solid $c-line;
            padding: $gap-s $gap-s 0 $gap-s;
          }
          .process-name {
            text-align: center;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
