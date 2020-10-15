<template>
  <section class="event-visualization">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
    />
    <component-panel
      class="visualization-panel"
      :use-header="true"
      :multi-row-header="true"
    >
      <template slot="header">
        <div
          class="unit"
          v-text="recentlyRefreshDate"
          v-if="selectedRefreshInterval.value > 0"
        >
          {{ recentlyRefreshDate }}
        </div>
        <div class="header-buttons">
          <b-field
            label="Item Count"
            horizontal
          >
            <b-select
              v-model="perfTestItemCount"
              placeholder="Item Count"
            >
              <option
                v-for="count in perfTestItemCounts"
                :value="count"
                :key="count"
              >
                {{ count | locale }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="header-buttons">
          <pie-timer
            v-if="selectedRefreshInterval.value > 0"
            class="pie-timer"
            :class="'-time-' + selectedRefreshInterval.value"
          />
          <b-select
            v-model="selectedRefreshInterval"
            placeholder="Refresh Interval"
            :disabled="isButtonDisable()"
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
            type="is-dark"
            icon-left="export"
            :disabled="!(tableData.length > 0)"
            @click="exportExcel()"
          >
            {{ $t('spc.SPC_EVENT_VISUAL.BUTTON_002') }}
          </b-button>
        </div>
        <div class="header-buttons">
          <b-button
            type="is-dark"
            icon-left="folder-open"
            @click="() => { isOpenModalActive = true }"
          >
            {{ $t('spc.SPC_EVENT_VISUAL.BUTTON_003') }}
          </b-button>
          <b-button
            type="is-primary"
            icon-left="content-save"
            @click="() => { isSaveModalActive = true }"
            :disabled="!(chartData.length > 0)"
          >
            {{ $t('spc.SPC_EVENT_VISUAL.BUTTON_004') }}
          </b-button>

          <b-button
            type="is-dark"
            icon-left="magnify"
            :disabled="isButtonDisable()"
            @click="search()"
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
                  @click="saveVisualCondition"
                  :disabled="isSavable()"
                >
                  {{ $t('spc.SPC_EVENT_VISUAL.BUTTON_004') }}
                </b-button>
              </footer>
            </div>
          </b-modal>
          <b-modal
            v-show="isOpenModalActive === true"
            has-modal-card
            :active="true"
            :on-cancel="() => { isOpenModalActive = false }"
          >
            <!-- :active.sync="isOpenModalActive" -->
            <div
              class="modal-card -open-condition"
            >
              <header class="modal-card-head">
                <span class="modal-card-title">{{ $t('spc.SPC_EVENT_SEARCH.LABEL_005') }}</span>
              </header>

              <!-- <div -->
              <section
                class="modal-card-body"
              >
                <!-- infinite-scroll-immediate-check="false"
                infinite-scroll-listen-for-event="scroll" -->
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
                    @click="listVisualCondition(openCondition)"
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
                      @click="deleteVisualCondition()"
                      :disabled="!checkedDeleteConditions.length > 0"
                    >
                      {{ $t('spc.SPC_EVENT_VISUAL.BUTTON_006') }}
                    </b-button>
                  </div>
                  <b-table
                    :data="conditions"
                    :columns="conditionsColumns"
                    @click="openClickedCondition"
                    :checked-rows.sync="checkedDeleteConditions"
                    checkable
                  />
                  <b-pagination
                    v-if="conditions.length > 0"
                    :total="paging.maxPageNumber"
                    :current.sync="paging.currPageNumber"
                    :per-page="paging.pageCount"
                    range-before="1"
                    range-after="1"
                    order="is-centered"
                    size="is-small"
                    icon-prev="Chevron"
                    icon-next="Chevron"
                    @change="listVisualCondition(openCondition, $event)"
                  />
                </div>
              </section>
              <!-- </div> -->
            </div>
          </b-modal>
        </div>
        <!-- /.header-buttons -->
      </template>
      <!-- /header -->
      <section class="panel-body">
        <div class="body-options">
          <b-tabs>
            <b-tab-item :label="$t('spc.SPC_EVENT_VISUAL.LABEL_007')">
              <ul class="option-body">
                <li class="option-item -event-name">
                  <b-field
                    :label="$t('spc.SPC_EVENT_VISUAL.LABEL_001')"
                    required
                  >
                    <b-select
                      placeholder="Select Event"
                      v-model="selectedEventIndexName"
                      @input="listIndexFieldName"
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
                  <b-field :label="$t('spc.SPC_EVENT_VISUAL.LABEL_002')">
                    <b-field>
                      <b-select
                        v-model="selectedFieldName.field"
                        @input="setSelectedFieldType"
                        expanded
                        placeholder="Select Field"
                      >
                        <option
                          v-for="field in fieldNames"
                          :value="field"
                          :key="field.fieldKey"
                          :disabled="field.disabled"
                        >
                          {{ field.fieldName }}
                        </option>
                      </b-select>
                      <b-select
                        v-model="selectedFieldName.type"
                        placeholder="Condition"
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
                      @click="addEvent(selectedFieldName)"
                    >
                      Add
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
                  <b-field :label="$t('spc.SPC_EVENT_VISUAL.LABEL_003')" />
                  <b-radio
                    v-model="selectedPeriod"
                    native-value="MONTH"
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
            </b-tab-item>
            <b-tab-item :label="$t('spc.SPC_EVENT_VISUAL.LABEL_008')">
              <ul class="option-body -xy-axis">
                <li class="option-item -y-axis">
                  <b-field
                    class="axis-label"
                    :label="$t('spc.SPC_EVENT_VISUAL.LABEL_009')"
                  />
                  <b-field
                    :label="$t('spc.SPC_EVENT_VISUAL.LABEL_010')"
                    required
                  >
                    <b-select
                      placeholder="Aggregation"
                      expanded
                      v-model="yaxis.aggregation"
                    >
                      <option
                        v-for="type in yaxisCondition"
                        :value="type"
                        :key="type.key"
                      >
                        {{ type.name }}
                      </option>
                    </b-select>
                  </b-field>
                  <b-field
                    :label="$t('spc.SPC_EVENT_VISUAL.LABEL_011')"
                    required
                  >
                    <b-select
                      placeholder="Field"
                      expanded
                      v-model="yaxis.field"
                    >
                      <option
                        v-for="type in yaxisFields"
                        :value="type"
                        :key="type.fieldKey"
                      >
                        {{ type.fieldName }}
                      </option>
                    </b-select>
                  </b-field>
                  <b-field :label="$t('spc.SPC_EVENT_VISUAL.LABEL_012')">
                    <b-input
                      v-model="yaxis.name"
                    />
                  </b-field>
                </li>
                <li class="option-item -x-axis">
                  <b-field
                    class="axis-label"
                    :label="$t('spc.SPC_EVENT_VISUAL.LABEL_013')"
                  />
                  <b-field>
                    <!-- <b-select
                      placeholder="Aggregation"
                      expanded
                      v-model="xaxis.aggregation"
                    >
                      <option
                        v-for="agg in xaxisCondition"
                        :vaue="agg"
                        :key="agg"
                      >
                        {{ agg }}
                      </option>
                    </b-select> -->
                  </b-field>
                  <b-field
                    :label="$t('spc.SPC_EVENT_VISUAL.LABEL_014')"
                    required
                  >
                    <b-select
                      placeholder="Field"
                      expanded
                      v-model="xaxis.field"
                    >
                      <option
                        v-for="type in xaxisFields"
                        :value="type"
                        :key="type.fieldKey"
                      >
                        {{ type.fieldName }}
                      </option>
                    </b-select>
                  </b-field>
                  <b-field :label="$t('spc.SPC_EVENT_VISUAL.LABEL_015')">
                    <b-input
                      v-model="xaxis.name"
                    />
                  </b-field>
                </li>
                <li class="option-item -x-axis">
                  <b-field :label="$t('spc.SPC_EVENT_VISUAL.LABEL_016')" />
                  <b-field :label="$t('spc.SPC_EVENT_VISUAL.LABEL_017')">
                    <b-select
                      placeholder="Field"
                      expanded
                      v-model="seriesField"
                    >
                      <option
                        v-for="type in seriesFields"
                        :value="type"
                        :key="type.fieldKey"
                      >
                        {{ type.fieldName }}
                      </option>
                    </b-select>
                  </b-field>
                </li>
              </ul>
            </b-tab-item>
          </b-tabs>
          <!-- <div class="option-footer">
          </div> -->
          <!-- /option-footer -->
        </div>
        <!-- /body-options -->
      </section>
      <!-- /panel-body -->
    </component-panel>
    <!-- /.vis-panel -->
    <component-panel
      title="Chart"
      class="vis-chart"
    >
      <sk-chart
        ref="flexChart"
        :items-source.sync="chartData"
        :initialized="initChart"
        :tooltip-content="setTooltipContent"
        :binding-x="bindingXName"
        :use-raw-data-popup="true"
        :x-title="xTitle"
        :y-title="yTitle"
        selection-mode="Point"
        :use-legend="false"
        :binding-x-type="bindingXType"
      />
      <wj-flex-pie
        ref="flexPie"
        :initialized="initPie"
        :items-source="chartData"
      />

      <!-- </wj-flex-pie> -->
      <b-field
        v-if="seriesField && seriesField.fieldKey !== 'NONE'"
        class="eq-toggle has-addons"
      >
        <b-checkbox-button
          v-model="seriesButtonList"
          :native-value="item"
          v-for="(item, index) in seriesList"
          :key="item"
          :class="'-eqp-id-' + Number(index + 1)"
        >
          {{ item }}
        </b-checkbox-button>
      </b-field>
    <!-- /.chart-main -->
    </component-panel>
    <component-panel
      title="Raw Data"
      class="vis-grid"
      ref="gridPanelBody"
    >
      <template #header>
        <div class="header-desc">
          데이터 개수 : {{ tableData.length | locale }}
        </div>
      </template>
      <div
        class="chart-grid"
        :style="[tableData.length ? { 'display' : 'block' } : {'display' : 'none'}]"
      >
        <sk-grid
          :use-checkbox="false"
          :items-source="tableData"
          :initialized="initGrid"
          :columns="columns"
          :initial-focus="false"
          selection-mode="ListBox"
        >
          <!-- yaxis.aggregation 이 없는 경우 -->
          <!-- <wj-flex-grid-column
            :is-read-only="true"
            binding="grpLvl1Val"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_001.grpLvl1Val')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="grpLvl2Val"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_001.grpLvl2Val')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="grpLvl3Val"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_001.grpLvl3Val')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="grpLvl4Val"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_001.grpLvl4Val')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="grpLvl5Val"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_001.grpLvl5Val')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="key1Val"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_001.key1Val')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="key2Val"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_001.key2Val')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="key3Val"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_001.key3Val')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="paramName"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_001.paramName')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="paramVal"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_001.paramVal')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="paramType"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_001.paramType')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="paramCrtDttm"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_001.paramCrtDttm')"
            format="yyyy-MM-dd HH:mm:ss"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="dataOriginl"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_DETAIL_001.dataOrginl')"
          /> -->

          <!-- yaxis.aggregation 이 있는 경우 -->
          <!-- <wj-flex-grid-column
            :is-read-only="true"
            binding="xaxisVal"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_002.xaxisVal')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="seriesVal"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_002.seriesVal')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="yaxisAggAvg"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggAvg')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="yaxisAggCount"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggCount')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="yaxisAggMax"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggMax')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="yaxisAggMin"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggMin')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="yaxisAggStddev"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggStddev')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="yaxisAggSum"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggSum')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="yaxisAggSumofsquare"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggSumofsquare')"
          />
          <wj-flex-grid-column
            :is-read-only="true"
            binding="yaxisAggVariance"
            :header="$t('spc.SPC_EVENT_VISUAL.GRID_002.yaxisAggVariance')"
          /> -->
        </sk-grid>
      </div>
      <!-- /chart-grid -->
    </component-panel>
  </section>
</template>

<script src="./EventVis.script.js" />
<style src="./EventVis.scss" lang="scss" />
