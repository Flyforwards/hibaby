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
        cb(null, require('page/meals/nutritionist/CustomerIndex.jsx'))
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
    path: '/meals/dishes/addDishes',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        registerModel(app, require('models/dishes'));
        cb(null, require('page/meals/dishes/DishesFormPage.js'))
      })
    }
  },
]
