<template>
  <component-panel title="Buttons">
    <div class="panel-content">
      <example-view
        :component="ExSimple"
        title="Simple"
        vertical
      />

      <example-view
        :component="ExTypesStates"
        title="Types and states"
        vertical
      />

      <example-view
        :component="ExSizes"
        title="Sizes"
        vertical
      />

      <example-view
        :component="ExIcons"
        title="Icons"
        vertical
      />

      <example-view
        :component="ExTags"
        title="Tags"
        vertical
      />

      <example-view
        :component="ExRouter"
        title="Router"
        vertical
      >
        <div class="tags has-addons">
          <span class="tag is-success">New!</span>
          <span class="tag is-info">0.7.6</span>
        </div>
      </example-view>
    </div>
  </component-panel>
</template>

<script>
import ExSimple from './examples/ExSimple'
import ExTypesStates from './examples/ExTypesStates'
import ExIcons from './examples/ExIcons'
import ExSizes from './examples/ExSizes'
import ExTags from './examples/ExTags'
import ExRouter from './examples/ExRouter'

export default {
  data () {
    return {
      ExSimple,
      ExTypesStates,
      ExIcons,
      ExSizes,
      ExTags,
      ExRouter
    }
  }
}
</script>
