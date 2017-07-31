
import registerModel from './register';

export default (app) => [
  // 房间管理
  {
    path: '/chamber/roomindex',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/roomManagement'));
        cb(null, require('page/guestRoom/roomManagement/roomManagementIndex'))
      })
    }
  },
  // 创建房间
  {
    path: '/chamber/roomindex/creatroom',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/roomManagement'));
        cb(null, require('page/guestRoom/roomManagement/creatGuestRoom'))
      })
    }
  },
  //房间详情
  {
    path: '/chamber/roomindex/roomdetail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/roomManagement'));
        cb(null, require('page/guestRoom/roomManagement/creatGuestRoom'))
      })
    }
  },
  // 房态管理
  {
    path: '/chamber/roomstatusindex',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/roomStatusManagement'));
        cb(null, require('page/guestRoom/roomStatusManagement/roomStatusManagementIndex'))
      })
    }
  },
]
