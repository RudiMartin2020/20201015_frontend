export default {
  name: 'components-usage',
  methods: {
    nodeClick (e, node) {
      let param = {
        name: node.route
      }
      if (node.hash) param.hash = node.hash
      else param.hash = '#' + node.title
      this.$router.push(param)
    }
  },
  data () {
    return {
      amount: 100,
      components: [
        {
          title: 'HTTPS 적용 가이드',
          route: 'https-guide'
        },
        {
          title: 'Base UI Components',
          children: [
            {
              title: 'Checkbox',
              route: 'component-checkbox'
            }, {
              title: 'Button',
              route: 'component-buttons'
            }, {
              title: 'Field',
              route: 'component-field'
            }
          ]
        },
        {
          title: 'Performance Test',
          children: [
            {
              title: 'SPC Visualize',
              route: 'performance-spc-visualize'
            },
            {
              title: 'SK-GRID',
              route: 'performance-sk-grid'
            },
            {
              title: 'SK-CHART',
              route: 'performance-sk-chart'
            }
          ]
        },
        {
          title: 'SK Chart',
          children: [
            {
              title: '기본 사용법',
              route: 'component-sk-chart'
            },
            {
              title: 'Chart Type',
              route: 'component-sk-chart'
            },
            {
              title: 'Chart Type 변경 **', // 추가개발필요
              route: 'component-sk-chart'
            },
            {
              title: '시리즈 선택 표시 **', // 추가개발필요
              route: 'component-sk-chart'
            },
            {
              title: 'Binding X',
              route: 'component-sk-chart'
            },
            {
              title: 'Chart Zoom / Raw Data popup',
              route: 'component-sk-chart'
            },
            {
              title: 'Aggregation',
              route: 'component-sk-chart',
              children: [
                {
                  title: 'Aggregation',
                  route: 'component-sk-chart'
                },
                {
                  title: 'Aggregation binding-X',
                  route: 'component-sk-chart'
                },
                {
                  title: 'Multi Series Aggregation',
                  route: 'component-sk-chart'
                },
                {
                  title: 'Aggregation Types **', // 추가개발필요
                  route: 'component-sk-chart'
                }
              ]
            },
            {
              title: 'Live Update',
              route: 'component-sk-chart'
            },
            {
              title: 'X/Y축 라벨 표시 ++', // 매뉴얼 작성 필요
              route: 'component-sk-chart'
            },
            {
              title: 'Tooltip Formatting ++', // 매뉴얼 작성 필요
              route: 'component-sk-chart'
            },
            {
              title: '차트 색상 변경', // 매뉴얼 작성 필요
              route: 'component-sk-chart'
            },
            {
              title: '차트 퍼포먼스 테스트', // 매뉴얼 작성 필요
              route: 'component-sk-chart-performance'
            }
          ]
        }, {
          title: 'SK Grid',
          route: 'component-skgrid',
          children: [
            {
              title: 'Columns 변경',
              route: 'skgrid-columnsupdate'
            },
            {
              title: 'Column Properties',
              route: 'skgrid-columnProperties'
            },
            {
              title: 'Grid Properties',
              route: 'skgrid-properties'
            },
            {
              title: 'Methods',
              route: 'skgrid-methods'
            },
            {
              title: 'Selection',
              route: 'skgrid-selection'
            },
            {
              title: 'Paging Type',
              route: 'skgrid-paging'
            },
            {
              title: 'Drag Processing',
              route: 'skgrid-dragProcessing'
            },
            {
              title: 'Description',
              route: 'skgrid-gridDesc'
            }
          ]
        }
      ]
    }
  }
}
