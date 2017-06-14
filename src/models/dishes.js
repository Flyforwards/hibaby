/**
 * 菜品管理
 * Created by yangjingjing on 2017/6/1.
 */
import * as dishesService from '../services/dishes';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
export default {

  namespace: 'dishes',

  state: {
    dishesPageList : [],
    initialValue : null
  },
  //加载页面
  subscriptions: {

  },
  //调用服务器端接口
  effects: {
    //获取菜品信息分页数据
    *getDishesPageList({payload : values}, { call, put }){
      const {data: { data, code,err} } = yield call(dishesService.getDishesPageList, values);
      if (code == 0) {
        //更新state
        yield put({type:'setDishesPageList',payload:{data}} );
      }
    },
    //获取菜品详情
    *getDishesById({payload : values}, { call, put }){
      const {data: { data, code,err} } = yield call(dishesService.getDishesById, values);
      if (code == 0) {
        //更新state
        yield put({type:'setDishesDetail',payload:{data}} );
      }
<<<<<<< HEAD
      // const data = {
      //   id : 1,
      //   name : '红烧鲫鱼',
      //   mvType : 1,
      //   vdType : 1,
      //   nodeId : 1,
      //   IngredientsDOs : [{
      //     id : 1,
      //     dishesId : 1,
      //     type : 1,
      //     name : '土豆',
      //     volume : 50
      //   },{
      //     id : 2,
      //     dishesId : 1,
      //     type : 2,
      //     name : '西红柿',
      //     volume : 50
      //   },{
      //     id : 3,
      //     dishesId : 1,
      //     type : 2,
      //     name : '鸡蛋',
      //     volume : 50
      //   }]
      // };
      put({type:'setDishesDetail',payload:{data}} );
=======
>>>>>>> 568f158317c2623da80397a65d778aae32a06185
    },
    //保存菜品信息
    *saveDishes({payload : values}, { call, put }){
      const {data: { data, code,err} } = yield call(dishesService.saveDishes, values);
      if (code == 0) {
        //更新state
        message.info("菜品信息保存成功");
        yield put({type:'setDishesDetail',payload:{data}} );
      }
    },
    //删除菜品信息
    *deleteDishes({payload : values}, { call, put }){
      const {data: { data, code,err} } = yield call(dishesService.deleteDishes, values);
      if (code == 0) {
        //更新state
        message.success("删除客户成功");
        yield put({
          type: 'getDishesPageList',
        });
      }
    },

  },
  //同步请求，更新state
  reducers: {
    setDishesDetail(state, { payload: data }){
      message.info("111111111111");
      return {...state,initialValue: data}
    },
    clearDishesDetail(state){
      return {...state,initialValue: null}
    }
  }
};
