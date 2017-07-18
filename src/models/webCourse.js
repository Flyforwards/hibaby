/**
 * 妈妈课程管理
 * Created by zhurw on 2017/7/17.
 */
import * as webCourseService from '../services/webCourse';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
export default {

  namespace: 'webCourse',

  state: {
    coursePageList : [],//菜品信息分页数据
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
     if (pathname === '/system/website-manage/addCourse'){
     if(query.id){
       dispatch({
       type: 'getCourseById',
       payload:{
       dataId : query.id
       }
       });
     }else{
       dispatch({type : 'clearCourseDetail'});
     }
     }
     });
     }
  },
  //调用服务器端接口
  effects: {
    //获取课程信息分页数据
    *getCoursePageList({payload : values}, { call, put }){
      const {data: { data, total, page, size, code,err} } = yield call(webCourseService.getCoursePageList, values);
      if (code == 0) {
        //更新state
        yield put({type:'setCoursePageList',payload:{data,total,page,size,nodeId:values.nodeId}} );
      }
    },
    //获取菜品详情
    *getCourseById({payload : values}, { call, put }){
      const {data: { data, code,err} } = yield call(webCourseService.getCourseById, values);
      if (code == 0) {
        //更新state
        yield put({type:'seCourseDetail',payload:{courseInfo : data}} );
      }
    },
    //保存菜品信息
    *saveCourse({payload : values}, { call, put }){
      const {data: { data, code,err} } = yield call(webCourseService.saveCourse, values);
      if (code == 0) {
        //更新state
        message.success("课程信息保存成功");
        //yield put(routerRedux.push(`/system/website-manage/addCourse?id=${data.id}`))
        //yield put({type:'getCoursePageList'} );
        history.go(-1);
      }
    },
    //修改菜品库节点信息
    *updateCourseLibrary({payload : values}, { call, put,select }){
      const {data: { data,code,err} } = yield call(webCourseService.updateCourse, values);
      if (code == 0) {
        message.success("信息修改成功");
        //yield put({type:'getCoursePageList'} );
        history.go(-1);
      }
    },
     //删除菜品信息
     *deleteCourse({payload : values}, { call, put,select }){
     const {data: { data, code,err} } = yield call(webCourseService.deleteCourse, values);
     if (code == 0) {
       const state = yield select(state => state.webCourse);
       yield put({
         type: 'getCoursePageList',
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
    setCoursePageList(state, { payload: {data: coursePageList, total, page, size/*,nodeId*/} }){
      let courseData = {
        ...state,
        coursePageList,
        total,
        page,
        size
      };
      let range = {
        start: page == 1 ? 1 : (page - 1) * size + 1,
        end: page == 1 ? coursePageList.length : (page - 1) * 10 + coursePageList.length,
        totalpage: Math.ceil(total / size)
      }
      return {...courseData,range}
    },
    seCourseDetail(state, { payload: {courseInfo} }){
      return {...state,initialValue: courseInfo}
    },
    clearCourseDetail(state){
      return {...state,initialValue: null}
    },
    /*

     setDictionary(state, { payload: {result} }){
     return {...state,...result}
     }*/
  }
};
