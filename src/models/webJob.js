/**
 * 招聘信息管理
 * Created by zhurw on 2017/7/19.
 */
import * as webJobService from '../services/webJob';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
export default {

  namespace: 'webJob',

  state: {
    jobPageList : [],//菜品信息分页数据
    total : 0,
    page : 1,
    size : 10,
    initialValue : null,
    //dishesLibraryNodes : null,
    //nodeId : 1,
    //mvTypeData : [],//荤素类型
    //vdTypeData : [],//菜品类型
  },
  //加载页面
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
     return history.listen(({ pathname,query }) => {
     if (pathname === '/system/website-manage/addJob'){
     if(query.id){
       dispatch({
       type: 'getJobById',
       payload:{
       dataId : query.id
       }
       });
     }else{
       dispatch({type : 'clearJobDetail'});
     }
     }
     });
     }
  },
  //调用服务器端接口
  effects: {
    //获取招聘信息分页数据
    *getJobPageList({payload : values}, { call, put }){
      const {data: { data, total, page, size, code,err} } = yield call(webJobService.getJobPageList, values);
      if (code == 0) {
        //更新state
        yield put({type:'setJobPageList',payload:{data,total,page,size,nodeId:values.nodeId}} );
      }
    },
    //获取招聘详情
    *getJobById({payload : values}, { call, put }){
      const {data: { data, code,err} } = yield call(webJobService.getJobById, values);
      if (code == 0) {
        //更新state
        yield put({type:'setJobDetail',payload:{jobInfo : data}} );
      }
    },
    //保存招聘信息
    *saveJob({payload : values}, { call, put }){
      const {data: { data, code,err} } = yield call(webJobService.saveJob, values);
      if (code == 0) {
        //更新state
        message.success("课程信息保存成功");
        history.go(-1);
      }
    },
    //修改招聘信息
    *updateJob({payload : values}, { call, put,select }){
      const {data: { data,code,err} } = yield call(webJobService.updateJob, values);
      if (code == 0) {
        message.success("信息修改成功");
        history.go(-1);
      }
    },
     //删除招聘信息
     *deleteJob({payload : values}, { call, put,select }){
     const {data: { data, code,err} } = yield call(webJobService.deleteJob, values);
     if (code == 0) {
       const state = yield select(state => state.webJob);
       yield put({
         type: 'getJobPageList',
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
    setJobPageList(state, { payload: {data: jobPageList, total, page, size} }){
      let jobData = {
        ...state,
        jobPageList,
        total,
        page,
        size
      };
      let range = {
        start: page == 1 ? 1 : (page - 1) * size + 1,
        end: page == 1 ? jobPageList.length : (page - 1) * 10 + jobPageList.length,
        totalpage: Math.ceil(total / size)
      }
      return {...jobData,range}
    },
    setJobDetail(state, { payload: {jobInfo} }){
      return {...state,initialValue: jobInfo}
    },
    clearJobDetail(state){
      return {...state,initialValue: null}
    }
  }
};
