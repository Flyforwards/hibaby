import * as saveService from '../services/save';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {local, session} from '../common/util/storage.js';
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
			})
		}
	},
};
