
import registerModel from './register'

export default (app) => [

  // 组织架构管理
    // 组织架构
    {
      path: '/system/organization',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/organization'));
          cb(null, require('page/system/organization/Organization.jsx'))
        })
      }
    },

    //职位管理
    {
      path: '/system/position',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/position'));
          cb(null, require('page/system/position/position.jsx'))
        })
      }
    },

    //添加用户信息
    {
      path: '/system/organization/addUser',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/organization'));
          cb(null, require('page/system/organization/addUser.jsx'))
        })
      }
    },
    //编辑用户信息
    {
      path: '/system/organization/editUser',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/organization'));
          cb(null, require('page/system/organization/editUser.jsx'))
        })
      }
    },
    //查看用户信息
    {
      path: '/system/organization/ViewTheInformation',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/organization'));
          cb(null, require('page/system/organization/ViewTheInformation.jsx'))
        })
      }
    },
  // CRM数据管理
    // 集团字段
    {
      path: '/system/groupchar',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/system'));
          cb(null, require('page/system/management/management.jsx'))
        })
      }
    },
    // 地方字段
    {
      path: '/system/localchar',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/system'));
          cb(null, require('page/system/place/place.jsx'))
        })
      }
    },
    //服务项目
    {
      path: '/system/serviceitem',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/service'));
          cb(null, require('page/system/service/service.jsx'))
        })
      }
    },
    //添加服务项目
    {
      path: '/service/Addservice',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/service'));
          cb(null, require('page/system/service/Addservice.jsx'))
        })
      }
    },
    //查看服务详情
    {
      path: '/service/LookService',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/service'));
          cb(null, require('page/system/service/LookService.jsx'))
        })
      }
    },
    //编辑服务信息
    {
      path: '/service/edit',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/service'));
          cb(null, require('page/system/service/Editser.jsx'))
        })
      }
    },
    //  添加集团字段
    {
      path: '/groupchar/add',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/save'));
          cb(null, require('page/system/management/Add.js'))
        })
      }
    },
    //  添加地方字段
    {
      path: '/localchar/add',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/localData'));
          cb(null, require('page/system/place/Add.js'))
        })
      }
    },
    //  集团字段详情
    {
      path: '/groupchar/check',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/save'));
          cb(null, require('page/system/management/check.js'))
        })
      }
    },
    //  编辑集团字段
    {
      path: '/groupchar/edit',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/save'));
          cb(null, require('page/system/management/edit.js'))
        })
      }
    },
    //  地方字段详情
    {
      path: '/localchar/find',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/localData'));
          cb(null, require('page/system/place/find.js'))
        })
      }
    },
    //  编辑地方字段
    {
      path: '/localchar/editPlace',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/localData'));
          cb(null, require('page/system/place/EditPlace.js'))
        })
      }
    },
  // 权限管理
    {
      path: '/system/permission',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/permission'));
          cb(null, require('page/system/permission/permission.jsx'))
        })
      }
    },
  // 菜单管理
    {
      path: '/system/module',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/users'));
          cb(null, require('page/system/module/module.jsx'))
        })
      }
    },
  // 日志查看
    {
      path: '/system/logsview',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/system'));
          cb(null, require('page/system/LogView/LogView.jsx'))
        })
      }
    },
  // 权限管理内部,权限表的维护
    {
      path: '/frommodal',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/system'));
          cb(null, require('page/crm/Customer/fromModal.jsx'))
        })
      }
    },

    //404
    {
      path: '/404',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('page/not-found'))
        })
      }
    }
]
