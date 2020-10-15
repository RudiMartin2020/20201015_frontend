export default {
  EAP_ACTIVITY: {
    MODAL_001: {
      add: '추가'
    },
    LABEL: {
      EQPMODEL: '장비모델',
      ACTIVITY: '액티비티',
      ACTIVITYNAME: '액티비티 이름',
      CODE: '코드',
      CODETYPE: '코드타입'
    },
    BUTTON: {
      add: '추가',
      fileopen: '파일선택',
      release: '릴리즈',
      viewer: '뷰어',
      save: '저장',
      delete: '삭제',
      cancle: '취소',
      ok: '확인'
    },
    HEADER: {
      release: '릴리즈여부',
      model: '모델',
      activityname: '액티비티 이름(*)',
      version: '버전(*)',
      code: '코드(*)',
      codetype: '코드타입(*)',
      makingdate: '작성일자'
    },
    DIALOG: {
      save: 'Save 하시겠습니까?',
      cdr: 'Release가 체크되어 있어 삭제 할 수 없습니다.',
      cnd: 'Delete 작업에 실패 하였습니다.',
      act: '액티비티 이름: ',
      vrs: '<br>버전 : ',
      dwd: '<br>에 대해 삭제 작업을 진행 하시겠습니까?',
      nean: 'Activity Name이 존재하지 않습니다.',
      necd: 'Code가 존재하지 않습니다.',
      nect: 'Code Type이 존재하지 않습니다.',
      sucs: '성공 하였습니다.',
      fail: '실패 하였습니다.'
    }
  },
  EAP_MANAGER: {
    HEADER: {
      eapmanagername: 'EAP Manager Name(*)',
      ipaddress: 'ID Address(*)',
      portnumber: 'Port Number(*)',
      rootfolder: 'Root Folder(*)',
      fab: 'FAB(*)',
      area: 'Area(*)',
      vendor: 'Vendor(*)',
      eqpmodel: 'EQP Model(*)',
      eqpid: 'EQP ID(*)',
      eapname: 'EAP Name(*)',
      active: 'Active(*)'
    },
    BUTTON: {
      refresh: 'Refresh',
      start: '시작',
      stop: '중지',
      result: '결과',
      close: '닫기',
      add: '추가',
      save: '저장',
      delete: '삭제'
    },
    DIALOG: {
      nonse: '항목이 선택 되지 않았습니다.',
      nonsel: 'Save 작업을 진행 할 항목이 선택 되지 않았습니다.',
      nondsel: 'Delete 작업을 진행 할 항목이 선택 되지 않았습니다.<br>새로 추가 된 데이터는 Delete 작업에서 제외됩니다.',
      nondsel2: 'Delete 작업을 진행 할 항목이 선택 되지 않았습니다.',
      noreq: '선택 된 항목 중 필수 값이 없는 항목이 존재합니다.',
      condel: '건에 대해 Delete 작업을 진행 하시겠습니까?',
      fsave: 'Save 작업에 실패 하였습니다.',
      fdel: 'Delete 작업에 실패 하였습니다.',
      cancle: '취소',
      confirm: '확인',
      coneap: '연계 된 EAP가 존재합니다.',
      multisave: '건에 대해 Save 작업을 진행 하시겠습니까?'
    }
  },
  EC_CONFIGURATION: {
    HEADER: {
      use: '사용여부(*)',
      ecid: 'ECID',
      ecname: 'EC Name',
      desc: 'Description',
      crtuser: '만든사람',
      crtdt: '만든날짜',
      mdfuser: '수정한사람',
      mdfdt: '수정한날짜'
    },
    BUTTON: {
      open: '열기',
      delete: '삭제'
    },
    DIALOG: {
      nonsel: 'Save 작업을 진행 할 항목이 선택 되지 않았습니다.',
      nondsel2: 'Delete 작업을 진행 할 항목이 선택 되지 않았습니다.',
      noreq: ' 선택 된 항목 중 필수 값이 없는 항목이 존재합니다.',
      parsingerr: '파싱 중 에러가 발생 하였습니다.<br>필수 값이 없거나 잘못 된 데이터가 존재 합니다.',
      parsingerr2: '파싱 중 에러가 발생하였습니다. (지원 가능한 확장자는 csv입니다.)',
      multisave: '건에 대해 Save 작업을 진행 하시겠습니까?',
      multidelete: '건에 대해 Delete를 진행 하시겠습니까?',
      multideletedone: '건에 대해 Delete에 성공 하였습니다.',
      success: '성공 : ',
      fail: '건 실패 : ',
      fsave: 'Save 작업에 실패 하였습니다.',
      fdel: 'Delete 작업에 실패 하였습니다.',
      cancle: '취소',
      confirm: '확인'
    }
  },
  EQP_CONFIGURATION: {
    BUTTON: {
      add: 'Add',
      import: 'Import',
      refresh: 'Refresh'
    },
    HEADER: {
      eqprowid: 'EQPROWID(*)',
      eqpmodel: 'EQP Model(*)',
      eqpid: 'EQP ID(*)',
      fab: 'FAB(*)',
      area: 'Area(*)',
      vendor: 'Vendor(*)',
      ipaddress: 'IP Address(*)',
      portno: 'Port No(*)',
      deviceid: 'Device ID(*)',
      T3: 'T3',
      T5: 'T5',
      T6: 'T6',
      T7: 'T7',
      T8: 'T8',
      useyn: 'use y/n'
    },
    DIALOG: {
      nonsel: 'Save 작업을 진행 할 항목이 선택 되지 않았습니다.',
      nondsel: 'Delete 작업을 진행 할 항목이 선택 되지 않았습니다.<br>새로 추가 된 데이터는 Delete 작업에서 제외됩니다.',
      nondsel2: 'Delete 작업을 진행 할 항목이 선택 되지 않았습니다.',
      noreq: ' 선택 된 항목 중 필수 값이 없는 항목이 존재합니다.',
      multisave: '건에 대해 Save 작업을 진행 하시겠습니까?',
      multidelete: '건에 대해 Delete를 진행 하시겠습니까?',
      multideletedone: '건에 대해 Delete에 성공 하였습니다.',
      success: '성공 : ',
      fail: '건 실패 : ',
      fsave: 'Save 작업에 실패 하였습니다.',
      fdel: 'Delete 작업에 실패 하였습니다.',
      cancle: '취소',
      confirm: '확인'
    }
  },
  EVENT_DEFINE: {
    BUTTON: {
      add: '추가',
      cancle: '취소',
      save: '저장',
      modify: '수정',
      delete: '삭제'
    },
    HEADER: {
      add: '추가',
      modify: '수정',
      delete: '삭제',
      reportid: '리포트ID',
      description: '설명',
      conparamlist: '연결 Parameter List',
      coneventlist: '연결 Event List'
    },
    DIALOG: {
      fsave: 'Save 작업에 실패 하였습니다.',
      nonsel: 'Save 작업을 진행 할 항목이 선택 되지 않았습니다.<br>기존 데이터는 Save 작업에 포함되지 않습니다.',
      nondsel: 'Delete 작업을 진행 할 항목이 선택 되지 않았습니다.<br>새로 추가 된 데이터는 Delete 작업에서 제외됩니다.',
      multisave: '건에 대해 Save 작업을 진행 하시겠습니까?',
      multidelete: '건에 대해 Delete를 진행 하시겠습니까?',
      cancle: '취소',
      confirm: '확인'
    },
    LABEL: {
      use: '사용여부(*)',
      type: '타입(*)',
      vid: 'VID(*)',
      paraname: '파라미터 이름(*)',
      alias: '별명(*)',
      unit: 'Unit',
      desc: '설명',
      reportid: '리포트 ID(*)',
      drptrowid: 'Define Report Row Id',
      pararowid: 'Parameter Row Id',
      eqpmodelrowid: 'Eqp Model Row Id',
      rowid: 'Row Id',
      ceid: 'CEID(*)',
      evntname: 'Event Name',
      evntrowid: 'Event Row Id',
      linkevntrpt: 'Link Event Report Info Row Id',
      isnew: 'New'
    }
  },
  EVENT_MASTER: {
    BUTTON: {
      refresh: 'Refresh',
      add: 'Add',
      save: 'Save',
      open: 'Open',
      delete: 'Delete',
      cancle: 'Cancle',
      import: 'Import',
      export: 'Export'
    },
    HEADER: {
      open: 'Open',
      delete: 'Delete'
    },
    DIALOG: {
      nonsel: 'Save 작업을 진행 할 항목이 선택 되지 않았습니다.',
      noreq: '선택 된 항목 중 필수 값이 없는 항목이 존재합니다.',
      fsave: 'Save 작업에 실패 하였습니다.',
      fdel: 'Delete 작업에 실패 하였습니다.',
      nondsel2: 'Delete 작업을 진행 할 항목이 선택 되지 않았습니다.',
      cancle: '취소',
      confirm: '확인',
      parsingerr: '파싱 중 에러가 발생 하였습니다.<br>필수 값이 없거나 잘못 된 데이터가 존재 합니다.',
      parsingerr2: '파싱 중 에러가 발생하였습니다. (지원 가능한 확장자는 csv입니다.)',
      multisave: '건에 대해 Save 작업을 진행 하시겠습니까?',
      multidelete: '건에 대해 Delete를 진행 하시겠습니까?',
      multideletedone: '건에 대해 Delete에 성공 하였습니다.'
    },
    LABEL: {
      use: 'USE(*)',
      ceid: 'CEID(*)',
      evntname: 'Event Name(*)',
      desc: 'Description',
      crtuser: 'Create User',
      crtdt: 'Create Date',
      mdfuser: 'Modify User',
      mdfdt: 'Modify Date'
    }
  },
  MODEL_CONFIGURATION: {
    BUTTON: {
      refresh: 'Refresh',
      add: 'Add',
      save: 'Save',
      delete: 'Delete',
      cancle: 'Cancle',
      add3: 'Add Fab, Area, Vendor',
      trinity: 'Fab, Area, Vendor'
    },
    DIALOG: {
      nonsel: 'Save 작업을 진행 할 항목이 선택 되지 않았습니다.',
      nondsel: 'Delete 작업을 진행 할 항목이 선택 되지 않았습니다.<br>새로 추가 된 데이터는 Delete 작업에서 제외됩니다.',
      nondsel2: 'Delete 작업을 진행 할 항목이 선택 되지 않았습니다.',
      noreq: '선택 된 항목 중 필수 값이 없는 항목이 존재합니다.',
      cancle: '취소',
      confirm: '확인',
      success: '성공 : ',
      fail: '건 실패 : ',
      fdel: 'Delete 작업에 실패 하였습니다.',
      multisave: '건에 대해 Save 작업을 진행 하시겠습니까?',
      multidelete: '건에 대해 Delete를 진행 하시겠습니까?'
    },
    LABEL: {
      fab: 'FAB(*)',
      area: 'Area(*)',
      vendor: 'Vendor(*)',
      eqprowid: 'EQPROWID(*)',
      eqpmodel: 'EQP Model(*)',
      eqpmodelalias: 'EQP Model Alias(*)'
    }
  },
  PARAMETER_MASTER: {
    BUTTON: {
      refresh: 'Refresh',
      add: 'Add',
      import: 'Import',
      export: 'Export',
      open: 'Open',
      save: 'Save',
      cancle: 'Cancle',
      delete: 'Delete'
    },
    DIALOG: {
      cancle: '취소',
      confirm: '확인',
      fdel: 'Delete 작업에 실패 하였습니다.',
      fsave: 'Save 작업에 실패 하였습니다.',
      multidelete: '건에 대해 Delete를 진행 하시겠습니까?',
      multideletedone: '건에 대해 Delete에 성공 하였습니다.',
      multisave: '건에 대해 Save 작업을 진행 하시겠습니까?',
      nondsel2: 'Delete 작업을 진행 할 항목이 선택 되지 않았습니다.',
      nonsel: 'Save 작업을 진행 할 항목이 선택 되지 않았습니다.',
      noreq: '선택 된 항목 중 필수 값이 없는 항목이 존재합니다.',
      parsingerr: '파싱 중 에러가 발생 하였습니다.<br>필수 값이 없거나 잘못 된 데이터가 존재 합니다.',
      parsingerr2: '파싱 중 에러가 발생하였습니다. (지원 가능한 확장자는 csv입니다.)',
      success: '성공 : ',
      fail: '건 실패 : '
    }
  },
  PROCESS_MONITOR: {
    LABEL: {
      min5: '5분',
      min10: '10분',
      min30: '30분',
      status: 'Status',
      cpu: 'CPU',
      memory: 'Memory'
    }
  },
  RESOURCE_REPORT: {
    LABEL: {
      hour: '최근 1시간',
      day: '최근 24시간',
      week: '최근 1주일',
      month: '최근 한달'
    }
  },
  SML_EDITOR: {
    LABEL: {
      msgname: 'Message Name',
      stream: 'Stream',
      func: 'Function',
      wait: 'Wait'
    },
    DIALOG: {
      success: 'Success',
      fail: 'Fail<br>comment : ',
      save: '저장 하시겠습니까?',
      cancle: '취소',
      confirm: '확인'
    }
  }
}
