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
		dictionarySideDOs:null,
		item: null
	},
	reducers: {
		//添加集团列表数据
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
			console.log(data);
			return  savedata;
		},
		//查看集团列表数据
		checkDataSave(state, {
			payload: { data:item }
		}) {
			return  {...state,item };
		},
		//编辑集团列表数据
		editDataSave(state, {
			payload: { data: item }
		}) {
			return {...state,item}
		},
	},
	effects: {
		//添加集团列表数据
		*saveData({payload: values}, { call, put }) {
			const {data: { data, id, code} } = yield call(saveService.saveData, values);
			if (code == 0) {
				message.success("添加用户信息成功");
				yield put(routerRedux.push("system/groupchar"));

			}
		},

		//查看集团列表数据
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
		//编辑集团列表数据
		*editData({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(saveService.editData, values);
			if (code == 0) {
				message.success("更改用户信息成功");
				yield put(routerRedux.push("system/groupchar"));

			}
		},
		//获取集团列表所需数据
		// *getEditData({payload}, {put, select}) {
		// 	const data = yield select((state) => state.save.data)
		// 	console.log(dictionarySideDOs)
		// 	console.log('model:save:getedit>>', data);
		// 	yield put({
		// 		type: 'editDataSave',
		// 		payload: {
		// 			data,
		// 		}
		// 	})
		// }
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

				//查看集团列表数据
				if (pathname === '/groupchar/check') {
					dispatch({
						type: 'checkData',
						payload:query
					});
				}
				//编辑集团列表数据
				// if (pathname === '/groupchar/edit') {
				// 	dispatch({
				// 		type: 'editData',
				// 		payload:query
				// 	});
				// }
			})
		}
	},
};
