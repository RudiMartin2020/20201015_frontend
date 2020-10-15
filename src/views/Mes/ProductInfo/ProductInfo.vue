<template>
  <section class="product-information">
    <component-panel
      title="PRODUCTIONCLASS"
      class="production-class"
      :class="{ 'selected': selectedPanel === 'production-class' }"
    >
      <template slot="header">
        <div class="header-buttons">
          <b-input
            class="header-search"
            placeholder="Search"
          />
          <b-button
            type="is-dark"
            icon-left="magnify"
          />
        </div>
        <div class="header-buttons">
          <b-button
            type="is-dark"
            icon-left="refresh"
          />
          <input
            style="display:none;"
            type="file"
            id="importFileInput"
          >
          <input
            style="display:none;"
            type="file"
            id="importFileInput"
          >
          <b-button
            type="is-dark"
            icon-left="import"
          />
          <b-button
            type="is-dark"
            icon-left="export"
          />
          <span class="divider" />
          <b-button
            type="is-dark"
            icon-left="plus"
          />
          <b-button
            type="is-dark"
            icon-left="content-save"
          />
          <b-button
            type="is-danger"
            icon-left="delete"
          />
        </div>
      <!-- /.header-buttons -->
      </template>
      <!-- /slot = header -->
      <sk-grid2
        ref="tnCdsSitesGrid"
        :items-source.sync="productionClasses"
        :columns.sync="classColumns"
        @selection-changed="productionClassGridSectionChanged"
      />
    </component-panel>
    <!-- /.production-class -->

    <component-panel
      title="PRODUCTIONDEFINITION"
      class="production-definition"
      :class="{ 'selected': selectedPanel === 'production-definition' }"
    >
      <template slot="header">
        <div class="header-buttons">
          <b-input
            class="header-search"
            placeholder="Search"
          />
          <b-button
            type="is-dark"
            icon-left="magnify"
          />
        </div>
        <div class="header-buttons">
          <b-button
            type="is-dark"
            icon-left="refresh"
          />
          <input
            style="display:none;"
            type="file"
            id="importFileInput"
          >
          <input
            style="display:none;"
            type="file"
            id="importFileInput"
          >
          <b-button
            type="is-dark"
            icon-left="import"
          />
          <b-button
            type="is-dark"
            icon-left="export"
          />
          <span class="divider" />
          <b-button
            type="is-dark"
            icon-left="plus"
          />
          <b-button
            type="is-dark"
            icon-left="content-save"
          />
          <b-button
            type="is-danger"
            icon-left="delete"
          />
        </div>
      <!-- /.header-buttons -->
      </template>
      <!-- /slot = header -->
      <sk-grid2
        ref="tnCdsSitesGrid"
        :items-source.sync="productionClasses"
        :columns.sync="classColumns"
        @selection-changed="productionDefinitionGridSectionChanged"
      />
    </component-panel>
    <!-- /.production-definition -->

    <component-panel
      class="site-property"
    >
      <template slot="header">
        <div class="header-buttons">
          <b-button
            icon-left="playlist-plus"
            type="is-dark"
          >
            Append row
          </b-button>
          <b-button
            icon-left="playlist-edit"
            type="is-dark"
          >
            Edit row
          </b-button>
        </div>
      </template>
      <div class="panel-content">
        <div class="key-internals">
          <sk-foldable
            title="Key Columns"
            class="key-columns"
          >
            <b-field
              v-for="column in keyColumns"
              :label="column.label"
              :key="column.key"
              :value="column.value"
              label-position="on-border"
            >
              <b-input
                :disabled="column.readOnly"
              />
            </b-field>
          </sk-foldable>
          <sk-foldable
            title="Internal Columns"
            class="internal-columns"
          >
            <b-field
              v-for="column in internalColumns"
              :label="column.label"
              :key="column.key"
              :value="column.value"
              label-position="on-border"
            >
              <b-input
                :disabled="column.readOnly"
              />
            </b-field>
          </sk-foldable>
          <!-- /internal-columns -->
        </div>
        <sk-foldable
          title="Default Columns"
          class="default-columns"
        >
          <b-field
            v-for="column in defaultColumns"
            :label="column.label"
            :key="column.key"
            label-position="on-border"
          >
            <b-select
              v-if="column.type=='combo'"
              placeholder="선택"
            >
              <option>
                code
              </option>
            </b-select>
            <b-input
              v-else
              :disabled="column.readOnly"
            />
          </b-field>
        </sk-foldable>
      </div>
    </component-panel>
    <!-- /.site-property -->
  </section>
  <!-- /.standard-site -->
</template>
<script>
export default {
  name: 'ProductInfo',
  methods: {
    productionClassGridSectionChanged: function (grid, event) {
      if (grid.rows.length > 0) {
        this.changeSelectedPanel('production-class')
      }
    },
    productionDefinitionGridSectionChanged: function (grid, event) {
      if (grid.rows.length > 0) {
        this.changeSelectedPanel('production-definition')
        console.log('productionDefinitionGridSectionChanged')
      }
    },
    changeSelectedPanel (panel) {
      this.selectedPanel = panel
    }
  },
  data () {
    return {
      selectedPanel: '',
      classColumns: [
        { label: 'Object ID(*)', binding: 'objId', readOnly: true },
        { label: 'Site ID(*)', binding: 'siteId', readOnly: false },
        { label: 'Site NAME', binding: 'siteNm', readOnly: false },
        { label: 'Site TYPE', binding: 'siteTyp', readOnly: false },
        { label: 'Event Name', binding: 'evntNm', readOnly: true },
        { label: 'Prev. Event Name', binding: 'prevEvntNm', readOnly: true },
        { label: 'Custom Event Name', binding: 'cstmEvntNm', readOnly: false },
        { label: 'Prev Custom Event Name', binding: 'prevCstmEvntNm', readOnly: true },
        { label: 'Use Stat Code', binding: 'useStatCd', readOnly: false },
        { label: 'Trans Description', binding: 'trnsDesc', readOnly: false },
        { label: 'Reason Code', binding: 'rsnCd', readOnly: false },
        { label: 'Trans Comment', binding: 'trnsCm', readOnly: false },
        { label: 'Create User ID', binding: 'crtUserId', readOnly: true },
        { label: 'Create DateTime', binding: 'crtDt', readOnly: true },
        { label: 'Modify User ID', binding: 'mdfyUserId', readOnly: true },
        { label: 'Moidfy DateTime', binding: 'mdfyDt', readOnly: true },
        { label: 'Final Event DateTime', binding: 'fnlEvntDt', readOnly: true }
      ],
      productionClasses: [
        { objId: '----', siteId: 'SITEID', siteNm: 'SiteName' }
      ],
      keyColumns: [
        { label: 'Site ID(*)', key: 'siteId', value: '', readOnly: false },
        { label: 'Object ID(*)', key: 'objId', value: '', readOnly: true }
      ],
      internalColumns: [
        { label: 'Site Name', key: 'siteNm', value: '', readOnly: false },
        { label: 'Site Type', key: 'siteTyp', value: '', readOnly: false }
      ],
      defaultColumns: [
        { label: 'Event Name', key: 'evntNm', value: '', readOnly: true },
        { label: 'Prev. Event Name', key: 'prevEvntNm', value: '', readOnly: true },
        { label: 'Custom Event Name', key: 'cstmEvntNm', value: '', readOnly: false },
        { label: 'Prev. Custom Event Name', key: 'prevCstmEvntNm', value: '', readOnly: true },
        { label: 'Use State Code', key: 'useStatCd', value: '', readOnly: false, type: 'combo' },
        { label: 'Trans Description', key: 'trnsDesc', value: '', readOnly: false },
        { label: 'Reason Code', key: 'rsnCd', value: '', readOnly: false },
        { label: 'Trans Comment,', key: 'trnsCm', value: '', readOnly: false },
        { label: 'Create User ID', key: 'crtUserId', value: '', readOnly: true },
        { label: 'Create DateTime', key: 'crtDt', value: '', readOnly: true },
        { label: 'Modify User ID', key: 'mdfyUserId', value: '', readOnly: true },
        { label: 'Modify DateTime', key: 'mdfyDt', value: '', readOnly: true },
        { label: 'Final Event DateTime', key: 'fnlEvntDt', value: '', readOnly: true }
      ]
    }
  }
}
</script>

<style lang="scss">
  .product-information {
    padding: $gap;
    height: 100%;
    position: relative;
    display: flex;
    align-items: stretch;
    > .component-panel {
      margin-left: $gap;
      &:first-of-type {
        margin-left: 0;
      }
      &.production-class {
        flex: 2 2 30%;
      }
      &.production-definition {
        flex: 2 2 40%;
      }
      &.site-property {
        flex: 1 1 350px;
        width: 350px;
        max-width: 350px;
        .fields-body .field {
          margin-bottom: $gap;
        }
      }
      &.selected {
        border: 1px solid $c-primary;
        overflow: hidden;
      }
    }
  }
</style>
