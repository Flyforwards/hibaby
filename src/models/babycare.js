/**
 * Created by Flyforwards on 2017/7/18.
 */
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { parse } from 'qs';
import * as websiteBabyCare from '../services/babycare';
import { TypeKey } from '../page/system/website-manage/TypeKey';
import { format,queryURL } from '../utils/index';

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
    actKey:'产前服务',
    //主标题 ---专家团队修改判断
    modalVisible:false,
    imgListArr:[],
    //上传图片按钮
    imgBtn:false,
  },
  reducers:{
    //改变modal
    changeModal(state,{payload:{modalVisible}}){
      return {...state,modalVisible}
    },
    tabChange(state,{payload:data}){
      return {...state,actKey:data}
    },
    //新增图片
    onAddImg(state,{payload:imglist}){
      imglist[0].uid = imglist[0].name
      return {...state,imgListArr:imglist,imgBtn:true}
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
    //添加初始数据
    addInitialList(state,{payload:{data:initialList}}){
      let content = initialList ? initialList.content:null;
      if(initialList != null && initialList.img1 != ""){
        let imgListArr = [{
          uid:0,
          name:initialList.img1,
          url:initialList.img1Url,
        }]
        return { ...state,initialList,imgListArr,content,imgBtn:true}
      }else{
        let imgListArr = null;
        return { ...state,initialList,imgListArr,content,imgBtn:false};
      }
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
