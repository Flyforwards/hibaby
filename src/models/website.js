/**
 * Created by Administrator on 2017/7/11.
 */
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { local,session } from 'common/util/storage.js';
import { parse } from 'qs';
import * as websiteBanner from '../services/website';

export default {
  namespace:'websiteBanner',
  state:{
    picarr:[],
    addImglist:[],
  },
  reducers:{
    //保存图片
    setImgList(state,{payload:todo}){
      let ary = state.addImglist;
      ary.push(todo);
      return {...state,addImglist:ary};
    },
    //删除图片
    deleteImgList(state,{payload:todo}){
      let arr = state.lookCardIDDLC;
      for(var i=0; i<arr.length; i++) {
        if(arr[i].name == todo.name) {
          arr.splice(i, 1);
          break;
        }
      }
      return {...state,lookCardIDDLC:arr};
    },
    //保存banner列表
    saveBannerList(state,{payload:{data:BannerList}}){
      return { ...state,BannerList};
    },
    //保存一个列表
    saveOneList(state,{payload:{data:oneList}}){
      return { ...state,oneList};
    }
  },
  effects:{
    //新增banner图
    *addBanner({payload,values},{call,put}){
      const {data:{data, code}} =yield call(websiteBanner.addBanner,values);
      if(code == 0) {
          message.success("添加成功");
      }
    },
    //删除banner
    *deleteBanner({payload,values},{call,put}){
      const {data:{data,code}} = yield call(websiteBanner.deleteBanner,values);
      if(code == 0) {
        message.success("删除成功");
      }
    },
    //根据类型获取banner列表
      *getBannerList({payload,values},{call,put}){
      const {data:{data,code}} = yield call(websiteBanner.getBannerList,values);
      if(code == 0){
        yield put({
          type:'saveBannerList',
          payload:{
            data
          }
        })
      }
      },
    //根据类型获取一个类型列表
    *getOneByType({payload,values},{call,put}){
      const {data:{data,code}} = yield call(websiteBanner.getBannerByType,values);
      if(code == 0){
        yield put({
          type:'saveOneList',
          payload:{
            data
          }
        })
      }
    },
    *updateBanner({payload,values},{call,put}){
      const {data:{data,code}} = yield call(websiteBanner.upDateBanner,values);
      if(code == 0){
        message.success("修改成功");
      }
    },

  },
  subscriptions:{
    setup({ dispatch,history}){
      return history.listen(({ query,pathname}) => {
        if(pathname === "/system/website-manage/add"){
          if(query.type){
            dispatch({
              type:'getOneByType',
              payload:{
                "type":query.type,
              }
            })
          }else{
            dispatch({
              type:'saveOneList',
              payload:{
                data:[]
              }
            })
          }
        }
        if(pathname === "/system/website-manage") {
          dispatch({
            type:'getBannerList',
            payload:{
              dataId:''
            }
          })
        }
      })
    }
  }
}
