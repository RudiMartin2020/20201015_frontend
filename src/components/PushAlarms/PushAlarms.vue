<template>
  <section
    class="push-alarms"
    :class="['active-' + active]"
    v-if="active"
  >
    <div
      class="alarms-dimm"
      @click="deactive"
    />
    <div class="alarms-body">
      <div class="body-title">
        <b-icon icon="bell" />
        <span class="title-text">알람 목록</span>
      </div>
      <ul class="body-alarm-list">
        <li
          class="alarm-item"
          v-for="(alarm, alarmIndex) in alarms"
          :key="'alarm-' + alarmIndex"
        >
          <sk-toggle
            class="item-panel"
            :active.sync="alarm.open"
          >
            <template #trigger>
              <div
                class="panel-header"
                role="button"
              >
                <div class="origination">
                  <b-taglist attached>
                    <b-tag type="is-dark">
                      ORIGIN
                    </b-tag>
                    <b-tag type="is-info">
                      {{ alarm.origination }}
                    </b-tag>
                  </b-taglist>
                </div>
                <!-- /.origination -->
                <div class="site-id">
                  <b-taglist attached>
                    <b-tag type="is-dark">
                      SITE
                    </b-tag>
                    <b-tag type="is-info">
                      {{ alarm.siteId }}
                    </b-tag>
                  </b-taglist>
                </div>
                <div class="eqp-id">
                  <b-taglist attached>
                    <b-tag type="is-dark">
                      EQP ID
                    </b-tag>
                    <b-tag type="is-info">
                      {{ alarm.eqpId }}
                    </b-tag>
                  </b-taglist>
                </div>
                <div class="received">
                  {{ alarm.received }}
                </div>
              </div>
              <!-- /.panel-heading -->
            </template>
            <div class="panel-body">
              <vue-json-pretty
                :data="alarm.data"
              />
            </div>
          </sk-toggle>
        </li>
        <!-- /.alarm-item -->
      </ul>
    </div>
    <!-- /.alarms-body -->
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import VueJsonPretty from 'vue-json-pretty'

export default {
  name: 'PushAlarms',
  components: {
    'vue-json-pretty': VueJsonPretty
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    deactive () {
      this.$emit('update:active', false)
    },
    alarmRead (alarm) {
      console.log('alarmRead', alarm)
    }
  },
  computed: {
    ...mapGetters({
      alarms: 'alarm:alarms'
    })
  },
  data () {
    return {
      /* alarms: [
        {
          received: Dayjs().format('YYYY-MM-DD HH:mm:ss'),
          origination: 'SPC',
          siteId: 'MIIP',
          eqpId: 'EQP-MAIN-01',
          open: false,
          data: `{
            "topic": "IAMCommonUIData",
            "send": "COMMON",
            "receive": "UI", "subject": "NONE", "origination": "SPC", "siteId": "MIIP", "eqpId": "EQP-MAIN-01", "alarmEvent": { "alarmDefId": "SPC-001", "alarmGroup": "SPC", "alarmLvlCd": 1, "lotId": "LOT-001", "prodDefId": "PROD-01", "procDefId": "FLOW-01", "mainProcSgmtId": "OPER-01", "mainEqpId": "EQP-MAIN-01", "measProcSgmtId": "OPER-01", "measEqpId": "EQP-MEAS-01", "trnsCm": "SPC RULE 01 out interlock msg 입니다." } }`
        },
        {
          received: Dayjs().format('YYYY-MM-DD HH:mm:ss'),
          origination: 'MES',
          siteId: 'MIIP',
          eqpId: 'EQP-MAIN-01',
          open: false,
          data: `{ "topic": "IAMCommonUIData", "send": "COMMON", "receive": "UI", "subject": "NONE", "origination": "SPC", "siteId": "MIIP", "eqpId": "EQP-MAIN-01", "alarmEvent": { "alarmDefId": "SPC-001", "alarmGroup": "SPC", "alarmLvlCd": 1, "lotId": "LOT-001", "prodDefId": "PROD-01", "procDefId": "FLOW-01", "mainProcSgmtId": "OPER-01", "mainEqpId": "EQP-MAIN-01", "measProcSgmtId": "OPER-01", "measEqpId": "EQP-MEAS-01", "trnsCm": "SPC RULE 01 out interlock msg 입니다." } }`
        }
      ] */
    }
  }
}
</script>

<style lang="scss">
  section.push-alarms {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 5;
    .activate-enter-active,
    .activate-leave-active {
      transform: translateX(0);
      transition: .2s ease-out all;
      opacity: 1;
    }
    .activate-enter,
    .activate-leave-to {
      transform: translateX(100%);
      opacity: 0;
    }
    .alarms-dimm {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .alarms-body {
      position: fixed;
      background-color: lighten($c-bg-base, 5%);
      height: 100vh;
      box-shadow: 0 0 20px rgba(0, 0, 0, .15);
      width: 35vw;
      min-width: 500px;
      top: 0;
      right: 0;

      overflow: auto;
      .body-title {
        font-size: 1.25rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        padding: $gap;
        background-color: lighten($c-bg-block, 5%);
        height: 56px;
        overflow: hidden;
        .title-text { margin-left: $gap-s; }
      }
      .body-alarm-list {
        padding: $gap;
        height: calc(100% - 56px);
        overflow: auto;
        .alarm-item {
          &:first-of-type {
            margin-top: 0;
          }
          margin-top: $gap;
          .item-panel {
            background-color: lighten($c-bg-block, 5%);
            box-shadow: 0 0 5px rgba(0, 0, 0, .1);
            border-radius: $radius;
            .panel-header {
              display: flex;
              align-items: center;
              padding: $gap-s;
              > * {
                margin-right: $gap-s;
              }
              .received {
                flex: 1 1 auto;
                text-align: right;
                opacity: .5;
              }
            }
            .panel-body {
              padding: $gap-s;
              pre,
              code {
                white-space: pre-wrap;
                .number {
                  font-size: inherit;
                  background-color: transparent;
                  padding: 0;
                  margin: 0;
                  display: inline;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
