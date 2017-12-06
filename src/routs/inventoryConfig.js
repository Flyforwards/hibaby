/**
 * Created by FLyforwards on 2017/11/21.
 */

import registerModel from './register';

export default (app)  => [
  //仓库设置
  {
    path: '/inventory/warehouse',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/inventory'));
        cb(null, require('page/inventory/warehouse/WarehouseIndex.js'))
      })
    }
  },
  //仓库详情
  {
    path: '/inventory/warehouse/detail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/inventory'));
        cb(null, require('page/inventory/warehouse/WarehouseDetail.js'))
      })
    }
  },
  //仓库编辑
  {
    path: '/inventory/warehouse/edit',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/inventory'));
        cb(null, require('page/inventory/warehouse/WarehouseEdit.js'))
      })
    }
  },
  //仓库明细
  {
    path: '/inventory/warehouse-inventory',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/inventory'));
        cb(null, require('page/inventory/inventory/InventoryIndex.js'))
      })
    }
  },

  //存货分类
  {
    path: '/inventory/classification',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/classification'));
        cb(null, require('page/inventory/classification/classificationIndex.js'))
      })
    }
  },
  //存货档案
  {
    path: '/inventory/archives',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/inventoryArchives'));
        cb(null, require('page/inventory/archives/MainView.js'))
      })
    }
  },


  //辅助属性
  {
    path: '/inventory/ancillary',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/ancillary'));
        cb(null, require('page/inventory/ancillary/ancillaryIndex.js'))
      })
    }
  },



]
