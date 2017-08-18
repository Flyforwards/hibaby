/**
 * Created by yangjingjing on 2017/8/16.
 */
import * as customerService from '../services/customer';
import * as serviceAssessment from '../services/serviceAssessment';
import * as addCustomerInformation from '../services/addCustomerInformation';
import * as systemService from '../services/system';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
export default {
  namespace: 'serviceCustomer',
  state : {
    customerPageList : [],//客户信息分页数据
    total : 0,
    page : 1,
    size : 10,
    packageList:[],//主套餐列表
    shipCards:[],
    fetusAry:[],
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname,query }) => {
        if (pathname === '/service/check-before/detail'||pathname === '/service/check-before/edit') {
          let dict = {...query,type:1}
          dispatch({type: 'getAssessmentByCustomerId',payload:dict});
        }
        if (pathname === '/service/check-in/detail'|| pathname === '/service/check-in/edit') {
          let dict = {...query,type:2}
          dispatch({type: 'getAssessmentByCustomerId',payload:dict});
        }
        if (pathname === '/service/child-check-in/detail'|| pathname === '/service/child-check-in/edit') {
          let dict = {...query,type:3}
          dispatch({type: 'getAssessmentByCustomerId',payload:dict});
        }
        //中医见诊记录单详情页
        if (pathname === '/service/diagnosis/detail' || pathname === '/service/diagnosis/edit') {
          let dict = { ...query, type: 4 }
          dispatch({ type: 'getAssessmentByCustomerId', payload: dict });
        }

      });
    }
  },
  effects: {
    //获取客户信息分页数据
    *getCustomerPageList({payload : values}, { call, put }){
      const {data: { data, total, page, size, code,err} } = yield call(customerService.getCustomerPage, values);
      if (code == 0) {
        //更新state
        yield put({type:'setCustomerPageList',payload:{data,total,page,size}} );
      }
    },
    *listByMain({ payload: value },{ call, put }){
      const { data: { code, data } } = yield call(customerService.listByMain);
      if (code == 0) {
        yield put({
          type: 'setPackageList',
          payload: {
            data:data,
          }
        });
      }
    },
    // 获取会员身份下拉选项， 也是卡种列表
    *getMemberShipCard({payload: values}, { call, put }) {
      const {data: { data, code} } = yield call(systemService.getMemberShipCard, values);
      if (code == 0) {
        yield put({
          type: 'memberShipCardSave',
          payload: { shipCards: data }
        })
      }
    },

    *getDataDict({ payload: value },{ call, put }){
      const parameter ={
        abName:value.abName,
        softDelete: 0,
      };
      const { data: { code, data } } = yield call(addCustomerInformation.getDataDict,parameter);
      if (code == 0) {
        yield put({
          type: 'addMutDictData',
          payload: {
            abName:value.abName,
            data:data,
          }
        });
      }
    },

    //保存或编辑评估
    // assessmentInfo (string, optional): 评估内容 ,
    // customerId (integer, optional): 客户id ,
    // id (integer, optional): 主键ID ,
    // type (integer, optional): 评估类型，1：产妇入住前评估，2：产妇入住评估，3：婴儿入住评估，4：中医见诊记录单，5：营养产后入住评估
    *saveAssessment({payload: values}, { call, put }) {
      try {
        const {data: {data,code}} = yield call(serviceAssessment.saveAssessment, values);
        message.success("保存成功");
        if(values.type == 1){
          yield put(routerRedux.push('/service/check-before'))
        }else if(values.type == 2){
          yield put(routerRedux.push('/service/check-in'))
        } else if(values.type == 3){
          yield put(routerRedux.push('/service/child-check-in'))
        }
      }
      catch (err){
      }
    },

    *getAssessmentByCustomerId({payload: values}, { call, put }) {
      try {
        const {data: {data,code}} = yield call(serviceAssessment.getAssessmentByCustomerId, values);
        yield put({
          type: 'savaAssessment',
          payload: data
        });
      }
      catch (err){
        console.log(err)
      }
    },
    *DelAssessment({payload: values}, { call, put }) {
      try {
        const {data: {data,code}} = yield call(serviceAssessment.DelAssessment, {dataId:values.dataId});
        message.success("删除成功");
        if(values.type == 1){
          yield put(routerRedux.push('/service/check-before'))
        }
      }
      catch (err){
        console.log(err)
      }
    },

  },
  reducers: {
    setCustomerPageList(state, { payload: {data: customerPageList, total, page, size} }){
      let customerData = {
        ...state,
        customerPageList,
        total,
        page,
        size
      };
      let range = {
        start: page == 1 ? 1 : (page - 1) * size + 1,
        end: page == 1 ? customerPageList.length : (page - 1) * 10 + customerPageList.length,
        totalpage: Math.ceil(total / size)
      }
      return {...customerData,range}
    },
    setPackageList(state, { payload: todo }){
      return {...state,packageList:todo.data};
    },
    memberShipCardSave(state, { payload: { shipCards }}) {
      return {...state, shipCards};
    },
    addMutDictData(state, { payload: todo }){
      if(todo.abName === 'YCC'){
        return {...state,fetusAry:todo.data};
      }
      return {...state};
    },
    savaAssessment(state,{ payload: todo }){
      let dict = {}
      if(todo){
        if(todo.type === 1||todo.type ===4){
          dict.CheckBeforeData = JSON.parse(todo.assessmentInfo)
          dict.CheckBeforeID = todo.id
        }else if(todo.type === 2){
          dict.CheckInData = JSON.parse(todo.assessmentInfo)
          dict.CheckInID = todo.id
        }else if(todo.type === 3){
          dict.ChildCheckInData = JSON.parse(todo.assessmentInfo)
          dict.ChildCheckInID = todo.id
        }
      }

      return { ...state,...dict,}
    },
    clearAllProps(state){
      return { ...state,page : 1}
    },
    removeData(state,{ payload: todo }){
      return {...state,CheckBeforeData:'',CheckBeforeID:'',CheckInData:null,CheckInID:null}
    }
  }

}
