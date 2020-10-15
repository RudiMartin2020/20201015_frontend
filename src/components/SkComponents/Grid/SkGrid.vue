<template>
  <section
    class="sk-wijmo-grid"
  >
    <wj-flex-grid
      class="has-ctx-menu"
      :initialized="initializeGrid"
      :allow-add-new="allowAddNew"
      :allow-delete="allowDelete"
      :allow-merging="allowMerging"
      :alternating-row-step="alternatingRowStep"
      :defer-resizing="deferResizing"
      :frozen-columns="frozenColumns"
      :frozen-rows="frozenRows"
      :group-header-format="groupHeaderFormat"
      :items-source="itemsSourceCollection"
      :show-drop-down="showDropDown"
      :show-errors="showErrors"
      :show-groups="showGroups"
      :show-selected-headers="showSelectedHeaders"
      :show-sort="showSort"
      :show-row-index="showRowIndex"
      :tree-indent="treeIndent"
      :selection-changed="gridSelectionChanged"
      :selection-changing="gridSelectionChanging"
      :row-added="gridRowAdded"
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
      :pasting="gridPasting"
      :pasted="gridPasted"
      :loaded-rows="gridLoadedRows"
    >
      <wj-flex-grid-filter />
      <wj-flex-grid-column
        binding="_status.checked"
        :width="checkColumnWidth"
        v-if="useCheckbox"
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
      <slot />
    </wj-flex-grid>
    <wj-menu
      style="display:none;"
      :header="'Grid Context Menu'"
      :selected-value-path="'cmd'"
      :initialized="initMenu"
      :item-clicked="menuItemClicked"
    >
      <wj-menu-item
        v-if="menu.removable"
        :cmd="'DELETE'"
      >
        DELETE
      </wj-menu-item>
      <wj-menu-item :cmd="'COPY'">
        COPY
      </wj-menu-item>
    </wj-menu>
  </section>
</template>
<script src="./SkGrid.script.js" />
<style src="./SkGrid.scss" lang="scss" />
