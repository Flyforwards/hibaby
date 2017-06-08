/**
 * 健康档案
 * Created by yangjingjing on 2017/6/1.
 */
import * as healthInformationService from '../services/healthInformation';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
export default {

  namespace: 'healthInformation',

  state: {
    medicalHealthInformation : null,//医疗健康档案
    nutritionHealthInformation : null,//营养健康档案
    skinHealthInformation : null,//美妍中心
    conclusionInformation : null,//医院小结
    saveDone:false,
    type:null,
    editMedicalFlag : false,
    editNutritionFlag : false,
    editSkinFlag : false,
    imgInput_1_arr : [],
    imgInput_2_arr : [],
    imgInput_3_arr : [],
    imgInput_4_arr : [],
    imgInput_5_arr : [],
    imgInput_6_arr : [],
    imgInput_7_arr : [],
    imgInput_8_arr : [],
    bigImageData : [],
    bigImageHidden : false,
    imgInput_1_required : false,
    imgInput_2_required : false,
    imgInput_3_required : false,
    imgInput_4_required : false,
  },
  //加载页面
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,query }) => {
        if (pathname === '/crm/customer/customerDetails'){
          if(query.dataId){
            for(let i=1 ;i<5; i++){
              dispatch({
                type: 'getHealthInformationListByCustomerId',
                payload:{
                  customerId : query.dataId,
                  type : i
                }
              });
            }
          }
        };
      });
    },
  },
  //异步请求
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *saveHealthInformation({payload: values}, { call, put }) {
      const {data: { data, code,err} } = yield call(healthInformationService.saveHealthInformation, values);
      if (code == 0) {
        message.success("创建健康档案成功");
        yield put({type:'setSaveDone',payload:{data}} );
        if(values.type == 1){
          const healthInfo = data.healthInfo?JSON.parse(data.healthInfo):null;
          put({type:'setImgInputArrData',payload:{healthInfo:healthInfo}} );
        }
      }
    },
    *updateHealthInformation({payload: values}, { call, put }) {
      const {data: { data, code,err} } = yield call(healthInformationService.updateCustomerHealth, values);
      if (code == 0) {
        message.success("修改健康档案成功");
        yield put({type:'setSaveDone',payload:{data}} );
      }
    },
    *getHealthInformationListByCustomerId({payload: values}, { call, put }){
      const {data: { data, code,err} } = yield call(healthInformationService.getHealthInformationListByCustomerId, values);
      if (code == 0) {
        // message.info("根据用户编号查询健康档案成功");
        //console.log("根据用户编号查询健康档案成功==>",data);
        //更新state
        yield put({type:'setHealthInformation',payload:{data,type:values.type}} );
      }
    },
    *setHealthInformationEditFlag({payload: type}, { call, put }){
      put({type:'setHealthInformationEditFlag',payload:{type:type}} );
    },
    *clearAllHealthInformation({payload: values}, { call, put }){
      put({type:'clearAllHealthInformation'} );
    }
  },
  //同步请求
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    setHealthInformation(state, { payload: { data,type }}){
      if(type === 1){
        if(data && data.healthInfo){
          const healthInfo = JSON.parse(data.healthInfo);
          const imgInput_1_arr = healthInfo.imgInput_1?JSON.parse(healthInfo.imgInput_1):[];
          const imgInput_2_arr = healthInfo.imgInput_2?JSON.parse(healthInfo.imgInput_2):[];
          const imgInput_3_arr = healthInfo.imgInput_3?JSON.parse(healthInfo.imgInput_3):[];
          const imgInput_4_arr = healthInfo.imgInput_4?JSON.parse(healthInfo.imgInput_4):[];
          const imgInput_5_arr = healthInfo.imgInput_5?JSON.parse(healthInfo.imgInput_5):[];
          const imgInput_6_arr = healthInfo.imgInput_6?JSON.parse(healthInfo.imgInput_6):[];
          const imgInput_7_arr = healthInfo.imgInput_7?JSON.parse(healthInfo.imgInput_7):[];
          const imgInput_8_arr = healthInfo.imgInput_8?JSON.parse(healthInfo.imgInput_8):[];
          return {...state,editMedicalFlag : false, medicalHealthInformation : data,imgInput_1_arr:imgInput_1_arr,imgInput_2_arr:imgInput_2_arr,imgInput_3_arr:imgInput_3_arr,imgInput_4_arr:imgInput_4_arr,
            imgInput_5_arr:imgInput_5_arr,imgInput_6_arr:imgInput_6_arr,imgInput_7_arr:imgInput_7_arr,
            Input_8_arr:imgInput_8_arr}
        }
        return { ...state,editMedicalFlag : false, medicalHealthInformation : data };
      }else if(type === 2){
        return { ...state,editNutritionFlag : false, nutritionHealthInformation : data };
      }else if(type === 3){
        return { ...state,editSkinFlag : false, skinHealthInformation : data };
      }else if(type === 4){
        return { ...state, conclusionInformation : data };
      }
      return {...state};
    },
    setSaveDone(state, { payload: { data }}){
      if(data){
        let healthInfo = JSON.parse(data.healthInfo);
        let saveDone = true;
        let type = data.type;
        if(data.type === 1){
          if(data.healthInfo){
            const imgInput_1_arr = healthInfo.imgInput_1?JSON.parse(healthInfo.imgInput_1):[];
            const imgInput_2_arr = healthInfo.imgInput_2?JSON.parse(healthInfo.imgInput_2):[];
            const imgInput_3_arr = healthInfo.imgInput_3?JSON.parse(healthInfo.imgInput_3):[];
            const imgInput_4_arr = healthInfo.imgInput_4?JSON.parse(healthInfo.imgInput_4):[];
            const imgInput_5_arr = healthInfo.imgInput_5?JSON.parse(healthInfo.imgInput_5):[];
            const imgInput_6_arr = healthInfo.imgInput_6?JSON.parse(healthInfo.imgInput_6):[];
            const imgInput_7_arr = healthInfo.imgInput_7?JSON.parse(healthInfo.imgInput_7):[];
            const imgInput_8_arr = healthInfo.imgInput_8?JSON.parse(healthInfo.imgInput_8):[];
            return {...state,saveDone:saveDone,editMedicalFlag : false,type:type, medicalHealthInformation : data,imgInput_1_arr:imgInput_1_arr,imgInput_2_arr:imgInput_2_arr,imgInput_3_arr:imgInput_3_arr,imgInput_4_arr:imgInput_4_arr,
              imgInput_5_arr:imgInput_5_arr,imgInput_6_arr:imgInput_6_arr,imgInput_7_arr:imgInput_7_arr,
              Input_8_arr:imgInput_8_arr}
          }
          // return {...state,saveDone:saveDone,editMedicalFlag : false,type:type, medicalHealthInformation : data}
        }else if(data.type === 2){
          return {...state,saveDone:saveDone,editNutritionFlag : false,type:type, nutritionHealthInformation : data}
        }else if(data.type === 3){
          return {...state,saveDone:saveDone,editSkinFlag : false,type:type, skinHealthInformation : data}
        }else if(data.type === 4){
          return {...state,saveDone:saveDone,type:type, conclusionInformation : data}
        }
        return {...state};
      }
      return {...state};
    },
    deleteConclusionInformation(state, { payload: data }){
      let arr = state.conclusionInformation;
      for(var i=0; i<arr.length; i++) {
        if(arr[i].name == data.name) {
          arr.splice(i, 1);
          break;
        }
      }
      return {...state,conclusionInformation:arr};
    },
    setHealthInformationEditFlag(state, { payload: data }){
      if(data.type === 1){
        return { ...state,type:data.type, editMedicalFlag:true };
      }else if(data.type === 2){
        return { ...state,type:data.type, editNutritionFlag:true };
      }else if(data.type === 3){
        return { ...state,type:data.type, editSkinFlag:true };
      }else if(data.type === 4){
        return { ...state,type:data.type, editSkinFlag:true};
      }
      return {...state};
    },
    clearAllHealthInformation(state, { payload: data }){
      return {...state,type:null,editMedicalFlag:false,editNutritionFlag:false,editSkinFlag:false,saveDone:false,medicalHealthInformation:null,nutritionHealthInformation:null,skinHealthInformation:null,conclusionInformation:null,
        imgInput_1_arr:[],imgInput_2_arr:[],imgInput_3_arr:[],imgInput_4_arr:[],
        imgInput_5_arr:[],imgInput_6_arr:[],imgInput_7_arr:[],
        Input_8_arr:[]}
    },
    //设置查看附件Modal数据
    setBigImageModalProps(state, { payload: data }){
      return {...state,...data}
    },
    //上传图片
    addImgData(state, { payload: data }){
      const imgInputName = data.imgInputName;
      const value = data.value;
      if(imgInputName === 'imgInput_1'){
        const imgInput_1_arr = state.imgInput_1_arr;
        imgInput_1_arr.push(value);
        return {...state,imgInput_1_arr:imgInput_1_arr}
      }else if(imgInputName === 'imgInput_2'){
        const imgInput_2_arr = state.imgInput_2_arr;
        imgInput_2_arr.push(value);
        return {...state,imgInput_2_arr:imgInput_2_arr}
      }else if(imgInputName === 'imgInput_3'){
        const imgInput_3_arr = state.imgInput_3_arr;
        imgInput_3_arr.push(value);
        return {...state,imgInput_3_arr:imgInput_3_arr}
      }else if(imgInputName === 'imgInput_4'){
        const imgInput_4_arr = state.imgInput_4_arr;
        imgInput_4_arr.push(value);
        return {...state,imgInput_4_arr:imgInput_4_arr}
      }else if(imgInputName === 'imgInput_5'){
        const imgInput_5_arr = state.imgInput_5_arr;
        imgInput_5_arr.push(value);
        return {...state,imgInput_5_arr:imgInput_5_arr}
      }else if(imgInputName === 'imgInput_6'){
        const imgInput_6_arr = state.imgInput_6_arr;
        imgInput_6_arr.push(value);
        return {...state,imgInput_6_arr:imgInput_6_arr}
      }else if(imgInputName === 'imgInput_7'){
        const imgInput_7_arr = state.imgInput_7_arr;
        imgInput_7_arr.push(value);
        return {...state,imgInput_7_arr:imgInput_7_arr}
      }else if(imgInputName === 'imgInput_8'){
        const imgInput_8_arr = state.imgInput_8_arr;
        imgInput_8_arr.push(value);
        return {...state,imgInput_8_arr:imgInput_8_arr}
      }
      return {...state}
    },
    //删除图片
    delImgData(state, { payload: data }){
      const imgInputName = data.imgInputName;
      const value = data.value;
      if(imgInputName === 'imgInput_1'){
        const imgInput_1_arr = state.imgInput_1_arr;
        for(var i=0;i<imgInput_1_arr.length;i++){
          if(imgInput_1_arr[i].name == value.name){
            imgInput_1_arr.splice(i,1);
          }
        }
        return {...state,imgInput_1_arr:imgInput_1_arr}
      }else if(imgInputName === 'imgInput_2'){
        const imgInput_2_arr = state.imgInput_2_arr;
        for(var i=0;i<imgInput_2_arr.length;i++){
          if(imgInput_2_arr[i].name == value.name){
            imgInput_2_arr.splice(i,1);
          }
        }
        return {...state,imgInput_2_arr:imgInput_2_arr}
      }else if(imgInputName === 'imgInput_3'){
        const imgInput_3_arr = state.imgInput_3_arr;
        for(var i=0;i<imgInput_3_arr.length;i++){
          if(imgInput_3_arr[i].name == value.name){
            imgInput_3_arr.splice(i,1);
          }
        }
        return {...state,imgInput_3_arr:imgInput_3_arr}
      }else if(imgInputName === 'imgInput_4'){
        const imgInput_4_arr = state.imgInput_4_arr;
        for(var i=0;i<imgInput_4_arr.length;i++){
          if(imgInput_4_arr[i].name == value.name){
            imgInput_4_arr.splice(i,1);
          }
        }
        return {...state,imgInput_4_arr:imgInput_4_arr}
      }else if(imgInputName === 'imgInput_5'){
        const imgInput_5_arr = state.imgInput_5_arr;
        for(var i=0;i<imgInput_5_arr.length;i++){
          if(imgInput_5_arr[i].name == value.name){
            imgInput_5_arr.splice(i,1);
          }
        }
        return {...state,imgInput_5_arr:imgInput_5_arr}
      }else if(imgInputName === 'imgInput_6'){
        const imgInput_6_arr = state.imgInput_6_arr;
        for(var i=0;i<imgInput_6_arr.length;i++){
          if(imgInput_6_arr[i].name == value.name){
            imgInput_6_arr.splice(i,1);
          }
        }
        return {...state,imgInput_6_arr:imgInput_6_arr}
      }else if(imgInputName === 'imgInput_7'){
        const imgInput_7_arr = state.imgInput_7_arr;
        for(var i=0;i<imgInput_7_arr.length;i++){
          if(imgInput_7_arr[i].name == value.name){
            imgInput_7_arr.splice(i,1);
          }
        }
        return {...state,imgInput_7_arr:imgInput_7_arr}
      }else if(imgInputName === 'imgInput_8'){
        const imgInput_8_arr = state.imgInput_8_arr;
        for(var i=0;i<imgInput_8_arr.length;i++){
          if(imgInput_8_arr[i].name == value.name){
            imgInput_8_arr.splice(i,1);
          }
        }
        return {...state,imgInput_8_arr:imgInput_8_arr}
      }
      return {...state}
    },
    setImgInputRequired(state, { payload: data }){
      const imgInputName = data.imgInputName;
      const value = data.value == 1 ? true : false;
      if(imgInputName === 'imgInput_1'){
        return {...state,imgInput_1_required:value}
      }else if(imgInputName === 'imgInput_2'){
        return {...state,imgInput_2_required:value}
      }else if(imgInputName === 'imgInput_3'){
        return {...state,imgInput_3_required:value}
      }else if(imgInputName === 'imgInput_4'){
        return {...state,imgInput_4_required:value}
      }
      return {...state}
    }
  }

};
