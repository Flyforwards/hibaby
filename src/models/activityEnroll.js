/**
 * 活动报名管理
 * Created by zhurw on 2017/7/18.
 */
import * as activityEnrollService from '../services/activityEnroll';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
export default {

  namespace: 'activityEnroll',

  state: {
    enrollPageList : [],//菜品信息分页数据
    total : 0,
    page : 1,
    size : 10,
    initialValue : null,
  },
  //加载页面
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,query }) => {
        if (pathname === '/system/website-manage/addActivityEnroll'){
          if(query.id){
            dispatch({
              type: 'getEnrollById',
              payload:{
                dataId : query.id
              }
            });
          }else{
            dispatch({type : 'clearEnrollDetail'});
          }
        }
      });
    }
  },
  //调用服务器端接口
  effects: {
    //获取报名信息分页数据
    *getEnrollPageList({payload : values}, { call, put }){
      const {data: { data, total, page, size, code,err} } = yield call(activityEnrollService.getEnrollPageList, values);
      if (code == 0) {
        //更新state
        yield put({type:'setEnrollPageList',payload:{data,total,page,size,nodeId:values.nodeId}} );
      }
    },
    //获取菜品详情
    *getEnrollById({payload : values}, { call, put }){
      const {data: { data, code,err} } = yield call(activityEnrollService.getEnrollById, values);
      if (code == 0) {
        //更新state
        yield put({type:'setEnrollDetail',payload:{enrollInfo : data}} );
      }
    },
    //保存菜品信息
    *saveEnroll({payload : values}, { call, put }){
      const {data: { data, code,err} } = yield call(activityEnrollService.saveEnroll, values);
      if (code == 0) {
        //更新state
        message.success("课程信息保存成功");
        history.go(-1);
      }
    },
    //修改菜品库节点信息
    *updateEnrollLibrary({payload : values}, { call, put,select }){
      const {data: { data,code,err} } = yield call(activityEnrollService.updateEnroll, values);
      if (code == 0) {
        message.success("信息修改成功");
        history.go(-1);
      }
    },
    //删除菜品信息
    *deleteEnroll({payload : values}, { call, put,select }){
      const {data: { data, code,err} } = yield call(activityEnrollService.deleteEnroll, values);
      if (code == 0) {
        const state = yield select(state => state.activityEnroll);
        yield put({
          type: 'getEnrollPageList',
          payload : {
            page : state.page,
            size : state.size
          }
        });
        message.success("删除成功");
      }
    },

  },
  //同步请求，更新state
  reducers: {
    setEnrollPageList(state, { payload: {data: enrollPageList, total, page, size/*,nodeId*/} }){
      let enrollData = {
        ...state,
        enrollPageList,
        total,
        page,
        size
      };
      let range = {
        start: page == 1 ? 1 : (page - 1) * size + 1,
        end: page == 1 ? enrollPageList.length : (page - 1) * 10 + enrollPageList.length,
        totalpage: Math.ceil(total / size)
      }
      return {...enrollData,range}
    },
    setEnrollDetail(state, { payload: {enrollInfo} }){
      return {...state,initialValue: enrollInfo}
    },
    clearEnrollDetail(state){
      return {...state,initialValue: null}
    }
  }
};
