import * as prepareMealsService from '../services/prepareMeals'
import { parse } from 'qs'
export default {
  namespace: 'prepareMeals',
  state: {
    changeBorder: { 'borderColor': 'red' },
    dayInfo: [
      {
        weekName: '第一周',
        info: [
          {
            week: 1,
            day: 1
          }, {
            week: 1,
            day: 2
          }, {
            week: 1,
            day: 3
          }, {
            week: 1,
            day: 4
          }, {
            week: 1,
            day: 5
          }, {
            week: 1,
            day: 6
          }, {
            week: 1,
            day: 7
          }
        ]
      }, {
        weekName: '第二周',
        info: [
          {
            week: 2,
            day: 1
          }, {
            week: 2,
            day: 2
          }, {
            week: 2,
            day: 3
          }, {
            week: 2,
            day: 4
          }, {
            week: 2,
            day: 5
          }, {
            week: 2,
            day: 6
          }, {
            week: 2,
            day: 7
          }
        ]
      }, {
        weekName: '第三周',
        info: [
          {
            week: 3,
            day: 1
          }, {
            week: 3,
            day: 2
          }, {
            week: 3,
            day: 3
          }, {
            week: 3,
            day: 4
          }, {
            week: 3,
            day: 5
          }, {
            week: 3,
            day: 6
          }, {
            week: 3,
            day: 7
          }
        ]
      }, {
        weekName: '第四周',
        info: [
          {
            week: 4,
            day: 1
          }, {
            week: 4,
            day: 2
          }, {
            week: 4,
            day: 3
          }, {
            week: 4,
            day: 4
          }, {
            week: 4,
            day: 5
          }, {
            week: 4,
            day: 6
          }, {
            week: 4,
            day: 7
          }
        ]
      }, {
        weekName: '第五周',
        info: [
          {
            week: 5,
            day: 1
          }, {
            week: 5,
            day: 2
          }, {
            week: 5,
            day: 3
          }, {
            week: 5,
            day: 4
          }, {
            week: 5,
            day: 5
          }, {
            week: 5,
            day: 6
          }, {
            week: 5,
            day: 7
          }
        ]
      }, {
        weekName: '高档食材',
        info: [
          {
            week: 0,
            day: 1
          }, {
            week: 0,
            day: 2
          }, {
            week: 0,
            day: 3
          }, {
            week: 0,
            day: 4
          }, {
            week: 0,
            day: 5
          }
        ]
      }
    ],
    defaultValueRadio: { "week": 1, "day": 1 },
    heightFoodInfo: {},
    menuInfo: [],
    visible: false,
    topVisible: false,
    cardLevelInfo: [],
    menuInfoByType: {
      dishes: []
    },
    topMenuInfoByType: {
      dishes: [],
      eatDay: '1',
      eatTime: '1',
      frequency: '1',
      pointPackage: '1'
    },
    findMenuInfo: []
  },
  reducers: {
    getMenuInfo(state, { payload: { data } }){
      let menuInfo = [];
      let breakfast = [];
      let breakfastAdd = [];
      let lunch = [];
      let lunchAdd = [];
      let dinner = [];
      let dinnerAdd = [];
      let heightFood = [];
      data.map((v, k) => {
        const { week, day, type } = v;
        switch (v.type) {
          case 0:
            heightFood.push(v);
            menuInfo[0] = { title: '高档食材', day, week, info: heightFood, type };
            break;
          case 1:
            breakfast.push(v);
            menuInfo[0] = { title: '早餐', day, week, info: breakfast, type };
            break;
          case 2:
            breakfastAdd.push(v);
            menuInfo[1] = { title: '早加', day, week, info: breakfastAdd, type };
            break;
          case 3:
            lunch.push(v);
            menuInfo[2] = { title: '午餐', day, week, info: lunch, type };
            break;
          case 4:
            lunchAdd.push(v);
            menuInfo[3] = { title: '午加', day, week, info: lunchAdd, type };
            break;
          case 5:
            dinner.push(v);
            menuInfo[4] = { title: '晚餐', day, week, info: dinner, type };
            break;
          case 6:
            dinnerAdd.push(v);
            menuInfo[5] = { title: '晚加', day, week, info: dinnerAdd, type };
            break;
          default:
            return menuInfo;
        }
      })
      return { ...state, menuInfo }
    },
    changeVisible(state, { payload: { visible } }){
      return { ...state, visible }
    },
    changeTopVisible(state, { payload: { topVisible } }){
      return { ...state, topVisible }
    },
    getMenuInfoByType(state, { payload: { data } }){
      return { ...state, menuInfoByType: data }
    },
    
    getTopMenuInfoByType(state, { payload: { data } }){
      return { ...state, topMenuInfoByType: data }
    },
    findMenu(state, { payload: { data } }){
      return { ...state, findMenuInfo: data }
    },
    cardLevelInfo(state, { payload: { data } }){
      return { ...state, cardLevelInfo: data }
    },
    changeBorderInfo(state, { payload: { data } }){
      return { ...state, changeBorder: data }
    }
  },
  effects: {
    //查询某一天基础食材餐单
    *getMenuByDay({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(prepareMealsService.getMenuByDay, values);
      if (code == 0) {
        yield put({
          type: 'getMenuInfo',
          payload: {
            data,
            code
          }
        });
      }
    },
    //查询某一餐基础餐单详情
    *getMenuByType({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(prepareMealsService.getMenuByType, values);
      if (code == 0) {
        yield put({
          type: 'getMenuInfoByType',
          payload: {
            data,
            code
          }
        });
      }
    },
    
    //查询某一天高档食材餐单
    *getTopMenuByDay({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(prepareMealsService.getTopMenuByDay, values);
      if (code == 0) {
        yield put({
          type: 'getMenuInfo',
          payload: {
            data,
            code
          }
        });
      }
    },
    //查询某一餐高档食材餐单详情
    *getTopMenuByType({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(prepareMealsService.getTopMenuByType, values);
      if (code == 0) {
        yield put({
          type: 'getTopMenuInfoByType',
          payload: {
            data,
            code
          }
        });
      }
    },
    
    //根据菜名查询餐单
    *getMenuByDishes({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(prepareMealsService.getMenuByDishes, values);
      if (code == 0) {
        yield put({
          type: 'findMenu',
          payload: {
            data,
            code
          }
        });
      }
    },
    
    
    //获取针对套餐
    *getCardLevel({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(prepareMealsService.getCardLevel, values);
      if (code == 0) {
        yield put({
          type: 'cardLevelInfo',
          payload: {
            data
          }
        });
      }
    }
    
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        
        if (pathname === '/meals/dishes/prepareMeals') {
          dispatch({
            type: 'getCardLevel',
            payload: {}
          });
        }
      })
    }
  }
}
