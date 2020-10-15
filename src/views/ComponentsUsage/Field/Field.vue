<template>
  <component-panel title="Field">
    <div class="panel-content">
      <example-view
        :component="ExSimple"
        title="Simple"
        vertical
      />

      <example-view
        :component="ModalExample"
        title="Modal Example"
        vertical
      />

      <example-view
        :component="ExLabelPosition"
        title="Label Position"
        vertical
      >
        <div class="tags has-addons">
          <span class="tag is-success">New!</span>
          <span class="tag is-info">0.7.8</span>
        </div>
        <p>Add the <code>label-position</code> prop to modify field style.</p>
        <b-message type="is-info">
          You can set the <code>defaultFieldLabelPosition</code> constructor option to override the default style
        </b-message>
      </example-view>

      <example-view
        :component="ExObjectSyntax"
        title="Object syntax"
        vertical
      >
        <div class="tags has-addons">
          <span class="tag is-success">New!</span>
          <span class="tag is-info">0.7.0</span>
        </div>
        <p>You can also use object syntax for <code>type</code> and <code>message</code> props just like Vuejs <code>class</code>.</p>
      </example-view>

      <example-view
        :component="ExAddons"
        title="Addons"
        vertical
      >
        <p>The above cited components are automatically attached together when inside a Field.</p>
        <p>Use the <code>expanded</code> prop <u>on the control</u> to <b>fill up the remaining space</b>.</p>
        <b-message type="is-info">
          <b>Note:</b> Beware of its responsiveness, avoid large groups of addons since they don't break lines.
        </b-message>
      </example-view>

      <example-view
        :component="ExGroups"
        title="Groups"
      >
        <p>You can group those components together with the <code>grouped</code> property.</p>
        <p>Use the <code>expanded</code> prop <u>on the control</u> to <b>fill up the remaining space</b>.</p>
      </example-view>

      <example-view
        :component="ExGroupExpanded"
        title="Nested groups"
      >
        <p>
          Nested Fields can be grouped as well,
          you have to use the <code>expanded</code> prop <u>on the Field</u> to <b>fill up the remaining space</b>.
        </p>
      </example-view>

      <example-view
        :component="ExGroupMultiline"
        title="Responsive groups"
        vertical
      >
        <p>
          Add the <code>group-multiline</code> prop to allow controls to fill up <b>multiple lines</b>.
          This is ideal for a long list of controls.
        </p>
      </example-view>

      <example-view
        :component="ExPositions"
        title="Positions"
      >
        <p>Add the <code>position</code> prop to modify its alignment.</p>
      </example-view>

      <example-view
        :component="ExCombineAddonsGroups"
        title="Combining addons and groups"
      />

      <example-view
        :component="ExHorizontal"
        title="Horizontal"
      >
        <p>Add the <code>horizontal</code> prop for aligning label and control in horizontal forms.</p>
        <b-message type="is-info">
          <b>Note:</b> Each child element of a <code>&lt;b-field horizontal/&gt;</code> will be
          automatically wrapped inside a <code>Field</code> component.
        </b-message>
      </example-view>

      <example-view
        :component="ExCustomClass"
        title="Label classes"
      >
        <p>Add the <code>custom-class</code> prop to adjust the styling of the label.</p>
      </example-view>

      <example-view
        :component="ExLabelSlot"
        title="Label slot"
      >
        <div class="tags has-addons">
          <span class="tag is-success">New!</span>
          <span class="tag is-info">0.7.6</span>
        </div>
        <p>Use the <code>label</code> slot for complex labels with HTML content or components. Note it overrides the <code>label</code> prop.</p>
      </example-view>
    </div>
  </component-panel>
</template>

<script>
import ExSimple from './examples/ExSimple'
import ExObjectSyntax from './examples/ExObjectSyntax'
import ExAddons from './examples/ExAddons'
import ExGroups from './examples/ExGroups'
import ExGroupExpanded from './examples/ExGroupExpanded'
import ExGroupMultiline from './examples/ExGroupMultiline'
import ExPositions from './examples/ExPositions'
import ExCombineAddonsGroups from './examples/ExCombineAddonsGroups'
import ExHorizontal from './examples/ExHorizontal'
import ExCustomClass from './examples/ExCustomClass'
import ExLabelSlot from './examples/ExLabelSlot'
import ExLabelPosition from './examples/ExLabelPosition'
import ModalExample from './examples/ModalExample'
export default {
  data () {
    return {
      ExSimple,
      ExObjectSyntax,
      ExAddons,
      ExGroups,
      ExGroupExpanded,
      ExGroupMultiline,
      ExPositions,
      ExCombineAddonsGroups,
      ExHorizontal,
      ExCustomClass,
      ExLabelSlot,
      ExLabelPosition,
      ModalExample
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-content {
  width: 500px;
}
</style>
