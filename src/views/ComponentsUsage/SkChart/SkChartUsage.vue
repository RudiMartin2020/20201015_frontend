<template>
  <section class="usage-sk-chart">
    <component-panel
      title="SK-Chart 사용법"
      class="chart-usage"
    >
      <div class="chart-usage-content">
        <comp-desc
          title="Display Method"
          :example="skChartDisplayMethod"
          :code="skChartDisplayMethodCode"
        >
          <p>
            <pre>display-method</pre> 속성을 이용하면 특정 시리즈의 value를 기준으로 시리즈를 분리할 수 있습니다. 일반적으로 wijmo chart에서는 Collection의 Object에 담긴 하나의 key가 하나의 시리즈를 대표합니다:
          </p>
          <pre>[
  { date: 1997.08.01, korea: 10 },
  { date: 1997.08.02, france: 12 },
  { date: 1997.08.03, korea: 11 },
  { date: 1997.08.04, france: 10 },
]</pre>
          <p>
            위 데이터의 경우 y축은 10 - 12 사이의 값, x축은 date를 표시하며, korea와 france라는 두개의 시리즈를 표시합니다.
          </p>
          <p>
            그러나 어떤 경우에는 이런 데이터를 하나의 라인에 korea와 france의 변화치를 모두 담으려 하는 경우도 있습니다.
          </p>
          <pre>[
  { date: 1997.08.01, value: 10, name: 'korea' },
  { date: 1997.08.02, value: 12, name: 'france' },
  { date: 1997.08.03, value: 11, name: 'korea' },
  { date: 1997.08.04, value: 10, name: 'france' }
]</pre>
          <p>
            위와 같은 데이터를 하나의 라인으로 표시하되, korea, france등의 특정 value로 필터링 하는것으로 시리즈를 구분하려 할 때 이 속성을 사용합니다.
          </p>
          <p>그러나 <pre>sk-chart</pre>는 후자와 같은 데이터는 올바르게 표시할 수 없습니다. 따라서 후자의 데이터도 전자와 같은 형태로 파싱하고, 구분하려고 하는 전체 시리즈의 목록을 array 형태로 전달해야만 합니다</p>
        </comp-desc>

        <comp-desc
          title="기본 사용법"
          :example="skChartBasic"
          :code="skChartBasicCode"
        >
          <p>
            다음과 같은 코드를 이용해 간단하게 화면에 챠트를 표현 할 수 있습니다.
            <pre>items-source</pre> 속성에 Vue Component의 <pre>data</pre>에 정의된 Collection 을 바인딩하여 시리즈를 표기합니다.
          </p>
          <p>
            또한 대부분의 <pre>sk-chart</pre> 컴포넌트는 <pre>wj-flex-chart-series </pre> 컴포넌트를 포함합니다. 각각의 <pre>wj-flex-chart-series </pre>는 각각 하나의 시리즈를 대변합니다. <pre>wj-flex-chart-series </pre>의 <pre>binding</pre> 속성에 Collection의 key를 지정하여 해당 값을 표기합니다.
          </p>
        </comp-desc>

        <comp-desc
          title="Chart Type"
          :example="skChartType"
          :code="skChartTypeCode"
          :source-style="{'height': '1200px'}"
        >
          <p>
            기본 형태는 컬럼 타입이지만, sk-chart 태그의 <pre>chart-type</pre> 속성을 수정해 다양한 형태의 챠트를 표시할 수 있습니다. 사용 가능한 형태는 <a href="https://www.grapecity.com/wijmo/api/enums/wijmo_chart.charttype.html">Wijmo ChartType Enum</a> 에서 확인할 수 있습니다.
          </p>
        </comp-desc>

        <comp-desc
          title="Binding X"
          :example="skChartBindingX"
          :code="skChartBindingXCode"
          :source-style="{'height': '400px'}"
        >
          <p>
            <pre>sk-chart</pre>의 <pre>binding-x</pre>속성을 이용해 collection의 특정 프로퍼티를 x축의 기준 값으로 설정할 수 있습니다.
          </p>
          <p>
            문제는 이 값이 날짜인가, 혹은 단순한 순서 혹은 특정인의 이름 등의 여러가지 타입일 수 있다는 점입니다.
          </p>
          <p>
            이를 해결하기 위해 <pre>sk-chart</pre>에서는 <pre>binding-x-type</pre>이라는 속성을 추가로 지정할 수 있게 하였습니다. <pre>binding-x-type</pre>은 <pre>NUMBER, DATE, STRING</pre>등의 값을 받을 수 있습니다. 기본값은 <pre>DATE</pre>이므로 따로 <pre>binding-x-type</pre>을 설정하지 않으면 <pre>sk-chart</pre>는 <pre>binding-x</pre>에 지정된 값이 모두 날짜라고 간주합니다. 따라서 모든 숫자를 UNIX millisecond timestamp로 간주합니다.
          </p>
        </comp-desc>

        <comp-desc
          title="Chart Zoom / Raw Data popup"
          :example="skChartZoom"
          :code="skChartZoomCode"
          :source-style="{'height': '600px'}"
        >
          <p>
            <pre>use-zoom</pre>속성을 이용해 차트의 줌 기능의 사용 유무를 설정할 수 있습니다. 기본값은 true 입니다. zoom 기능을 사용할 경우 우클릭 메뉴의 '줌 초기화' 를 이용해 줌을 초기화 할 수 있습니다. 또한 <pre>minimum-zoom-distance</pre> 속성으로 줌 가능 최소 영역을 지정할 수 있습니다. 단순한 클릭만으로도 챠트가 줌이 되는것을 방지하기 위한 것으로 기본값은 <pre>30</pre> 입니다.
          </p>
          <p>
            한편, <pre>Ctrl</pre>혹은 <pre>Cmd</pre> 키를 누르고 드래그를 시작한다면 선택한 영역의 Raw Data를 표시하는 모달창을 띄울 수도 있습니다. <pre>use-raw-data-popup</pre> 속성이 <pre>true</pre>일 경우 동작합니다. 기본값은 <pre>true</pre> 입니다.
          </p>
          <p>
            Chart의 Raw Data는 <pre>sk-grid</pre>를 이용하여 표시됩니다. sk-grid의 모든 기능이 바인딩되어있지는 않습니다. 다만, <pre>wj-flex-grid</pre>를 사용할 때와 마찬가지로, initialized시 grid 객체와, chart에서 사용되는 sk-grid 컴포넌트를 가져올 수 있습니다. <pre>raw-data-grid-initialized</pre>속성에 method를 바인당하여 해당 method가 실행되게 할 수 있습니다. 예제에서는 grid가 initialized 된 1초 후에 임의의 데이터를 가진 row를 추가합니다.
          </p>
        </comp-desc>

        <comp-desc
          title="Aggregation"
          :example="skChartAggregation"
          :code="skChartAggregationCode"
          :source-style="{'height': '800px'}"
          layout="horizontal"
        >
          <p>
            <pre>sk-chart</pre>에서는 Frontend에서 동적으로 aggregation 계산을 수행할 수 있습니다. 우클릭 메뉴의 <pre>Aggregation</pre>을 통해서도 가능하지만, <pre>sk-chart</pre>의 속성 설정을 통해서도 가능합니다.
          </p>
          <p>
            Aggregation시에는 시리즈 아이템을 <pre>sk-chart</pre>가 자체적으로 그리게 됩니다. 따라서 <pre>wj-flex-chart-series</pre> 컴포넌트를 사용할 수 없습니다.
          </p>
        </comp-desc>

        <comp-desc
          title="Aggregation binding-X"
          :example="skChartAggregationBindingX"
          :code="skChartAggregationBindingXCode"
          :source-style="{'height': '800px'}"
          layout="horizontal"
        >
          <p>
            속성 <pre>binding-x</pre>의 값으로 aggregation 대상인 value들을 가지고 있는 시리즈명을 넣으면 해당 시리즈의 value의 분포를 알 수도 있습니다. 이 경우 binding-x-type은 당연히 <pre>NUMBER</pre>가 되어야 합니다.
          </p>
          <p>
            이 떄 <pre>wj-flex-chart-trend-line</pre>컴포넌트를 이용해 trendline을 그릴 수도 있습니다. 사용법은 <a href="https://www.grapecity.com/wijmo/api/classes/wijmo_angular2_chart_analytics.wjflexcharttrendline.html">WjFlexChartTrendLine Class</a>에서 확인할 수 있습니다.
          </p>
        </comp-desc>

        <comp-desc
          title="Multi Series Aggregation"
          :example="skChartAggregationMulti"
          :code="skChartAggregationMultiCode"
          :source-style="{'height': '800px'}"
          layout="horizontal"
        >
          <p>
            <pre>aggregation-series</pre> 속성에 Array를 바인딩 해 멀티 시리즈에 대해 aggregation을 수행 할 수도 있습니다. 이 경우 <pre>stacking</pre>속성을 <pre>Stacked</pre>로 설정해 각 컬럼을 쌓을 수도 있습니다.
          </p>
        </comp-desc>

        <comp-desc
          title="Live Update"
          :example="skChartLiveUpdate"
          :code="skChartLiveUpdateCode"
        >
          <p>
            <pre>sk-chart</pre>의 <pre>x-max</pre>와 <pre>x-min</pre> 속성을 이용해 라이브 업데이트 되는 차트의 앞 뒤를 잘라가며 표시할 수 있습니다.
          </p>
        </comp-desc>
      </div>
    </component-panel>
  </section>
</template>

<script>
import SkChartBasic from './SkChartBasic'
import SkChartBasicCode from '!!raw-loader!./SkChartBasic'

import SkChartType from './SkChartType'
import SkChartTypeCode from '!!raw-loader!./SkChartType'

import SkChartBindingX from './SkChartBindingX'
import SkChartBindingXCode from '!!raw-loader!./SkChartBindingX'

import SkChartZoom from './SkChartZoom'
import SkChartZoomCode from '!!raw-loader!./SkChartZoom'

import SkChartAggregation from './SkChartAggregation'
import SkChartAggregationCode from '!!raw-loader!./SkChartAggregation'

import SkChartAggregationMulti from './SkChartAggregationMulti'
import SkChartAggregationMultiCode from '!!raw-loader!./SkChartAggregationMulti'

import SkChartAggregationBindingX from './SkChartAggregationBindingX'
import SkChartAggregationBindingXCode from '!!raw-loader!./SkChartAggregationBindingX'

import SkChartLiveUpdate from './SkChartLiveUpdate'
import SkChartLiveUpdateCode from '!!raw-loader!./SkChartLiveUpdate'

import SkChartDisplayMethod from './SkChartDisplayMethod'
import SkChartDisplayMethodCode from '!!raw-loader!./SkChartDisplayMethod'

export default {
  name: 'UsageSkChart',
  components: {
    'comp-desc': () => import('../ComponentDescription')
  },
  data () {
    return {
      skChartBasic: SkChartBasic,
      skChartBasicCode: SkChartBasicCode,
      skChartType: SkChartType,
      skChartTypeCode: SkChartTypeCode,
      skChartBindingX: SkChartBindingX,
      skChartBindingXCode: SkChartBindingXCode,
      skChartZoom: SkChartZoom,
      skChartZoomCode: SkChartZoomCode,
      skChartAggregation: SkChartAggregation,
      skChartAggregationCode: SkChartAggregationCode,
      skChartAggregationMulti: SkChartAggregationMulti,
      skChartAggregationMultiCode: SkChartAggregationMultiCode,
      skChartAggregationBindingX: SkChartAggregationBindingX,
      skChartAggregationBindingXCode: SkChartAggregationBindingXCode,
      skChartLiveUpdate: SkChartLiveUpdate,
      skChartLiveUpdateCode: SkChartLiveUpdateCode,
      skChartDisplayMethod: SkChartDisplayMethod,
      skChartDisplayMethodCode: SkChartDisplayMethodCode
    }
  }
}
</script>

<style lang="scss" scoped>
section.usage-sk-chart {
  height: 100%;
  position: relative;
  max-width: 100%;
  .chart-usage {
    max-width: 100%;
    position: relative;
    font-size: 14px;
    p {
      margin-bottom: 10px;
      word-break: break-all;
      word-wrap: break-word;
    }
    .chart-usage-content {
      padding: $gap;
      display: block;
      max-width: 100%;
      position: relative;
    }
    pre {
      display: inline;
      font-family: 'Consolas', 'Menlo', monospace;
      padding: 2px 3px;
      margin: 0;
      white-space: pre-wrap;
      background-color: rgba(0, 0, 0, .15);
    }
  }
}
</style>
