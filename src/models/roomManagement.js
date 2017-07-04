import * as roomManagement from '../services/roomManagement';
import * as addCustomerInformation from '../services/addCustomerInformation';
import { message } from 'antd'
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { parse } from 'qs'

export default {
  namespace: 'roomManagement',
  state: {
    listData:[],
    detailData:'',
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
    },
    FloorAry:[],
    MainFloorAry:[],
    AreaAry:[],
    TowardAry:[],
  },

  reducers: {
    setListData(state, { payload: todo }){
      let pagination = state.pagination;
      return {...state,listData:todo.list,pagination:{...pagination,...todo.pagination}};
    },
    setDetailData(state, { payload: todo }){
      return {...state,detailData:todo.data};
    },

    addMutDictData(state, { payload: todo }){
      if(todo.abName === 'LC'){
        return {...state,FloorAry:todo.data};
      }
      else if(todo.abName === 'ZFL'){
        return {...state,MainFloorAry:todo.data};
      }
      else if(todo.abName === 'QY'){
        return {...state,AreaAry:todo.data};
      }
      else if(todo.abName === 'CX'){
        return {...state,TowardAry:todo.data};
      }
      return {...state};
    },
  }
  ,
  effects: {
    *getDataDict({ payload: value },{ call, put }){
      const parameter ={
        abName:value.abName,
        softDelete: 0,
      };
      const { data: { code, data } } = yield call(addCustomerInformation.getDataDict,parameter);
      if (code == 0) {
        yield put({
          type: 'addMutDictData',
          payload: {
            abName:value.abName,
            data:data,
          }
        });
      }
    },
    *listByPage({ payload: values }, { call,put }) {
      const dict = {page:1,size:10}
      const param = parse(location.search.substr(1))
      const { data: { data, total, page, size, code} } = yield call(roomManagement.listByPage, {...dict,...param});
      if (code == 0) {

          if(data.length == 0 && page > 1){
            yield put(routerRedux.push({
              pathname: '/chamber/roomindex',
              query: {page:page-1,size:10}
            }))
          }else{
            yield put({
              type: 'setListData',
              payload: {
                list: data,
                pagination: {
                  current: Number(page) || 1,
                  pageSize: Number(size) || 10,
                  total: total,
                },
              },
            })
          }
      }
    },
    *addRoom({ payload: values }, { call,put }) {

      const { data: { code,data } } = yield call(roomManagement.addRoom, values);
      if (code == 0) {
        message.success('添加成功')
        yield put(routerRedux.push({
          pathname: '/chamber/roomindex',
        }))
      }
    },
    *updateRoom({ payload: values }, { call,put }) {
      const { data: { code } } = yield call(roomManagement.updateRoom, values);
      if (code == 0) {
        message.success('更新成功')
        yield put(routerRedux.push({
          pathname: '/chamber/roomindex',
          query: {dataId:values.id}
        }))
      }
    },
    *delRoom({ payload: values }, { call,put }) {

      const { data: { code } } = yield call(roomManagement.delRoom, values);
      if (code == 0) {
        message.success('删除成功')
        const param = parse(location.search.substr(1))

        yield put(routerRedux.push({
          pathname:'/chamber/roomindex',
          query: param
        }))

      }
    },
    *findById({ payload: values }, { call,put }) {

      const { data: { code,data } } = yield call(roomManagement.findById, parse(location.search.substr(1)));
      if (code == 0) {
        yield put({type: 'setDetailData',payload:{data}});
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history })
    {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/chamber/roomindex') {
          dispatch({type: 'listByPage'});

          dispatch({
            type: 'getDataDict',
            payload:{
              "abName": 'LC',
            }
          });
          dispatch({
            type: 'getDataDict',
            payload:{
              "abName": 'ZFL',
            }
          });
          dispatch({
            type: 'getDataDict',
            payload:{
              "abName": 'QY',
            }
          });
          dispatch({
            type: 'getDataDict',
            payload:{
              "abName": 'CX',
            }
          });
        }
      })
    }
  }
}


