import Tree from './Tree/Tree'
import SkGrid from './Grid/SkGrid'
import SkGrid2 from './Grid2/SkGrid'
import SkChart from './Chart/SkChart'
import SkFoldable from './Foldable/SkFoldable'
import SkToggle from './Toggle/SkToggle'
const SkComp = {
  install (Vue, options) {
    Vue.component('sk-tree', Tree)
    Vue.component('sk-grid', SkGrid2)
    Vue.component('sk-grid-org', SkGrid)
    Vue.component('sk-grid2', SkGrid2)
    Vue.component('sk-chart', SkChart)
    Vue.component('sk-foldable', SkFoldable)
    Vue.component('sk-toggle', SkToggle)
  }
}

export default SkComp
