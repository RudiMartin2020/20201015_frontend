<template>
  <section class="sksl-test">
    <component-panel
      :title="$t('mes.LABEL.SKSLTEST')"
      class="test-grid add-grid-desc"
    >
      <template slot="header">
        <div class="header-buttons">
          <b-input
            class="header-search"
            :placeholder="$t('mes.LABEL.SEARCH')"
            v-model="searchValue"
            @keyup.native.enter="changedLoadMorePage(0, pagingSize)"
            type="search"
          />
          <b-button
            type="is-dark"
            icon-left="magnify"
            @click="changedLoadMorePage(0, pagingSize)"
          >
            {{ $t('mes.BUTTON.SEARCH') }}
          </b-button>
        </div>
        <div class="header-buttons">
          <!--
          <b-button
            type="is-dark"
            icon-left="playlist-plus"
            @click="addRow"
            :data-title="$t('mes.BUTTON.ADDROW')"
          />
          <b-button
            type="is-dark"
            icon-left="playlist-minus"
            @click="deleteRow"
            :data-title="$t('mes.BUTTON.DELETEROW')"
          />
          -->
          <span class="divider" />
          <b-button
            type="is-primary"
            icon-left="content-save"
            @click="saveTestTables"
            :disabled="disableANDableCheck()"
            :data-title="$t('mes.BUTTON.SAVE')"
          />
          <span class="divider" />
          <input
            style="display:none;"
            type="file"
            id="importFileInput"
          >
          <b-button
            type="is-dark"
            icon-left="import"
            @click="importExcel()"
            :data-title="$t('mes.BUTTON.IMPORT')"
          />
          <!--엑셀파일 EXPORT Event Handling-->
          <b-button
            type="is-dark"
            icon-left="export"
            :data-title="$t('mes.BUTTON.EXPORT')"
          />
        </div>
        <!-- /.header-buttons -->
      </template>
      <!-- /slot = header -->
      <sk-grid
        ref="tnSkslTestGrid"
        :columns.sync="gridColumns"
        :items-source.sync="tnSkslTest"
        :use-checkbox="true"
        :initialized="initGrid"
        :auto-size-column="true"
        @selection-changed="testGridSelectionChanged"
        :initial-focus="false"
        @changed-page="changedLoadMorePage"
        :current-page="loadMoreCurrentPage"
        :items-append-source="loadMoreAppendData"
        :total-page="totalPages"
        :total-element-count="totalElements"
        :paging-type="'load-more'"
        :paging-size="pagingSize"
      />
      <span
        id="tnSkslTestGridDesc"
        class="grid-desc"
      >{{ tnSkslTestDescData }}</span>
    </component-panel>
    <!-- /.site-grid -->
    <component-panel
      class="site-property"
    >
      <template slot="header">
        <div class="header-buttons">
          <b-button
            icon-left="playlist-plus"
            type="is-dark"
            @click="appendRow"
          >
            {{ $t('mes.LABEL.APPENDROW') }}
          </b-button>
          <b-button
            icon-left="playlist-check"
            type="is-dark"
            @click="editRow"
          >
            {{ $t('mes.LABEL.APPLYROW') }}
          </b-button>
        </div>
      </template>
      <div class="panel-content">
        <sk-foldable
          :title="$t('mes.LABEL.KEYCOL')"
        >
          <b-field
            v-for="column in keyColumns"
            :label="column.label"
            :key="column.key"
            :value="column.value"
          >
            <b-input
              v-model="selectTtnSkslTest[column.key]"
              :disabled="column.readOnly"
              type="search"
            />
          </b-field>
        </sk-foldable>
        <sk-foldable
          :title="$t('mes.LABEL.INTERNALCOL')"
        >
          <!--InternalColumns value binding & input handling -->
          <b-field
          >
            <b-input
              :disabled="column.readOnly"
              type="search"
            />
          </b-field>
        </sk-foldable>
        <!-- /internal-columns -->
        <sk-foldable
          :title="$t('mes.LABEL.DEFAULTCOL')"
        >
          <b-field
            v-for="column in defaultColumns"
            :label="column.label"
            :key="column.key"
          >
            <b-input
              v-model="selectTtnSkslTest[column.key]"
              :disabled="column.readOnly"
              type="search"
            />
          </b-field>
        </sk-foldable>
      </div>
    </component-panel>
    <!-- /.site-property -->
  </section>
  <!-- /.standard-site -->
</template>
<script src="./SkslTest.script.js" />
<style src="./SkslTest.scss" lang="scss">
