import * as cardService from '../services/card';
import { message } from 'antd'

export default {
  namespace: 'card',
  state: {
    postValues: {}
  },
  reducers: {
    getCardInfo(state, { payload: { data: cardInfo, total } }) {
      let getCardInfo = { ...state, cardInfo, total }
      return getCardInfo;
    },
    postCard(state, { payload: { values: postValues } }){
      let postCardInfo = { ...state, postValues }
      return postCardInfo;
    },
    cardKindInfo(state, { payload: { data: cardKind } }){
      let cardKindInfo = { ...state, cardKind }
      return cardKindInfo;
    },
    
    //折扣权限
    zheKouInfo(state, { payload: { data: zheKou } }){
      let zheKouInfo = { ...state, zheKou }
      return zheKouInfo;
    },
    //会员卡级别
    
    levelInfo(state, { payload: { data: level } }){
      let levelInfo = { ...state, level }
      return level;
    }
  },
  effects: {
    //获取折扣权限
    *getZhekouInfo({ payload: values }, { call, put }) {
      const { data: { code, data } } = yield call(cardService.getZhekou, values);
      if (code == 0) {
        yield put({
          type: 'zheKouInfo',
          payload: {
            data
          }
        });
      }
    },
    //获取会员卡级别
    *getLevelInfo({ payload: values }, { call, put }) {
      const { data: { code, data } } = yield call(cardService.getLevel, values);
      if (code == 0) {
        yield put({
          type: 'levelInfo',
          payload: {
            data
          }
        });
      }
    },
    
    //获取卡种分页列表
    *getCard({ payload: values }, { call, put }) {
      const { data: { code, data, total } } = yield call(cardService.getMembershipcardPageList, values);
      if (code == 0) {
        yield put({
          type: 'getCardInfo',
          payload: {
            data,
            total
          }
        });
      }
    },
    
    //根据卡种id获取卡种信息
    *getCardKindInfo({ payload: values }, { call, put }) {
      const { data: { code, data } } = yield call(cardService.getMembershipcardById, values);
      if (code == 0) {
        yield put({
          type: 'cardKindInfo',
          payload: {
            data
          }
        });
      } else {
        yield put({
          type: 'cardKindInfo',
          payload: {
            data
          }
        });
      }
    },
    
    //保存卡种信息
    *saveCard({ payload: values }, { call }) {
      const { data: { code, data } } = yield call(cardService.saveMembershipcard, values);
      if (code == 0) {
        message.success('保存成功！');
      }
    },
    
    
    *getPostInfo({ payload: values }, { put }){
      yield put({
        type: 'postCard',
        payload: {
          values
        }
      });
    }
    
    
  },
  
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/crm/card') {
          dispatch({
            type: 'getCard',
            payload: {
              "page": 1,
              "size": 2,
              "sortField": "string",
              "sortOrder": "string"
            }
          });
        }
        ;
      })
    }
  }
}


