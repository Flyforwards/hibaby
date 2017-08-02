/**
 * Created by Administrator on 2017/7/11.
 */
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { parse } from 'qs';
import * as websiteBanner from '../services/website';
import { TypeKey } from '../page/system/website-manage/TypeKey';
import { format,queryURL } from '../utils/index';

export default {
  namespace:'websiteBanner',
  state:{
    picarr:[],
    addImglist:[],
    disabledBtn:false,
    selectAble:false,
    actKey:'1',
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize:10,
      total: null,
    },
    typeList:[],
    //主标题 ---专家团队修改判断
    readAble:false,
    newsImgList1:[],
    newsImgList2:[],
    img1Btn:false,
    img2Btn:false,
    modalVisible:false,
    subMitImg:'',

  },
  reducers:{
    //设置为空
    setNewValue(state){
      return {...state,}
    },
    //改变modal状态
    changModal(state,{payload:{modalVisible}}){
      return { ...state,modalVisible}
    },
    tabChange(state,{payload:data}){
      return { ...state,actKey:data}
    },
    actKey:'1',

    //改变select状态
    changeSelect(state,{payload:choiceSelect}){
      return { ...state,selectAble:choiceSelect}
    },
    savaTypeList(state,{payload:data}){
      return { ...state,typeList:data}
    },
    //保存新闻上传图片1
    setNewsImg1(state,{payload:todos}){
      todos[0].uid = todos[0].name
      return{...state,newsImgList1:todos,img1Btn:true};
    },
    //保存新闻上传图片2
    setNewsImg2(state,{payload:todos}){
      todos[0].uid = todos[0].name
      return{...state,newsImgList2:todos,img2Btn:true};
    },
    //删除新闻图片1
    deleteNewsImg1(state,{payload:todos}){
      return {...state,newsImgList1:[],img1Btn:false};
    },
    //删除新闻图片2
    deleteNewsImg2(state,{payload:todos}){
      return {...state,newsImgList2:[],img2Btn:false};
    },
    //保存图片
    setImgList(state,{payload:todo}){
      todo[0].uid = todo[0].name
      return {...state,addImglist:todo,disabledBtn:true};
    },
    //删除图片
    deleteImgList(state,{payload:todo}){
      let arr = state.addImglist;
      for(let i=0; i < arr.length; i++) {
        if(arr[i].name == todo[0].name) {
          arr.splice(i,1);
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
        let addImglist=[{
          uid:oneList.img,
          name:oneList.img,
          url:oneList.imgUrl,
        }];
        let ontListType = oneList.type;
        return { ...state,addImglist,disabledBtn:true,ontListType,imgSize:oneList?oneList.imgSize:'',oneList};
      }else{
        let addImglist=null;
        let ontListType = '';
        return { ...state,addImglist,disabledBtn:false,ontListType,imgSize:oneList?oneList.imgSize:'',oneList};
      }

    },
    //保存初始列表
    saveInitialList(state,{payload:{data:initialList}}){
      return {...state,initialList};
    },
    //首页---专家团队
    //保存专家初始列表
    saveExpertInitialList(state,{payload:{data:expertInitialList}}){
      return { ...state,expertInitialList};
    },
    //保存一个专家信息
    saveOneExpert(state,{payload:{data:oneExpertMsg}}){
      let subMitImg = oneExpertMsg?(oneExpertMsg.img1?{
        uid:oneExpertMsg.img1,
        name:oneExpertMsg.img1,
        url:oneExpertMsg.img1Url
      }:''):''
        return {...state,oneExpertTitleMsg:oneExpertMsg,subMitImg};
    },
    savaSubMitImg(state,{payload:data}){

      return {...state,subMitImg:data};
    },
    //根据ID获取的信息
    saveExpertById(state,{payload:{data:ExpertIdMsg}}){
      if(ExpertIdMsg != null && ExpertIdMsg.id !=undefined ){
        let img1Ary = '';
        let img2Ary = '';

        if(ExpertIdMsg.img1){
          img1Ary=[{
            uid:ExpertIdMsg.img1,
            name:ExpertIdMsg.img1,
            url:ExpertIdMsg.img1Url,
          }];

       }

        if(ExpertIdMsg.img2){
          img2Ary = [{
            uid:ExpertIdMsg.img2,
            name:ExpertIdMsg.img2,
            url:ExpertIdMsg.img2Url,
          }]
        }
        return{...state,defaultFileLists1:img1Ary,newsImgList1:img1Ary,newsImgList2:img2Ary,defaultFileLists2:img2Ary,img1Btn:img1Ary?true:false,img2Btn:img2Ary?true:false,ExpertIdMsg}
      }
      return{...state,defaultFileLists1:null,newsImgList1:null,defaultFileLists2:null,newsImgList2:null,img1Btn:false,img2Btn:false,ExpertIdMsg:null}
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
    //根据类型获取一个类型列表
    *getOneById({payload: values},{call,put}){
      const {data:{data,code}} = yield call(websiteBanner.getBannerById,values);
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
    },

    //首页 ---- 专家团队
    //获取专家团队初始列表
    *getExpertInitialList({payload:values},{call,put}){
      if(queryURL('type2')){
        const str = queryURL('type2');
        const value = {...values,str};
        const {data:{data,code}} = yield call(websiteBanner.getExpertInitialList,value);
        if(code == 0){
          yield put({
            type:'saveExpertInitialList',
            payload:{
              data
            }
          })
        }
      }else{
        const {data:{data,code}} = yield call(websiteBanner.getExpertInitialList,values);
        if(code == 0){
          yield put({
            type:'saveExpertInitialList',
            payload:{
              data
            }
          })
        }
      }
    },
    //新增专家
    *addExpert({payload:values},{call,put}){
      const {data:{data,code}} = yield call(websiteBanner.addExpert,values);
      if(code == 0){
        history.go(-1);
        message.success("添加成功");

      }
    },
    //删除专家
    *deleteExpert({payload:values},{call,put}){
      const {data:{data,code}} = yield call(websiteBanner.deleteExpert,{dataId:values.dataId});
      if(code == 0) {
        yield put({
          type:'getExpertInitialList',
          payload:{str:values.type}
        });
        message.success("删除成功");
      }
    },
    //根据类型获取单一信息
    *getExpertByOneType({payload:values},{call,put}){
      const { data:{data,code}} = yield call(websiteBanner.getExpertByOneType,values);
      if(code == 0) {
        yield put({
          type:'saveOneExpert',
          payload:{
            data
          }
        })
      }
    },

    //根据类型获取单一信息
    *getTypeList({payload:values},{call,put}){
      const { data:{data,code}} = yield call(websiteBanner.typeList);
      if(code == 0) {
        yield put({
          type:'savaTypeList',
          payload: data
        })
      }
    },


    //根据Id获取专家信息
    *getExpertById({payload:values},{call,put}){
      const { data:{data,code}} = yield call(websiteBanner.getExpertById,values);
      if(code == 0){
        yield put ({
          type:'saveExpertById',
          payload:{
            data
          }
        })
      }
    },
    //修改专家信息
    *updateExpert({payload:values},{call,put}){


      const { data:{data,code}} = yield call(websiteBanner.updateExpert,values);
      if(code == 0) {
        message.success("更新成功");
        if(queryURL('id')){
          history.go(-1);
        }
          yield put({
            type:'getExpertByOneType',
            payload:{
              "str":values.type,
            }

          });
      }
    }

  },
  subscriptions:{
    setup({ dispatch,history}){
      return history.listen(({ query,pathname}) => {
        if(pathname === "/system/websiteHomePageManage/addBanner"){

          dispatch({type:'getTypeList',});
          if(query.type){
            dispatch({
              type:'changeSelect',
              payload:true,
            });
            dispatch({
              type:'getOneById',
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

        if(pathname === '/system/website-manage/addExpert'){
          if(query.id){
            dispatch({
              type:'getExpertById',
              payload:{
                "dataId":query.id,
              }
            })
          }else{
            dispatch({
              type:'saveExpertById',
              payload:{
                data:[],
              }
            })
          }

        }
      })
    }
  }
}
