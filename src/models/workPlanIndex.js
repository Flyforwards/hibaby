import * as workPlanIndexService from '../services/workPlanIndex';
import { message } from 'antd'
import { routerRedux } from 'dva/router';
import moment from 'moment';
export default {
  namespace: 'workPlanIndex',
  state: {},
  
  reducers: {
    dataList(state, { payload: { dataInfo } }){
      return { ...state, dataInfo };
    },
    timeInfo(state, { payload: { date } }){
      return { ...state, date }
    },
    
    planList(state, { payload: { planListInfo } }){
      return { ...state, planListInfo }
    },
    pushPlanInfo(state, { payload: { record } }){
      return { ...state, record }
    }
  }
  ,
  effects: {
    
    //查询工作计划日期列表
    *getDateList({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(workPlanIndexService.getWorkPlanDateList, values);
      if (code == 0) {
        yield put({
          type: 'dataList',
          payload: {
            dataInfo: data
          }
        });
      }
    },
    
    //根据月份或者日期查询工作计划列表
    *getWorkPlanInfo({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(workPlanIndexService.getWorkPlanList, values);
      if (code == 0) {
        yield put({
          type: 'planList',
          payload: {
            planListInfo: data
          }
        });
      }
    },
    
    //新增工作计划
    *addWorkPlanInfo({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(workPlanIndexService.addWorkPlan, values);
      if (code == 0) {
        message.success('添加成功!');
        yield put(routerRedux.push('/user/work-plan'));
      }
    },
    
    //删除工作计划
    *delWorkPlanInfo({ payload: values }, { call, put }){
      const { data: { code } } = yield call(workPlanIndexService.delWorkPlan, values);
      if (code == 0) {
        message.success('删除成功!');
        setTimeout(() => {
          window.location.reload()
        }, 50)
      }
    },
    
    //编辑工作计划
    *editWorkPlan({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(workPlanIndexService.updateWorkPlan, values);
      if (code == 0) {
        message.success('保存成功!');
        yield put(routerRedux.push('/user/work-plan'));
      }
    },
  
  
  
  },
  
  subscriptions: {
    setup({ dispatch, history })
    {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/user/work-plan') {
          let date = moment().format('YYYY-MM-DD');
          let month = moment().format('YYYY-MM');
          dispatch({
            type: 'timeInfo',
            payload: {
              date
            }
          });
          dispatch({
            type: 'getWorkPlanInfo',
            payload: { month }
          })
          dispatch({
            type: 'getDateList',
            payload: { month }
          })
        }
      })
    }
  }
}


