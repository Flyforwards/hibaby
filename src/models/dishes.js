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
    dishesPageList : [],//菜品信息分页数据
    total : 0,
    page : 1,
    size : 5,
    initialValue : null,
    dishesLibraryNodes : null,
  },
  //加载页面
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,query }) => {
        if (pathname === '/meals/dishes/dishesDetail'){
          if(query.dataId){
            dispatch({
              type: 'getDishesById',
              payload:{
                dataId : query.dataId
              }
            });
          }
        }else if(pathname === '/meals/dishes/addDishes'){
          dispatch({type : 'clearDishesDetail'});
        }
      });
    }
  },
  //调用服务器端接口
  effects: {
    //获取左侧菜品库列表数据
    *getDishesLibraryNodes({payload : values}, { call, put,select }){
      const {data: { data,code,err} } = yield call(dishesService.getDishesLibraryNodes, values);
      if (code == 0) {
        //更新state
        yield put({type:'setDishesLibraryNodes',payload:{data}} );
      }
    },
    //删除菜品库节点信息
    *deleteDishesLibraryNodes({payload : values}, { call, put,select }){
      const {data: { data,code,err} } = yield call(dishesService.deleteDishesLibrary, values);
      if (code == 0) {
        yield put({type:'getDishesLibraryNodes'} );
      }
    },
    //获取菜品信息分页数据
    *getDishesPageList({payload : values}, { call, put }){
      const {data: { data, total, page, size, code,err} } = yield call(dishesService.getDishesPageList, values);
      if (code == 0) {
        //更新state
        yield put({type:'setDishesPageList',payload:{data,total,page,size}} );
      }
    },
    //获取菜品详情
    *getDishesById({payload : values}, { call, put }){
      const {data: { data, code,err} } = yield call(dishesService.getDishesById, values);
      if (code == 0) {
        //更新state
        yield put({type:'setDishesDetail',payload:{dishesInfo : data}} );
      }
    },
    //保存菜品信息
    *saveDishes({payload : values}, { call, put }){
      const {data: { data, code,err} } = yield call(dishesService.saveDishes, values);
      if (code == 0) {
        //更新state
        message.info("菜品信息保存成功");
        yield put({type:'setDishesDetail',payload:{dishesInfo : data}} );
      }
    },
    //删除菜品信息
    *deleteDishes({payload : values}, { call, put,select }){
      const {data: { data, code,err} } = yield call(dishesService.deleteDishes, values);
      if (code == 0) {
        //更新state
        message.success("删除菜品信息成功");
        const state = yield select(state => state.dishes);
        yield put({
          type: 'getDishesPageList',
          payload : {
            nodeId : 1,
            page : state.page,
            size : state.size
          }
        });
      }
    },

  },
  //同步请求，更新state
  reducers: {
    setDishesLibraryNodes(state, { payload: {data: data} }){
      return {...state,dishesLibraryNodes: data}
    },
    setDishesPageList(state, { payload: {data: dishesPageList, total, page, size} }){
      let dishesdata = {
        ...state,
        dishesPageList,
        total,
        page,
        size,
      };
      let range = {
        start: page == 1 ? 1 : (page - 1) * size + 1,
        end: page == 1 ? dishesPageList.length : (page - 1) * 10 + dishesPageList.length,
        totalpage: Math.ceil(total / size)
      }
      return {...dishesdata,range}
    },
    setDishesDetail(state, { payload: {dishesInfo} }){
      return {...state,initialValue: dishesInfo}
    },
    clearDishesDetail(state){
      return {...state,initialValue: null}
    }
  }
};
