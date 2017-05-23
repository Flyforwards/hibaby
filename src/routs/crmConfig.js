
import registerModel from './register';

export default (app) => [
    // 客户档案
    {
      path: '/crm/customer',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/system'));
          cb(null, require('page/crm/customer/Customer.jsx'))
        })
      }
    },
    //客户列表
    {
      path: '/crm/customer/AddCustomerInfo',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
         registerModel(app, require('models/addCustomer'));
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
    //套房
    {
      path: '/crm/suite',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/crm/product/InfoCard.jsx'))
        })
      }
    },
    //商品
    {
      path: '/crm/commodity',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/crm/product/InfoCard.jsx'))
        })
      }
    },
    // 会员卡管理
    {
      path: '/crm/info-card',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/crm/infocard/InfoCard.jsx'))
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
      path: '/crm/cardInfo',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/card'));
          cb(null, require('page/crm/infocard/card/cardInfo.js'))
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
