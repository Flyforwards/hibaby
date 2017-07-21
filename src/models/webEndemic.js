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
    endemicList:[], //地方中心下拉列表数据
    addImglist:[],
    disabledBtn:false,
  },
  //加载页面
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
     return history.listen(({ pathname,query }) => {
       if (pathname === '/system/website-manage/addEndemic'){
         if(query.id){
           dispatch({type: 'getEndemicById', payload:{dataId : query.id}});
         }else{
           dispatch({type:'saveOneList',payload:{data:{}}});
           dispatch({type : 'clearEndemicDetail'});
         }
       }else{
         dispatch({type:'saveOneList',payload:{data:{}}});
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
        const imgList = [{name:data.img1,url:data.img1Url}];
        yield put({type:'setImgList', payload:imgList});
        yield put({type:'saveOneList',payload:{data}});
        yield put({type:'setEndemicDetail',payload:{endemicInfo : data}} );
      }
    },
    //保存地方中心信息
    *saveEndemic({payload : values}, { call, put }){
      if(values && values.img1&&values.img1!='') {
        const {data: {data, code, err}} = yield call(webEndemicService.saveEndemic, values);
        if (code == 0) {
          //更新state
          message.success("信息保存成功");
          history.go(-1);
        }
      }else{
        message.error("请上传图片")
      }
    },
    //修改地方中心信息
    *updateEndemic({payload : values}, { call, put,select }){
      if(values && values.img1&&values.img1!='') {
        const {data: {data, code, err}} = yield call(webEndemicService.updateEndemic, values);
        if (code == 0) {
          message.success("信息修改成功");
          //yield put({type:'getEndemicPageList'} );
          history.go(-1);
        }
      }else{
        message.error("请上传图片")
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
    //保存一个图片列表
    saveOneList(state,{payload:{data:oneList}}){
      if(oneList != null && oneList.id !=undefined ){
        let defaultFileList=[{
          uid:0,
          name:oneList.img1,
          url:oneList.img1Url,
        }];
        //let ontListType = oneList.type;
        return { ...state,defaultFileList,disabledBtn:true/*,ontListType*/};
      }else{
        let defaultFileList=null;
        //let ontListType = '';
        return { ...state,defaultFileList,disabledBtn:false/*,ontListType*/};
      }

    },
    //保存图片
    setImgList(state,{payload:todo}){
      //let ary = state.addImglist;
      let ary = [];
      ary.push(todo);
      return {...state,addImglist:ary,disabledBtn:true};
    },
    //删除图片
    deleteImgList(state,{payload:todo}){
      let arr = state.addImglist;
      for(let i=0; i < arr.length; i++) {
        if(arr[i].name == todo.name) {
          arr.splice(i,1);
          break;
        }
      }
      return {...state,addImglist:arr,disabledBtn:false};
    },
    //设置下拉列表state
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
