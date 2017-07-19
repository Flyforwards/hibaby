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
    //新增图片
    onAddImg(state,{payload:imglist}){
      let imgArr = state.imgListArr;
      imgArr.push(imglist);
      return {...state,imgListArr:imgArr,imgBtn:true}
    },
    //删除图片
    onDeleteImg(state,{payload:imglist}){
      let imgArr = state.imgListArr;
      for(let i=0; i < imgArr.length; i++) {
        if(imgArr[i].name == imglist.name) {
          imglist.splice(i,1);
          break;
        }
      }
      return { ...state,imgListArr:imgArr,imgBtn:false}
    },
    //添加初始数据
    addInitialList(state,{payload:{data:initialList}}){
      let content = initialList ? initialList.content:null;
      if(initialList != null && initialList.img1 != ""){
        let defaultlist = [{
          uid:0,
          name:initialList.img1,
          url:initialList.img1Url,
        }]
        return { ...state,initialList,defaultlist,content,imgBtn:true}
      }else{
        let defaultlist = null;
        return { ...state,initialList,defaultlist,content,imgBtn:false};
      }
    },

  },
  effects:{
    //首页 ---- 专家团队
    //获取专家团队初始列表
    *getInitialList({payload:values},{call,put}){
      if(queryURL('type1')){
        const str = queryURL('type1');
        const value = {...values,str};
        const {data:{data,code}} = yield call(websiteBabyCare.getExpertInitialList,value);
        console.log("DATA",data)
        if(code == 0){
          yield put({
            type:'addInitialList',
            payload:{
              data:data[0]
            }
          })
        }
      }else{
        const {data:{data,code}} = yield call(websiteBabyCare.getExpertInitialList,values);
        if(code == 0){
          yield put({
            type:'addInitialList',
            payload:{
              data:data[0]
            }
          })
        }
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
      // const type1 = queryURL('type1');
      // const type2 =queryURL('type2');
      const { data:{data,code}} = yield call(websiteBabyCare.updateExpert,values);
      if(code == 0) {
        message.success("更新成功");
        if(queryURL("type1")){
          yield put({
            type:'getInitialList',
          });
          // yield put(routerRedux.push({
          //   pathname:'system/website-manage/babycare',
          //   query:{
          //     "type1":queryURL("type1")
          //   }
          // }));
          yield put({
            type:'changeModal',
            payload:{
              "modalVisible":false,
            }
          })
        }else{
          history.go(-1);
        }

      }
    }

  },
  subscriptions:{
    setup({ dispatch,history}){
      return history.listen(({ query,pathname}) => {
        if(pathname === '/system/website-manage/babycare') {
          dispatch({
            type:'getInitialList'
          })
        }
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
