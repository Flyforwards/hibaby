
import registerModel from './register';

export default (app) => [
    // 客户档案
    {
      path: '/crm/customer',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/customer'));
          cb(null, require('page/crm/customer/CustomerIndex.jsx'))
        })
      }
    },
  // 添加客户
  {
    path: '/crm/customer/add',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
         registerModel(app, require('models/addCourse'));
        registerModel(app, require('models/addCustomer'));
        registerModel(app, require('models/healthInformation'));
        registerModel(app, require('models/membershipcard'));
        registerModel(app, require('models/order'));
        registerModel(app, require('models/printCustomer'));
        cb(null, require('page/crm/customer/addCustomer.jsx'))
      })
    }
  },
  //编辑客户信息
  {
    path: '/crm/customer/edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/addCourse'));
        registerModel(app, require('models/addCustomer'));
        registerModel(app, require('models/order'));
        registerModel(app, require('models/healthInformation'));
        registerModel(app, require('models/membershipcard'));
        registerModel(app, require('models/printCustomer'));
        cb(null, require('page/crm/customer/addCustomer.jsx'))
      })
    }
  },
  {
    path: '/crm/customer/Add/bindingPackages',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/addCourse'));
        registerModel(app, require('models/addCustomer'));
        cb(null, require('page/crm/customer/bindingPackages.jsx'))
      })
    }
  },
//客户详情
  {
    path: '/crm/customer/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/addCustomer'));
        registerModel(app, require('models/addCourse'));
        registerModel(app, require('models/order'));
        registerModel(app, require('models/membershipcard'));
        registerModel(app, require('models/healthInformation'));
        registerModel(app, require('models/printCustomer'));
        cb(null, require('page/crm/customer/addCustomer.jsx'))
      })
    }
  },

    // 套餐
    {
      path: '/crm/service-info',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/serviceinfo.jsx'))
        })
      }
    },
    // 添加套餐
    {
      path: '/crm/service-info/add',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/addService.jsx'))
        })
      }
    },
    //查看套餐
    {
      path: '/crm/service-info/detail',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/viewService.jsx'))
        })
      }
    },
    //编辑套餐
    {
      path: '/crm/service-info/edit',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/editService.jsx'))
        })
      }
    },
    //套房
    {
      path: '/crm/suite',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/suite.jsx'))
        })
      }
    },
    // 添加套房
    {
      path: '/crm/suite/add',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/addSuite.jsx'))
        })
      }
  },
    //编辑套房
    {
      path: '/crm/suite/edit',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/editSuite.jsx'))
        })
      }
    },
    //查看套房
    {
      path: '/crm/suite/detail',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/viewSuite.jsx'))
        })
      }
    },
  //查看套房
  {
    path: '/crm/customer/order/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/order'));
        cb(null, require('page/crm/customer/OrderDetail.js'))
      })
    }
  },
    //商品
    {
      path: '/crm/commodity',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/commodity.jsx'))
        })
      }
    },
    // 添加商品
    {
      path: '/crm/commodity/add',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/addCommodity.jsx'))
        })
      }
    },
    // 查看商品详情
    {
      path: '/crm/commodity/detail',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/viewCommodity.jsx'))
        })
      }
    },
     // 编辑商品
    {
      path: '/crm/commodity/edit',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/editCommodity.jsx'))
        })
      }
    },
    //卡种管理
    {
      path: '/crm/card',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/card'));
          cb(null, require('page/crm/infocard/card/card.js'))
        })
      }
    },
    //卡种信息
    {
      path: '/crm/card/add',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/card'));
          cb(null, require('page/crm/infocard/card/cardInfo.js'))
        })
      }
    },
    //查看卡种详情
    {
      path: '/crm/card/detail',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/card'));
          cb(null, require('page/crm/infocard/card/cardDetail.js'))
        })
      }
    },
    //编辑卡种信息
    {
      path: '/crm/card/edit',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/card'));
          cb(null, require('page/crm/infocard/card/cardEdit.js'))
        })
      }
    },
    //活动列表
    {
      path: '/crm/activity',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/activity'));
          cb(null, require('page/crm/activity/ActivityIndex.jsx'))
        })
      }
    },
    //活动添加
    {
      path: '/crm/activity/add',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/activity'));
          cb(null, require('page/crm/activity/ActivityAddIndex.jsx'))
        })
      }
    },
    //活动详情
    {
      path: '/crm/activity/detail',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/activity'));
          cb(null, require('page/crm/activity/ActivityDetailIndex.jsx'))
        })
      }
    },
    //活动编辑
    {
      path: '/crm/activity/edit',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/activity'));
          cb(null, require('page/crm/activity/ActivityDetailEditIndex.jsx'))
        })
      }
    },

    //客户投诉列表
    {
      path: '/crm/customer-comp',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/customerComp'));
          cb(null, require('page/crm/customerService/CustomerCompIndex.jsx'))
        })
      }
    },
  //客户投诉添加
  {
    path: '/crm/customer-comp/add',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/customerComp'));
        cb(null, require('page/crm/customerService/CustomerCompAddIndex.jsx'))
      })
    }
  },
  //客户投诉详情
  {
    path: '/crm/customer-comp/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/customerComp'));
        cb(null, require('page/crm/customerService/CustomerCompDetailIndex.jsx'))
      })
    }
  },
  //预约参观
  {
    path: '/crm/customer-vis',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/customerVis'));
        cb(null, require('page/crm/customerService/CustomerVisIndex.jsx'))
      })
    }
  },
  //预约参观添加
  {
    path: '/crm/customer-vis/add',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/customerVis'));
        cb(null, require('page/crm/customerService/CustomerVisAddIndex.jsx'))
      })
    }
  },
  //预约参观详情
  {
    path: '/crm/customer-vis/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/customerVis'));
        cb(null, require('page/crm/customerService/CustomerVisDetailIndex.jsx'))
      })
    }
  },
  //预约参观编辑
  {
    path: '/crm/customer-vis/edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/customerVis'));
        cb(null, require('page/crm/customerService/CustomerVisEditIndex.jsx'))
      })
    }
  },

  // 客户电话系统
  {
    path: '/crm/phone-system',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/phoneSystem'));
        cb(null, require('page/crm/customerService/PhoneSystemIndex.jsx'))
      })
    }
  },
  // 客户电话系统添加
  {
    path: '/crm/phone-system/add',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/phoneSystem'));
        cb(null, require('page/crm/customerService/PhoneSystemAddIndex.jsx'))
      })
    }
  },
  // 客户电话系统编辑
  {
    path: '/crm/phone-system/edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/phoneSystem'));
        cb(null, require('page/crm/customerService/PhoneSystemEditIndex.jsx'))
      })
    }
  },

  //会员卡打印路由
  {
    path: '/crm/customer/printPage',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/membershipcard'));
        cb(null, require('page/crm/membershipcard/printPage.js'))
      })
    }
  },
  //健康档案打印路由
  {
    path: '/crm/customer/printCustomerPage',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/addCustomer'));
        registerModel(app, require('models/addCourse'));
        registerModel(app, require('models/healthInformation'));
        registerModel(app, require('models/printCustomer'));
        cb(null, require('page/crm/healthy/printCustomerPage.js'))
      })
    }
  },

]
