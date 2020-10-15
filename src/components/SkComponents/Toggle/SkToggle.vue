<template>
  <section class="sk-toggle">
    <component
      :is="tag"
      class="toggle-trigger"
      @click="e => setToggleState(e)"
      :class="{triggerClass}"
    >
      <slot
        name="trigger"
      />
    </component>
    <slot v-if="active" />
  </section>
</template>

<script>
export default {
  name: 'SkToggle',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    },
    triggerClass: {
      type: String,
      default: undefined
    }
  },
  methods: {
    setToggleState () {
      let active = this.active !== true
      this.$emit('update:active', active)
    }
  }
}
</script>

<style lang="scss">
  section.sk-toggle {
    .toggle-trigger {
      cursor: pointer;
    }
  }
</style>
