import registerModel from './register';

export default (app) => [
  // 个人档案
  {
    path: '/user/information',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/users'));
        cb(null, require('page/user/userInfo/userInfoIndex.jsx'))
      })
    }
  },
  // 我的消息
  {
    path: '/user/my-message',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/users'));
        cb(null, require('page/user/myMessage/myMessageIndex.jsx'))
      })
    }
  },
  // 工作计划
  {
    path: '/user/work-plan',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/workPlanIndex'));
        cb(null, require('page/user/workPlan/workPlanIndex.jsx'))
      })
    }
  },
  //添加工作计划
  {
    path: '/user/work-plan-add',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/workPlanIndex'));
        cb(null, require('page/user/workPlan/workPlanAdd.jsx'))
      })
    }
  },
  //编辑工作计划
  {
    path: '/user/work-plan-edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/workPlanIndex'));
        cb(null, require('page/user/workPlan/workPlanEdit.jsx'))
      })
    }
  },
  // 修改密码
  {
    path: '/user/reset-password',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/rePassword'));
        cb(null, require('page/user/resetPass/resetPassIndex.jsx'))
      })
    }
  },
]
