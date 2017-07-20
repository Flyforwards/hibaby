/**
 * 地方中心管理
 * Created by zhurw on 2017/7/19.
 */
import * as webEndemicService from '../services/webEndemic';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
export default {

  namespace: 'webEndemic',

  state: {
    endemicPageList : [],//菜品信息分页数据
    total : 0,
    page : 1,
    size : 10,
    initialValue : null,
    endemicList:[] //地方中心下拉列表数据
  },
  //加载页面
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
     return history.listen(({ pathname,query }) => {
     if (pathname === '/system/website-manage/addEndemic'){
     if(query.id){
       dispatch({
       type: 'getEndemicById',
       payload:{
       dataId : query.id
       }
       });
     }else{
       dispatch({type : 'clearEndemicDetail'});
     }
     }
     });
     }
  },
  //调用服务器端接口
  effects: {
    //获取地方中心下拉列表数据
    *getEndemicDropdownList({payload : values}, { call, put }){
      const {data: { data, total, page, size, code,err} } = yield call(webEndemicService.getEndemicDropdownList, values);
      if (code == 0) {
        //更新state
        yield put({type:'setEndemicDropdownList',payload:{data}} );
      }
    },
    //获取地方中心信息分页数据
    *getEndemicPageList({payload : values}, { call, put }){
      const {data: { data, total, page, size, code,err} } = yield call(webEndemicService.getEndemicPageList, values);
      if (code == 0) {
        //更新state
        yield put({type:'setEndemicPageList',payload:{data,total,page,size}} );
      }
    },
    //获取地方中心详情
    *getEndemicById({payload : values}, { call, put }){
      const {data: { data, code,err} } = yield call(webEndemicService.getEndemicById, values);
      if (code == 0) {
        //更新state
        yield put({type:'setEndemicDetail',payload:{endemicInfo : data}} );
      }
    },
    //保存地方中心信息
    *saveEndemic({payload : values}, { call, put }){
      const {data: { data, code,err} } = yield call(webEndemicService.saveEndemic, values);
      if (code == 0) {
        //更新state
        message.success("课程信息保存成功");
        history.go(-1);
      }
    },
    //修改地方中心信息
    *updateEndemic({payload : values}, { call, put,select }){
      const {data: { data,code,err} } = yield call(webEndemicService.updateEndemic, values);
      if (code == 0) {
        message.success("信息修改成功");
        //yield put({type:'getEndemicPageList'} );
        history.go(-1);
      }
    },
     //删除地方中心信息
     *deleteEndemic({payload : values}, { call, put,select }){
     const {data: { data, code,err} } = yield call(webEndemicService.deleteEndemic, values);
     if (code == 0) {
       const state = yield select(state => state.webEndemic);
       yield put({
         type: 'getEndemicPageList',
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
    setEndemicDropdownList(state, { payload: {data: data} }){
      return {...state,endemicList: data}
    },
    setEndemicPageList(state, { payload: {data: endemicPageList, total, page, size/*,nodeId*/} }){
      let endemicData = {
        ...state,
        endemicPageList,
        total,
        page,
        size
      };
      let range = {
        start: page == 1 ? 1 : (page - 1) * size + 1,
        end: page == 1 ? endemicPageList.length : (page - 1) * 10 + endemicPageList.length,
        totalpage: Math.ceil(total / size)
      }
      return {...endemicData,range}
    },
    setEndemicDetail(state, { payload: {endemicInfo} }){
      return {...state,initialValue: endemicInfo}
    },
    clearEndemicDetail(state){
      return {...state,initialValue: null}
    },

  }
};
