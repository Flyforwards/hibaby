import * as saveService from '../services/save';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {local, session} from 'common/util/storage.js';
import {PAGE_SIZE} from 'common/constants.js'

export default {
	namespace: 'save',
	state: {
		data: null,
		total: null,
		list:null,
		leftList:null,
	},
	reducers: {
		saveDataSave(state, {
			payload: {
				data,
				code
			}
		}) {
			let savedata = {...state,
				data,
				code
			}
			let dictionarySideDOs=data.dictionarySideDOs;
			console.log(data);
			return  {...savedata,
				   dictionarySideDOs
			};
		},

		checkDataSave(state, {
			payload: { data }
		}) {
			return  {...state,data };
		},
		editDataSave(state, {
			payload: {
				data,
				code
			}
		}) {
			let savedata = {...state,
				data,
				code
			}
			let dictionarySideDOs=data.dictionarySideDOs;
			console.log(data);
			return  {...savedata,
				   dictionarySideDOs
			};
		},
	},
	effects: {
		*saveData({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(saveService.saveData, values);
			console.log(data)
			if (code == 0) {
				console.log(data)
				message.success("添加用户信息成功");
				yield put({
					type: 'saveDataSave',
					payload: {
						data,
						code
					}
				});

			}
		},

		*checkData({payload: values}, { call, put }) {
			const {data: {code,data,err}} = yield call(saveService.checkData, values);
			if (code == 0 && err == null) {
				yield put({
					type: 'checkDataSave',
					payload: {
						data,
					}
				});

			}
		},

		*editData({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(saveService.editData, values);
			console.log(data)
			if (code == 0) {
				console.log(data)
				message.success("更改用户信息成功");
				yield put({
					type: 'editDataSave',
					payload: {
						data,
						code
					}
				});

			}
		},
		*getEditData({payload}, {put, select}) {
			const data = yield select((state) => state.save.data)
			// console.log('model:save:getedit>>', data);
			yield put({
				type: 'editDataSave',
				payload: {
					data
				}
			})
		}
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

				if (pathname === '/demo/add') {
					dispatch({
						type: 'saveData',
						payload:query
					});
				}
				if (pathname === '/groupchar/check') {
					dispatch({
						type: 'checkData',
						payload:query
					});
				}
				// if (pathname === '/groupchar/edit') {
				// 	dispatch({
				// 		type: 'getEditData',
				// 		payload:query
				// 	});
				// }
			})
		}
	},
};
