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
    disabledBtn:false,
    selectAble:false,
  },
  reducers:{
    //改变select状态
    changeSelect(state,{payload:choiceSelect}){
      return { ...state,selectAble:choiceSelect}
    },
    //保存图片
    setImgList(state,{payload:todo}){
      let ary = state.addImglist;
        ary.push(todo);
      return {...state,addImglist:ary,disabledBtn:true};
    },
    //删除图片
    deleteImgList(state,{payload:todo}){
      let arr = state.addImglist;
      for(let i=0; i < arr.length; i++) {
        if(arr[i].name == todo.name) {
          arr.splice(i, 1);
          break;
        }
      }
      return {...state,addImglist:arr,disabledBtn:false};
    },
    //保存banner列表
    saveBannerList(state,{payload:{data:BannerList}}){
      return { ...state,BannerList};
    },
    //保存一个列表
    saveOneList(state,{payload:{data:oneList}}){
      if(oneList != null && oneList.id !=undefined ){
        let defaultFileList=[{
          uid:0,
          name:oneList.img,
          url:oneList.imgUrl,
        }];
        let ontListType = oneList.type;
        return { ...state,defaultFileList,disabledBtn:true,ontListType};
      }else{
        let defaultFileList=null;
        let ontListType = '';
        return { ...state,defaultFileList,disabledBtn:false,ontListType};
      }

    },
    //保存初始列表
    saveInitialList(state,{payload:{data:initialList}}){
      return {...state,initialList};
    }
  },
  effects:{
    //新增banner图
    *addBanner({payload:values},{call,put}){
      if(values && values.img){
        const {data:{data, code}} =yield call(websiteBanner.addBanner,values);
        if(code == 0) {
          history.go(-1);
          message.success("添加成功");
        }
      }else{
        message.error("请上传图片")
      }

    },
    //删除banner
    *deleteBanner({payload: values},{call,put}){
      const {data:{data,code}} = yield call(websiteBanner.deleteBanner,values);
      if(code == 0) {
        message.success("删除成功");
        yield put({
          type:'getInitialList',
        })
      }
    },
    //根据类型获取banner列表
      *getBannerList({payload: values},{call,put}){
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
    *getOneByType({payload: values},{call,put}){
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
    *updateBanner({payload: values},{call,put}){
      if(values && values.img){
        const {data:{data,code}} = yield call(websiteBanner.upDateBanner,values);
        if(code == 0){
          message.success("修改成功");
          history.go(-1);
        }
      }else{
        message.error("请上传图片")
      }
    },
    //获取初始列表
    *getInitialList({payload:values},{call,put}){
      const {data:{data,code}} = yield call(websiteBanner.getInitialList,values);
      if(code == 0){
        yield put({
          type:'saveInitialList',
          payload:{
            data
          }
        })
      }
    }

  },
  subscriptions:{
    setup({ dispatch,history}){
      return history.listen(({ query,pathname}) => {
        if(pathname === "/system/website-manage/add"){
          if(query.type){
            dispatch({
              type:'changeSelect',
              payload:true,
            });
            dispatch({
              type:'getOneByType',
              payload:{
                "type":query.type,
                "dataId":query.id,
              }
            })
          }else{
            dispatch({
              type:'saveOneList',
              payload:{
                data:{}
              }
            })
            dispatch({
              type:'changeSelect',
              payload:false,
            });
          }
        }
        if(pathname === "/system/website-manage") {
          dispatch({
            type:'getInitialList',
          });
          dispatch({
            type:'saveOneList',
            payload:{},
          })
        }
      })
    }
  }
}
