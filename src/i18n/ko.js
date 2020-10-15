import spc from './spc/ko.js'
import mes from './mes/ko.js'
import eap from './eap/ko.js'

export default {
  'TREE_001': '전체',
  'TREE_002': '즐겨찾기',
  'BUTTON_001': '추가',
  'BUTTON_002': '삭제',
  'BUTTON_003': '저장',
  'BUTTON_004': 'Control Limit 재계산',
  'BUTTON_005': 'CUSUM',
  'BUTTON_006': 'EWMA',
  'LABEL_001': 'My Para 목록',
  'LABEL_002': 'Control Chart',
  'gbnName': '구분',
  'specName': '파라미터 이름',
  'lclVal': 'LCL',
  'uclVal': 'UCL',
  'avgVal': '평균',
  'stdVal': '표준편차',
  'medianVal': '메디안',
  'startDttm': '시작일시',
  'fnshDttm': '종료일시',
  'calcDttm': '계산일시',
  'EngrSpecUseYN': 'Engr Spec 사용',
  'elclVal': 'Engr LCL',
  'euclVal': 'Engr UCL',
  'targetVal': 'Engr Target',
  'chgUserId': '수정자 ID',
  'chgDttm': '최종 수정 일시',
  'specExpln': 'Engr Spec 설명',
  'grpLvl1Name': 'FAB',
  'grpLvl2Name': 'Tech',
  'grpLvl3Name': 'Product',
  'grpLvl4Name': 'Oper',
  'grpLvl5Name': 'Eqp',
  spc,
  mes,
  eap,
  datepicker: {
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
    yearSuffix: '년'
  },
  timepicker: {
    currentText: '지금',
    closeText: '완료',
    timeOnlyTitle: '시간',
    timeText: '선택시간',
    hourText: '시',
    minuteText: '분',
    secondText: '초',
    millisecText: '밀리'
    // amNames: ['오전', '오전'],
    // pmNames: ['오전', '오전']
  }
}
