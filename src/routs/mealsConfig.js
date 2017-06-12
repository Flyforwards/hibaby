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
