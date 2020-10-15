<template>
  <section class="example-view">
    <p class="title is-4">
      {{ title }}
    </p>
    <div class="content">
      <slot />
    </div>
    <div
      class="exampel"
      v-if="component"
    >
      <component :is="component" />
    </div>
  </section>
</template>
<script>
export default {
  name: 'ExampleView',
  props: {
    component: {
      type: [Object, Function],
      default () {
        return {}
      }
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    paddingless: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
.example-view {
  padding-top: 20px;
  margin-bottom: 50px;
  .title.is-4 {
    color: #fff;
  }
}
</style>
