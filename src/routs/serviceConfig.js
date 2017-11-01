
import registerModel from './register';

export default (app) => [
  // 客户列表
  {
    path: '/service/customer',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/CustomerListIndex.jsx'))
      })
    }
  },
  // 客户列表
  {
    path: '/service/customer/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        registerModel(app, require('models/serviceCustomerChild'));
        cb(null, require('page/service/ServiceSummary.js'))
      })
    }
  },
  // 产妇入住前评估
  {
    path: '/service/check-before',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/CheckBeforeIndex.jsx'))
      })
    }
  },
  // 产妇入住前评估详情
  {
    path: '/service/check-before/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/CheckBeforeDetail.js'))
      })
    }
  },
  // 产妇入住前评估编辑
  {
    path: '/service/check-before/edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/CheckBeforeDetail.js'))
      })
    }
  },

  // 产妇入住评估单
  {
    path: '/service/check-in',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/CheckInIndex.jsx'))
      })
    }
  },
  // 产妇入住评估详情
  {
    path: '/service/check-in/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/CheckInDetail.js'))
      })
    }
  },
  // 产妇入住评估编辑
  {
    path: '/service/check-in/edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/CheckInDetail.js'))
      })
    }
  },
  // 婴儿入住评估
  {
    path: '/service/child-check-in',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/ChildCheckInIndex.jsx'))
      })
    }
  },
  // 婴儿入住评估详情
  {
    path: '/service/child-check-in/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        registerModel(app, require('models/serviceCustomerChild'));
        cb(null, require('page/service/ChildCheckIndexDetailCopy.js'))
      })
    }
  },
  // 婴儿入住评估编辑
  {
    path: '/service/child-check-in/edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        registerModel(app, require('models/serviceCustomerChild'));
        cb(null, require('page/service/ChildCheckIndexDetail.js'))
      })
    }
  },
  // 中医见诊记录单
  {
    path: '/service/diagnosis',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/DiagnosisIndex.jsx'))
      })
    }
  },

  // 中医见诊记录单详情
  {
    path: '/service/diagnosis/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/diagnosisDetail.js'))
      })
    }
  },
  // 中医见诊记录单编辑
  {
    path: '/service/diagnosis/edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/diagnosisDetail.js'))
      })
    }
  },

  // 中医查房记录单
  {
    path: '/service/diagnosis-record',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/DiagnosisRecordIndex.jsx'))
      })
    }
  },

  // 儿科查房记录单
  {
    path: '/service/children-record',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/DiagnosisRecordIndex.jsx'))
      })
    }
  },
  // 产科查房记录单
  {
    path: '/service/obstetric-record',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/DiagnosisRecordIndex.jsx'))
      })
    }
  },

  //儿科查房记录单详情页
  {
    path: '/service/children-record/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/childrenCheckRoomDetail.js'))
      })
    }
  },
  //中医、产科查房记录单详情页
  {
    path: '/service/diagnosis-record/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/checkRoomDetail.js'))
      })
    }
  },
  //产妇护理记录单详情页
  {
    path: '/service/puerpera-record/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/checkRoomDetail.js'))
      })
    }
  },
  //管家查房记录单详情页
  {
    path: '/service/butler-rounds/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/checkRoomDetail.js'))
      })
    }
  },
  //营养查房记录单详情页
  {
    path: '/service/nutrition-record/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/checkRoomDetail.js'))
      })
    }
  },


  // 婴儿护理记录单
  {
    path: '/service/baby-nursing',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/ObstetricRecordIndex.jsx'))
      })
    }
  },
  // 婴儿护理记录单详情
  {
    path: '/service/baby-nursing/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/ObstetricRecordDetail.js'))
      })
    }
  },
  // 编辑婴儿护理记录单
  {
    path: '/service/baby-nursing/edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/ObstetricRecordDetail.js'))
      })
    }
  },
  // 宣教手册
  {
    path: '/service/baby-manual',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/MissionManualIndex.js'))
      })
    }
  },
  // 产妇护理记录
  {
    path: '/service/puerpera-record',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/DiagnosisRecordIndex.jsx'))
      })
    }
  },
  // 爱丁堡优育单
  {
    path: 'service/edinburgh-birth',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/DiagnosisRecordIndex.jsx'))
      })
    }
  },
  // 爱丁堡优育单详情页
  {
    path: 'service/edinburgh-birth/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/edinburghBirthDetail.js'))
      })
    }
  },

  // 婴儿喂养记录单
  {

    path: '/service/baby-feed',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/InfantFeedingRecordsIndex.js'))
      })
    }
  },
  //宣教手册详情
  {
    path: '/service/baby-manual/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/MissionManualDetail.js'))
      })
    }
  },
  //宣教手册edit
  {
    path: '/service/baby-manual/edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/MissionManualEdit.js'))
      })
    }
  },
  //宣教手册Create
  {
    path: '/service/baby-manual/create',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/create/MissionManualCreate.js'))
      })
    }
  },
  // 婴儿喂养记录单编辑
  {
    path: '/service/baby-feed/edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/InfantFeedingRecordsEdit.js'))
      })
    }
  },
  // 婴儿喂养记录单详情
  {
    path: '/service/baby-feed/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/InfantFeedingRecordsDetail.js'))
      })
    }
  },
  // 产妇每日身体评估单
  {
    path: '/service/puerpera-body',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/InfantFeedingRecordsIndex.js'))
      })
    }
  },
  // 产妇每日身体评估单详情
  {
    path: '/service/puerpera-body/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/InfantFeedingRecordsDetail.js'))
      })
    }
  },
  // 产妇每日身体评估单编辑
  {
    path: '/service/puerpera-body/edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/InfantFeedingRecordsEdit.js'))
      })
    }
  },
  // 婴儿成长记录单
  {
    path: '/service/baby-grow',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/InfantFeedingRecordsIndex.js'))
      })
    }
  },
  // 婴儿成长记录单编辑
  {
    path: '/service/baby-grow/edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/InfantFeedingRecordsEdit.js'))
      })
    }
  },
  // 婴儿成长记录单详情
  {
    path: '/service/baby-grow/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/InfantFeedingRecordsDetail.js'))
      })
    }
  },
  // 对内婴儿游泳预约
  {
    path: '/service/baby-swimming',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/InsideBabySwimIndex.js'))
      })
    }
  },
  // 对内婴儿游泳预约详情
  {
    path: '/service/baby-swimming/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/InsideBabySwimDetail.js'))
      })
    }
  },
  // 编辑对内婴儿游泳预约
  {
    path: '/service/baby-swimming/edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/InsideBabySwimEdit.js'))
      })
    }
  },
  // 管家查房记录单
  {
    path: '/service/butler-rounds',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/DiagnosisRecordIndex.jsx'))
      })
    }
  },
  // 通知
  {
    path: '/service/send-message',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/NoticeOfIndex.js'))
      })
    }
  },

  // 生产通知单
  {
    path: '/service/send-message/production',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/ProductionNotice.js'))
      })
    }
  },
  // 入住通知单
  {
    path: '/service/send-message/stay',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/stayNotice.js'))
      })
    }
  },
  // 外出通知单
  {
    path: '/service/send-message/out',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/outNotice.js'))
      })
    }
  },


  // 退房通知单
  {
    path: '/service/send-message/check-out',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/checkOutNotice.js'))
      })
    }
  },
  {
    path: '/service/send-message/free',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/freeNotice.js'))
      })
    }
  },

  // 营养产后入住评估
  {
    path: '/service/nutrition-evaluate',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/NutritionEvaluateIndex.js'))
      })
    }
  },
  // 营养产后入住评估详情
  {
    path: '/service/nutrition-evaluate/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/NutritionEvaluateDetail.js'))
      })
    }
  },
  // 营养产后入住评估编辑
  {
    path: '/service/nutrition-evaluate/edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/NutritionEvaluateDetail.js'))
      })
    }
  },
  // 营养查房记录单
  {
    path: '/service/nutrition-record',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/DiagnosisRecordIndex.jsx'))
      })
    }
  },
  //门诊
  {
    path: '/service/order-outpatient',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/outpatient'));
        cb(null, require('page/service/order/OutpatientIndex.js'))
      })
    }
  },
  //门诊
  {
    path: '/service/order-outpatient/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/outpatient'));
        cb(null, require('page/service/order/OutpatientDetail.js'))
      })
    }
  },
  // 预约游泳
  {
    path: '/service/order-swimming',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/swimming'));
        cb(null, require('page/service/order/SwimmingIndex.js'))
      })
    }
  },

// 预约游泳详情
  {
    path: '/service/order-swimming/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/swimming'));
        cb(null, require('page/service/order/SwimmingDetail.js'))
      })
    }
  },
  // 预约游泳历史
  {
    path: '/service/order-swimming/history',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/swimming'));
        cb(null, require('page/service/order/SwimmingHistory.js'))
      })
    }
  },

  // 预约课程
  {
    path: '/service/order-course',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/course'));
        cb(null, require('page/service/CourseIndex.jsx'))
      })
    }
  },

  // 预约课程 添加
  {
    path: '/service/order-course/add',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/course'));
        cb(null, require('page/service/CourseAddIndex.jsx'))
      })
    }
  },

  // 预约课程 详情
  {
    path: '/service/order-course/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/course'));
        cb(null, require('page/service/CourseDetailIndex.jsx'))
      })
    }
  },
  // 预约技师
  {
    path: '/service/order-technician',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/order/technicianIndex.js'))
      })
    }
  },
  // 预约技师详情
  {
    path: '/service/order-technician/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/order/TechnicianDetail.js'))
      })
    }
  },
  // 预约技师历史
  {
    path: '/service/order-technician/history',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/order/TechnicianHistory.js'))
      })
    }
  },



  // 满月汗
  {
    path: '/service/order-sweat',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/orderSweat'));
        cb(null, require('page/service/order/SweatIndex.js'))
      })
    }
  },
  //满月汗详情
  {
    path: '/service/order-sweat/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/orderSweat'));
        cb(null, require('page/service/order/SweatDetail.js'))
      })
    }
  },
  //满月汗历史
  {
    path: '/service/order-sweat/history',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/orderSweat'));
        cb(null, require('page/service/order/SweatHistory.js'))
      })
    }
  },


  //
  //产妇入住前评估单创建页面
  {
    path: '/service/check-before/create',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/create/CheckBeforeCreate.js'))
      })
    }
  },
  //产妇入住评估单创建页面
  {
    path: '/service/check-in/create',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/create/CheckInCreate.js'))
      })
    }
  },
  //婴儿入住评估单创建页面
  {
    path: '/service/child-check-in/create',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomerChild'));
        cb(null, require('page/service/create/ChildCheckIndexCreate.js'))
      })
    }
  },
]

















