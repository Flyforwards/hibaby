import * as systemService from '../services/system';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {local, session} from '../common/util/storage.js';
import {PAGE_SIZE} from '../constants.js'

export default {
	namespace: 'system',
	state: {
		data: [],
		total: null,
		list:[],
	},
	reducers: {
		DictionarySave(state,{payload:{data:dictionary,code}}){
	      let Dictionarydata= {...state, dictionary, code};
	      console.log("Dictionary",dictionary)
	      return Dictionarydata
	    },
		listByPageSave(state,{payload:{data:arr,total,page,size,code}}) {
			let listByPageldata = {...state,
				arr,
				page,
				size,
				total,
				code
			};
			let range = {
				start: page == 1 ? 1 : (page - 1) * 3 + 1,
				end: page == 1 ? arr.length : (page - 1) * 3 + arr.length,
				totalpage:Math.ceil(total/size),
			}
			local.set("listByPage",arr)
			return {...listByPageldata,range};
		},
		organizationSave(state,{payload:{data,total,page,size,code}}){
	      let organizationdata = {...state,
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
			return {...organizationdata,range};
	    },
		LogViewSave(state,{payload:{data,total,page,size,code}}){
	      let LogViewdata = {...state,
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
			return {...LogViewdata,range};
	    },
		customerSave(state,{payload:{data,total,page,size,code}}){
	      let customerdata = {...state,
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
			return {...customerdata,range};s
	    },
		systemSave(state, { payload: {data,total,page,size,code}}) {
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
			return {...systemdata,range};
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
		permissionAddSave(state, {
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
		permissionUpdata(state, {
			payload: {
				data,
				code
			}
		}) {
			let permissionUpdata = {...state,
				data,
				code
			};

			return permissionUpdata;
		},
		fromModalSave(state, {
			payload: {
				data,
				code
			}
		}) {
			let fromModaldata = {...state,
				data,
				code
			};
			local.set("Dictionary",data)
			console.log("4444444",local.get("Dictionary"))
			return fromModaldata;
		},
		SelectListSave(state, {
			payload: {
				data:list,
				projectId
			}
		}) {
			let SelectListdata = {...state,
				list,
				projectId
			};
			local.set("index",SelectListdata.data)
			console.log("5.5",list)

			return SelectListdata;
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
			return  {...viewdata,
				arr2
			};;
		},
	},
	effects: { *add({
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

					// yield put(routerRedux.push('/login'));
			}
		},
		*permissionAdd({payload: values}, { call, put }) {
			const {
				data: {
					data,
					code
				}
			} = yield call(systemService.permissionAdd, values);
			if (code == 0) {
				// const page = yield select(state => state.users.page);
				message.success("添加成功");
				yield put({ type: 'listByPage', payload: {
				  "page": 1,
				  "size": 10,
				  "sortField": "string",
				  "sortOrder": "string"} });
			}
		},
		*permissionUpdataList({payload: values}, { call, put }) {
			const {
				data: {
					data,
					code
				}
			} = yield call(systemService.permissionUpdata, values);
			if (code == 0) {
				message.success("修改成功");
				yield put({ type: 'listByPage', payload: {
					  "page": 1,
					  "size": 10,
					  "sortField": "string",
					  "sortOrder": "string"
				} });
			}
		},
		*Dictionary({ payload: values }, { call, put }) {
	      const  {data: {data, code}}  = yield call(systemService.Dictionary, values);
	      if(code == 0) {
	        yield put({ type: 'DictionarySave', payload: { data, code } });
	      }
	    },
		*listByPage({payload: values}, {call,put}) {
		const {
				data:{
					data,
					total,
		      		page,
		      		size,
					code
				}
			} = yield call(systemService.listByPage, values);
			if (code == 0) {
				yield put({
					type: 'listByPageSave',
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
		*fromModal({
			payload: values
		}, {
			call,
			put
		}) {
			const {
				data:{
					data,
					code
				}
			} = yield call(systemService.fromModal, values);
			if (code == 0) {
				yield put({
					type: 'fromModalSave',
					payload: {
						data,
						code
					}
				});
			}
		},
		*SelectList({
			payload: values
		}, {
			call,
			put
		}) {
			const {
				data:{
					data,
					projectId,
					code
				}
			} = yield call(systemService.SelectList, values);
			if (code == 0) {
				yield put({
					type: 'SelectListSave',
					payload: {
						data,
						code
					}
				});
			}
		},

	    *organization({ payload: values }, {call,put }){
	      const {
	      	data: {
		      		data,
		      		total,
		      		page = 1,
		      		size,
		      		code
	      }} = yield call(systemService.organization, values);
	      if(code == 0) {
	        yield put({
					type: 'organizationSave',
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
	      *customer({ payload: values }, {call,put }){
	      const {
	      	data: {
		      		data,
		      		total,
		      		page = 1,
		      		size,
		      		code
	      }} = yield call(systemService.customer, values);
	      if(code == 0) {
	        yield put({
					type: 'customerSave',
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
	      *LogView({ payload: values }, {call,put }){
	      const {
	      	data: {
		      		data,
		      		total,
		      		page = 1,
		      		size,
		      		code
	      }} = yield call(systemService.LogView, values);
	      if(code == 0) {
	        yield put({
					type: 'LogViewSave',
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
		*system({
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
		*view({
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
				if (pathname === '/system/groupchar') {

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
				if(pathname === '/Customer') {
		          dispatch({
						type: 'customer',
						payload: {
							...query,
							"size": PAGE_SIZE,
							"sortField": "string",
							"sortOrder": "string",
							"type": 1
						}
					});
		        }
		        if(pathname === '/frommodal') {
		          dispatch({
						type: 'fromModal',
						payload: {
							...query
						}
					});
		          dispatch({
						type: 'Dictionary',
						payload: {
							...query,
							  "id": 4,
							  "softDelete": 0,
							  "type": 1
						}
					});
		          dispatch({
						type: 'listByPage',
						payload: {
							...query,
							  "page": 1,
							  "size": 5,
							  "sortField": "string",
							  "sortOrder": "string"
						}
					});
		        }
		        if(pathname === '/system/logsview') {
		          dispatch({
						type: 'LogView',
						payload: {
							...query,
							"size": PAGE_SIZE,
							"sortField": "string",
							"sortOrder": "string",
							"type": 1
						}
					});
		        }
		        if(pathname === '/system/organization') {
		          dispatch({
						type: 'organization',
						payload: {
							...query,
							"size": PAGE_SIZE,
							"sortField": "string",
							"sortOrder": "string",
							"type": 1
						}
					});
		        }
				if (pathname === '/demo/view') {
					dispatch({
						type: 'view',
						payload: query
					});
				}
			})
		}
	},
};
