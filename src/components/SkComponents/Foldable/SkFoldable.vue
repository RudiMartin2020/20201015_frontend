<template>
  <b-collapse
    class="sk-foldable -key-columns"
    :open.sync="isOpen"
  >
    <div
      slot="trigger"
      slot-scope="props"
      class="fields-title"
      role="button"
    >
      {{ title }}
      <b-icon
        size="is-small"
        :class="{'-open': props.open}"
        :icon="props.open ? 'chevron-down' : 'chevron-right'"
      />
    </div>
    <div class="fields-body">
      <slot />
    </div>
  </b-collapse>
</template>
<script>
export default {
  name: 'SkFoldable',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isOpen: true
    }
  }
}
</script>
<style lang="scss">
.sk-foldable {
  border-bottom: 1px solid $c-text;
  margin-bottom: $gap - 8px;
  .fields-title {
    font-size: 14px;
    font-weight: bold;
    padding-bottom: $gap - 5px;
  }
  .fields-body {
    display: block;
    padding: 0 0 8px 0;
    .label {
      font-weight: normal;
      font-size: 1rem;
      margin-bottom: 0.2em;
    }
    input {
      height: 1.8em;
    }
    .select {
      width : 100%;
      height: 1.8em;
      select {
        width :100%;
        height: 1.8em;
        line-height: 1.8em;
        padding-bottom:0;
        padding-top:0;
      }
    }
    .datepicker {
      .mdi-calendar-today:before{
        font-size:18px;
        line-height:18px;
      }
      .select {
        height: 2.25em;
        select {
          height:2.25em;
        }
      }
      .field {
        margin-bottom:0 !important;
      }
    }
  }
}
.component-panel {
  &[class*="property"] {
    .field {
      margin-bottom: 10px !important;
    }
  }
}
</style>
