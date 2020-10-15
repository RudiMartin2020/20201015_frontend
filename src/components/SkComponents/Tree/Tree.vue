<script>
import _ from 'lodash'

export default {
  name: 'SkTree',
  props: {
    options: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    draggable: {
      type: Boolean,
      default: false
    },
    dropMode: {
      type: String,
      default: 'MOVE' // COPY
    },
    dropConfirm: {
      type: Function,
      default () {
        return true
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    prohibitedClasses: {
      type: Array,
      default () {
        return ['node-detail']
      }
    },
    indent: {
      type: Number,
      default: 10
    },
    useCheckbox: {
      type: Boolean,
      default: false
    },
    collapseAll: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    search: {
      type: String,
      default: ''
    },
    useFilter: { // isMatched: true인 친구들만 표시할건가유
      type: Boolean,
      default: false
    },
    nodeClass: {
      type: Array,
      default () {
        return []
      },
      validator (value) {
        for (let i = 0; i < value.length; i++) {
          if (typeof value[i] !== 'string') return false
        }
        return true
      }
    }
  },
  watch: {
    search (newval) {
      this.searchString(newval)
    },
    filter (newval) {
      this.filtering(newval)
    },
    data (newval) {
      this.initTree(newval)
    }
  },
  computed: {
    appliedOptions () {
      const defaultOptions = {
        nodeArrowClass: false, // String. children이 있는 node에 표시될 아이콘의 클래스
        nodeDashClass: false // String. children이 없는 node에 표시될 아이콘의 클래스
      }
      return Object.assign(defaultOptions, this.options)
    }
  },
  render (h) {
    /**
     * node를 렌더링 합니다.
     * @param {Object} node 렌더링할 노드 아이템. { title: '', children: []}
     * @param {Number} lavel 렌더링하는 노드의 레벨.
     * @param {Object} parent 부모 노드
     */
    const renderNode = (node, level = 0, index = 0, parent = {}) => {
      // console.log('@renderNode', node, level)
      let cls = node.class || '-node'
      let isCollapsed = node.isCollapsed ? '-collapsed' : '-opened'
      let isChecked = node.isChecked ? 'checked' : ''
      let isActive = node.isActive ? '-active' : '-inactive'
      node.isMatched = node.isMatched !== false
      node.parent = parent
      node.index = index
      node.level = level

      if (this.useFilter) {
        if (!node.isMatched) return null
      }

      let nodeCheckbox = (
        <input
          class="node-checkbox"
          type="checkbox"
          // v-model={node.isChecked}
          checked={isChecked}
          onChange={() => this.toggleChecked(node)}
        />
      )

      /**
       * 트리의 노드 타이틀 좌측에 펴시되는 [>] 확살표. 자식이 있으면 표시됨.
       */
      let nodeArrow = (
        <span
          class={['node-arrow', this.appliedOptions.nodeArrowClass]}
          onClick={() => this.toggleNode(node)}
        >
          {!this.appliedOptions.nodeArrowClass && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="arrow-main">
              <polygon class="arrow-path" points="10 7 10 17 15 12"></polygon>
            </svg>
          )}
        </span>
      )

      /**
       * 트리 노드의 타이틀 좌측에 표시되는 [-] 아이콘. 자식이 없으면 표시됨.
       */
      let nodeDash = (
        <span class={['node-dash', this.appliedOptions.nodeDashClass]}>
          {!this.appliedOptions.nodeDashClass && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="dash-main">
              <path class="dash-path" d="M11 10h4v2h-4z" />
            </svg>
          )}
        </span>
      )

      /**
       * node의 click 메소드가 설정되어 있다면 clickable 클래스를 설정합니다.
       */
      let clickable = (node.click) ? '-clickable' : '-unclickable'
      let nodeTitle = (
        <div class={['node-title', clickable]}>
          {node.children && node.children.length ? nodeArrow : nodeDash}
          {this.useCheckbox && nodeCheckbox}
          <span
            class="title-string"
            onClick={(e) => this.clickNodeTitle(e, node)}
          >
            {node.title}
          </span>
        </div>
      )

      let columnSlot = (column) => {
        if (this.$scopedSlots[column.field]) {
          return (
            <div class="column-body">
              {
                this.$scopedSlots[column.field]({
                  'node': node
                })
              }
            </div>
          )
        }
      }

      let dropZone = (node, cls) => {
        let zone = {
          node: node,
          active: false,
          cls: cls,
          dragItem: this.onDragItem
        }
        if (this.onDrag && (node.droppable !== false)) {
          return (
            <div
              class={['node-dropzone', cls]}
              on-dragenter={e => this.dragEnter(e, zone)}
              on-dragleave={e => this.dragLeave(e, zone)}
              on-dragover={e => this.dragOver(e, zone)}
              on-drop={e => this.drop(e, zone)}
            />
          )
        }
      }

      let nodeDetail = (node) => {
        if (this.$scopedSlots.nodeDetail) {
          return (
            <div
              class="node-detail"
              draggable="false"
              on-dragstart={e => this.stopEvent(e)}
              on-drag={e => this.stopEvent(e)}
            >
              {
                this.$scopedSlots['nodeDetail']({
                  'node': node
                })
              }
            </div>
          )
        }
      }

      /**
       * node Children을 제외한 상단, 타이틀, > 표시, 그리고 컬럼 사용시 컬럼을 표현할 부분을 렌더링합니다.
       */
      let nodeHeader = (node) => {
        if (!this.columns.length) {
          return (
            <div
              class="node-header"
              style={{ 'padding-left': this.indent * level + 'px' }}
            >
              {dropZone(node, '-top')}
              {dropZone(node, '-bottom')}
              {dropZone(node, '-center')}
              <div
                class="header-body"
              >
                {nodeTitle}
              </div>
            </div>
          )
        } else {
          return (
            <div
              class="node-header"
            >
              {dropZone(node, '-center')}
              {dropZone(node, '-top')}
              {dropZone(node, '-bottom')}
              <div
                class="header-body"
              >
                {
                  this.columns.map((column, index) => {
                    let columnClass = column.class || column.field
                    let columnDefaultWidth = Math.round(100 / this.columns.length) + '%'
                    if (index === 0) {
                      return (
                        <div
                          class={['tree-column', columnClass]}
                          style={{
                            'flex-basis': column.width || columnDefaultWidth,
                            'max-width': column.width || 'auto',
                            'min-width': column.width || 'auto',
                            'padding-left': this.indent * level + 'px'
                          }}
                        >
                          {nodeTitle}
                        </div>
                      )
                    } else {
                      return (
                        <div
                          class={['tree-column', columnClass]}
                          style={{
                            'flex-basis': column.width || columnDefaultWidth,
                            'max-width': column.width || 'auto',
                            'min-width': column.width || 'auto'
                          }}
                        >
                          {columnSlot(column)}
                        </div>
                      )
                    }
                  })
                }
              </div>
              {nodeDetail(node)}
            </div>
          )
        }
      }

      let nodeChildren
      if (node.children && node.children.length) nodeChildren = (renderChildren(node.children, level, node))
      let nodeHasChildren = (node.children && node.children.length) ? '-is-family' : '-is-single'

      return (
        <li
          class={[
            'tree-node',
            ...this.nodeClass,
            { '-is-not-matched': node.isMatched === false },
            'level-' + node.level,
            cls,
            nodeHasChildren,
            isCollapsed,
            isActive
          ]}
          data-level={level}
          draggable={this.draggable ? 'true' : 'false'}
          on-drag={e => this.drag(e, node)}
          on-dragstart={e => this.dragStart(e, node)}
        >
          {nodeHeader(node)}
          {nodeChildren}
        </li>
      )
    }

    /**
     * node가 children을 가지고 있다면, ul을 생성하고 자식들을 추가합니다.
     * @param {Array} node node의 children 정보
     * @param {Number} level node의 children의 parent의 level 정보
     * @param {Object} parent 부모 노드 정보
     */
    const renderChildren = (node = [], level = 0, parent) => {
      // console.log('@renderChildren.children:', node)
      level = level + 1
      return (
        <ul
          class='node-children'
        >
          { node.map((item, index) => renderNode(item, level, index, parent)) }
        </ul>
      )
    }

    let useSearch = (this.search.length > 0) ? '-use-search' : null

    /** Tree Columns가 지정되어있었을 때 테이블처럼 트리 헤더를 표시합니다. */
    const renderHeader = () => {
      if (!this.columns.length) return
      return (
        <ul class="tree-header">
          {
            this.columns.map(column => {
              return (
                <li
                  class={['tree-column', column.class || column.field]}
                  style={{
                    'flex-basis': column.width || 'auto',
                    'max-width': column.width || 'auto',
                    'min-width': column.width || 'auto'
                  }}
                >
                  {column.label}
                </li>
              )
            })
          }
        </ul>
      )
    }

    return (
      <div
        class={['sk-tree', useSearch]}
        on-dragend={e => this.dragEnd(e)}
      >
        { this.$slots.header }
        { renderHeader() }
        {
          this.appliedData.map((node, index) => renderNode(node, 0, index, {
            children: this.appliedData
          }))
        }
      </div>
    )
  },
  mounted () {
    // console.log('SK-TREE MOUNTED')
    this.initTree(this.data)
    this.$root.$on('sk-tree:drag-start', item => {
      this.onDragItem = item
      this.onDrag = true
    })
    this.$root.$on('sk-tree:drag-end', item => {
      this.onDragItem = undefined
      this.onDrag = false
    })
  },
  methods: {
    /**
     * Tree를 초기화 합니다
     * @param {Array} nodes [{title: '제목', children: [...]}]
     */
    initTree (nodes) {
      this.appliedData = []
      nodes.forEach(node => {
        this.appliedData.push(this.parseNode(node))
      })
      this.$forceUpdate()
    },

    /**
     * node의 모든 하위 node에 data에 지정한 key/value를 설정합니다.
     * @param {Object} nodes 단일 node를 받습니다.
     * @param {Object} obj node에 할당할 data
     * @param {Boolean} propagation 자식 노드들에도 해당 obj를 적용할지 여부
     */
    setObjToNode (
      node = {},
      obj = {},
      propagation = true
    ) {
      for (let key in obj) {
        node[key] = obj[key]
      }
      if (propagation) this.setObjToNodes(node.children, obj, propagation)
      this.$forceUpdate()
    },

    /**
     * nodes의 모든 하위 node에 data에 지정한 key/value를 설정합니다.
     * @param {Array} nodes node 배열
     * @param {Object} obj node에 할당할 data
     * @param {Boolean} propagation nodes의 자식 노드들에도 해당 obj를 적용할지 여부
     */
    setObjToNodes (
      nodes = [],
      obj = {},
      propagation = true
    ) {
      nodes.forEach(node => {
        for (let key in obj) {
          node[key] = obj[key]
        }
        if (node.children && propagation) {
          this.setObjToNodes(node.children, obj, propagation)
        }
      })
    },

    /**
     * 노드의 특정 값이 검색조건과 일치하는지를 체크합니다.
     * @param {Object} node 검색을 실행할 node 객체
     * @param {Object} obj 검색조건 {isChecked: true}
     * @param {Boolean} isAnd AND검색인지? false면 OR 조건으로 검색
     * @param {Array} result 현재까지 검색완료된 결과를 담는 객체
     * @param {Boolean} propagation 이 검색조건을 하위 노드에서도 실행할지 여부
     */
    getObjFromNode (
      node = {},
      obj = {},
      result = [],
      isAnd = true,
      propagation = true
    ) {
      if (isAnd) {
        let flag = true
        for (let key in obj) {
          if (node[key] !== obj[key]) flag = false
        }
        if (flag) result.push(node)
      } else {
        for (let key in obj) {
          if (node[key] === obj[key]) {
            result.push(node)
          }
        }
      }
      if (node.children && propagation) {
        this.getObjFromNodes(node.children, obj, result, isAnd, propagation)
      }
      return result
    },

    /**
     * 노드들의 특정 값이 검색조건과 일치하는지를 체크합니다.
     * @param {Object} node 검색을 실행할 node 객체
     * @param {Object} obj 검색조건 {isChecked: true}
     * @param {Boolean} isAnd AND검색인지? false면 OR 조건으로 검색
     * @param {Array} result 현재까지 검색완료된 결과를 담는 객체
     * @param {Boolean} propagation 이 검색조건을 하위 노드에서도 실행할지 여부
     */
    getObjFromNodes (
      nodes = [],
      obj = {},
      result = [],
      isAnd = true,
      propagation = true
    ) {
      nodes.forEach(node => {
        this.getObjFromNode(node, obj, result, isAnd, propagation)
      })
      return result
    },

    /**
     * 노드의 특정 값이 검색조건과 일치하는지를 체크합니다.
     * @param {Object} node 검색을 실행할 node 객체
     * @param {Function} condition param: node
     * @param {Array} result 현재까지 검색완료된 결과를 담는 객체
     * @param {Boolean} propagation 이 검색조건을 하위 노드에서도 실행할지 여부
     */
    getConditionFromNode (
      node = {},
      condition = () => true,
      matched = [],
      notMatched = [],
      propagation = true
    ) {
      if (condition(node)) {
        matched.push(node)
      } else {
        notMatched.push(node)
      }
      if (node.children && propagation) {
        this.getConditionFromNodes(node.children, condition, matched, notMatched, propagation)
      }
      return {
        matched: matched,
        notMatched: notMatched
      }
    },

    /**
     * 노드의 특정 값이 검색조건과 일치하는지를 체크합니다.
     * @param {Object} node 검색을 실행할 node들
     * @param {Function} condition param: node
     * @param {Array} result 현재까지 검색완료된 결과를 담는 객체
     * @param {Boolean} propagation 이 검색조건을 하위 노드에서도 실행할지 여부
     */
    getConditionFromNodes (
      nodes = [],
      condition = () => true,
      matched = [],
      notMatched = [],
      propagation = true
    ) {
      nodes.forEach(node => {
        this.getConditionFromNode(node, condition, matched, notMatched, propagation)
      })
      return {
        matched: matched,
        notMatched: notMatched
      }
    },

    parseNode (node = {}) {
      node.isCollapsed = node.isCollapsed ? node.isCollapsed : this.collapseAll
      node.isActive = node.isActive ? node.isActive : false
      if (this.useCheckbox) {
        node.isChecked = node.isChecked || false
      }
      let parsedChildren = []
      if (node.children) {
        node.children.forEach(child => {
          parsedChildren.push(this.parseNode(child))
        })
        node.children = parsedChildren
      }
      return node
    },
    toggleNode (node = {}) {
      node.isCollapsed = !node.isCollapsed
      this.$forceUpdate() // node-children 관계가 복잡하므로 걍 forceUpdate 합니다.
    },
    toggleChecked (node = {}) {
      this.setObjToNodes([node], { isChecked: !node.isChecked })
      this.$forceUpdate()
      /* let setChildCheckboxes = (children = [], value = false) => {
        children.forEach(child => {
          child.isChecked = value
          if (child.children) {
            setChildCheckboxes(child.children, value)
          }
        })
      }
      node.isChecked = !node.isChecked
      setChildCheckboxes(node.children, node.isChecked)
      // console.log(node)
      this.$forceUpdate() */
    },
    searchString (str) {
      let string = new RegExp(str, 'i')
      let searchNode = (node) => {
        // console.log('searchNode:', node.title.match(string))
        node.isMatched = node.title.match(string) !== null
        // console.log('searchNode.node:', node)
        if (node.children) {
          node.children.forEach(item => {
            searchNode(item)
          })
        }
      }
      this.data.forEach(node => {
        searchNode(node)
      })
      this.$forceUpdate()
    },
    filtering (condition = this.filter) {
      let result = this.getConditionFromNodes(this.data, condition)
      result.matched.forEach(node => {
        node.isMatched = true
      })
      result.notMatched.forEach(node => {
        node.isMatched = false
      })
      this.$forceUpdate()
    },
    clickNodeTitle (e = {}, node = {}) {
      this.setObjToNodes(this.appliedData, { isActive: false })
      node.isActive = true
      this.$forceUpdate()
      this.$emit('node-click', e, node)
      if (node.click) {
        node.click(e, node)
      }
    },
    hasProhibitedEl (els) {
      for (let i in els) {
        let el = els[i]
        let classNames = el.className.split(' ')
        let intersection = _.intersection(classNames, this.prohibitedClasses)
        if (intersection.length) {
          console.log('intersection', intersection)
          return true
        }
      }
      return false
    },
    open () {
      console.log('트리 오픈')
    },
    collapse () {
      console.log('트리 컬랩스')
    },
    select () {
      console.log('트리 선택')
    },
    stopEvent (e) {
      console.log('스탑!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', e)
      e.preventDefault()
      e.stopPropagation()
    },
    dragStart (e, node) {
      // console.log('@dragStart', e, node)
      e.stopPropagation()
      let currentEls = document.elementsFromPoint(e.clientX, e.clientY)
      if (this.hasProhibitedEl(currentEls)) {
        e.preventDefault()
      } else {
        this.onDrag = true
        this.onDragItem = node
        this.setObjToNode(node, { droppable: false })
        this.$emit('drag-start', e, this.onDragItem)
        this.$root.$emit('sk-tree:drag-start', this.onDragItem)
      }
      // this.$forceUpdate()
    },
    dragEnd (e) {
      // console.log('@dragEnd', e)
      e.preventDefault()
      e.stopPropagation()
      this.setObjToNodes(this.appliedData, { droppable: true })
      this.$emit('drag-end', e, this.onDragItem)
      this.onDrag = false
      this.onDragItem = undefined
      this.$root.$emit('sk-tree:drag-end', this.onDragItem)
    },
    drag (e) {
      e.stopPropagation()
      // console.log('@drag', e)
      this.$emit('drag', e, this.onDragItem)
    },
    dragOver (e, zone) {
      e.preventDefault()
      this.$emit('drag-over', e, zone)
    },
    dragEnter (e, zone) {
      e.stopPropagation()
      zone.active = true
      e.target.className += ' -active'
      // console.log('@dragEnter', zone.node.title, zone.cls, zone.active, e.target.className)
      this.$emit('drag-enter', e, zone)
    },
    dragLeave (e, zone) {
      e.stopPropagation()
      // console.log('@dragLeave', zone.node.title)
      let classes = e.target.className.split(' ')
      let activeIndex = classes.indexOf('-active')
      classes.splice(activeIndex, 1)
      e.target.className = classes.join(' ')
      zone.active = false
      this.$emit('dragLeave', e, zone)
    },
    async drop (e, zone) {
      e.preventDefault()
      this.$emit('drop', e, zone)
      let confirmed = await this.dropConfirm(e, zone)
      if (confirmed) {
        // dragItem을 원래 부모로부터 삭제
        if (this.dropMode === 'MOVE') this.onDragItem.parent.children.splice(this.onDragItem.index, 1)

        // drop한 위치에 맞게 dragItem을 추가
        console.log('@drop::', zone.node.parent)
        if (zone.cls === '-top') {
          this.onDragItem.parent = zone.node.parent
          if (!zone.node.parent.children) zone.node.parent.children = []
          zone.node.parent.children.splice(zone.node.index, 0, this.onDragItem)
        }
        if (zone.cls === '-center') {
          let children = zone.node.children || []
          this.onDragItem.parent = zone.node
          zone.node.children = [...children, this.onDragItem]
        }
        if (zone.cls === '-bottom') {
          this.onDragItem.parent = zone.node.parent
          if (!zone.node.parent.children) zone.node.parent.children = []
          zone.node.parent.children.splice(zone.node.index + 1, 0, this.onDragItem)
        }
        this.$forceUpdate()
      }
      this.onDrag = false
      this.onDragItem = undefined
    }
  },
  data () {
    return {
      appliedData: [],
      onDrag: false,
      onDragItem: undefined
    }
  }
}
</script>
<style src="./Tree.style.scss" lang="scss" />
