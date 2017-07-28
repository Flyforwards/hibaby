/**
 * Created by Flyforwards on 2017/7/18.
 */
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { parse } from 'qs';
import * as websiteBabyCare from '../services/babycare';
import { TypeKey } from '../page/system/website-manage/TypeKey';
import { format,queryURL } from '../utils/index';

let tempType = ''

export default {
  namespace:'websiteBabyCare',
  state:{
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize:10,
      total: null,
    },
    expertInitialList:[],
    actKey:'产前服务',
    //主标题 ---专家团队修改判断
    modalVisible:false,
    imgListArr:[],
    imgList2Arr:[],
    //上传图片按钮
    imgBtn:false,
    img2Btn:false,
  },
  reducers:{
    //改变modal
    changeModal(state,{payload:{modalVisible}}){
      return {...state,modalVisible}
    },
    tabChange(state,{payload:data}){
      return {...state,actKey:data}
    },
    saveExpertInitialList(state,{payload:{data:expertInitialList}}){
      return { ...state,expertInitialList};
    },
    //新增图片
    onAddImg(state,{payload:imglist}){
      imglist[0].uid = imglist[0].name
      return {...state,imgListArr:imglist,imgBtn:true}
    },
    //新增图片
    onAddImg2(state,{payload:imglist}){
      imglist[0].uid = imglist[0].name
      return {...state,imgList2Arr:imglist,img2Btn:true}
    },
    //删除图片
    onDeleteImg(state,{payload:imglist}){
      let imgArr = state.imgListArr;

      for(let i=0; i < imgArr.length; i++) {
        if(imgArr[i].name == imglist[0].name) {
          imgArr.splice(i,1);
          break;
        }
      }

      return { ...state,imgListArr:imgArr,imgBtn:false}
    },
    //删除图片
    onDeleteImg2(state,{payload:imglist}){
      let imgArr = state.imgList2Arr;

      for(let i=0; i < imgArr.length; i++) {
        if(imgArr[i].name == imglist[0].name) {
          imgArr.splice(i,1);
          break;
        }
      }

      return { ...state,imgList2Arr:imgArr,img2Btn:false}
    },
    //添加初始数据
    addInitialList(state,{payload:{data:initialList}}){
      let content = initialList ? initialList.content:null;
      let imgListArr = null
      let imgList2Arr = null
      if(initialList != null){
        if(initialList.img1 != ""){
          imgListArr = [{
            uid:0,
            name:initialList.img1,
            url:initialList.img1Url,
          }]
        }
        if(initialList.img2 != ""){
          imgList2Arr = [{
            uid:0,
            name:initialList.img2,
            url:initialList.img2Url,
          }]
        }
      }

      return { ...state,initialList,imgList2Arr,imgListArr,content,imgBtn:imgListArr,img2Btn:imgList2Arr}
    },

  },
  effects:{
    //首页 ---- 专家团队
    //获取专家团队初始列表
    *getInitialList({payload:values},{call,put}){
      const {data:{data,code}} = yield call(websiteBabyCare.getExpertInitialList,values);
      if(code == 0){
        yield put({
          type:'addInitialList',
          payload:{
            data:data[0]
          }
        })
        yield put({type:'changeModal', payload:{"modalVisible":false,}})

      }
    },


    *getExpertInitialList({payload:values},{call,put}){
      tempType = values
        const {data:{data,code}} = yield call(websiteBabyCare.getExpertInitialList,values);
        if(code == 0){
          yield put({
            type:'saveExpertInitialList',
            payload:{
              data
            }
          })
        }
    },

    //新增专家
    *addExpert({payload:values},{call,put}){
      const {data:{data,code}} = yield call(websiteBabyCare.addExpert,values);
      if(code == 0){
        history.go(-1);
        message.success("添加成功");

      }
    },
    //删除专家
    *deleteExpert({payload:values},{call,put}){
      const {data:{data,code}} = yield call(websiteBabyCare.deleteExpert,values);
      if(code == 0) {
        yield put({
          type: 'getExpertInitialList',
          payload : tempType
        });

        message.success("删除成功");
      }
    },
    //根据类型获取单一信息
    *getExpertByOneType({payload:values},{call,put}){
      const { data:{data,code}} = yield call(websiteBabyCare.getExpertByOneType,values);
      if(code == 0) {

      }
    },
    //根据Id获取专家信息
    *getExpertById({payload:values},{call,put}){
      const { data:{data,code}} = yield call(websiteBabyCare.getExpertById,values);
      if(code == 0){
      }
    },
    //修改专家信息
    *updateExpert({payload:values},{call,put}){

      const { data:{data,code}} = yield call(websiteBabyCare.updateExpert,values);
      if(code == 0) {
        message.success("更新成功");
        if(queryURL("type")){
          yield put(routerRedux.push('/system/websiteActManage'));
        }
        else{
          yield put({
            type:'changeModal',
            payload:{
              "modalVisible":false,
            }
          })
        }
      }
    }
  },
  subscriptions:{
    setup({ dispatch,history}){
      return history.listen(({ query,pathname}) => {
        if(pathname === '/system/website-manage/addbabycare') {
          dispatch({
            type:'getInitialList',
            payload:{
              "str":queryURL("type")
            }
          })
        }
      })
    }
  }
}
