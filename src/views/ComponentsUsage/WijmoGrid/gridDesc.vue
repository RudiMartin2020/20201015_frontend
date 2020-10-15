<template>
  <component-panel
    title="Methods"
    class="wijmo-grid-example"
  >
    <component-panel
      title="Grid Info"
      class="add-grid-desc"
    >
      <sk-grid
        ref="grid"
        :items-source.sync="data3"
        :columns="columns"
        :initial-focus="false"
        :use-checkbox="true"
        @initialized="gridInitialized"
      />
      <span class="grid-desc">100건 조회 되었습니다.</span>
    </component-panel>
    <component-panel
      title="Grid Warning"
      class="add-grid-desc"
    >
      <sk-grid
        ref="grid"
        :items-source.sync="data3"
        :columns="columns"
        :initial-focus="false"
        :use-checkbox="true"
        @initialized="gridInitialized"
      />
      <span class="grid-desc warning">100건 조회 되었습니다.</span>
    </component-panel>
    <component-panel
      title="Grid Error"
      class="add-grid-desc"
    >
      <sk-grid
        ref="grid"
        :items-source.sync="data3"
        :columns="columns"
        :initial-focus="false"
        :use-checkbox="true"
        @initialized="gridInitialized"
      />
      <span class="grid-desc error">100건 조회 되었습니다.</span>
    </component-panel>
    <br>
    <b-collapse
      :open="true"
      aria-id="gridGetMethods"
    >
      <b-button
        type="is-dark"
        slot="trigger"
        aria-controls="gridGetMethods"
      >
        샘플 코드 보기
      </b-button>
      <prism-editor
        v-model="getMethos"
        ref="prism"
        language="js"
        :line-numbers="true"
        :auto-style-line-numbers="true"
        class="my-editor"
        readonly
      />
    </b-collapse>
  </component-panel>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import PrismEditor from 'vue-prism-editor'
import 'prismjs/themes/prism.css'

let getMethos =
` <component-panel
    title=""
    class="add-grid-desc"
  >
    <sk-grid
      ref="grid"
      :items-source.sync="data3"
      :columns="columns"
      :initial-focus="false"
      :use-checkbox="true"
      @initialized="gridInitialized"
    />
    <span class="grid-desc">100건 조회 되었습니다.</span>
  </component-panel>
  <component-panel
    title=""
    class="add-grid-desc"
  >
    <sk-grid
      ref="grid"
      :items-source.sync="data3"
      :columns="columns"
      :initial-focus="false"
      :use-checkbox="true"
      @initialized="gridInitialized"
    />
    <span class="grid-desc warning">100건 조회 되었습니다.</span>
  </component-panel>
  <component-panel
    title=""
    class="add-grid-desc"
  >
    <sk-grid
      ref="grid"
      :items-source.sync="data3"
      :columns="columns"
      :initial-focus="false"
      :use-checkbox="true"
      @initialized="gridInitialized"
    />
    <span class="grid-desc error">100건 조회 되었습니다.</span>
  </component-panel>

  ex: 유동적으로 사용 값을 변경하고 싶은 경우
  // vue파일
  <sk-grid
      ref="grid"
      :items-source.sync="data3"
      :columns="columns"
      :initial-focus="false"
      :use-checkbox="true"
      @initialized="gridInitialized"
    />
    // Input Data는 data()에 정의된 변수
    <span id="gridDesc" class="grid-desc error">{{ inputData }}</span>
  </component-panel>

  //scirpt.js
  1.data()에 inputData: '', 변수 추가
  2. warning로 아이콘 변경할경우 아래의 코드로 Class를 변경해줌.
    document.getElementById('gridDesc').className = 'grid-desc warning'

  3. 조회건수를 넣을경우
    this.inputData = '10건이 조회되었습니다.'
    // MES경우(다국어 추가버전)
    this.inputData = '10' + this.$t('mes.MESSAGE.I033')
`

export default {
  name: 'GridProperties',
  components: {
    VueJsonPretty,
    PrismEditor
  },
  computed: {

  },
  methods: {

  },
  data () {
    return {
      rows: '',
      data3: [
        { column1: 'row1_c1', column2: 'row1_c2', column3: 'row1_c3' },
        { column1: 'row2_c1', column2: 'row2_c2', column3: 'row2_c3' }
      ],
      columns: [
        { label: 'column1', binding: 'column1' },
        { label: 'column2', binding: 'column2' },
        { label: 'column3', binding: 'column3' }
      ],
      getMethos: getMethos,
      itemsSourceCollection: []
    }
  }
}
</script>

<style lang="scss">
.wijmo-grid-example {
  .panel-body {
    padding: $gap;
  }
  .add-grid-desc {
    height:200px;
    margin-bottom:10px;
    border:1px solid $c-line;
    border-radius:12px;
  }
}
</style>
