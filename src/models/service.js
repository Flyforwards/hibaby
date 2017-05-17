import * as serviceService from '../services/service';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {local, session} from 'common/util/storage.js';
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
		//服务列表
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
		},
		//添加服务项目
		AddServiceSave(state, { payload: {data,code}}) {
			let addservicedata = {...state,
				data,
				code
			};
			console.log("ss",data)
			return addservicedata;
		},
		//查看服务详情
		LookServiceSave(state, { payload: {data,code}}) {
			let lookservicedata = {...state,
				data,
				code
			};
			console.log("ss",data)
			return lookservicedata;
		},
		//删除服务项目
		deleteServiceSave(state, { payload: { record }}) {

			state.selectedRows.remove(record);
			state.selectedRowKeys.remove(record.key);
			return {...state, };
		},
		//编辑服务内容
		editServiceSave(state, { payload: {data,code}}) {
			let editservice = {...state,
				data,
				code
			};
			console.log("ss",data)
			return editservice;
		},
		//其他
},
	effects: {
		//项目列表
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
		//添加服务项目
		*AddService({
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
			} = yield call(serviceService.AddService, values);
			console.log("effects>>>",data)
			if (code == 0) {
				message.success("添加服务项目成功")
				yield put(
					routerRedux.push('/system/serviceitem')
				);
			}
		},
		//查看服务详情
		*LookService({
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
			} = yield call(serviceService.LookService, values);
			console.log("effects>>>",data)
			if (code == 0) {
				yield put({
					type: 'LookServiceSave',
					payload: {
						data,
						code
					}
				});
			}
		},
		//删除服务项目
		*deleteService({ payload: values }, {call,put }) {
      const { page, pageSize, dataId } = values
      const { data: { data, code, err }} = yield call(serviceService.deleteService, { id: dataId });
      if (code == 0) {
        message.success('删除服务项目成功');
        yield put({
          type : 'ServicePage',
          payload : { page : page || 0 , size : pageSize || 10 }
        });
      } else {
        throw err || "请求出错";
      }
    },
		//编辑服务内容
		*editService({
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
			} = yield call(serviceService.editService, values);
			console.log("effects>>>",data)
			if (code == 0) {
				message.success("服务项目数据更新成功")
				yield put(routerRedux.push("/system/serviceitem"))
			}
		},
		//其他
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
				//服务项目列表
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
				//查看服务详情
				if (pathname === '/service/LookService') {
					console.log("service")
					dispatch({
						type: 'LookService',
						payload: {
							...query,
						}
					});
				}
				//其他
			})
			console.log("subscriptions>>>",data)
		}
	},
};
