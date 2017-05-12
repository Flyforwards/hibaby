import * as serviceService from '../services/service';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {local, session} from '../common/util/storage.js';
import {PAGE_SIZE} from 'common/constants.js'

export default {
	namespace: 'service',
	state: {
		data: [],
		total: null,
		page:null,
		size:null,
	},
	reducers: {
		ServicePageSave(state, { payload: {data,total,page,size,code}}) {
			let servicepagedata = {...state,
				data,
				total,
				page,
				size,
				code
			};
			console.log("ss",data)
			let range = {
				start: page == 1 ? 1 : (page - 1) * 10 + 1,
				end: page == 1 ? data.length : (page - 1) * 10 + data.length,
				totalpage:Math.ceil(total/size),
			}
			return {...servicepagedata,range};
		}

	},
	effects: {
		*ServicePage({
			payload: values
		}, {
			call,
			put
		}) {
			const {
				data: {
					data,
					total,
					page,
					size,
					code
				}
			} = yield call(serviceService.ServicePage, values);
			console.log("effects>>>",data)
			if (code == 0) {
				yield put({
					type: 'ServicePageSave',
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

				if (pathname === '/system/serviceitem') {
					console.log("service")
					dispatch({
						type: 'ServicePage',
						payload: {
							...query,
							"size": 3,
							"page": 2
						}
					});
				}

			})
			console.log("subscriptions>>>",data)
		}
	},
};
