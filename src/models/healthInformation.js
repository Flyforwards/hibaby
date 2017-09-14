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
    excelValue:[],//表头值
    medicalHealthInformation : null,//医疗健康档案
    nutritionHealthInformation : null,//营养健康档案
    skinHealthInformation : null,//美妍中心
    conclusionInformation : null,//医院小结
    saveDone:false,//提交表单保存状态，作用：档案保存成功后，更新该字段为true，从而使页面跳转到详情
    type:null,//档案类型
    editMedicalFlag : false, //医疗健康档案的编辑状态，用户点击编辑按钮，更新该值为true，从而使页面跳转到编辑页面
    editNutritionFlag : false,//营养健康档案的编辑状态，同上
    editSkinFlag : false,//美妍健康档案的编辑状态，同上
    editConclusionFlag:false,//出院小结健康档案的编辑状态，同上
    //以下为医疗健康档案（type=1）内所有上传附件对应的附件集合
    imgInput_1_arr : [],
    imgInput_2_arr : [],
    imgInput_3_arr : [],
    imgInput_4_arr : [],
    imgInput_5_arr : [],
    imgInput_6_arr : [],
    imgInput_7_arr : [],
    imgInput_8_arr : [],
    conclusionImg_arr : [],//客户出院小结附件集合
    bigImageData : [],//查看附件，附件数据集合
    bigImageHidden : false,//查看附件,对话框显示状态
    //以下为医疗健康档案（type=1）内所有需要上传附件对应的必填状态（true，为必填，false：非必填）
    imgInput_1_required : false,
    imgInput_2_required : false,
    imgInput_3_required : false,
    imgInput_4_required : false,
    imgInput_5_required : false,
    imgInput_6_required : false,
    imgInput_7_required : false,
    imgInput_8_required : false,
    input_5_required : false,
    newBabyList:[],//新生儿情况集合
  },
  //加载页面
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,query }) => {
        if (pathname === '/crm/customer/detail'){
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
        if (pathname === '/crm/customer/printCustomerPage'){
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
  //调用服务器端接口
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *saveHealthInformation({payload: values}, { call, put }) {
      const {data: { data, code,err} } = yield call(healthInformationService.saveHealthInformation, values);
      const baseData = data;
      if (code == 0) {
        let babyData = null;
        if(values.type === 1){
          const {data: { data, code,err} } = yield call(healthInformationService.saveBabyInfo, {customerBabyList:values.customerBabyList});
          if(code == 0) {
            babyData = values.customerBabyList;
            message.success("创建健康档案成功");
            yield put({type:'setSaveDone',payload:{baseData,babyData}} );
          }
        }else{
          message.success("创建健康档案成功");
          yield put({type:'setSaveDone',payload:{baseData,babyData}} );
        }

      }
    },
    *updateHealthInformation({payload: values}, { call, put }) {
      const {data: { data, code,err} } = yield call(healthInformationService.updateCustomerHealth, values);
      const baseData = data;
      if (code == 0) {
        let babyData = null;
        if(values.type === 1){
          const {data: { data, code,err} } = yield call(healthInformationService.updateBabyInfo, {customerBabyList:values.customerBabyList});
          if(code == 0){
            babyData = values.customerBabyList;
            message.success("修改健康档案成功");
            yield put({type:'setSaveDone',payload:{baseData,babyData}} );
          }
        }else{
          message.success("修改健康档案成功");
          yield put({type:'setSaveDone',payload:{baseData,babyData}} );
        }
      }
    },
    *getHealthInformationListByCustomerId({payload: values}, { call, put }){
      const {data: { data, code,err} } = yield call(healthInformationService.getHealthInformationListByCustomerId, values);
      const baseData = data;
      if (code == 0) {
        // message.info("根据用户编号查询健康档案成功");
        //console.log("根据用户编号查询健康档案成功==>",data);
        if(values.type === 1){
          const {data: { data, code,err} } = yield call(healthInformationService.getCustomerBabyInfoById, {dataId:values.customerId});
          if(code == 0){
            const babyData = data;
            //更新state
            yield put({type:'setHealthInformation',payload:{baseData,type:values.type,babyData}} );
          }
        }else{
          yield put({type:'setHealthInformation',payload:{baseData,type:values.type,babyData:null}} );
        }



      }
    },
  },
  //同步请求，更新state
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    //选中的值
    choiceExcelValue(state, {payload: {checkedValues}}) {
      return {...state, checkedValues}
    },
    setHealthInformation(state, { payload: { baseData,type,babyData }}){
      if(type === 1){
        if(baseData && baseData.healthInfo){
          const healthInfo = JSON.parse(baseData.healthInfo);
          const imgInput_1_arr = healthInfo.imgInput_1?JSON.parse(healthInfo.imgInput_1):[];
          const imgInput_2_arr = healthInfo.imgInput_2?JSON.parse(healthInfo.imgInput_2):[];
          const imgInput_3_arr = healthInfo.imgInput_3?JSON.parse(healthInfo.imgInput_3):[];
          const imgInput_4_arr = healthInfo.imgInput_4?JSON.parse(healthInfo.imgInput_4):[];
          const imgInput_5_arr = healthInfo.imgInput_5?JSON.parse(healthInfo.imgInput_5):[];
          const imgInput_6_arr = healthInfo.imgInput_6?JSON.parse(healthInfo.imgInput_6):[];
          const imgInput_7_arr = healthInfo.imgInput_7?JSON.parse(healthInfo.imgInput_7):[];
          const imgInput_8_arr = healthInfo.imgInput_8?JSON.parse(healthInfo.imgInput_8):[];
          const requiredData = {};
          const imgInput_1_required = healthInfo.radio_2 && healthInfo.radio_2 == 1 ? true : false;
          const imgInput_2_required = healthInfo.radio_3 && healthInfo.radio_3 == 1 ? true : false;
          const imgInput_3_required = healthInfo.radio_4 && healthInfo.radio_4 == 1 ? true : false;
          const imgInput_4_required = healthInfo.radio_5 && healthInfo.radio_5 == 1 ? true : false;
          const imgInput_5_required = healthInfo.radio_6 && healthInfo.radio_6 != 0 ? true : false;
          const imgInput_6_required = healthInfo.radio_7 && healthInfo.radio_7 == 1 ? true : false;
          const imgInput_7_required = healthInfo.radio_8 && healthInfo.radio_8 == 1 ? true : false;
          const imgInput_8_required = healthInfo.radio_9 && healthInfo.radio_9 == 1 ? true : false;
          const input_5_required = healthInfo.radio_15 && healthInfo.radio_15 == 1 ? true : false;
          requiredData.imgInput_1_required = imgInput_1_required;
          requiredData.imgInput_2_required = imgInput_2_required;
          requiredData.imgInput_3_required = imgInput_3_required;
          requiredData.imgInput_4_required = imgInput_4_required;
          requiredData.imgInput_5_required = imgInput_5_required;
          requiredData.imgInput_6_required = imgInput_6_required;
          requiredData.imgInput_7_required = imgInput_7_required;
          requiredData.imgInput_8_required = imgInput_8_required;
          requiredData.input_5_required = input_5_required;
          return {...state,editMedicalFlag : false, medicalHealthInformation : baseData,imgInput_1_arr:imgInput_1_arr,imgInput_2_arr:imgInput_2_arr,imgInput_3_arr:imgInput_3_arr,imgInput_4_arr:imgInput_4_arr,
            imgInput_5_arr:imgInput_5_arr,imgInput_6_arr:imgInput_6_arr,imgInput_7_arr:imgInput_7_arr,
            Input_8_arr:imgInput_8_arr,...requiredData,newBabyList:babyData}
        }
        return { ...state,editMedicalFlag : false, medicalHealthInformation : baseData };
      }else if(type === 2){
        return { ...state,editNutritionFlag : false, nutritionHealthInformation : baseData };
      }else if(type === 3){
        return { ...state,editSkinFlag : false, skinHealthInformation : baseData };
      }else if(type === 4){
        if(baseData && baseData.healthInfo) {
          const conclusionImg_arr = JSON.parse(baseData.healthInfo);
          return {...state,editConclusionFlag:false, conclusionInformation : baseData,conclusionImg_arr:conclusionImg_arr}
        }
        return { ...state,editConclusionFlag:false, conclusionInformation : baseData };
      }
      return {...state};
    },
    setSaveDone(state, { payload: { baseData,babyData }}){
      if(baseData){
        let saveDone = true;
        let type = baseData.type;
        if(baseData.type === 1){
          if(baseData.healthInfo){
            const healthInfo = JSON.parse(baseData.healthInfo);
            const imgInput_1_arr = healthInfo.imgInput_1?JSON.parse(healthInfo.imgInput_1):[];
            const imgInput_2_arr = healthInfo.imgInput_2?JSON.parse(healthInfo.imgInput_2):[];
            const imgInput_3_arr = healthInfo.imgInput_3?JSON.parse(healthInfo.imgInput_3):[];
            const imgInput_4_arr = healthInfo.imgInput_4?JSON.parse(healthInfo.imgInput_4):[];
            const imgInput_5_arr = healthInfo.imgInput_5?JSON.parse(healthInfo.imgInput_5):[];
            const imgInput_6_arr = healthInfo.imgInput_6?JSON.parse(healthInfo.imgInput_6):[];
            const imgInput_7_arr = healthInfo.imgInput_7?JSON.parse(healthInfo.imgInput_7):[];
            const imgInput_8_arr = healthInfo.imgInput_8?JSON.parse(healthInfo.imgInput_8):[];
            const requiredData = {};
            const imgInput_1_required = healthInfo.radio_2 && healthInfo.radio_2 == 1 ? true : false;
            const imgInput_2_required = healthInfo.radio_3 && healthInfo.radio_3 == 1 ? true : false;
            const imgInput_3_required = healthInfo.radio_4 && healthInfo.radio_4 == 1 ? true : false;
            const imgInput_4_required = healthInfo.radio_5 && healthInfo.radio_5 == 1 ? true : false;
            const imgInput_5_required = healthInfo.radio_6 && healthInfo.radio_6 != 0 ? true : false;
            const imgInput_6_required = healthInfo.radio_7 && healthInfo.radio_7 == 1 ? true : false;
            const imgInput_7_required = healthInfo.radio_8 && healthInfo.radio_8 == 1 ? true : false;
            const imgInput_8_required = healthInfo.radio_9 && healthInfo.radio_9 == 1 ? true : false;
            const input_5_required = healthInfo.radio_15 && healthInfo.radio_15 == 1 ? true : false;
            requiredData.imgInput_1_required = imgInput_1_required;
            requiredData.imgInput_2_required = imgInput_2_required;
            requiredData.imgInput_3_required = imgInput_3_required;
            requiredData.imgInput_4_required = imgInput_4_required;
            requiredData.imgInput_5_required = imgInput_5_required;
            requiredData.imgInput_6_required = imgInput_6_required;
            requiredData.imgInput_7_required = imgInput_7_required;
            requiredData.imgInput_8_required = imgInput_8_required;
            requiredData.input_5_required = input_5_required;

            return {...state,saveDone:saveDone,editMedicalFlag : false,type:type, medicalHealthInformation : baseData,imgInput_1_arr:imgInput_1_arr,imgInput_2_arr:imgInput_2_arr,imgInput_3_arr:imgInput_3_arr,imgInput_4_arr:imgInput_4_arr,
              imgInput_5_arr:imgInput_5_arr,imgInput_6_arr:imgInput_6_arr,imgInput_7_arr:imgInput_7_arr,
              Input_8_arr:imgInput_8_arr,...requiredData,newBabyList:babyData}
          }
          return {...state,saveDone:saveDone,editMedicalFlag : false,type:type, medicalHealthInformation : baseData}
        }else if(baseData.type === 2){
          return {...state,saveDone:saveDone,editNutritionFlag : false,type:type, nutritionHealthInformation : baseData}
        }else if(baseData.type === 3){
          return {...state,saveDone:saveDone,editSkinFlag : false,type:type, skinHealthInformation : baseData}
        }else if(baseData.type === 4){
          if(baseData && baseData.healthInfo) {
            const conclusionImg_arr = JSON.parse(baseData.healthInfo);
            return {...state,saveDone:saveDone,type:type,editConclusionFlag:false, conclusionInformation : baseData,conclusionImg_arr:conclusionImg_arr}
          }
          return {...state,saveDone:saveDone,type:type,editConclusionFlag:false, conclusionInformation : baseData}
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
        return { ...state,type:data.type, editConclusionFlag:true };
      }
      return {...state};
    },
    clearAllHealthInformation(state, { payload: data }){
      return {...state,type:null,editMedicalFlag:false,editNutritionFlag:false,editSkinFlag:false,editConclusionFlag:false,saveDone:false,medicalHealthInformation:null,nutritionHealthInformation:null,skinHealthInformation:null,conclusionInformation:null,
        imgInput_1_arr:[],imgInput_2_arr:[],imgInput_3_arr:[],imgInput_4_arr:[],
        imgInput_5_arr:[],imgInput_6_arr:[],imgInput_7_arr:[],Input_8_arr:[],
        imgInput_1_required:false,imgInput_2_required:false,imgInput_3_required:false,imgInput_4_required:false,imgInput_5_required:false,imgInput_6_required:false,imgInput_7_required:false,imgInput_8_required:false,input_5_required:false,conclusionImg_arr:[]}
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
      }else if(imgInputName === 'conclusion'){
        const conclusionImg_arr = state.conclusionImg_arr;
        conclusionImg_arr.push(value);
        return {...state,conclusionImg_arr:conclusionImg_arr}
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
      }else if(imgInputName === 'conclusion'){
        const conclusionImg_arr = state.conclusionImg_arr;
        for(var i=0;i<conclusionImg_arr.length;i++){
          if(conclusionImg_arr[i].name == value.name){
            conclusionImg_arr.splice(i,1);
          }
        }
        return {...state,conclusionImg_arr:conclusionImg_arr}
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
      }else if(imgInputName === 'imgInput_5'){
        return {...state,imgInput_5_required:value}
      }else if(imgInputName === 'imgInput_6'){
        return {...state,imgInput_6_required:value}
      }else if(imgInputName === 'imgInput_7'){
        return {...state,imgInput_7_required:value}
      }else if(imgInputName === 'imgInput_8'){
        return {...state,imgInput_8_required:value}
      }else if(imgInputName === 'input_5'){
        return {...state,input_5_required:value}
      }
      return {...state}
    }
  }

};
