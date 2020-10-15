<template>
  <section
    class="component-description"
    :id="title"
  >
    <h3 class="title">
      <a
        class="title-anchor"
        :href="'#' + title"
      >
        {{ title }}
      </a>
    </h3>
    <div class="desc-content">
      <slot />
    </div>
    <!-- /.desc-content -->
    <div
      class="source-view"
      :class="['-' + layout]"
      :style="sourceStyle"
    >
      <div class="view-running">
        <component :is="example" />
      </div>
      <div
        class="view-code"
        :class="{'-scrollable': !showCaptor}"
        @mouseleave="e => { showCaptor = true }"
      >
        <codemirror
          :value="code"
          :options="codeOptions"
        />
        <div
          class="code-scroll-captor"
          :class="{'-hidden': showCaptor === false}"
          @click="e => { showCaptor = false }"
        />
      </div>
    </div>
    <!-- /.source-view -->
  </section>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/vue/vue.js'
import 'codemirror/theme/mbo.css'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/selection/mark-selection.js'
import 'codemirror/addon/search/searchcursor.js'

// foldGutter
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/xml-fold.js'

export default {
  name: 'ComponentDescription',
  components: {
    codemirror: codemirror
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    example: {
      type: [Object, Function],
      default () {
        return {}
      }
    },
    layout: {
      type: String,
      default: 'horizontal',
      validator (val) {
        return ['horizontal', 'vertical'].includes(val)
      }
    },
    code: {
      type: String,
      default: undefined
    },
    sourceStyle: {
      type: [Object, Array, String],
      default: undefined
    }
  },
  data () {
    return {
      showCaptor: true,
      codeOptions: {
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        foldGutter: true,
        styleSelectedText: true,
        mode: 'text/javascript',
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: 'mbo',
        hintOptions: {
          completeSingle: false
        }
      }
    }
  }
}
</script>

<style lang="scss">
section.component-description {
  margin-bottom: 60px;
  position: relative;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: $c-text;
    .title-anchor:before {
      color: $primary;
      content: '# ';
      display: inline;
    }
  }
  .desc-content {
    padding: 0 0 $gap 0;
  }
  .source-view {
    height: 300px;
    position: relative;
    display: flex;
    align-items: stretch;
    justify-items: stretch;
    background-color: rgba(0, 0, 0, .1);
    box-shadow: 0 15px 22px rgba(0, 0, 0, .1), 0 3px 5px rgba(0, 0, 0, .1);
    box-sizing: content-box;
    &.-horizontal {
      flex-direction: row;
    }
    &.-vertical {
      flex-direction: column;
      max-width: 60vw;
    }
    .view-running {
      height: 100%;
      flex: 1 1 500px;
    }
    .view-code {
      flex: 1 1 500px;
      position: relative;
      height: 100%;
      &.-scrollable .vue-codemirror {
        overflow: auto;
      }
      .vue-codemirror {
        overflow: hidden;
        height: 100%;
      }
      .code-scroll-captor {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .15);
        z-index: 2;
        top: 0;
        left: 0;
        transition: .3s ease-out all;
        &.-hidden {
          pointer-events: none;
          opacity: 0;
        }
      }
      .CodeMirror {
        height: 100%;
        .CodeMirror-line {
          white-space: pre-wrap;
        }
      }
    }
  }
}
</style>
