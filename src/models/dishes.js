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
    size : 10,
    initialValue : null,
    dishesLibraryNodes : null,
    nodeId : 1,
    mvTypeData : [],//荤素类型
    vdTypeData : [],//菜品类型
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
    *getDictionary({payload : values}, { call, put,select }){
      values.softDelete = 0;
      const {data: { data,code,err} } = yield call(dishesService.getDictionary, values);
      if (code == 0) {
        //更新state
        let result = null;
        if(values.abName === 'MVTYPE'){
          result = {
            mvTypeData : data
          }
        }else{
          result = {
            vdTypeData : data
          }
        }
        yield put({type:'setDictionary',payload:{result}} );
      }
    },
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
        message.success("删除该菜品库节点成功");
        yield put({type:'getDishesLibraryNodes'} );
      }
    },
    //新增菜品库节点信息
    *saveDishesLibrary({payload : values}, { call, put,select }){
      const {data: { data,code,err} } = yield call(dishesService.saveDishesLibrary, values);
      if (code == 0) {
        message.success("信息保存成功");
        yield put({type:'getDishesLibraryNodes'} );
      }
    },
    //修改菜品库节点信息
    *updateDishesLibrary({payload : values}, { call, put,select }){
      const {data: { data,code,err} } = yield call(dishesService.updateDishesLibrary, values);
      if (code == 0) {
        message.success("信息修改成功");
        yield put({type:'getDishesLibraryNodes'} );
      }
    },
    //获取菜品信息分页数据
    *getDishesPageList({payload : values}, { call, put }){
      const {data: { data, total, page, size, code,err} } = yield call(dishesService.getDishesPageList, values);
      if (code == 0) {
        //更新state
        yield put({type:'setDishesPageList',payload:{data,total,page,size,nodeId:values.nodeId}} );
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
        message.success("菜品信息保存成功");
        yield put(routerRedux.push(`/meals/dishes/dishesDetail?dataId=${data.id}`))
      }
    },
    //删除菜品信息
    *deleteDishes({payload : values}, { call, put,select }){
      const {data: { data, code,err} } = yield call(dishesService.deleteDishes, values);
      if (code == 0) {
        //更新state
        message.success("删除菜品信息成功");
        yield put({type:'getDishesLibraryNodes'} );
        const state = yield select(state => state.dishes);
        yield put({
          type: 'getDishesPageList',
          payload : {
            nodeId : state.nodeId,
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
    setDishesPageList(state, { payload: {data: dishesPageList, total, page, size,nodeId} }){
      let dishesData = {
        ...state,
        dishesPageList,
        total,
        page,
        size,
        nodeId
      };
      let range = {
        start: page == 1 ? 1 : (page - 1) * size + 1,
        end: page == 1 ? dishesPageList.length : (page - 1) * 10 + dishesPageList.length,
        totalpage: Math.ceil(total / size)
      }
      return {...dishesData,range}
    },
    setDishesDetail(state, { payload: {dishesInfo} }){
      return {...state,initialValue: dishesInfo}
    },
    clearDishesDetail(state){
      return {...state,initialValue: null}
    },
    setDictionary(state, { payload: {result} }){
      return {...state,...result}
    }
  }
};
