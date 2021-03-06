import * as prepareMealsService from '../services/editMenu';
import { parse } from 'qs';
import { message } from 'antd';
import $ from 'jquery';
import { format,queryURL } from '../utils/index.js';

export default {
  namespace: 'prepareMealsDinner',
  state: {
    vdType: [],
    mvType: [],
    //week: 1, day: 1, colorType: "#fff"
    defaultValueRadio: { },
    heightFoodInfo: {},
    visible: false,
    topVisible: false,
    chooseVisibleInfo: false,
    dishesPageInfo: [],
    cardLevelInfo: [],
    findMenuInfo: [],
    dayInfo: [
      {
        weekName: '第一周',
        info: [
          {
            week: 1,
            day: 1,
            colorType: '#fff'
          }, {
            week: 1,
            day: 2,
            colorType: '#fff'

          }, {
            week: 1,
            day: 3,
            colorType: '#fff'

          }, {
            week: 1,
            day: 4,
            colorType: '#fff'

          }, {
            week: 1,
            day: 5,
            colorType: '#fff'

          }, {
            week: 1,
            day: 6,
            colorType: '#fff'

          }, {
            week: 1,
            day: 7,
            colorType: '#fff'
          }
        ]
      }, {
        weekName: '第二周',
        info: [
          {
            week: 2,
            day: 1,
            colorType: '#fff'
          }, {
            week: 2,
            day: 2,
            colorType: '#fff'
          }, {
            week: 2,
            day: 3,
            colorType: '#fff'
          }, {
            week: 2,
            day: 4,
            colorType: '#fff'
          }, {
            week: 2,
            day: 5,
            colorType: '#fff'
          }, {
            week: 2,
            day: 6,
            colorType: '#fff'
          }, {
            week: 2,
            day: 7,
            colorType: '#fff'
          }
        ]
      }, {
        weekName: '第三周',
        info: [
          {
            week: 3,
            day: 1,
            colorType: '#fff'
          }, {
            week: 3,
            day: 2,
            colorType: '#fff'
          }, {
            week: 3,
            day: 3,
            colorType: '#fff'
          }, {
            week: 3,
            day: 4,
            colorType: '#fff'
          }, {
            week: 3,
            day: 5,
            colorType: '#fff'
          }, {
            week: 3,
            day: 6,
            colorType: '#fff'
          }, {
            week: 3,
            day: 7,
            colorType: '#fff'
          }
        ]
      }, {
        weekName: '第四周',
        info: [
          {
            week: 4,
            day: 1,
            colorType: '#fff'
          }, {
            week: 4,
            day: 2,
            colorType: '#fff'
          }, {
            week: 4,
            day: 3,
            colorType: '#fff'
          }, {
            week: 4,
            day: 4,
            colorType: '#fff'
          }, {
            week: 4,
            day: 5,
            colorType: '#fff'
          }, {
            week: 4,
            day: 6,
            colorType: '#fff'
          }, {
            week: 4,
            day: 7,
            colorType: '#fff'
          }
        ]
      }, {
        weekName: '第五周',
        info: [
          {
            week: 5,
            day: 1,
            colorType: '#fff'
          }, {
            week: 5,
            day: 2,
            colorType: '#fff'
          }, {
            week: 5,
            day: 3,
            colorType: '#fff'
          }, {
            week: 5,
            day: 4,
            colorType: '#fff'
          }, {
            week: 5,
            day: 5,
            colorType: '#fff'
          }, {
            week: 5,
            day: 6,
            colorType: '#fff'
          }, {
            week: 5,
            day: 7,
            colorType: '#fff'
          }
        ]
      }, {
        weekName: '高档食材',
        info: [
          {
            week: 0,
            day: 1,
            colorType: '#fff'
          }, {
            week: 0,
            day: 2,
            colorType: '#fff'
          }, {
            week: 0,
            day: 3,
            colorType: '#fff'
          }, {
            week: 0,
            day: 4,
            colorType: '#fff'
          }, {
            week: 0,
            day: 5,
            colorType: '#fff'
          }
        ]
      }
    ],
    menuInfoLow: [
      {
        week: 1,
        day: 1,
        type: 1,
        title: '早餐',
        info: []
      }, {
        week: 1,
        day: 1,
        type: 2,
        title: '早加',
        info: []
      }, {
        week: 1,
        day: 1,
        type: 3,
        title: '午餐',
        info: []
      },
      {
        week: 1,
        day: 1,
        type: 4,
        title: '午加',
        info: []
      }, {
        week: 1,
        day: 1,
        type: 5,
        title: '晚餐',
        info: []
      },
      {
        week: 1,
        day: 1,
        type: 6,
        title: '晚加',
        info: []
      }

    ],
    menuInfo: [],
    topMenuInfoByType: {
      week: 0,
      day: 1,
      type: 0,
      pointPackage: '1',
      dishes: []
    },
    menuInfoHigh: [{
      day: 1,
      week: 0,
      type: 0,
      title: '高档食材',
      info: []
    }],
    menuInfoByType: {
      day: 1,
      type: 1,
      week: 1,
      dishes: []
    },
    lowTime: {
      week: 1,
      day: 1
    },
    highTime: {
      week: 0,
      day: 0
    },
    paginationInfo: {
      total: 200,
      current: 1
    },
    leftDish:{
      infoZero: [
        {
          dishesName: '菜一',
          number: 1
        }, {
          dishesName: '菜二',
          number: 2
        }, {
          dishesName: '菜三',
          number: 3
        }, {
          dishesName: '菜四',
          number: 4
        }, {
          dishesName: '菜五',
          number: 5
        }, {
          dishesName: '菜六',
          number: 6
        }, {
          dishesName: '菜七',
          number: 7
        }
      ],
      infoOne: [
        {
          dishesName: '菜一',
          number: 1
        }, {
          dishesName: '菜二',
          number: 2
        }, {
          dishesName: '菜三',
          number: 3
        }, {
          dishesName: '菜四',
          number: 4
        }
      ],
      infoTwo: [
        {
          dishesName: '菜一',
          number: 1
        }
      ],
      infoThr: [
        {
          dishesName: '菜一',
          number: 1
        }, {
          dishesName: '菜二',
          number: 2
        }, {
          dishesName: '菜三',
          number: 3
        }, {
          dishesName: '菜四',
          number: 4
        }, {
          dishesName: '菜五',
          number: 5
        }
      ],
      infoFor: [
        {
          dishesName: '菜一',
          number: 1
        }, {
          dishesName: '菜二',
          number: 2
        }
      ],
      infoFiv: [
        {
          dishesName: '菜一',
          number: 1
        }, {
          dishesName: '菜二',
          number: 2
        }, {
          dishesName: '菜三',
          number: 3
        }, {
          dishesName: '菜四',
          number: 4
        }, {
          dishesName: '菜五',
          number: 5
        }
      ],
      infoSix: [
        {
          dishesName: '菜一',
          number: 1
        }, {
          dishesName: '菜二',
          number: 2
        }
      ]
    }

  },
  reducers: {
    getVdtype(state, { payload: { data: vdType } }){
      return { ...state, vdType }
    },
    getMytype(state, { payload: { data: mvType } }){
      return { ...state, mvType }
    },
    changeVisible(state, { payload: { visible } }){
      return { ...state, visible }
    },
    changeTopVisible(state, { payload: { topVisible } }){
      return { ...state, topVisible }
    },
    changeLowTime(state, { payload: { postDate: lowTime } }){
      return { ...state, lowTime }
    },
    changeHighTime(state, { payload: { postDate: highTime } }){
      return { ...state, highTime }
    },
    getMenuInfo(state, { payload: { data ,values} }){
      let { menuInfoLow, lowTime, defaultValueRadio } = state;
      //defaultValueRadio = { ...values, colorType: "red" };
      if (data.length != 0) {
        let info = [];
        let nu;

        menuInfoLow.map((v,k) => {
          menuInfoLow[k].info = [];
          menuInfoLow[k].day = data[0].day;
          menuInfoLow[k].week = data[0].week;
        })
        data.map((v, k) => {
          nu = v.type - 1;
          menuInfoLow[nu].type = v.type;
          info = {
            'dishesId': v.dishesId,
            'dishesName': v.dishesName,
            'id': v.id,
            'number': v.number
          };
          menuInfoLow[nu].info.push(info);
        });

      } else {
        menuInfoLow.map((v, k) => {
          v.week = lowTime.week;
          v.day = lowTime.day;
          v.info = data
        })

      }
      return { ...state, menuInfo: menuInfoLow }

    },
    getMenuInfoHigh(state, { payload: { data } }){
      const { menuInfoHigh, highTime } = state;
      if (data.length != 0) {
        let info = [];
        menuInfoHigh[0].info = [];
        data.map((v, k) => {
          menuInfoHigh[0].day = v.day;
          menuInfoHigh[0].week = v.week;
          menuInfoHigh[0].type = v.type;
          info = {
            'dishesId': v.dishesId,
            'dishesName': v.dishesName,
            'id': v.id,
            'number': v.number
          };
          menuInfoHigh[0].info.push(info);
        });
      } else {
        menuInfoHigh[0].info = [];
        menuInfoHigh.map((v, k) => {
          v.day = highTime.day
        })

      }
      return { ...state, menuInfo: menuInfoHigh }

    },
    getMenuInfoByType(state, { payload: { data } }){
      if (data.dishes.length == 0) {
        switch (data.type) {
          case 1:
            data.dishes = [{}, {}, {}, {}];
            break;
          case 2:
            data.dishes = [{}];
            break;
          case 3:
            data.dishes = [{}, {}, {}, {}, {}];
            break;
          case 4:
            data.dishes = [{}, {}];
            break;
          case 5:
            data.dishes = [{}, {}, {}, {}, {}];
            break;
          case 6:
            data.dishes = [{}, {}];
            break;
          default:
            data.dishes = [{}];
        }
      } else {
        let add = { isDel: true };
        let length = 1;
        switch (data.type) {
          case 1:
            length = 4;
            break;
          case 2:
            length = 1;
            break;
          case 3:
            length = 5;
            break;
          case 4:
            length = 2;
            break;
          case 5:
            length = 5;
            break;
          case 6:
            length = 2;
            break;
          default:
            length = 1;
        }
        data.dishes.map((v, k) => {
          v.number > length && $.extend(v, v, add);
        })
      }
      return { ...state, menuInfoByType: data }
    },
    changeMenuInfoByType(state, { payload: { dishes } }){
      let { menuInfoByType } = state;
      menuInfoByType.dishes = dishes;
      return { ...state, menuInfoByType }
    },
    changeTopMenuInfoByType(state, { payload: { dishes } }){
      let { topMenuInfoByType } = state;
      topMenuInfoByType.dishes = dishes;
      return { ...state, topMenuInfoByType }
    },
    changePointPackage(state, { payload: { pointPackage } }){
      const { topMenuInfoByType } = state;
      topMenuInfoByType.pointPackage = pointPackage;
      return { ...state, topMenuInfoByType }
    },
    changeEatDay(state, { payload: { eatDayValue, infoKey } }){
      const { topMenuInfoByType } = state;
      topMenuInfoByType.dishes[infoKey].eatDay = eatDayValue;
      return { ...state, topMenuInfoByType }
    },
    changeEmEatDay(state, { payload: { emEatDayValue, infoKey } }){
      const { topMenuInfoByType } = state;
      topMenuInfoByType.dishes[infoKey].em_eatDay = emEatDayValue;
      return { ...state, topMenuInfoByType }
    },
    changeEmEatTime(state, { payload: { emEatTimeValue, infoKey } }){
      const { topMenuInfoByType } = state;
      topMenuInfoByType.dishes[infoKey].em_eatTime = emEatTimeValue;
      return { ...state, topMenuInfoByType }
    },
    changeEatTime(state, { payload: { eatTimeValue, infoKey } }){
      const { topMenuInfoByType } = state;
      topMenuInfoByType.dishes[infoKey].eatTime = eatTimeValue;
      return { ...state, topMenuInfoByType }
    },
    changeCycle(state, { payload: { cycleValue, infoKey } }){
      const { topMenuInfoByType } = state;
      topMenuInfoByType.dishes[infoKey].cycle = cycleValue;
      return { ...state, topMenuInfoByType }
    },
    changeEmCycle(state, { payload: { emCycleValue, infoKey } }){
      const { topMenuInfoByType } = state;
      topMenuInfoByType.dishes[infoKey].em_cycle = emCycleValue;
      return { ...state, topMenuInfoByType }
    },
    
    
    
    
    getTopMenuInfoByType(state, { payload: { data } }){
      if (data.dishes.length == 0) {
        data.dishes = [{}]
      } else {
        const add = { isDel: true };
        data.dishes.length > 1 && data.dishes.map((v, k) => {
          v.number > 1 && $.extend(v, v, add)
        })
      }
      return { ...state, topMenuInfoByType: data }
    },
    cardLevelInfo(state, { payload: { data } }){
      return { ...state, cardLevelInfo: data }
    },
    getDishesPage(state, { payload: { data: dishesPageInfo, total, page } }){
      const { paginationInfo } = state;
      paginationInfo.total = total;
      paginationInfo.current = page;
      return { ...state, dishesPageInfo, paginationInfo }
    },
    findMenu(state, { payload: { data } }){
      let { dayInfo, findMenuInfo, defaultValueRadio } = state;
      if (data.length != 0) {
        defaultValueRadio = null;
        findMenuInfo = [];
        dayInfo = [
          {
            weekName: '第一周',
            info: [
              {
                week: 1,
                day: 1,
                colorType: '#fff'
              }, {
                week: 1,
                day: 2,
                colorType: '#fff'

              }, {
                week: 1,
                day: 3,
                colorType: '#fff'

              }, {
                week: 1,
                day: 4,
                colorType: '#fff'

              }, {
                week: 1,
                day: 5,
                colorType: '#fff'

              }, {
                week: 1,
                day: 6,
                colorType: '#fff'

              }, {
                week: 1,
                day: 7,
                colorType: '#fff'
              }
            ]
          }, {
            weekName: '第二周',
            info: [
              {
                week: 2,
                day: 1,
                colorType: '#fff'
              }, {
                week: 2,
                day: 2,
                colorType: '#fff'
              }, {
                week: 2,
                day: 3,
                colorType: '#fff'
              }, {
                week: 2,
                day: 4,
                colorType: '#fff'
              }, {
                week: 2,
                day: 5,
                colorType: '#fff'
              }, {
                week: 2,
                day: 6,
                colorType: '#fff'
              }, {
                week: 2,
                day: 7,
                colorType: '#fff'
              }
            ]
          }, {
            weekName: '第三周',
            info: [
              {
                week: 3,
                day: 1,
                colorType: '#fff'
              }, {
                week: 3,
                day: 2,
                colorType: '#fff'
              }, {
                week: 3,
                day: 3,
                colorType: '#fff'
              }, {
                week: 3,
                day: 4,
                colorType: '#fff'
              }, {
                week: 3,
                day: 5,
                colorType: '#fff'
              }, {
                week: 3,
                day: 6,
                colorType: '#fff'
              }, {
                week: 3,
                day: 7,
                colorType: '#fff'
              }
            ]
          }, {
            weekName: '第四周',
            info: [
              {
                week: 4,
                day: 1,
                colorType: '#fff'
              }, {
                week: 4,
                day: 2,
                colorType: '#fff'
              }, {
                week: 4,
                day: 3,
                colorType: '#fff'
              }, {
                week: 4,
                day: 4,
                colorType: '#fff'
              }, {
                week: 4,
                day: 5,
                colorType: '#fff'
              }, {
                week: 4,
                day: 6,
                colorType: '#fff'
              }, {
                week: 4,
                day: 7,
                colorType: '#fff'
              }
            ]
          }, {
            weekName: '第五周',
            info: [
              {
                week: 5,
                day: 1,
                colorType: '#fff'
              }, {
                week: 5,
                day: 2,
                colorType: '#fff'
              }, {
                week: 5,
                day: 3,
                colorType: '#fff'
              }, {
                week: 5,
                day: 4,
                colorType: '#fff'
              }, {
                week: 5,
                day: 5,
                colorType: '#fff'
              }, {
                week: 5,
                day: 6,
                colorType: '#fff'
              }, {
                week: 5,
                day: 7,
                colorType: '#fff'
              }
            ]
          }, {
            weekName: '高档食材',
            info: [
              {
                week: 0,
                day: 1,
                colorType: '#fff'
              }, {
                week: 0,
                day: 2,
                colorType: '#fff'
              }, {
                week: 0,
                day: 3,
                colorType: '#fff'
              }, {
                week: 0,
                day: 4,
                colorType: '#fff'
              }, {
                week: 0,
                day: 5,
                colorType: '#fff'
              }
            ]
          }
        ];
        data.map((v, k) => {
          findMenuInfo.push(v.dishesId);
          dayInfo.map((n, m) => {
            n.info.map((nn, mm) => {
              nn.colorType = (nn.week == v.week && nn.day == v.day) ? 'red' : nn.colorType;
            })
          })
        })
      } else {
        findMenuInfo = [];
        defaultValueRadio = { week: 1, day: 1, colorType: "#fff" };
        dayInfo.map((n, m) => {
          n.info.map((nn, mm) => {
            nn.colorType = '#fff'
          })
        })
      }
      return { ...state, dayInfo, findMenuInfo, defaultValueRadio }
    },
    saveLowInfo(state, { payload: { postData } }){
      const { menuInfoByType } = state;
      const info = menuInfoByType.dishes[postData.number - 1];
      $.extend(info, postData)
      return { ...state, menuInfoByType }
    },
    saveHighInfo(state, { payload: { postDataHigh } }){
      const { topMenuInfoByType } = state;
      const info = topMenuInfoByType.dishes[postDataHigh.number - 1];
      $.extend(info, postDataHigh)
      return { ...state, topMenuInfoByType }
    },
    chooseVisible(state, { payload: { chooseVisibleInfo } }){
      return { ...state, chooseVisibleInfo }
    },
    dishesLibraryNodes(state, { payload: nodesInfo }){
      return { ...state, ...nodesInfo }
    },
    //顾客入驻周期
    getLoopMsg(state, { payload:{data:customerLoop}}){
      let { defaultValueRadio } = state;
      defaultValueRadio = {
        week: customerLoop.week,
        day: customerLoop.day,
        colorType: '#fff'
      };
      return { ...state,customerLoop,defaultValueRadio }
    }
  },
  effects: {
    //查询客户所在周期
    *getLoopByCustomerId({payload:values},{call,put}) {
      const dataId = queryURL('dataId');
      const value = {...values, dataId};
      const { data: {data, code}} = yield call(prepareMealsService.getLoopByCustomerId,value);
      if(code == 0) {
        yield put({
          type:'getLoopMsg',
          payload:{
            data
          }
        })
        yield put({
          type:'getMenuByDay',
          payload:{
            ...data
          }
        })
      }
    },
    //查询某一天基础食材餐单
    *getMenuByDay({ payload: values }, { call, put }) {
      const customerId = queryURL('dataId');
      const value = {...values, customerId};
      const { data: { data, code } } = yield call(prepareMealsService.getMenuByDay, value);
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
      const customerId = queryURL('dataId');
      const value = {...values, customerId};
      const { data: { data, code } } = yield call(prepareMealsService.getMenuByType, value);
      if (code == 0) {
        yield put({
          type: 'getMenuInfoByType',
          payload: {
            data,
            code,
            values
          }
        });
      }
    },

    //查询某一天高档食材餐单
    *getTopMenuByDay({ payload: values }, { call, put }) {
      const customerId = queryURL('dataId');
      const value = {...values, customerId};
      const { data: { data, code } } = yield call(prepareMealsService.getTopMenuByDay, value);
      if (code == 0) {
        yield put({
          type: 'getMenuInfoHigh',
          payload: {
            data,
            code
          }
        });
      }
    },

    //查询某一餐高档食材餐单详情
    *getTopMenuByType({ payload: values }, { call, put }) {
      const customerId = queryURL('dataId');
      const value = {...values, customerId};
      const { data: { data, code } } = yield call(prepareMealsService.getTopMenuByType, value);
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
      const customerId = queryURL('dataId');
      const value = {...values, customerId};
      const { data: { data, code } } = yield call(prepareMealsService.getMenuByDishes, value);
      if (code == 0) {
        yield put({
          type: 'findMenu',
          payload: {
            data
          }
        });
        if (data.length != 0) {
          data[0].week == 0 ?
            yield put({
              type: 'getTopMenuByDay',
              payload: {
                'day': data[0].day,
                'week': data[0].week
              }
            }) : yield put({
            type: 'getMenuByDay',
            payload: {
              'day': data[0].day,
              'week': data[0].week
            }
          });
        }else {
          message.error('没有这道菜！')
        }
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
    },

    //加载菜品库列表
    *getDishesLibraryNodes({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(prepareMealsService.getDishesLibraryNodes, values);
      if (code == 0) {
        yield put({
          type: 'dishesLibraryNodes',
          payload: {
            nodesInfo: data
          }
        });
      }
    },

    //根据菜品库id获取菜品分页列表
    *getDishesPageList({ payload: values }, { call, put }){
      const { data: { data, code, page, size, total } } = yield call(prepareMealsService.getDishesPageList, values);
      if (code == 0) {
        yield put({
          type: 'getDishesPage',
          payload: {
            data,
            page,
            total
          }
        });
      }
    },

    //保存基础餐单
    *saveMenu({ payload: values }, { call, put }){
      const customerId = queryURL('dataId');
      const value = {...values, customerId};
      const { data: { code, data } } = yield call(prepareMealsService.saveMenu, value);
      if (code == 0) {
        data == '' ? message.success('保存成功!') : message.success(`${data}!保存成功!`)
        yield put({
          type: 'changeVisible',
          payload: {
            visible: false
          }
        })
        yield put({
          type: 'getMenuByDay',
          payload: {
            week: values.week,
            day: values.day,
            type: values.type
          }
        })
        ;
      }
    },

    //保存高档食材的餐单
    *saveTopMenu({ payload: values }, { call, put }){
      const customerId = queryURL('dataId');
      const value = {...values, customerId};
      const { data: { code, data } } = yield call(prepareMealsService.saveTopMenu, value);
      if (code == 0) {
        data == '' ? message.success('保存成功!') : message.success(`${data}!保存成功!`)
        yield put({
          type: 'changeTopVisible',
          payload: {
            topVisible: false
          }
        })
        yield put({
          type: 'getTopMenuByDay',
          payload: {
            week: values.week,
            day: values.day,
            type: values.type
          }
        });
      }
    },
    //根据字典主表别名和删除标识获取字典
    *getDictionary({ payload: values }, { call, put, select }){
      const { data: { data, code, err } } = yield call(prepareMealsService.getDictionary, values);
      if (code == 0) {
        if (values.abName === 'MVTYPE') {
          yield put({
            type: 'getMytype',
            payload: {
              data
            }
          })
        }
        if (values.abName === 'VDTYPE') {
          yield put({
            type: 'getVdtype',
            payload: {
              data
            }
          })
        }
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {

        if (pathname === '/meals/nutritionist/editmenu') {
         dispatch({
            type:'getLoopByCustomerId',
          });
          dispatch({
            type: 'getCardLevel',
            payload: {}
          });
          dispatch({
            type: 'getDishesLibraryNodes',
            payload: {}
          });
          dispatch({
            type: 'getDishesPageList',
            payload: {
              'nodeId': 1,
              'page': 1,
              'size': 10
            }
          });
          dispatch({
            type: 'getDictionary',
            payload: {
              abName: "MVTYPE",
              softDelete: 0
            }
          });
          dispatch({
            type: 'getDictionary',
            payload: {
              abName: "VDTYPE",
              softDelete: 0
            }
          });
        }
      })
    }
  }
}
