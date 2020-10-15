export default {
  LOCATION: 'SKCC', //  GROWTH / SKCC
  PALETTE: [
    'rgba(227, 65, 96, 1)', 'rgba(32, 208, 191, 1)', 'rgba(47, 141, 250, 1)', 'rgba(248, 199, 83, 1)', 'rgba(236, 126, 48, 1)', 'rgba(26, 168, 121, 1)', 'rgba(21, 83, 182, 1)', 'rgba(189, 65, 227, 1)', 'rgba(204, 145, 124, 1)', 'rgba(81, 109, 136, 1)'
  ],
  GRID_ROW_DEFAULT_HEIGHT: 30,
  DOMAIN: 'svr.miip.skcc.com',
  REPOSITORY: 'core', // 로컬 개발시에 현재 Repository가 무엇인지 구분하기 위한 용도. 실제 배포된 상태에서는 subdomain을 기준으로 현재 프로그램을 판별합니다.
  SUBDOMAINS: {
    spc: 'spc',
    mes: 'mes',
    eap: 'eap',
    demo: 'demo',
    settings: 'iam'
  }
}
