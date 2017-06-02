
import * as cardService from '../services/card';
import * as customerService from '../services/customer';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'card',
  state: {
    postValues: {},
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize:10,
      total: null,
    },
    list:[],
    userPagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize:10,
      total: null,
    },
  },
  reducers: {
    //分页
    getCardPageSave(state, { payload: { list, pagination }}) {
      return {...state, list, pagination: {  ...state.pagination,...pagination }};
    },

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
    //卡种类型
    cardType(state , {payload: {data : typeValues }}){
      let cardType ={ ...state, typeValues}
      return cardType;
    },

    //会员卡级别
    levelInfo(state, { payload: { data: level } }){
      let levelInfo = { ...state, level }
      return levelInfo;
    },

    getCustomerPageSave(state, { payload: { list, userPagination }}) {
      return {...state, list, pagination: {  ...state.userPagination,...userPagination }};
    },
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
    //获取卡种类型
    *getCardType({ payload:values }, { call,put }){
      const { data: { code, data } } = yield call(cardService.getCardType, values);
      if ( code == 0) {
        yield put({
          type:'cardType',
          payload: {
            data
          }
        });
      }
    },
    //获取卡种分页列表
    *getCard({ payload: values }, { call, put }) {
      const { data: { code, data, total,page ,size} } = yield call(cardService.getMembershipcardPageList, values);
      if (code == 0) {
        yield put({
          type: 'getCardInfo',
          payload: {
            data,
            total
          }
        });
        yield put({
          type: 'getCardPageSave',
          payload: {
            list: data,
            pagination: {
              current: Number(page) || 1,
              pageSize: Number(size) || 10,
              total: total,
            },
          },
        })
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
    *saveCard({ payload: values }, { call , put }) {
      const { data: { code, data } } = yield call(cardService.saveMembershipcard, values);
      if (code == 0) {
        message.success('保存成功！');
        yield put(routerRedux.push("/crm/card"));
      }
    },

    //更新卡种信息
    *modifyCardMsg({ payload: values }, { call , put }) {
      const { data: { code, data } } = yield call(cardService.modifyMembershipcard, values);
      if (code == 0) {
        message.success('保存成功！');
        yield put(routerRedux.push("/crm/card"));
      }
    },


  //刪除卡種信息
    *deleteCardById({ payload: values},{ call, put,select}){
      const { data: { code ,data }} = yield call(cardService.deleteCardById,values);
      if( code == 0) {
        message.success('删除成功');
        const page = yield select(state => state.card.pagination);
        yield put(routerRedux.push({
          pathname: '/crm/card',
        }))
        yield put({
          type:'getCard',
          payload:{
            "page":page.current,
            "size":page.pageSize,
          }
        })
      }
    },

    *getPostInfo({ payload: values }, { put }){
      yield put({
        type: 'postCard',
        payload: {
          values
        }
      });
    },

    *getCustomerPage({ payload: values }, { call, put }) {
      const { data: { data, total, page, size, code } } = yield call(customerService.getCustomerPage, values);
      if (code == 0) {
        yield put({
          type: 'getCustomerPageSave',
          payload: {
            list: data,
            userPagination: {
              current: Number(page) || 1,
              pageSize: Number(size) || 10,
              total: total,
            },
          },
        })
      }
    },


  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/crm/card') {
          dispatch({
            type: 'getCard',
            payload: {
              "page":1,
              "size":10,
            }
          });
          dispatch({
            type:'getCardType',
          });
          dispatch({
            type: 'getZhekouInfo',
          });
         dispatch({
            type:'getLevelInfo',
            payload:{
              id:7,
              softDelete:0,
              type:1,
            }
          });
        };
      })
    }
  }
}
