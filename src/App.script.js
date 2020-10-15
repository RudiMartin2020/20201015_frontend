import SideNav from '@/components/SideNav/SideNav'
import AppState from '@/components/AppState/AppState'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    'side-nav': SideNav,
    'app-state': AppState
  },
  mounted () {
    this.$store.dispatch('setAppBody', this.$refs.appBody)
  },
  computed: {
    ...mapState({
      sideNavExpanded: state => state.ui.sideNavExpanded
    })
  },
  methods: {},
  data () {
    return {
      theme: 'dark'
    }
  }
}
