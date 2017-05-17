
import registerModel from './register'

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
    // 会员卡管理
    {
      path: '/crm/infoCard',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/crm/infocard/InfoCard.jsx'))
        })
      }
    },
]

