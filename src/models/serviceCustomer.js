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
import { format,queryURL } from '../utils/index.js';
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
    describeDiagnosisInfo: [],
    describeObstetricInfo: [],
    describePuerperaInfo: [],
    describeButlerInfo: [],
    describeNutritionInfo: [],
    describeChildrenInfo: [],
    edinburghListInfo: [],//爱丁堡忧郁单列表
    techniciansListDetail: {
      describe: '管理员',
      list: [],
      state: 1,
      userId: 1
    },
    todayTime: new Date().getTime(),
    techniciansList: [],
    isAllTechnicians: 1,
    technicianHistoryList: [],
    technicianHistoryPageInfo: {
      page: 1,
      size: 10,
      total: 100
    },
    technicianUtilization: '0%',
    technicianNameList: [],
    technicianNamePageInfo: {
      page: 1,
      size: 10,
      total: 100
    }


  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (query.customerid) {
          let dict = { dataId: query.customerid }
          dispatch({ type: 'getCustomerInfoByCustomerId', payload: dict });
        }
        if (pathname === '/service/check-before/detail' || pathname === '/service/check-before/edit') {
          let dictTwo = { ...query, type: 1, operatorItem: 1 }
          if (pathname === '/service/check-before/edit') {
            dispatch({ type: 'getAssessmentById', payload: { dataId: query.id, operatorItem: 1 } });
          }
          else {
            dispatch({ type: 'getAssessmentByCustomerId', payload: dictTwo });
          }
          dispatch({ type: 'getAssessmentBabyInfoByCustomerId', payload: dictTwo });
          dispatch({ type: 'getBabyListByCustomerId', payload: { dataId: query.customerid } });
        }
        if (pathname === '/service/customer/detail') {
          for (let i = 1; i < 6; i++) {
            let dictTwo = { ...query, type: i, operatorItem: i }
            dispatch({ type: 'getAssessmentByCustomerId', payload: dictTwo });
          }
          let dictTwo = { ...query, type: 1, operatorItem: 1 }
          dispatch({ type: 'getAssessmentBabyInfoByCustomerId', payload: dictTwo });
          dispatch({ type: 'getBabyListByCustomerId', payload: { dataId: query.customerid } });
          dispatch({
            type: 'serviceCustomer/getPediatricNoteList',
            payload: { customerId: parseInt(query.customerid) }
          });
          dispatch({ type: 'getEdinburghMelancholyGaugeList', payload: { customerId: parseInt(query.customerid) } });
        }
        if (pathname === '/service/nutrition-evaluate/detail' || pathname === '/service/nutrition-evaluate/edit') {
          let dictTwo = { ...query, type: 5, operatorItem: 5 }
          dictTwo.operatorItem = 5;
          if (pathname === '/service/nutrition-evaluate/edit') {
            dispatch({ type: 'getAssessmentById', payload: { dataId: query.id, operatorItem: 5 } });
          }
          else {
            dispatch({ type: 'getAssessmentByCustomerId', payload: dictTwo });
          }
        }

        if (pathname === '/service/check-in/detail' || pathname === '/service/check-in/edit') {
          let dictTwo = { ...query, type: 2, operatorItem: 2 }
          dictTwo.operatorItem = 2;
          if (pathname === '/service/check-in/edit') {
            dispatch({ type: 'getAssessmentById', payload: { dataId: query.id, operatorItem: 2 } });
          }
          else {
            dispatch({ type: 'getAssessmentByCustomerId', payload: dictTwo });
          }
        }
        // if (pathname === '/service/child-check-in/detail' || pathname === '/service/child-check-in/edit') {
        //   let dict = { ...query, type: 3, operatorItem: 3 }
        //   dispatch({ type: 'getAssessmentByCustomerId', payload: dict });
        // }
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
          if(query.dataId){
            let dict_ = { dataId: query.dataId, operatorItem: 8 }
            dispatch({ type: 'getMaternalEverydayPhysicalEvaluationById', payload: dict_ });
          }else{

          }

        }

        //婴儿护理记录详情
        if (pathname === '/service/baby-nursing/detail' || pathname === '/service/baby-nursing/edit') {
          let dict_ = { customerId: query.customerid, date: moment().format('YYYY-MM-DD') }
          dispatch({ type: 'getBabyNursingNoteList', payload: dict_ });
        }
        if (pathname === '/service/baby-manual/detail') {
          let dict_ = { customerId: query.customerid,operatorItem: 10 }
          //dispatch({ type: 'getBrouchurDetailById', payload: dict_ });
          dispatch({type:'getBrouchurDetailList',payload:dict_})
        }
        if (pathname === '/service/baby-manual/edit') {
          let dict_ = { customerId: query.customerid,operatorItem: 10 }
          if(query.dataId){
            dict_.dataId = query.dataId;
            dispatch({type:'getBrouchurDetailById',payload:dict_})
          }else{

          }
          //dispatch({ type: 'getBrouchurDetailById', payload: dict_ });

        }
        //对内婴儿游泳记录
        if (pathname === '/service/baby-swimming/detail') {
          dispatch({ type: 'getInsideBabySwimList' });
          dispatch({ type: 'getBabyListByCustomerId', payload: { dataId: query.customerid } });
        } else if (pathname === '/service/baby-swimming/edit') {
          if(query.dataId){
            let dict_ = { dataId: query.dataId, operatorItem: 15 }
            dispatch({ type: 'getInsideBabySwimById', payload: dict_ });
          }else{

          }

        }


        //婴儿喂养记录
        if (pathname === '/service/baby-feed/detail' || pathname === '/service/baby-feed/edit') {

          if (pathname === '/service/baby-feed/detail') {
            dispatch({ type: 'getBabyFeedingNoteList' })
            dispatch({ type: 'getBabyListByCustomerId', payload: { dataId: query.customerid } });
          }
          else {
            if(query.dataId){
              let dict_ = { dataId: query.dataId, operatorItem: 13 }
              dispatch({ type: 'getBabyFeedingNoteById', payload: dict_ });
            }else{

            }

          }
        }
        //婴儿成长记录
        if (pathname === '/service/baby-grow/detail' || pathname === '/service/baby-grow/edit') {
          if (pathname === '/service/baby-grow/detail') {
            dispatch({ type: 'getBabyGrowthNoteList' });
            dispatch({ type: 'getBabyListByCustomerId', payload: { dataId: query.customerid } });
          }
          else {
            if(query.dataId){
              let dict_ = { dataId: query.dataId, operatorItem: 14 }
              dispatch({ type: 'getBabyGrowthNoteById', payload: dict_ });
            }else{

            }

          }
        }

        //中医、产科记录单详情页
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
        //儿科记录单详情页
        if (pathname === '/service/children-record/detail') {
          const { customerid } = query;
          let dict_ = { customerId: parseInt(customerid) }
          dispatch({
            type: 'getPediatricNoteList',
            payload: dict_
          });
        }

        //通知单
        if (pathname === '/service/send-message/production' || pathname === '/service/send-message/stay' || pathname === '/service/send-message/out' || pathname === '/service/send-message/check-out' || pathname === '/service/send-message/free') {
          dispatch({ type: 'getCurrentEndemicDeptList' });
        }

        //爱丁堡忧郁单详情页
        if (pathname === '/service/edinburgh-birth/detail') {
          const { customerid } = query;
          let dict_ = { customerId: parseInt(customerid) }
          dispatch({ type: 'getEdinburghMelancholyGaugeList', payload: dict_ });
        }

        //技师预约
        if (pathname === '/service/order-technician') {
          dispatch({ type: 'getTechnicians', payload: { date: moment().format('YYYY-MM-DD') } })
        }
        //技师预约详情
        if (pathname === '/service/order-technician/detail') {
          const { userid, date } = query;
          dispatch({
            type: 'getTechniciansInfo',
            payload: { type: 1, userId: userid, date }
          })
          dispatch({
            type: 'serviceCustomer/changeTechniciansTime',
            payload: date
          })
        }
        //技师预约历史
        if (pathname === '/service/order-technician/history') {
          const { userid } = query;
          let endDate = query.enddate ? query.enddate : moment().format('YYYY-MM-DD')
          let startDate = query.startdate ? query.startdate : moment().format('YYYY-MM-DD')
          dispatch({
            type: 'getTechnicianHistory',
            payload: {
              userId: userid,
              endDate,
              page: 1,
              size: 10,
              startDate,
              sortField: "time",
              sortOrder: "AESC"
            }
          })
          dispatch({
            type: 'getTechnicianUtilization',
            payload: {
              userId: userid,
              endDate,
              page: 1,
              size: 10,
              startDate,
              sortField: "time",
              sortOrder: "AESC"
            }
          })
          dispatch({
            type: 'getTechnicianList',
            payload: {
              page: 1,
              size: 10
            }
          })
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
        }else if (values.type == 4) {
          yield put(routerRedux.push('/service/diagnosis'))
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

    //发送生产通知单
    *sendProductionNotification({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.sendProductionNotification, values);
        message.success("保存成功");
        yield put(routerRedux.push('/service/send-message'))
      }
      catch (err) {
      }
    },
    //发送入住通知单
    *sendOccupancyNotice({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.sendOccupancyNotice, values);
        message.success("发送成功");
        yield put(routerRedux.push('/service/send-message'))
      }
      catch (err) {
      }
    },
    //发送外出通知单
    *senddepartureNotice({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.senddepartureNotice, values);
        message.success("发送成功");
        yield put(routerRedux.push('/service/send-message'))
      }
      catch (err) {
      }
    },
    //发送退房通知单
    *sendCheckOutNotice({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.sendCheckOutNotice, values);
        message.success("发送成功");
        yield put(routerRedux.push('/service/send-message'))
      }
      catch (err) {
      }
    },
    //发送自由通知单
    *sendFreeNotice({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.sendFreeNotice, values);
        message.success("发送成功");
        yield put(routerRedux.push('/service/send-message'))
      }
      catch (err) {
      }
    },

    *getJournal({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.getJournal, values);
        yield put({
          type: 'savaJournal',
          payload: { type: values.type, value: data }
        });
      }
      catch (err) {
      }
    },

    *updateJournal({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.updateJournal, values);
        message.success("移动成功");
        yield put({
          type: 'getJournal',
          payload: { type: values.type }
        });
      }
      catch (err) {
      }
    },


    *getBabyListByCustomerId({ payload: value }, { call, put }){

      try {
        const { data: { data, code } } = yield call(serviceAssessment.getBabyListByCustomerId, value);
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

    *getAssessmentById({ payload: values }, { call, put }) {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.getAssessmentById, values);
        yield put({
          type: 'savaAssessment',
          payload: data
        });
      }
      catch (err) {
        message.error(err.message);

        let str = ''

        if (values.operatorItem == 1) {
          str = 'check-before'
        }
        else if (values.operatorItem == 5) {
          str = 'nutrition-evaluate'
        }
        else if (values.operatorItem == 2) {
          str = 'check-in'
        }
        else if (values.operatorItem == 4) {
          str = 'diagnosis'
        }
        let query = parse(location.search.substr(1))
        yield put(routerRedux.push(`/service/${str}/detail?customerid=${query.customerid}`))

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
        const { data: { data, code } } = yield call(serviceAssessment.DelAssessment, values);
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
        message.error(err.message);
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
        let query = parse(location.search.substr(1))
        yield put(routerRedux.push(`/service/baby-grow/detail?customerid=${query.customerid}`))
        message.error(err.message);
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
        let query = parse(location.search.substr(1))
        yield put(routerRedux.push(`/service/puerpera-body/detail?customerid=${query.customerid}`))
        message.error(err.message);
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
        let query = parse(location.search.substr(1))
        yield put(routerRedux.push(`/service/baby-feed/detail?customerid=${query.customerid}`))
        message.error(err.message);
      }
    },


    *delBabyFeedingNote({ payload: values }, { call, put })
    {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.delBabyFeedingNote, values);
        message.success('删除成功')
        yield put({ type: 'getBabyFeedingNoteList' });
      }
      catch (err) {
        message.error(err.message);
      }
    },

    *delBabyGrowthNote({ payload: values }, { call, put })
    {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.delBabyGrowthNote, values);
        message.success('删除成功')
        yield put({ type: 'getBabyGrowthNoteList' });
      }
      catch (err) {
        message.error(err.message);
      }
    },
    *delMaternalEverydayPhysicalEvaluation({ payload: values }, { call, put })
    {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.delMaternalEverydayPhysicalEvaluation, values);
        message.success('删除成功')
        yield put({ type: 'getMaternalEverydayPhysicalEvaluationList' });
      }
      catch (err) {
        message.error(err.message);
      }
    },
    *delBabySwimming({ payload: values }, { call, put })
    {
      try {
        const { data: { data, code } } = yield call(serviceAssessment.delBabySwimming, values);
        message.success('删除成功')
        yield put({ type: 'getInsideBabySwimList' });
      }
      catch (err) {
        message.error(err.message);
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
    *getBrouchurDetailById({ payload: values }, { call, put }){
      try{
        const { data: { data, code } } = yield call(serviceAssessment.getBrouchurDetailById, values);
          yield put({
            type: 'saveBrouchurDetailById',
            payload: data
          });
      }
      catch(err){
          let query = parse(location.search.substr(1))
      //  console.log("Sss",`/service/baby-manual/detail?customerid=${query.customerid}`)
          yield put(routerRedux.push(`/service/baby-manual/detail?customerid=${query.customerid}`))
          message.error(err.message);
        }
    },
    //宣教手册列表
    *getBrouchurDetailList({payload:values},{call, put}){
      try {
        const { data: { data, code } } = yield call(serviceAssessment.getBrouchurDetailList, values);
        yield put({
          type: 'saveBrouchurDetailList',
          payload: data
        });
      }
      catch (err) {
        console.log(err)
      }
    },
    //删除宣教手册Byid
    *deleteBrouchurById({payload:values},{call, put}) {
      const { data:{data,code}} = yield call(serviceAssessment.deleteBrouchurById,values);
      if(code == 0){
        message.success("删除成功")
        let query = parse(location.search.substr(1))
        let dict = { customerId: query.customerid ,operatorItem:10}
        if (query.date) {
          dict.date = query.date
        }
        yield put({
          type:'getBrouchurDetailList',
          payload:dict,
        })
      }
    },
    //宣教手册保存
    *saveBrouchurs({payload:values},{call,put}) {
      try {
        const { data:{data,code}} = yield call(serviceAssessment.saveBrouchurs,values);
        message.success("保存成功");
        let query = parse(location.search.substr(1))
        yield put(routerRedux.push(`/service/baby-manual/detail?customerid=${query.customerid}`))
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
    //中医、产科记录单详情
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
    //根据id查询记录详情判断是否编辑权限
    *isEditGetDoctorNoteById({ payload: postData }, { call, put, select })
    {
      const { isEdit, info, key, operatorItem } = postData;
      const reducerInfo = yield select(state => state.serviceCustomer);
      const { describeInfo } = reducerInfo;
      const values = { dataId: info.id, operatorItem }

      const isEditInfo = { info, key }
      const { data: { data, code } } = yield call(serviceAssessment.getDoctorNoteById, values);
      if (code == 0) {
        const noEditInfo = describeInfo[key]
        isEdit ? isEditInfo.info = { ...isEditInfo.info, isEdit } : isEditInfo.info = { ...noEditInfo, isEdit }
        yield put({
          type: 'isEdit',
          payload: isEditInfo
        })
      } else {
        message.error('超过24小时无法编辑！')
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
          type: 'getDescribeDiagnosis',
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


    //儿科查房记录单详情页
    //1.保存或编辑记录单
    *savePediatricNote({ payload: info }, { call, put, select })
    {
      const { values, keys, customerId } = info;
      const { k, kk } = keys;
      const { data: { data, code } } = yield call(serviceAssessment.savePediatricNote, values);
      if (code == 0) {
        message.success('保存成功');
        yield put({
          type: 'getPediatricNoteList',
          payload: {
            customerId: customerId,
            babyId: k
          }
        });
      }
    },
    //2.根据客户id和记录单类型以及筛选条件查询记录单列表页面
    *getPediatricNoteList({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(serviceAssessment.getPediatricNoteList, values);
      if (code == 0) {
        if (values.babyId || values.babyId == 0) {
          const key = values.babyId
          yield put({
            type: 'getDescribeChildrenById',
            payload: { info: data, key }
          })
        } else {
          yield put({
            type: 'getDescribeChildren',
            payload: data
          });
        }

      }
    },
    //3.根据id删除记录
    *DelPediatricNote({ payload: postInfo }, { call, put, select })
    {
      const { id, operatorItem, babyId, customerId } = postInfo;
      const values = { dataId: id, operatorItem, babyId: babyId }
      const { data: { data, code } } = yield call(serviceAssessment.DelPediatricNote, values);
      if (code == 0) {
        message.success('删除成功');
        yield put({
          type: 'getPediatricNoteList',
          payload: {
            customerId: customerId,
            babyId: babyId
          }
        });

      }
    },
    //4.根据id查询记录详情判断编辑权限
    *getPediatricNoteById({ payload: postInfo }, { call, put })
    {
      const { k, dataId } = postInfo
      const values = {
        dataId,
        babyId: k,
        operatorItem: 5
      }
      const { data: { data, code } } = yield call(serviceAssessment.getPediatricNoteById, values);
      if (code == 0) {
        yield put({
          type: 'isEditChildren',
          payload: postInfo
        })
      } else {
        message.error('超过24小时无法编辑！')
      }
    },


    *getInsideBabySwimById({ payload: values }, { call, put }){
      try {
        const { data: { data, code } } = yield call(serviceAssessment.getInsideBabySwimById, values);
        yield put({
          type: 'getInsideBabySwim',
          payload: data
        });
      }
      catch (err) {
        let query = parse(location.search.substr(1))
        yield put(routerRedux.push(`/service/baby-swimming/detail?customerid=${query.customerid}`))
        message.error(err.message);
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
    },

    //爱丁堡忧郁单详情页
    //1.保存或编辑爱丁堡忧郁单 saveEdinburghMelancholyGauge
    *saveEdinburghMelancholyGauge({ payload: values }, { call, put }){
      const { info, customerId } = values;
      const { data: { data, code } } = yield call(serviceAssessment.saveEdinburghMelancholyGauge, info);
      if (code == 0) {
        message.success('保存成功!')
        yield put({
          type: 'getEdinburghMelancholyGaugeList',
          payload: { customerId: customerId }
        });
      }
    },


    //2.根据客户id以及筛选条件查询爱丁堡忧郁单列表
    *getEdinburghMelancholyGaugeList({ payload: values }, { call, put, select }){
      const info = yield select(state => state.serviceCustomer);
      info.edinburghTime == "" || info.edinburghTime == undefined ? null : values.date = info.edinburghTime;
      const { data: { data, code } } = yield call(serviceAssessment.getEdinburghMelancholyGaugeList, values);
      if (code == 0) {
        yield put({
          type: 'getEdinburghListInfo',
          payload: data
        });
      }
    },
    //3.根据id查询爱丁堡忧郁单详情
    *getEdinburghMelancholyGaugeById({ payload: info }, { call, put }){
      const { k, values } = info;
      const { data: { data, code } } = yield call(serviceAssessment.getEdinburghMelancholyGaugeById, values);
      if (code == 0) {
        yield put({
          type: 'noChangeEdinburghListInfo',
          payload: { k, data }
        });
      }
    },
    //4.根据id查询删除
    *delEdinburghMelancholyGauge({ payload: postInfo }, { call, put }){
      const { values, customerId } = postInfo;
      const { data: { data, code } } = yield call(serviceAssessment.delEdinburghMelancholyGauge, values);
      if (code == 0) {
        message.success('删除成功')
        yield put({
          type: 'getEdinburghMelancholyGaugeList',
          payload: { customerId: customerId }
        });
      }
    },


    //预约技师
    //1.根据日期查询技师列表
    *getTechnicians({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(serviceAssessment.getTechnicians, values);
      if (code == 0) {
        yield put({
          type: 'getTechniciansList',
          payload: data
        });
      }
    },
    //2.切换技师预约上线离线状态
    *changeTechnicianState({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(serviceAssessment.changeTechnicianState, values);
      if (code == 0) {
        message.success('修改成功！')
      }
    },
    //3.根据日期查询技师预约详情
    *getTechniciansInfo({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(serviceAssessment.getTechniciansInfo, values);
      if (code == 0) {
        yield put({
          type: 'getTechniciansListDetail',
          payload: data
        });
      }
    },
    //4.关闭预约closeTechnician
    *closeTechnician({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(serviceAssessment.closeTechnician, values);
      if (code == 0) {
        yield put({
          type: 'getTechniciansInfo',
          payload: {
            date: values.date,
            type: 1,
            userId: values.userId
          }
        });
      }
    },
    //5.开启预约openTechnician
    *openTechnician({ payload: values }, { call, put, select }){
      const { dataId, userId, date } = values;
      const info = yield select(state => state.serviceCustomer);
      const { isAllTechnicians } = info;
      const { data: { data, code } } = yield call(serviceAssessment.openTechnician, { dataId });
      if (code == 0) {
        yield put({
          type: 'getTechniciansInfo',
          payload: {
            date,
            type: isAllTechnicians,
            userId
          }
        });
      }
    },
    //6.取消预约openTechnician
    *cancelTechnician({ payload: values }, { call, put, select }){
      const { dataId, userId, date } = values;
      const info = yield select(state => state.serviceCustomer);
      const { isAllTechnicians } = info;
      const { data: { data, code } } = yield call(serviceAssessment.cancelTechnician, { dataId });
      if (code == 0) {
        yield put({
          type: 'getTechniciansInfo',
          payload: {
            date,
            type: isAllTechnicians,
            userId
          }
        });
      }
    },
    //7. 查询技师预约历史记录分页列表
    *getTechnicianHistory({ payload: values }, { call, put }){
      const { data: { data, code, page, size, total } } = yield call(serviceAssessment.getTechnicianHistory, values);
      if (code == 0) {
        yield put({
          type: 'getTechnicianHistoryList',
          payload: { data, page, size, total }
        });
      }
    },
    //8,查询使用率
    *getTechnicianUtilization({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(serviceAssessment.getTechnicianUtilization, values);
      if (code == 0) {
        yield put({
          type: 'getTechnicianUtilizationInfo',
          payload: data
        });
      }
    },
    //9,查询技师列表
    *getTechnicianList({ payload: values }, { call, put }){
      const { data: { data, code, page, size, total } } = yield call(serviceAssessment.getTechnicianList, values);
      if (code == 0) {
        yield put({
          type: 'getTechnicianNameList',
          payload: { data, page, size, total }
        });
      }
    }


  },
  reducers: {
    //预约技师
    getTechniciansList(state, { payload: data }){
      return { ...state, techniciansList: data.list }
    },
    getTechniciansListDetail(state, { payload: data }){
      return { ...state, techniciansListDetail: data }
    },
    changeTechniciansTime(state, { payload: data }){
      return { ...state, todayTime: data }
    },
    changeIsAllTechnicians(state, { payload: data }){
      return { ...state, isAllTechnicians: data }
    },
    getTechnicianHistoryList(state, { payload: info }){
      const { data, page, size, total } = info;
      const technicianHistoryPageInfo = { page, size, total }
      return { ...state, technicianHistoryList: data, technicianHistoryPageInfo }
    },
    getTechnicianUtilizationInfo(state, { payload: data }){
      return { ...state, technicianUtilization: data }
    },

    getTechnicianNameList(state, { payload: info }){
      const { data, page, size, total } = info;
      const technicianNamePageInfo = { page, size, total }
      return { ...state, technicianNameList: data, technicianNamePageInfo }
    },
    saveChooseTechnicianTime(state, { payload: data }){
      return { ...state, startDate: data[0], endDate: data[1] }
    },
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
      return { ...state, EndemicDeptList: todo };
    },

    savaJournal(state, { payload: { type, value } }){

      let dict = {}
      let str = 'Journal' + type
      dict[str] = value

      return { ...state, ...dict };
    },
    savaAssessment(state, { payload: todo }){
      let dict = {}

      let tempDict = {}
      if (todo) {
        tempDict = JSON.parse(todo.assessmentInfo)
        tempDict.operator = todo.operator
        tempDict.operatorTime = moment(todo.operatorTime).format('YYYY-MM-DD')
      }


      if (todo) {
        if (todo.type === 1) {
          dict.CheckBeforeData = tempDict
          dict.CheckBeforeID = todo.id
        } else if (todo.type === 5) {
          dict.NutritionEvaluateData = tempDict
          dict.NutritionEvaluateID = todo.id
        } else if (todo.type === 4) {
          dict.diagnosisData = tempDict
          dict.diagnosisID = todo.id
        } else if (todo.type === 2) {
          dict.CheckInData = tempDict
          dict.CheckInID = todo.id
        } else if (todo.type === 3) {
          dict.ChildCheckInData = tempDict
          dict.ChildCheckInID = todo.id
        }
      }
      return { ...state, ...dict }
    },


    savaBabyAssessment(state, { payload: todo }){
      let dict = {}
      dict.CheckBeforeBabyData = todo
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
        CustomerInfoList: null,
        baseInfoDict: null,
        PuerperaBodyList: null,
        MissionManualDetailList:null,
        MissionManualData:null,
        InsideBabySwimList: null,//对内婴儿游泳记录集合
        diagnosisData:null,
        BabyList:'',
        SingleInformationDict:null,
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
      return { ...state, ...dict }
    },
    savaCustomerInfo(state, { payload: todo }){
      return { ...state, baseInfoDict: todo }
    },

    saveBrouchurDetailById(state, { payload: todo }) {
      return { ...state, MissionManualData: todo }
    },
    saveBrouchurDetailList(state, {payload: todo }) {
      return { ...state,MissionManualDetailList: todo}
    },
    saveBabyNursingNoteList(state, { payload: todo }){
      return { ...state, babyNursingList: todo }
    },
    savaSingleInformation(state, { payload: todo }){
      return { ...state, SingleInformationDict: todo }
    },
    //中医、产科记录单详情
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

    //儿科查房记录单详情页
    //1.获取列表
    getDescribeChildren(state, { payload: data }){
      return { ...state, describeChildrenInfo: data }
    },
    //2.是否编辑
    isEditChildren(state, { payload: data }){
      let describeChildrenInfo = [...state.describeChildrenInfo];
      const { k, kk, isEdit } = data;
      describeChildrenInfo[k].notelist[kk].isEdit = isEdit;
      return { ...state, describeChildrenInfo }
    },
    //3.切换面板
    changeTab(state, { payload: activeKey }){
      return { ...state, activeKey }
    },
    //4,改变一组baby的值
    getDescribeChildrenById(state, { payload: data }){
      const { info, key } = data;
      let describeChildrenInfo = [...state.describeChildrenInfo];
      describeChildrenInfo[key] = info[0];
      return { ...state, describeChildrenInfo }
    },


    //汇总用的记录单详情页
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
    //6,营养查房记录单
    getDescribeNutrition(state, { payload: data }){
      return { ...state, describeNutritionInfo: data }
    },
    savaBabyList(state, { payload: data }){
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
    },

    //爱丁堡忧郁单详情页
    //1.获取列表
    getEdinburghListInfo(state, { payload: data }){
      return { ...state, edinburghListInfo: data }
    },
    //2.是否可编辑
    isEditEdinburgh(state, { payload: data }){
      let edinburghListInfo = [...state.edinburghListInfo];
      const { k, isEdit } = data;
      edinburghListInfo[k].isEdit = isEdit;
      return { ...state, edinburghListInfo }
    },
    //3.返回按钮
    noChangeEdinburghListInfo(state, { payload: info }){
      const { k, data } = info;
      let edinburghListInfo = [...state.edinburghListInfo];
      edinburghListInfo[k] = data;
      return { ...state, edinburghListInfo }
    },
    //4.保存筛选的时间状态
    edinburghChangeTime(state, { payload: data }){
      return { ...state, edinburghTime: data }
    }

  }
}
























