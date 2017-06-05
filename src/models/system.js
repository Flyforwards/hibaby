import * as systemService from '../services/system';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {local, session} from 'common/util/storage.js';
import {PAGE_SIZE} from 'common/constants.js'

export default {
	namespace: 'system',
	state: {
		data: [],
		total: null,
		list:[],
		nodes:[],
    item:{},
	},
	reducers: {

		checkDataSave(state, { payload: { data: item } }) {
			return  {...state, item }
    }
  },
	effects: {
		*checkData({ payload:values }, { call, put }) {
			const { data: { data, code } } = yield call(systemService.checkData, values);
			if (code == 0) {
				yield put({
					type: 'checkDataSave',
					payload: {
						data,
          }
				});
			}
		},
	},
	subscriptions: {

	},
};
