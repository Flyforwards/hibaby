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
    /*setup({ dispatch, history }) {  // eslint-disable-line
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
     }*/
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
    /* //获取菜品详情
     *getCourseById({payload : values}, { call, put }){
     const {data: { data, code,err} } = yield call(webCourseService.getCourseById, values);
     if (code == 0) {
     //更新state
     yield put({type:'seCourseDetail',payload:{dishesInfo : data}} );
     }
     },
     //保存菜品信息
     *saveCourse({payload : values}, { call, put }){
     const {data: { data, code,err} } = yield call(webCourseService.saveCourse, values);
     if (code == 0) {
     //更新state
     message.success("菜品信息保存成功");
     yield put(routerRedux.push(`/meals/dishes/dishesDetail?dataId=${data.id}`))
     }
     },
     //修改菜品库节点信息
     *updateCourseLibrary({payload : values}, { call, put,select }){
     const {data: { data,code,err} } = yield call(webCourseService.updateCourseLibrary, values);
     if (code == 0) {
     message.success("信息修改成功");
     yield put({type:'getCourseLibraryNodes'} );
     }
     },
     //删除菜品信息
     *deleteCourse({payload : values}, { call, put,select }){
     const {data: { data, code,err} } = yield call(webCourseService.deleteCourse, values);
     if (code == 0) {
     //更新state
     message.success("删除菜品信息成功");
     yield put({type:'getCourseLibraryNodes'} );
     const state = yield select(state => state.dishes);
     yield put({
     type: 'getCoursePageList',
     payload : {
     nodeId : state.nodeId,
     page : state.page,
     size : state.size
     }
     });
     }
     },*/

  },
  //同步请求，更新state
  reducers: {
    /*setDishesLibraryNodes(state, { payload: {data: data} }){
     return {...state,dishesLibraryNodes: data}
     },*/
    setCoursePageList(state, { payload: {data: coursePageList, total, page, size/*,nodeId*/} }){
      let courseData = {
        ...state,
        coursePageList,
        total,
        page,
        size/*,
         nodeId*/
      };
      let range = {
        start: page == 1 ? 1 : (page - 1) * size + 1,
        end: page == 1 ? coursePageList.length : (page - 1) * 10 + coursePageList.length,
        totalpage: Math.ceil(total / size)
      }
      return {...courseData,range}
    },
    /*setDishesDetail(state, { payload: {dishesInfo} }){
     return {...state,initialValue: dishesInfo}
     },
     clearDishesDetail(state){
     return {...state,initialValue: null}
     },
     setDictionary(state, { payload: {result} }){
     return {...state,...result}
     }*/
  }
};
