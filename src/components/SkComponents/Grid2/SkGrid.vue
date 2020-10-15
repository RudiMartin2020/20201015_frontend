<template>
  <section
    class="sk-wijmo-grid"
    style="flex-direction: column;"
  >
    <wj-flex-grid
      class="has-ctx-menu"
      :initialized="initializeGrid"
      :allow-add-new="allowAddNew"
      :allow-delete="allowDelete"
      :allow-merging="allowMerging"
      :allow-sorting="allowSorting"
      :alternating-row-step="alternatingRowStep"
      :defer-resizing="deferResizing"
      :frozen-columns="frozenColumns"
      :frozen-rows="frozenRows"
      :group-header-format="groupHeaderFormat"
      :items-source="itemsSourceCollection"
      :items-source-changed="itemsSourceChanged"
      :show-drop-down="showDropDown"
      :show-errors="showErrors"
      :show-groups="showGroups"
      :show-selected-headers="showSelectedHeaders"
      :show-sort="showSort"
      :show-row-index="showRowIndex"
      :tree-indent="treeIndent"
      :selection-changing="gridSelectionChanging"
      :selection-changed="gridSelectionChanged"
      :row-added="gridRowAdded"
      :updated-view="updatedView"
      :new-row-at-top="newRowAtTop"
      :preserve-outline-state="preserveOutlineState"
      :preserve-selected-state="preserveSelectedState"
      :quick-auto-size="quickAutoSize"
      :refresh-on-edit="refreshOnEdit"
      :right-to-left="rightToLeft"
      :row-edit-started="gridRowEditStarted"
      :row-edit-starting="gridRowEditStarting"
      :row-edit-ended="gridRowEditEnded"
      :row-edit-ending="gridRowEditEnding"
      :cell-edit-ended="gridCellEditEnded"
      :cell-edit-ending="gridCellEditEnding"
      :sorting-column="gridSortingColumn"
      :sorted-column="gridSortedColumn"
      :pasting="gridPasting"
      :pasted="gridPasted"
      :loading-rows="gridLoadingRows"
      :loaded-rows="gridLoadedRows"
      :refreshing="gridRefreshing"
      :refreshed="gridRefreshed"
    >
      <wj-flex-grid-column
        binding="_status.checked"
        header=" "
        :width="checkColumnWidth"
        v-if="useCheckbox"
      />
      <wj-flex-grid-filter
        v-if="useFilter"
      />
      <template v-if="showRawData">
        <template v-for="(value, key, index) in itemsSource[0]">
          <wj-flex-grid-column
            v-if="key !== '_status'"
            :binding="key"
            :key="index"
          />
        </template>
      </template>
      <wj-flex-grid-column
        v-for="(column, key) in columns"
        :key="'column-' + key"
        :header="column.label"
        :binding="column.binding"
        :width="column.width"
        :min-width="column.minWidth"
        :max-width="column.maxWidth"
        :is-read-only="column.readOnly"
        :is-required="column.required"
        :input-type="column.type"
        :visible="column.visible"
        :data-type="column.dataType"
        :format="column.format"
        :data-map.sync="column.dataMap"
        :css-class="column.cssClass"
      />
    </wj-flex-grid>
    <wj-menu
      style="display:none;"
      :header="'Grid Context Menu'"
      :selected-value-path="'cmd'"
      :initialized="initMenu"
      :item-clicked="menuItemClicked"
    >
      <template v-for="(value) in contextMenu">
        <wj-menu-item
          :cmd="value.id"
          :key="value.id"
          v-if="!value.hide"
        >
          {{ value.label }}
        </wj-menu-item>
      </template>
    </wj-menu>

    <b-pagination
      v-if="pagingType === 'pagination' && paging.totalPageNumber > 1"
      :total="paging.total"
      :current.sync="paging.currentPageNumber"
      :per-page="paging.perPage"
      :range-before="pagingRangeBefore"
      :range-after="pagingRangeAfter"
      order="is-centered"
      size=""
      icon-prev="Chevron"
      icon-next="Chevron"
      @change="changingPage"
    />
  </section>
</template>
<script src="./SkGrid.script.js" />
<style src="./SkGrid.scss" lang="scss" />
