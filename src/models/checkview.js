import * as organizationService from '../services/organization';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {local, session} from '../common/util/storage.js';
import {PAGE_SIZE} from '../constants.js'

export default {
	namespace: 'checkview',
	state: {
		data: null,
		total: null,
		list:null,
	},
	reducers: {
		getCheckPage(state,{payload:{ data,code }}){
	      let getCheckPagedata = {...state,data,code};
	      return getCheckPagedata
	    },
	},
	effects: {
		//获取组织架构的列表
		*getCheckPage({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(checkviewService.getCheckPage, values);
			if (code == 0) {
				yield put({
					type: 'getCheckPage',
					payload: {
						data,
						code
					}
				});
			}
		},
	},
	subscriptions: {
		setup({
			dispatch,
			history
		}) {
			return history.listen(({
				pathname,
				query
			}) => {
		        if(pathname === 'groupchar/check') {
		            dispatch({
						type: 'getCheckPage',
						payload: query
					});
		        }
			})
		}
	},
};
