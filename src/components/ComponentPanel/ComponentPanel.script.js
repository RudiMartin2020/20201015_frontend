export default {
  name: 'component-panel',
  props: {
    title: {
      type: String,
      default: '',
      required: false
    },
    useHeader: {
      type: Boolean,
      default: true
    },
    useFooter: {
      type: Boolean,
      default: false
    },
    multiRowHeader: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    usePin: {
      type: Boolean,
      default: false
    },
    payload: {
      type: [Object, Array, String, Number, Boolean],
      default () {
        return {}
      }
    }
  },
  computed: {
    isPinned () {
      return this.$store.getters['dashboard:is-pinned'](this.name)
    }
  },
  methods: {
    /**
     * 패널을 확장/축소 합니다.
     * @param {Boolean} val true: 패널 확장. false: 패널 축소
     */
    expandPanel (val = null) {
      val = (val === null) ? !this.expanded : val
      this.expanded = val
      this.$emit('resized', this.expanded ? 'EXPANDED' : 'COLLAPSED')
      // console.log('@expandPanel')
    },
    style () {
      // let appBody = this.$store.state.ui.appBody
      // console.dir(appBody)
      return {}
      // if (!this.expanded) return {}
    },
    pinToDashboard () {
      this.$store.dispatch('dashboard:pin-panel', {
        name: this.name,
        payload: this.payload
      })
      console.log(this.name, this.payload)
    }
  },
  data () {
    return {
      expanded: false
    }
  }
}
