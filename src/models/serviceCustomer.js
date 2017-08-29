/**
 * Created by yangjingjing on 2017/8/16.
 */
import * as customerService from '../services/customer';
import * as serviceAssessment from '../services/serviceAssessment';
import * as addCustomerInformation from '../services/addCustomerInformation';
import * as systemService from '../services/system';
import moment from  'moment'
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'
export default {
  namespace: 'serviceCustomer',
  state: {
    customerPageList: [],//客户信息分页数据
    total: 0,
    page: 1,
    size: 10,
    packageList: [],//主套餐列表
    shipCards: [],
    fetusAry: [],
    PuerperaBodyList: [],
    babyNursingList: [],//婴儿护理记录列表
    InsideBabySwimList: null,//对内婴儿游泳记录集合
    describeInfo: [],
    query: {},
    describeChildrenInfo:[],
    describeDiagnosisInfo:[],
    describeObstetricInfo:[],
    describePuerperaInfo:[],
    describeButlerInfo:[],
    describeNutritionInfo:[]
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, query }) => {
        if (query.customerid) {
          let dict = { dataId: query.customerid }
          dispatch({ type: 'getCustomerInfoByCustomerId', payload: dict });
        }
        if (pathname === '/service/check-before/detail' || pathname === '/service/check-before/edit') {
          let dictTwo = { ...query, type: 1, operatorItem: 1 }
          dispatch({ type: 'getAssessmentByCustomerId', payload: dictTwo });
          dispatch({ type: 'getBabyListByCustomerId', payload: {dataId: query.customerid} });

        }
        if (pathname === '/service/customer/detail') {
          for (let i = 1; i < 6; i++) {
            let dictTwo = { ...query, type: i, operatorItem: i }
            dispatch({ type: 'getAssessmentByCustomerId', payload: dictTwo });
          }
        }
        if (pathname === '/service/nutrition-evaluate/detail' || pathname === '/service/nutrition-evaluate/edit') {
          let dictTwo = { ...query, type: 5, operatorItem: 5 }
          dictTwo.operatorItem = 5;
          dispatch({ type: 'getAssessmentByCustomerId', payload: dictTwo });
        }

        if (pathname === '/service/check-in/detail' || pathname === '/service/check-in/edit') {
          let dictTwo = { ...query, type: 2, operatorItem: 2 }
          dictTwo.operatorItem = 2;
          dispatch({ type: 'getAssessmentByCustomerId', payload: dictTwo });
        }
        if (pathname === '/service/child-check-in/detail' || pathname === '/service/child-check-in/edit') {
          let dict = { ...query, type: 3, operatorItem: 3 }
          dispatch({ type: 'getAssessmentByCustomerId', payload: dict });
        }
        //中医见诊记录单详情页
        if (pathname === '/service/diagnosis/detail' || pathname === '/service/diagnosis/edit') {
          let dict = { ...query, type: 4, operatorItem: 4 }
          if (pathname === '/service/check-before/edit') {
            dictTwo.operatorItem = 4;
          }
          dispatch({ type: 'getAssessmentByCustomerId', payload: dict });
        }

        if (pathname === '/service/puerpera-body/detail') {
          dispatch({ type: 'getMaternalEverydayPhysicalEvaluationList' });
        }
        if (pathname === '/service/puerpera-body/edit') {
          let dict_ = { dataId: query.dataId, operatorItem: 8 }
          dispatch({ type: 'getMaternalEverydayPhysicalEvaluationById', payload: dict_ });
        }

        //婴儿护理记录详情
        if (pathname === '/service/baby-nursing/detail' || pathname === '/service/baby-nursing/edit') {
          let dict_ = { customerId: query.customerid, date: moment().format('YYYY-MM-DD') }
          dispatch({ type: 'getBabyNursingNoteList', payload: dict_ });
        }
        if (pathname === '/service/baby-manual/detail') {
          let dict_ = { dataId: query.customerid, date: moment().format('YYYY-MM-DD') }
          dispatch({ type: 'getBrouchurDetailById', payload: dict_ });
        }

        //对内婴儿游泳记录
        if (pathname === '/service/baby-swimming/detail') {
          dispatch({ type: 'getInsideBabySwimList' });
        } else if (pathname === '/service/baby-swimming/edit') {
          let dict_ = { dataId: query.dataId, operatorItem: 15 }
          dispatch({ type: 'getInsideBabySwimById', payload: dict_ });
        }




        //婴儿喂养记录
        if (pathname === '/service/baby-feed/detail' || pathname === '/service/baby-feed/edit') {

          if (pathname === '/service/baby-feed/detail') {
            dispatch({ type: 'getBabyFeedingNoteList' })
          }
          else {
            let dict_ = { dataId: query.dataId, operatorItem: 13 }
            dispatch({ type: 'getBabyFeedingNoteById', payload: dict_ });
          }
        }
        //婴儿成长记录
        if (pathname === '/service/baby-grow/detail' || pathname === '/service/baby-grow/edit') {
          if (pathname === '/service/baby-grow/detail') {
            dispatch({ type: 'getBabyGrowthNoteList' });
          }
          else {
            let dict_ = { dataId: query.dataId, operatorItem: 14 }
            dispatch({ type: 'getBabyGrowthNoteById', payload: dict_ });
          }
        }

        //儿科、中医、产科记录单详情页
        if (pathname === '/service/diagnosis-record/detail') {
          const { customerid, type, operatoritem } = query;
          let dict_ = { customerId: parseInt(customerid), type: parseInt(type), operatorItem: parseInt(operatoritem) }
          dispatch({
            type: 'getdoctornoteList',
            payload: dict_
          });
          dispatch({
            type: 'saveQuery',
            payload: dict_
          });
        }


        if (pathname === '/service/send-message/production') {
          dispatch({ type: 'getCurrentEndemicDeptList' });
        }

      });
    }
  },
  effects: {
    //获取客户信息分页数据
    *getCustomerPageList({ payload: values }, { call, put }){
      const { data: { data, total, page, size, code, err } } = yield call(customerService.getCustomerPage, values);
      if (code == 0) {
        //更新state
        yield put({ type: 'setCustomerPageList', payload: { data, total, page, size } });
      }
    },
    *listByMain({ payload: value }, { call, put }){
      const { data: { code, data } } = yield call(customerService.listByMain);
      if (code == 0) {
        yield put({
          type: 'setPackageList',
          payload: {
            data: data
          }
        });
      }
    },



    // 部门中心
    *getCurrentEndemicDeptList({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(serviceAssessment.getCurrentEndemicDeptList, values);
      if (code == 0) {
        yield put({
          type: 'savaEndemicDeptList',
          payload: data
        })
      }
    },
    // 获取会员身份下拉选项， 也是卡种列表
    *getMemberShipCard({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(systemService.getMemberShipCard, values);
      if (code == 0) {
        yield put({
          type: 'memberShipCardSave',
          payload: { shipCards: data }
        })
      }
    },

    *getDataDict({ payload: value }, { call, put }){
      const parameter = {
        abName: value.abName,
        softDelete: 0
      };
      const { data: { code, data } } = yield call(addCustomerInformation.getDataDict, parameter);
      if (code == 0) {
        yield put({
          type: 'addMutDictData',
          payload: {
            abName: value.abName,
            data: data
          }
        });
      }
    },

    //保存或编辑评估
    // assessmentInfo (string, optional): 评估内容 ,
    // customerId (integer, optional): 客户id ,
    // id (integer, optional): 主键ID ,
    // type (integer, optional): 评估类型，1：产妇入住前评估，2：产妇入住评估，3：婴儿入住评估，4：中医见诊记录单，5：营养产后入住评估
    *saveAssessment({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.saveAssessment, values);
        message.success("保存成功");
        if (values.type == 1) {
          yield put(routerRedux.push('/service/check-before'))
        } else if (values.type == 2) {
          yield put(routerRedux.push('/service/check-in'))
        } else if (values.type == 3) {
          yield put(routerRedux.push('/service/child-check-in'))
        }
        else if (values.type == 5) {
          yield put(routerRedux.push('/service/nutrition-evaluate'))
        }
      }
      catch (err) {
      }
    },
    *saveAssessmentBabyInfo({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.saveAssessmentBabyInfo, values);
        message.success("保存成功");
        if (values.type == 1) {
          yield put(routerRedux.push('/service/check-before'))
        } else if (values.type == 2) {
          yield put(routerRedux.push('/service/check-in'))
        } else if (values.type == 3) {
          yield put(routerRedux.push('/service/child-check-in'))
        }
        else if (values.type == 5) {
          yield put(routerRedux.push('/service/nutrition-evaluate'))
        }
      }
      catch (err) {
      }
    },

    *sendProductionNotification({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.sendProductionNotification, values);
        message.success("保存成功");
      }
      catch (err) {
      }
    },

    *getBabyListByCustomerId({ payload: value }, { call, put }){

      try {
        const { data: { data, code } } = yield call(serviceAssessment.getBabyListByCustomerId, value);
        console.log(data)
        console.log('呵呵')

        yield put({
          type: 'savaBabyList',
          payload: data
        });
      }
      catch (err) {
        console.log(err)
      }
    },

    *getCustomerInfoByCustomerName({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.getCustomerInfoByCustomerName, values);

        yield put({
          type: 'savaCustomerInfoList',
          payload: {
            data: data
          }
        });
      }
      catch (err) {
      }
    },
    *getAssessmentByCustomerId({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.getAssessmentByCustomerId, values);
        yield put({
          type: 'savaAssessment',
          payload: data
        });
      }
      catch (err) {
        console.log(err)
      }
    },
    *getAssessmentBabyInfoByCustomerId({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.getAssessmentBabyInfoByCustomerId, values);
        yield put({
          type: 'savaBabyAssessment',
          payload: data
        });
      }
      catch (err) {
        console.log(err)
      }
    },

    *DelAssessment({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.DelAssessment, { dataId: values.dataId });
        message.success("删除成功");
        if (values.type == 1) {
          yield put(routerRedux.push('/service/check-before'))
        } else if (values.type == 2) {
          yield put(routerRedux.push('/service/check-in'))
        } else if (values.type == 3) {
          yield put(routerRedux.push('/service/child-check-in'))
        }
        else if (values.type == 5) {
          yield put(routerRedux.push('/nutrition-evaluate'))
        }
      }
      catch (err) {
        console.log(err)
      }
    },

    *getMaternalEverydayPhysicalEvaluationList({ payload: values }, { call, put }) {
      try {

        let query = parse(location.search.substr(1))
        let dict = { customerId: query.customerid }
        if (query.date) {
          dict.date = query.date
        }
        const { data: { data, code } } = yield call(serviceAssessment.getMaternalEverydayPhysicalEvaluationList, dict);

        yield put({
          type: 'savaMaternalEverydayPhysicalEvaluationList',
          payload: { key: 'MaternalEverydayPhysicalEvaluationAry', data: data }
        });
      }
      catch (err) {
        console.log(err)
      }
    },

    *getBabyFeedingNoteList({ payload: values }, { call, put })
    {
      try {
        let query = parse(location.search.substr(1))
        let dict = { customerId: query.customerid }
        if (query.date) {
          dict.date = query.date
        }
        const { data: { data, code } } = yield call(serviceAssessment.getBabyFeedingNoteList, dict);

        yield put({
          type: 'savaMaternalEverydayPhysicalEvaluationList',
          payload: { key: 'BabyFeedingNoteAry', data: data }
        });
      }
      catch (err) {
        console.log(err)
      }
    },
    *getBabyGrowthNoteList({ payload: values }, { call, put })
    {
      try {
        let query = parse(location.search.substr(1))
        let dict = { customerId: query.customerid }
        if (query.date) {
          dict.date = query.date
        }
        const { data: { data, code } } = yield call(serviceAssessment.getBabyGrowthNoteList, dict);

        yield put({
          type: 'savaMaternalEverydayPhysicalEvaluationList',
          payload: { key: 'BabyGrowthNoteAry', data: data }
        });
      }
      catch (err) {
        console.log(err)
      }
    },

    *getBabyGrowthNoteById({ payload: values }, { call, put })
    {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.getBabyGrowthNoteById, values);
        yield put({
          type: 'savaSingleInformation',
          payload: data
        });
      }
      catch (err) {
        console.log(err)
      }
    },
    *getMaternalEverydayPhysicalEvaluationById({ payload: values }, { call, put })
    {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.getMaternalEverydayPhysicalEvaluationById, values);
        yield put({
          type: 'savaSingleInformation',
          payload: data
        });
      }
      catch (err) {
        console.log(err)
      }
    },

    *getBabyFeedingNoteById({ payload: values }, { call, put })
    {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.getBabyFeedingNoteById, values);
        yield put({
          type: 'savaSingleInformation',
          payload: data
        });
      }
      catch (err) {
        console.log(err)
      }
    },
    //保存对内婴儿游泳预约
    *saveInsideBabySwim({ payload: values }, { call, put }){
      try {
        const { data: { data, code } } = yield call(serviceAssessment.saveInsideBabySwim, values);
        message.success("保存成功");
        yield put(routerRedux.push('/service/baby-swimming'))
      }
      catch (err) {
        console.log(err)
      }
    },


    *saveBabyGrowthNote({ payload: values }, { call, put })
    {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.saveBabyGrowthNote, values);
        message.success("保存成功");
        yield put(routerRedux.push('/service/baby-grow'))
      }
      catch (err) {
        console.log(err)
      }
    },
    *saveBabyFeedingNote({ payload: values }, { call, put })
    {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.saveBabyFeedingNote, values);
        message.success("保存成功");
        yield put(routerRedux.push('/service/baby-feed'))
      }
      catch (err) {
        console.log(err)
      }
    },


    *saveMaternalEverydayPhysicalEvaluation({ payload: values }, { call, put })
    {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.saveMaternalEverydayPhysicalEvaluation, values);
        message.success("保存成功");
        yield put(routerRedux.push('/service/puerpera-body'))
      }
      catch (err) {
        console.log(err)
      }
    },


    *getCustomerInfoByCustomerId({ payload: values }, { call, put })
    {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.getCustomerInfoByCustomerId, values);
        yield put({
          type: 'savaCustomerInfo',
          payload: data
        });
      }
      catch (err) {
        console.log(err)
      }
    }
    ,

    //宣教手册详情
    *getBrouchurDetailById({ payload: values }, { call, put })
    {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.getBrouchurDetailById, values);
        yield put({
          type: 'saveBrouchurDetailById',
          payload: data
        });
      }
      catch (err) {
        console.log(err)
      }
    },

    *getBabyNursingNoteList({ payload: values }, { call, put })
    {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.getBabyNursingNoteList, values);
        yield put({
          type: 'saveBabyNursingNoteList',
          payload: data
        });
      }
      catch (err) {
        console.log(err)
      }
    },
    //儿科、中医、产科记录单详情
    //1.根据id查询记录详情
    *getDoctorNoteById({ payload: postData }, { call, put })
    {
      const { info, key, operatorItem } = postData;
      const values = { dataId: info.id, operatorItem }
      const { data: { data, code } } = yield call(serviceAssessment.getDoctorNoteById, values);
      if (code == 0) {
        yield put({
          type: 'noChangeInfo',
          payload: { data, key }
        });
      }
    },
    //2.保存或编辑记录单
    *saveDoctorNote({ payload: values }, { call, put, select })
    {
      const { data: { data, code } } = yield call(serviceAssessment.saveDoctorNote, values);
      if (code == 0) {
        message.success('保存成功');
        const info = yield select(state => state.serviceCustomer);
        const { query } = info;
        info.dateString == "" || info.dateString == undefined ? null : query.data = info.dateString;
        yield put({
          type: 'getdoctornoteList',
          payload: query
        });

      }
    },
    //3.根据id删除记录
    *DelDoctornote({ payload: values }, { call, put, select })
    {
      const { data: { data, code } } = yield call(serviceAssessment.DelDoctornote, values);
      if (code == 0) {
        message.success('删除成功');
        const info = yield select(state => state.serviceCustomer);
        const { query } = info;
        info.dateString == "" || info.dateString == undefined ? null : query.data = info.dateString;
        yield put({
          type: 'getdoctornoteList',
          payload: query
        });

      }
    },
    //3.根据客户id和记录单类型以及筛选条件查询记录单列表 汇总页面用到的
    *getdoctornoteListSum({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(serviceAssessment.getdoctornoteList, values);
      if (code == 0) {
        switch (values.type) {
          case (1):
            yield put({
              type: 'getDescribeChildren',
              payload: data
            });
            break;
          case (2):
            yield put({
              type: 'getDescribeDiagnosis',
              payload: data
            });
            break;
          case (3):
            yield put({
              type: 'getDescribeObstetric',
              payload: data
            });
            break;
          case (4):
            yield put({
              type: 'getDescribePuerpera',
              payload: data
            });
            break;
          case (5):
            yield put({
              type: 'getDescribeButler',
              payload: data
            });
            break;
          case (6):
            yield put({
              type: 'getDescribeNutrition',
              payload: data
            });
            break;
          default:
            yield put({
              type: 'getDescribe',
              payload: data
            });
        }
        yield put({
          type: 'getDescribeChildren',
          payload: data
        });
      }

    },
    //4.根据客户id和记录单类型以及筛选条件查询记录单列表页面
    *getdoctornoteList({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(serviceAssessment.getdoctornoteList, values);
      if (code == 0) {
        yield put({
          type: 'getDescribe',
          payload: data
        });
      }

    },
    *getInsideBabySwimById({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(serviceAssessment.getInsideBabySwimById, values);
      if (code == 0) {
        yield put({
          type: 'getInsideBabySwim',
          payload: data
        });
      }
    },
    //获取对内婴儿游泳记录
    *getInsideBabySwimList({ payload: values }, { call, put }) {
      try {

        let query = parse(location.search.substr(1))
        let dict = { customerId: query.customerid }
        if (query.date) {
          dict.date = query.date
        }
        const { data: { data, code } } = yield call(serviceAssessment.getInsideBabySwimList, dict);

        yield put({
          type: 'saveInsideBabySwimList',
          payload: data
        });
      }
      catch (err) {
        console.log(err)
      }
    }
  },
  reducers: {
    setCustomerPageList(state, { payload: { data: customerPageList, total, page, size } }){
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
      return { ...customerData, range }
    },
    setPackageList(state, { payload: todo }){
      return { ...state, packageList: todo.data };
    },
    setPackageList(state, { payload: todo }){
      return { ...state, BabyList: todo.data };
    },
    savaCustomerInfoList(state, { payload: todo }){
      return { ...state, CustomerInfoList: todo.data };
    },
    memberShipCardSave(state, { payload: { shipCards } }) {
      return { ...state, shipCards };
    },
    addMutDictData(state, { payload: todo }){
      if (todo.abName === 'YCC') {
        return { ...state, fetusAry: todo.data };
      }
      return { ...state };
    },
    savaEndemicDeptList(state, { payload: todo }){
      console.log(todo)
      return { ...state, EndemicDeptList: todo };
    },


    savaAssessment(state, { payload: todo }){
      let dict = {}
      if (todo) {
        if (todo.type === 1) {
          dict.CheckBeforeData = JSON.parse(todo.assessmentInfo)
          dict.CheckBeforeID = todo.id
        } else if (todo.type === 5) {
          dict.NutritionEvaluateData = JSON.parse(todo.assessmentInfo)
          dict.NutritionEvaluateID = todo.id
        } else if (todo.type === 4) {
          dict.diagnosisData = JSON.parse(todo.assessmentInfo)
          dict.diagnosisID = todo.id
        } else if (todo.type === 2) {
          dict.CheckInData = JSON.parse(todo.assessmentInfo)
          dict.CheckInID = todo.id
        } else if (todo.type === 3) {
          dict.ChildCheckInData = JSON.parse(todo.assessmentInfo)
          dict.ChildCheckInID = todo.id
        }
      }
      return { ...state, ...dict }
    },


    savaBabyAssessment(state, { payload: todo }){
      let dict = {}
      if (todo) {
        if (todo.type === 1) {
          dict.CheckBeforeBabyData = JSON.parse(todo.assessmentInfo)
          dict.CheckBeforeBabyID = todo.id
        }
      }
      return { ...state, ...dict }
    },

    clearAllProps(state){
      return { ...state, page: 1 }
    },
    removeData(state, { payload: todo }){
      return {
        ...state,
        CheckBeforeData: '',
        CheckBeforeID: '',
        CheckInData: null,
        CheckInID: null,
        ChildCheckInData: null,
        ChildCheckInID: null,
        CustomerInfoList:null,
        baseInfoDict:null,
        PuerperaBodyList: null,
        InsideBabySwimList: null//对内婴儿游泳记录集合
      }
    },
    getInsideBabySwim(state, { payload: data }){
      return { ...state, InsideBabySwimData: data }
    },
    saveInsideBabySwimList(state, { payload: todo }){
      return { ...state, InsideBabySwimList: todo }
    },
    savaMaternalEverydayPhysicalEvaluationList(state, { payload: todo }){
      const { key, data } = todo
      let dict = {}
      dict[key] = data

      console.log(dict)

      return { ...state, ...dict }
    },
    savaCustomerInfo(state, { payload: todo }){
      return { ...state, baseInfoDict: todo }
    },

    saveBrouchurDetailById(state, { payload: todo }) {
      return { ...state, MissionManualData: todo }
    },
    saveBabyNursingNoteList(state, { payload: todo }){
      return { ...state, babyNursingList: todo }
    },
    savaSingleInformation(state, { payload: todo }){
      return { ...state, SingleInformationDict: todo }
    },
    //儿科、中医、产科记录单详情
    getDescribe(state, { payload: data }){
      return { ...state, describeInfo: data }
    },
    saveQuery(state, { payload: dict_ }){
      return { ...state, query: dict_ }
    },
    isEdit(state, { payload: data }){
      const { info, key } = data;
      let describeInfo = [...state.describeInfo];
      describeInfo[key] = info;
      return { ...state, describeInfo }
    },
    noChangeInfo(state, { payload: { data, key } }){
      let describeInfo = [...state.describeInfo];
      describeInfo[key] = data;
      return { ...state, describeInfo }
    },
    isChooseTime(state, { payload: dateString }){
      return { ...state, dateString }
    },
    //汇总用的记录单详情页
    //1,儿科查房记录单详情
    getDescribeChildren(state, { payload: data }){
      return { ...state, describeChildrenInfo: data }
    },
    //2,中医查房记录单详情
    getDescribeDiagnosis(state, { payload: data }){
      return { ...state, describeDiagnosisInfo: data }
    },
    //3,产科查房记录单
    getDescribeObstetric(state, { payload: data }){
      return { ...state, describeObstetricInfo: data }
    },
    //4,产妇护理记录
    getDescribePuerpera(state, { payload: data }){
      return { ...state, describePuerperaInfo: data }
    },
    //5,管家查房记录单
    getDescribeButler(state, { payload: data }){
      return { ...state, describeButlerInfo: data }
    },
    //5,营养查房记录单
    getDescribeNutrition(state, { payload: data }){
      return { ...state, describeNutritionInfo: data }
    },

    savaBabyList(state, { payload: data }){
      console.log(data)
      return { ...state, BabyList: data }
    },
    addMutDictData(state, { payload: todo }){
      if (todo.abName === 'YCC') {
        return { ...state, fetusAry: todo.data };
      }
      else if (todo.abName === 'YC') {
        return { ...state, gravidityAry: todo.data };
      }
      return { ...state };
    }
  }

}
