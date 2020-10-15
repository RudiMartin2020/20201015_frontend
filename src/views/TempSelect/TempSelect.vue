<template>
  <section class="temp-select">
    <component-panel
      title="질문"
    >
      <ul class="question-list">
        <li
          class="list-item"
          v-for="item in components"
          :key="item.title"
        />
      </ul>
    </component-panel>
    <router-view class="component-view" />
  </section>
</template>

<script src="./ComponentUsage.script.js" />
<style lang="scss">
  .component-usage {
    display: flex;
    .component-list {
      min-width: 200px;
      .component-list {
        padding: 0 20px;
        .list-item {
          padding: 10px 0;
        }
      }
    }
    .component-view {
      flex: 5 0 auto;
      margin-left: 0;
    }
  }
  .section-title {
    font-size: 24px;
    font-weight: 700;
  }
</style>
