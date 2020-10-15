export default {
  EAP_ACTIVITY: {
    MODAL_001: {
      add: 'Add'
    },
    LABEL: {
      EQPMODEL: 'EQP Model',
      ACTIVITY: 'Activity',
      ACTIVITYNAME: 'Activity Name',
      CODE: 'Code',
      CODETYPE: 'Code Type'
    },
    BUTTON: {
      add: 'Add',
      fileopen: 'File Open',
      release: 'Release',
      viewer: 'Viewer',
      save: 'Save',
      delete: 'Delete',
      cancle: 'Cancle'
    },
    HEADER: {
      release: 'Release',
      model: 'Model',
      activityname: 'Activity Name(*)',
      version: 'Version(*)',
      code: 'Code(*)',
      codetype: 'Code Type(*)',
      makingdate: 'Making Date'
    },
    DIALOG: {
      save: 'Do you wanna Save?',
      cdr: 'If you wanna delete item. Please, uncheck release button.',
      cnd: 'Fail to delete.',
      act: 'Activity Name: ',
      vrs: '<br>Version : ',
      dwd: '<br>Do you wanna delete this item?',
      nean: 'Activity Name does not exist.',
      necd: 'Code does not exist.',
      nect: 'Code Type does not exist.',
      sucs: 'Success.',
      fail: 'Fail.'
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
      start: 'Start',
      stop: 'Stop',
      result: 'Result',
      close: 'Close',
      add: 'Add',
      save: 'Save',
      delete: 'Delete'
    },
    DIALOG: {
      nonse: 'Item does not selected.',
      nonsel: 'Item does not selected.',
      nondsel: 'Item does not selected.<br>Added new item can not be selected item. Please Refresh.',
      nondsel2: 'Item does not selected.',
      noreq: 'There is item that has to fill required.',
      condel: 'items will be deleted. Are you sure?',
      fsave: 'Fail to save.',
      fdel: 'Fail to delete.',
      cancle: 'Cancle',
      confirm: 'Confirm',
      coneap: 'There is connected EAP.',
      multisave: 'items will be saved. Are you sure?'
    }
  },
  EC_CONFIGURATION: {
    HEADER: {
      use: 'Use (*)',
      ecid: 'ECID',
      ecname: 'EC Name',
      desc: 'Description',
      crtuser: 'Create User',
      crtdt: 'Create Date',
      mdfuser: 'Modify User',
      mdfdt: 'Modify Date'
    },
    BUTTON: {
      open: 'Open',
      delete: 'Delete'
    },
    DIALOG: {
      nonsel: 'Item does not selected for save.',
      nondsel2: 'Item does not selected for delete.',
      noreq: 'There is item that has to fill required.',
      parsingerr: 'Error Occured while parsing. <br>There is item that has no required or irregular item 필수 값이 없거나 잘못 된 데이터가 존재 합니다.',
      parsingerr2: 'Error Occured while parsing. (Supported file extension is CSV.)',
      multisave: 'items will be saved. Are you sure?',
      multidelete: 'items will be deleted. Are you sure?',
      multideletedone: 'items be deleted.',
      success: 'Success : ',
      fail: ' Fail : ',
      fsave: 'Fail to Save.',
      fdel: 'Fail to Delete.',
      cancle: 'Cancle',
      confirm: 'Confirm'
    },
    EQP_CONFIGURATION: {
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
        nonsel: 'Item does not selected for save.',
        nondsel: 'Item does not selected.<br>Added new item can not be selected item. Please Refresh.',
        nondsel2: 'Item does not selected for delete.',
        noreq: 'There is item that has to fill required.',
        multisave: 'items will be saved. Are you sure?',
        multidelete: 'items will be deleted. Are you sure?',
        multideletedone: 'items be deleted.',
        success: 'Success : ',
        fail: ' Fail : ',
        fsave: 'Fail to Save.',
        fdel: 'Fail to Delete.',
        cancle: 'Cancle',
        confirm: 'Confirm'
      }
    },
    EVENT_DEFINE: {
      BUTTON: {
        add: 'Add',
        cancle: 'Cancle',
        save: 'Save',
        modify: 'Modify',
        delete: 'Delete'
      },
      HEADER: {
        add: 'Add',
        modify: 'Modify',
        delete: 'Delete',
        reportid: 'Report ID',
        description: 'Description',
        conparamlist: 'Connetion Parameter List',
        coneventlist: 'Connection Event List'
      },
      DIALOG: {
        fsave: 'Fail to Save.',
        nonsel: 'Item does not selected for save.<br>Original data is not saved.',
        nondsel: 'Item does not selected.<br>Added new item can not be selected item. Please Refresh.',
        multisave: 'items will be saved. Are you sure?',
        multidelete: 'items will be deleted. Are you sure?',
        cancle: 'Cancle',
        confirm: 'Confirm'
      },
      LABEL: {
        use: 'USE(*)',
        type: 'Type(*)',
        vid: 'VID(*)',
        paraname: 'Parameter Name(*)',
        alias: 'Alias Name(*)',
        unit: 'Unit',
        desc: 'Description',
        reportid: 'Report ID(*)',
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
        nonsel: 'Item does not selected for save.',
        noreq: 'There is item that has to fill required.',
        fsave: 'Fail to Save.',
        fdel: 'Fail to delete.',
        nondsel2: 'Item does not selected for delete.',
        cancle: 'Cancle',
        confirm: 'Confirm',
        parsingerr: 'Error Occured while parsing. <br>There is item that has no required or irregular item 필수 값이 없거나 잘못 된 데이터가 존재 합니다.',
        parsingerr2: 'Error Occured while parsing. (Supported file extension is CSV.)',
        multisave: 'items will be saved. Are you sure?',
        multidelete: 'items will be deleted. Are you sure?',
        multideletedone: 'items be deleted.'
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
        nonsel: 'Item does not selected for save.',
        nondsel: 'Item does not selected.<br>Added new item can not be selected item. Please Refresh.',
        nondsel2: 'Item does not selected for delete.',
        noreq: 'There is item that has to fill required.',
        cancle: 'Cancle',
        confirm: 'Confirm',
        success: 'Success : ',
        fail: ' Fail : ',
        fdel: 'Fail to Delete.',
        multisave: 'items will be saved. Are you sure?',
        multidelete: 'items will be deleted. Are you sure?'
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
        cancle: 'Cancle',
        confirm: 'Confirm',
        fdel: 'Fail to Delete.',
        fsave: 'Fail to Save.',
        multidelete: 'items will be deleted. Are you sure?',
        multideletedone: 'items be deleted.',
        multisave: 'items will be saved. Are you sure?',
        nondsel: 'Item does not selected for delete.',
        nonsel: 'Item does not selected for save.',
        noreq: 'There is item that has to fill required.',
        parsingerr: 'Error Occured while parsing. <br>There is item that has no required or irregular item 필수 값이 없거나 잘못 된 데이터가 존재 합니다.',
        parsingerr2: 'Error Occured while parsing. (Supported file extension is CSV.)',
        success: 'Success : ',
        fail: ' Fail : '
      }
    },
    PROCESS_MONITOR: {
      LABEL: {
        min5: '5 Min',
        min10: '10 Min',
        min30: '30 Min',
        status: 'Status',
        cpu: 'CPU',
        memory: 'Memory'
      }
    },
    RESOURCE_REPORT: {
      LABEL: {
        hour: 'Recent 1 Hour',
        day: 'Recent 24 Hours',
        week: 'Recent 1 Week',
        month: 'Recent 1 Month'
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
        save: 'Do You Wanna Save?',
        cancle: 'Cancle',
        confirm: 'Confirm'
      }
    }
  }
}
