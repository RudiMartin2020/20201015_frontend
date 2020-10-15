import SideNav from '@/components/SideNav/SideNav'
import AppState from '@/components/AppState/AppState'
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'Home',
    components: {
        'side-nav': SideNav,
        'app-state': AppState
    },
    created() {
        //        this.$store.dispatch('socketConnect')
    },
    mounted() {
        this.$store.dispatch('setAppBody', this.$refs.appBody)
        let self = this
            /*
                    this.interval = setInterval(function() {
                        if (self.$store.getters['socket:isConnected']) {
                            self.$store.dispatch('alarmSocketConnect')
                            clearInterval(self.interval)
                        }
                    }, 500)
            */
            //this.$store.dispatch('getUserInfo')
            //this.$store.dispatch('getPrograms')
            //this.$store.dispatch('getApis')
    },
    computed: {
        formattedRequestDate: function() {
            return this.$store.getters.formattedRequestDate()
        },
        ...mapState({
            sideNavExpanded: state => state.ui.sideNavExpanded
        }),
        ...mapGetters([
            'refreshRouter'
        ])
    },
    methods: {
        refresh() {
            this.$store.commit('setRefreshRouter', true)
            this.$nextTick(() => {
                this.$store.commit('setRefreshRouter', false)
            })
        }
    },
    data() {
        return {
            theme: 'dark',
            interval: undefined
        }
    }
}