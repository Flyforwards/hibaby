import * as inventoryService from '../services/inventory';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { local, session } from 'common/util/storage.js';
import { parse } from 'qs'

export default {
  namespace: 'classification',
  state: {
    title: '查看',
    visibleAdd: false,
    parent: [],
    stockPageList: [],
    visibleView: false,
    isDisabled: true,
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize: 10,
      total: null
    }
    
  },
  reducers: {
    
    getParent(state, { payload: data }){
      return { ...state, parent: data }
    },
    //getStockPage(state, { payload: info }){
    //  const { data, page, size, total } = info;
    //
    //  return { ...state, stockPageList: data }
    //},
  
    getStockPage(state, { payload: { data, pagination }}) {
      return {...state, stockPageList: data , pagination: {  ...state.pagination,...pagination }};
    },
    
    changeVisibleAdd(state, { payload: data }){
      return { ...state, visibleAdd: data }
    },
    changeVisibleView(state, { payload: data }){
      return { ...state, visibleView: data }
    },
    changeDisabled(state, { payload: data }){
      return { ...state, isDisabled: data }
    },
    changeTitle(state, { payload: data }){
      return { ...state, title: data }
    },
    getStockDetail(state, { payload: data }){
      return { ...state, stockDetail: data }
    }
    
    
  },
  effects: {
    
    /*创建存货分类*/
    *addStock({ payload: values }, { call, put }){
      const { data: { data, code, page, size, total } } = yield call(inventoryService.addStock, values);
      if (code == 0) {
        message.success('保存成功！');
        yield put({
          type: 'changeVisibleAdd',
          payload: false
        })
        yield put({
          type: 'changeVisibleView',
          payload: false
        })
        yield put({
          type: 'changeDisabled',
          payload: true
        })
        yield put({
          type: 'getStockPageList',
          payload: { page: 1, size: 10 }
        })
      }
    },
    //查询上级分类
    *getParentList({ payload: values }, { call, put }){
      const { data: { data, code, page, size, total } } = yield call(inventoryService.getParentList, values);
      if (code == 0) {
        yield put({
          type: 'getParent',
          payload: data
        })
      }
    },
    //查询存货分类
    *getStockPageList({ payload: values }, { call, put }){
      const { data: { data, code, page, size, total } } = yield call(inventoryService.getStockPageList, values);
      if (code == 0) {
        yield put({
          type: 'getStockPage',
          payload: {
            data,
            pagination: {
              current: Number(page) || 1,
              pageSize: Number(size) || 10,
              total: total,
            }
          }
        })
        
      }
    },
    //根据存货分类id查询详情
    *getStockDetailById({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(inventoryService.getStockDetailById, values);
      if (code == 0) {
        yield put({
          type: 'getStockDetail',
          payload: data
        })
        yield put({
          type: 'changeVisibleView',
          payload: true
        })
      }
    },
    //删除存货分类
    *deleteStock({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(inventoryService.deleteStock, values);
      if (code == 0) {
        message.success('删除成功！');
        yield put({
          type: 'getStockPageList',
          payload: { page: 1, size: 10 }
        })
      }
    }
    
    
  },
  
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/inventory/classification') {
          dispatch({
            type: 'getStockPageList',
            payload: { page: 1, size: 10 }
          })
          dispatch({
            type: 'getParentList'
          })
        }
      })
    }
  }
}
