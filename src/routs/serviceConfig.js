
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
        cb(null, require('page/service/ChildCheckIndexDetail.js'))
      })
    }
  },
  // 婴儿入住评估编辑
  {
    path: '/service/child-check-in/edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
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
  // 产科查房记录单
  {
    path: '/service/obstetric-record',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/ObstetricRecordIndex.jsx'))
      })
    }
  },
  // 产妇每日身体评估单
  {
    path: '/service/puerpera-body',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/PuerperaBodyIndex.jsx'))
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
  // 宣教手册
  {
    path: '/service/baby-manual',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/ObstetricRecordIndex.jsx'))
      })
    }
  },
  // 产妇护理记录
  {
    path: '/service/puerpera-record',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/ObstetricRecordIndex.jsx'))
      })
    }
  },
  // 爱丁堡优育单
  {
    path: 'service/edinburgh-birth',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/ObstetricRecordIndex.jsx'))
      })
    }
  },
  // 婴儿喂养记录单
  {
    path: '/service/baby-feed',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/ObstetricRecordIndex.jsx'))
      })
    }
  },
  // 婴儿成长记录单
  {
    path: '/service/baby-grow',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/ObstetricRecordIndex.jsx'))
      })
    }
  },
  // 对内婴儿游泳预约
  {
    path: '/service/baby-swimming',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/ObstetricRecordIndex.jsx'))
      })
    }
  },
  // 管家查房记录单
  {
    path: '/service/butler-rounds',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/ObstetricRecordIndex.jsx'))
      })
    }
  },
  // 通知
  {
    path: '/service/send-message',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/ObstetricRecordIndex.jsx'))
      })
    }
  },
  // 营养产后入住评估
  {
    path: '/service/nutrition-evaluate',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/ObstetricRecordIndex.jsx'))
      })
    }
  },
  // 营养查房记录单
  {
    path: '/service/nutrition-record',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/serviceCustomer'));
        cb(null, require('page/service/ObstetricRecordIndex.jsx'))
      })
    }
  },





]
