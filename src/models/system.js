import * as systemService from '../services/system';
import {
	routerRedux
} from 'dva/router';

export default {
	namespace: 'system',
	state: {
		data: [],
		total: null,
	},
	reducers: {
		systemSave(state, {
			payload: {
				data,
				total,
				page,
				size,
				code,
			}
		}) {

			let systemdata = {...state,
				data,
				total,
				page,
				size,
				code,
			};
			let range = {
				start: page == 1 ? 1 : (page - 1) * 3 + 1,
				end: page == 1 ? data.length : (page - 1) * 3 + data.length,
				totalpage:Math.ceil(total/size),
			}
			return {...systemdata,
				range
			};
		},
		addSave(state, {
			payload: {
				data,
				code
			}
		}) {
			let adddata = {...state,
				data,
				code
			};

			return adddata;
		},
		addField(state, payload) {
			const {arr} = state;
			let arr2 = {...arr, ...payload};
			return {
				...state, arr2
			}

		},
		viewSave(state, {
			payload: {
				data,
				code
			}
		}) {
			let viewdata = {...state,
				data,
				code
			};



			let arr2 = data.dictionarySideDOs;

			// var arr2 = new Array;
			// for(var i in arr){
			// 	arr2.push(arr[i].name)
			// }
			console.log(arr2)
			return  {...viewdata,
				arr2
			};;
		},
	},
	effects: { * add({
			payload: values
		}, {
			call,
			put
		}) {
			const {
				data: {
					data,
					code
				}
			} = yield call(systemService.add, values);

			// yield put({ type: 'submitSave', payload: { data, code } });
			if (code == 0) {
				console.log('save success!')
					// yield put(routerRedux.push('/login'));
			}
		},
		* system({
			payload: values
		}, {
			call,
			put
		}) {
			const {
				data: {
					data,
					total,
					page = 1,
					size,
					code
				}
			} = yield call(systemService.system, values);

			if (code == 0) {

				yield put({
					type: 'systemSave',
					payload: {
						data,
						total,
						page,
						size,
						code
					}
				});

			}
		},
		* view({
			payload
		}, {
			call,
			put
		}) {
			const {
				data: {
					data,
					code
				}
			} = yield call(systemService.view, payload);

			if (code == 0) {
				yield put({
					type: 'viewSave',
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
				if (pathname === '/system/management') {

					dispatch({
						type: 'system',
						payload: {
							...query,
							"size": 3,
							"sortField": "string",
							"sortOrder": "string",
							"type": 1
						}
					});
				}
				if (pathname === '/demo/view') {

					dispatch({
						type: 'view',
						payload: query,


					});
				}
			})
		}
	},
};
