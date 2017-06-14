/**
 * 膳食管理
 * Created by yangjingjing on 2017/6/12.
 */
import registerModel from './register';

export default (app) => [
  //菜品管理
  {
    path: '/meals/dishes',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/dishes'));
        cb(null, require('page/meals/dishes/DishesIndex.js'))
      })
    }
  },
  //预备调餐
  {
    path: '/meals/nutritionist/dinner',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
         registerModel(app, require('models/dinner'));
        cb(null, require('page/meals/nutritionist/dinnerList.jsx'))
      })
    }
  },
  //编辑餐单界面
  {
    path: '/meals/nutritionist/editmenu',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
         registerModel(app, require('models/dinner'));
        cb(null, require('page/meals/nutritionist/editMenu.jsx'))
      })
    }
  },
  //添加禁忌页面
  {
    path: '/meals/nutritionist/taboo',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
         registerModel(app, require('models/dinner'));
        cb(null, require('page/meals/nutritionist/Taboo.jsx'))
      })
    }
  },
   //编辑禁忌页面
  {
    path: '/meals/nutritionist/taboo/edittaboo',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
         registerModel(app, require('models/dinner'));
        cb(null, require('page/meals/nutritionist/editTaboo.jsx'))
      })
    }
  },
  //导出餐单页面
  {
    path: '/meals/nutritionist/taboo/export',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
         registerModel(app, require('models/dinner'));
        cb(null, require('page/meals/nutritionist/export.jsx'))
      })
    }
  },
  //循环界面
  {
    path: '/meals/nutritionist/cycle',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/addCustomer'));
        cb(null, require('page/meals/nutritionist/Dinner.jsx'))
      })
    }
  },
  //创建菜品
  {
    path: '/meals/dishes/addOrEditDishes',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/dishes'));
        cb(null, require('page/meals/dishes/DishesFormPage.js'))
      })
    }
  },
  //菜品详情
  {
    path: '/meals/dishes/dishesDetail',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/dishes'));
        cb(null, require('page/meals/dishes/DishesDetailPage.js'))
      })
    }
  }
]
