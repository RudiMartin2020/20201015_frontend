<template>
  <section class="sksl-rms">
    <component-panel
      title="Equipment Constant ID"
      class="main-grid add-grid-desc"
    >
      <template slot="header">
        <div class="header-buttons">
          <b-input
            class="header-search"
            :placeholder="$t('mes.LABEL.SEARCH')"
            v-model="searchValue"
            @keyup.native.enter="getData"
            type="search"
          />
          <b-button
            type="is-dark"
            icon-left="magnify"
            @click="getData"
          >
            {{ $t('mes.BUTTON.SEARCH') }}
          </b-button>
        </div>
        <div class="header-buttons">
          <b-button
            type="is-dark"
            @click="addRow"
          >
            추가
          </b-button>
          <b-button
            type="is-dark"
            @click="deleteData"
          >
            삭제
          </b-button>
          <b-button
            type="is-dark"
            @click="insertData"
          >
            저장
          </b-button>
          <b-button
            type="is-dark"
            @click="selectList"
          >
            SELECT List
          </b-button>
        </div>
      </template>
      <!-- /slot = header -->
      <sk-grid
        ref="SkslGrid"
        :columns.sync="itemGrid.gridColumns"
        :items-source.sync="itemGrid.itemData"
        :use-checkbox="false"
        :initialized="initializeGrid"
        :auto-size-column="true"
        :initial-focus="false"
        :paging-type="'load-more'"
      />
    </component-panel>
    <!-- /.site-property -->
  </section>
  <!-- /.standard-site -->
</template>

<script src="./ECID.script.js" />
