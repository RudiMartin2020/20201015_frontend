<template>
  <b-modal
    has-modal-card
    trap-focus
    :active.sync="isVisible"
  >
    <div
      class="modal-card"
      style="width: 800px"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ title }}
        </p>
      </header>
      <section class="modal-card-body">
        <b-collapse
          class="card"
          :open.sync="isOpen"
          aria-id="contentIdForA11y3"
        >
          <div
            slot="trigger"
            slot-scope="props"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              Detail
            </p>
            <a class="card-header-icon">
              <b-icon
                :icon="props.open ? 'menu-down' : 'menu-up'"
              />
            </a>
            <p class="card-header-title">
              {{ message }}
            </p>
            <a class="card-header-icon">
              <b-icon
                :icon="props.open ? 'menu-down' : 'menu-up'"
              />
            </a>
          </div>
          <div class="card-content">
            <div class="content">
              className: {{ className }}
              <br>
              methodName: {{ methodName }}
              <br>
              lineNumber: {{ lineNumber }}
            </div>
          </div>
        </b-collapse>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-primary"
          type="button"
          @click="hide"
        >
          확인
        </button>
      </footer>
    </div>
  </b-modal>
</template>

<script>

export default {
  name: 'ResponseError',
  props: {
    title: {
      type: String,
      default: 'Error'
    },
    message: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    methodName: {
      type: String,
      default: ''
    },
    lineNumber: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isVisible (value) {
      if (!value) {
        this.$parent.close()
      }
    }
  },
  data () {
    return {
      isVisible: this.visible,
      isOpen: false
    }
  },
  methods: {
    hide () {
      this.isVisible = false
      this.$parent.close()
    }
  }
}
</script>
