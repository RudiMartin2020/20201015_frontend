<template>
  <component-panel title="Checkbox">
    <div class="panel-content">
      <example-view
        :component="ExSimple"
        title="Simple"
        vertical
      />

      <example-view
        :component="ExArray"
        title="Grouped (Array)"
        vertical
      >
        <p>Just add the same <code>v-model</code> to multiple Checkboxes, and set a <code>native-value</code>.</p>
      </example-view>

      <example-view
        :component="ExSizes"
        title="Sizes"
        vertical
      />

      <example-view
        :component="ExTypes"
        title="Types"
        vertical
      />

      <example-view
        :component="ExCheckboxButton"
        title="Checkbox Button"
      >
        <p>
          You have to wrap them on a <router-link to="/documentation/field">
            Field
          </router-link>.
        </p>
      </example-view>
    </div>
  </component-panel>
</template>

<script>
import ExSimple from './examples/ExSimple'
import ExArray from './examples/ExArray'
import ExSizes from './examples/ExSizes'
import ExTypes from './examples/ExTypes'
import ExCheckboxButton from './examples/ExCheckboxButton'

export default {
  data () {
    return {
      ExSimple,
      ExArray,
      ExSizes,
      ExTypes,
      ExCheckboxButton
    }
  }
}
</script>
