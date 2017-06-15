import * as prepareMealsService from '../services/prepareMeals'
import { parse } from 'qs'
export default {
  namespace: 'prepareMeals',
  state: {
    dayInfo: [
      [{
        week: '第一周'
      }, {
        day: 1,
        value: {
          'week': '1',
          'day': '1'
        },
        checked: true
      }, {
        day: 2,
        value: {
          'week': '1',
          'day': '2'
        }
      }, {
        day: 3,
        value: {
          'week': '1',
          'day': '3'
        }
      }, {
        day: 4,
        value: {
          'week': '1',
          'day': '4'
        }
      }, {
        day: 5,
        value: {
          'week': '1',
          'day': '5'
        }
      }, {
        day: 6,
        value: {
          'week': '1',
          'day': '6'
        }
      }, {
        day: 7,
        value: {
          'week': '1',
          'day': '7'
        }
      }], [{
        week: '第二周'
      }
        , {
          day: 1,
          value: {
            'week': '2',
            'day': '1'
          }
        }, {
          day: 2,
          value: {
            'week': '2',
            'day': '2'
          }
        }, {
          day: 3,
          value: {
            'week': '2',
            'day': '3'
          }
        }, {
          day: 4,
          value: {
            'week': '2',
            'day': '4'
          }
        }, {
          day: 5,
          value: {
            'week': '2',
            'day': '5'
          }
        }, {
          day: 6,
          value: {
            'week': '2',
            'day': '6'
          }
        }, {
          day: 7,
          value: {
            'week': '2',
            'day': '7'
          }
        }], [{
        week: '第三周'
      }
        , {
          day: 1,
          value: {
            'week': '3',
            'day': '1'
          }
        }, {
          day: 2,
          value: {
            'week': '3',
            'day': '2'
          }
        }, {
          day: 3,
          value: {
            'week': '3',
            'day': '3'
          }
        }, {
          day: 4,
          value: {
            'week': '3',
            'day': '4'
          }
        }, {
          day: 5,
          value: {
            'week': '3',
            'day': '5'
          }
        }, {
          day: 6,
          value: {
            'week': '3',
            'day': '6'
          }
        }, {
          day: 7,
          value: {
            'week': '3',
            'day': '7'
          }
        }], [{
        week: '第四周'
      }
        , {
          day: 1,
          value: {
            'week': '4',
            'day': '1'
          }
        }, {
          day: 2,
          value: {
            'week': '4',
            'day': '2'
          }
        }, {
          day: 3,
          value: {
            'week': '4',
            'day': '3'
          }
        }, {
          day: 4,
          value: {
            'week': '4',
            'day': '4'
          }
        }, {
          day: 5,
          value: {
            'week': '4',
            'day': '5'
          }
        }, {
          day: 6,
          value: {
            'week': '4',
            'day': '6'
          }
        }, {
          day: 7,
          value: {
            'week': '4',
            'day': '7'
          }
        }], [{
        week: '第五周'
      }
        , {
          day: 1,
          value: {
            'week': '5',
            'day': '1'
          }
        }, {
          day: 2,
          value: {
            'week': '5',
            'day': '2'
          }
        }, {
          day: 3,
          value: {
            'week': '5',
            'day': '3'
          }
        }, {
          day: 4,
          value: {
            'week': '5',
            'day': '4'
          }
        }, {
          day: 5,
          value: {
            'week': '5',
            'day': '5'
          }
        }, {
          day: 6,
          value: {
            'week': '5',
            'day': '6'
          }
        }, {
          day: 7,
          value: {
            'week': '5',
            'day': '7'
          }
        }], [
        {
          week: '高档食材'
        }, {
          day: 1,
          value: {
            'week': '0',
            'day': '1'
          }
        }, {
          day: 2,
          value: {
            'week': '0',
            'day': '2'
          }
        }, {
          day: 3,
          value: {
            'week': '0',
            'day': '3'
          }
        }, {
          day: 4,
          value: {
            'week': '0',
            'day': '4'
          }
        }, {
          day: 5,
          value: {
            'week': '0',
            'day': '5'
          }
        }
      ]
    ],
    defaultValueRadio: { 'week': '1', 'day': '1' },
    heightFoodInfo: {},
    menuInfo: []
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
        switch (v.type) {
          case 0:
            heightFood.push(v);
            menuInfo[0] = { title: '高档食材', info: heightFood };
            //heightFood.push(v);
            //heightFoodInfo = { title: '高档食材', heightFood }
            break;
          case 1:
            breakfast.push(v);
            menuInfo[0] = { title: '早餐', info: breakfast };
            break;
          case 2:
            breakfastAdd.push(v);
            menuInfo[1] = { title: '早加', info: breakfastAdd };
            break;
          case 3:
            lunch.push(v);
            menuInfo[2] = { title: '午餐', info: lunch };
            break;
          case 4:
            lunchAdd.push(v);
            menuInfo[3] = { title: '午加', info: lunchAdd };
            break;
          case 5:
            dinner.push(v);
            menuInfo[4] = { title: '晚餐', info: dinner };
            break;
          case 6:
            dinnerAdd.push(v);
            menuInfo[5] = { title: '晚加', info: dinnerAdd };
            break;
          default:
            return menuInfo;
        }
      })
      return { ...state,menuInfo }
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
    }
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        
        if (pathname === '/meals/dishes/prepareMeals') {
          dispatch({
            type: 'getMenuByDay',
            payload: {
              'day': '1',
              'week': '1'
            }
          });
        }
      })
    }
  }
}
