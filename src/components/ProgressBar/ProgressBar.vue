<template>
  <section class="progress-bar">
    <div class="progress-percent">
      <div
        v-if="typeof value === 'number'"
        class="percent-bar"
        :style="{ width: value + '%' }"
      />
    </div>
    <span
      class="progress-text"
      v-if="labelView"
    >
      {{ label }}
    </span>
  </section>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    labelView: {
      type: Boolean,
      default: true
    },
    value: {
      type: Number,
      default: 50
    },
    label: {
      type: Number,
      default: 0
    },
    classes: {
      type: Array,
      default () {
        return []
      }
    }
  },
  created () {
    if (Array.isArray(this.value)) {
      this.valuesTotal = this.value.reduce((a, b) => a + b)
    }
  },
  methods: {
    barClass (index) {
      if (this.classes.length === this.percentages.length) {
        return this.classes[index]
      } else {
        return 'bar-' + index
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style src="./ProgressBar.scss" lang="scss" />
