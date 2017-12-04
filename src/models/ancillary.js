import * as inventoryService from '../services/inventory';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { local, session } from 'common/util/storage.js';
import { parse } from 'qs'

export default {
  namespace: 'ancillary',
  state: {
    title: '查看',
    visibleAdd: false,
    parent: [],
    attributesList: [],
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

    getAttributesPage(state, { payload: { data, pagination } }) {
      return { ...state, attributesList: data, pagination: { ...state.pagination, ...pagination } };
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
    getAttributeDetail(state, { payload: data }){
      return { ...state, attributeDetail: data }
    },


    addAttribute(state, { payload: data }){
      let attributeDetail = { ...state.attributeDetail };
      attributeDetail.data.push({ attributeName: '' });
      return { ...state, attributeDetail }
    },
    delAttribute(state, { payload: key }){
      let attributeDetail = { ...state.attributeDetail };
      attributeDetail.data.splice(key, 1)
      return { ...state, attributeDetail }
    },
    changeAttributeName(state, { payload: name }){
      let attributeDetail = { ...state.attributeDetail };
      attributeDetail.name = name;
      return { ...state, attributeDetail }
    },
    changeAttributeValue(state, { payload: { value, key } }){
      let attributeDetail = { ...state.attributeDetail };
      attributeDetail.data[key].attributeName = value;
      return { ...state, attributeDetail }
    }


  },
  effects: {

    /*创建修改辅助属性*/
    *addAttributes({ payload: values }, { call, put }){
      const { data: { data, code, page, size, total } } = yield call(inventoryService.addAttributes, values);
      if (code == 0) {
        message.success('保存成功！');
        //yield put({
        //  type: 'changeVisibleAdd',
        //  payload: false
        //})
        //yield put({
        //  type: 'changeVisibleView',
        //  payload: false
        //})
        //yield put({
        //  type: 'changeDisabled',
        //  payload: true
        //})
        //yield put({
        //  type: 'getStockPageList',
        //  payload: { page: 1, size: 10 }
        //})
      }
    },
    //查询上级分类
    //*getParentList({ payload: values }, { call, put }){
    //  const { data: { data, code, page, size, total } } = yield call(inventoryService.getParentList, values);
    //  if (code == 0) {
    //    yield put({
    //      type: 'getParent',
    //      payload: data
    //    })
    //  }
    //},
    //查询辅助属性列表
    *getAttributesPageList({ payload: values }, { call, put }){
      const { data: { data, code, page, size, total } } = yield call(inventoryService.getAttributesPageList, values);
      if (code == 0) {
        yield put({
          type: 'getAttributesPage',
          payload: {
            data,
            pagination: {
              current: Number(page) || 1,
              pageSize: Number(size) || 10,
              total: total
            }
          }
        })

      }
    },
    //根据辅助属性详情
    *getAttributeDetailById({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(inventoryService.getAttributeDetailById, values);
      if (code == 0) {
        yield put({
          type: 'getAttributeDetail',
          payload: data
        })
        yield put({
          type: 'changeVisibleView',
          payload: true
        })
      }
    },
    //删除辅助属性
    *deleteAttributes({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(inventoryService.deleteAttributes, values);
      if (code == 0) {
        message.success('删除成功！');
        yield put({
          type: 'getAttributesPageList',
          payload: { page: 1, size: 10 }
        })
      }
    }


  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/inventory/ancillary') {
          dispatch({
            type: 'getAttributesPageList',
            payload: { page: 1, size: 10 }
          })
          //dispatch({
          //  type: 'getParentList'
          //})
        }
      })
    }
  }
}
