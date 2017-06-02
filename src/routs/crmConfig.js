
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
    path: '/crm/customer/AddCustomerInformation',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
         registerModel(app, require('models/addCourse'));
        registerModel(app, require('models/addCustomer'));
        registerModel(app, require('models/healthInformation'));
        cb(null, require('page/crm/customer/addCustomer.jsx'))
      })
    }
  },
  //编辑客户信息
  {
    path: '/crm/customer/Edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/addCustomer'));
        registerModel(app, require('models/addCourse'));
        registerModel(app, require('models/healthInformation'));
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
    path: '/crm/customer/customerDetails',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/addCustomer'));
        registerModel(app, require('models/addCourse'));
        registerModel(app, require('models/membershipcard'));
        registerModel(app, require('models/healthInformation'));
        cb(null, require('page/crm/customer/addCustomer.jsx'))
      })
    }
  },

    // 套餐
    {
      path: '/crm/serviceinfo',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/serviceinfo.jsx'))
        })
      }
    },
    // 添加套餐
    {
      path: '/crm/serviceinfo/addservice',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/addService.jsx'))
        })
      }
    },
     // 添加套房
    {
      path: '/crm/serviceinfo/addsuite',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/addSuite.jsx'))
        })
      }
    },
    //查看套房
    {
      path: '/crm/serviceinfo/viewsuite',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/viewSuite.jsx'))
        })
      }
    },
    //查看套餐
    {
      path: '/crm/serviceinfo/viewservice',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/viewService.jsx'))
        })
      }
    },
    //编辑套餐
    {
      path: '/crm/serviceinfo/editservice',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/editService.jsx'))
        })
      }
    },
    //编辑套房
    {
      path: '/crm/serviceinfo/editsuite',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/editSuite.jsx'))
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
      path: '/crm/commodity/addcommodity',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/addCommodity.jsx'))
        })
      }
    },
    // 查看商品详情
    {
      path: '/crm/commodity/viewcommodity',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/packageInfo'));
          cb(null, require('page/crm/product/viewCommodity.jsx'))
        })
      }
    },
     // 编辑商品
    {
      path: '/crm/commodity/editcommodity',
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
]
