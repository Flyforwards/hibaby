
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
          cb(null, require('page/system/position/PositionIndex.jsx'))
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
      path: '/system/organization/view-info',
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
      path: '/system/group-char',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/save'));
          cb(null, require('page/system/management/management.jsx'))
        })
      }
    },
    // 地方字段
    {
      path: '/system/local-char',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/localData'));
          cb(null, require('page/system/place/place.jsx'))
        })
      }
    },
    //服务项目
    {
      path: '/system/service-item',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/service'));
          cb(null, require('page/system/service/service.jsx'))
        })
      }
    },
    //添加服务项目
    {
      path: '/system/service-item/add',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/service'));
          cb(null, require('page/system/service/Addservice.jsx'))
        })
      }
    },
    //查看服务详情
    {
      path: '/system/service-item/detail',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/service'));
          cb(null, require('page/system/service/LookService.jsx'))
        })
      }
    },
    //编辑服务信息
    {
      path: '/system/service-item/edit',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/service'));
          cb(null, require('page/system/service/Editser.jsx'))
        })
      }
    },
    //  添加集团字段
    {
      path: '/system/group-char/add',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/save'));
          cb(null, require('page/system/management/Add.js'))
        })
      }
    },
    //  添加地方字段
    {
      path: '/system/local-char/add',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/localData'));
          cb(null, require('page/system/place/Add.js'))
        })
      }
    },
    //  集团字段详情
    {
      path: '/system/group-char/detail',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/save'));
          cb(null, require('page/system/management/check.js'))
        })
      }
    },
    //  编辑集团字段
    {
      path: '/system/group-char/edit',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/save'));
          cb(null, require('page/system/management/edit.js'))
        })
      }
    },
    //  地方字段详情
    {
      path: '/system/local-char/detail',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/localData'));
          cb(null, require('page/system/place/find.js'))
        })
      }
    },
    //  编辑地方字段
    {
      path: '/system/local-char/edit',
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
          registerModel(app, require('models/module'));
          cb(null, require('page/system/module/module.jsx'))
        })
      }
    },
  // 日志查看
    {
      path: '/system/logs',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/system'));
          cb(null, require('page/system/LogView/LogView.jsx'))
        })
      }
    },
  // 权限管理内部,权限表的维护
    {
      path: '/system/permission-inside',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          registerModel(app, require('models/myPermission'));
          cb(null, require('page/system/permission-in/fromModal.jsx'))
        })
      }
    },
  // 官网管理
  {
    path: '/system/website-manage',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/website'));
        cb(null, require('page/system/website-manage/WebsiteBanner.js'))
      })
    }
  },
  //官网管理 ---添加banner图片
  {
    path: '/system/website-manage/add',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/website'));
        cb(null, require('page/system/website-manage/WebsiteBannerAdd.js'))
      })
    }
  },
  //官网管理---专家介绍
  {
    path:'/system/website-manage/expert',
    getComponent:(location,cb) => {
      require.ensure([],(require) => {
        registerModel(app,require('models/website'));
        cb(null,require('page/system/website-manage/ExpertIntroduction.js'))
      })
    }
  },
  //官网管理---妈妈课程
  {
    path:'/system/website-manage/course',
    getComponent:(location,cb) => {
      require.ensure([],(require) => {
        registerModel(app,require('models/website'));
        cb(null,require('page/system/website-manage/WebCourse.js'))
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
