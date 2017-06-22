import { message } from 'antd';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'cyclePage',
  state: {
    isShowDetail: false,
    curTabsIndex: '1',
    curDetailTabsIndex: '1'
  },
  reducers: {

    changedTabActivity(state, { payload: { status} }) {
      let index = Number(state.curTabsIndex) + status;
      let indexStr = index+'';
      return {...state, curTabsIndex: indexStr};
    },

    changedDetailTabActivity(state, { payload: { status} }) {
      let index = Number(state.curDetailTabsIndex) + status;
      let indexStr = index+'';
      return {...state, curDetailTabsIndex: indexStr};
    },

    changedShowStatus(state, {}) {
      let isShowDetail = !state.isShowDetail;
      return {...state, isShowDetail};
    }
  },
  effects: {


  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/meals/nutritionist/cycle') {

        }
      })
    }
  }
}