<template>
  <section class="component-usage columns">
    <div class="column-left column is-2">
      <component-panel
        title="Components"
        class="component-list"
      >
        <sk-tree
          :data="components"
          @node-click="nodeClick"
          :node-class="['-has-link']"
        />
        <!-- <ul class="component-list">
          <li
            class="list-item"
            v-for="item in components"
            :key="item.title"
          >
            <router-link :to="{ name: item.routeName }">
              {{ item.title }}
            </router-link>
          </li>
        </ul> -->
      </component-panel>
    </div>
    <div class="column-right column is-10">
      <router-view class="component-view" />
    </div>
  </section>
</template>

<script src="./ComponentUsage.script.js" />
<style lang="scss">
  .component-usage {
    padding: $gap;
    height: 100%;
    position: realtive;
    .component-list {
      min-width: 200px;
      .panel-body {
        padding: $gap $gap-s;
      }
      .-has-link {
        cursor: pointer;
      }
    }
    .column-right {
      position: relative;
    }
    .component-view {
      // flex: 5 0 auto;
      margin-left: 0;
    }
  }
  .section-title {
    font-size: 24px;
    font-weight: 700;
  }
</style>
