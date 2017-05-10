import * as organizationService from '../services/organization';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {local, session} from '../common/util/storage.js';
import {PAGE_SIZE} from 'common/constants.js'

export default {
	namespace: 'organization',
	state: {
		data: null,
		total: null,
		list:null,
		leftList:null,
	},
	reducers: {
		getUserPageListByDeptId(state,{payload:{ data,code }}){
	      let getUserPageListByDeptIddata = {...state,data,code};
	      return getUserPageListByDeptIddata
	    },
	    addUserSave(state,{payload:{ data,code }}){
	      let addUserdata = {...state,data,code};
	      return addUserddata
	    },
	    getEmpSerial(state,{payload:{ data,code }}){
	      let getEmpSerialdata = {...state,data,code};
	      return getEmpSerialdata
	    },
		getDepartmentNodesList(state,{payload:{ data:leftList,code }}){
	      let getDepartmentNodesdata = {...state,leftList,code};
	      return getDepartmentNodesdata
	    },
	    organizationPage(state,{payload:{data:list,total,page,size,code}}){
	      let organizationdata = {...state,
				list,
				total,
				page,
				size,
				code,
			};
			let range = {
				start: page == 1 ? 1 : (page - 1) * 3 + 1,
				end: page == 1 ? list.length : (page - 1) * 3 + list.length,
				totalpage:Math.ceil(total/size),
			}
			return {...organizationdata,range};
	    },
	},
	effects: {
		//获取组织架构的列表
		*getDepartmentNodes({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.getDepartmentNodes, values);
			if (code == 0) {
				yield put({
					type: 'getDepartmentNodesList',
					payload: {
						data,
						code
					}
				});
			}
		},
		//添加用户信息
		*addUser({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.addUser, values);
			if (code == 0) {
				message.success("添加用户信息成功");
			}
		},
		//生成用户编码
		*getEmpSerialList({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.getEmpSerial, values);
			if (code == 0) {
				yield put({
					type: 'getEmpSerial',
					payload: {
						data,
						code
					}
				});
			}
		},
		//根据条件获取用户列表
		*getUserPageListByDeptId({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.getUserPageListByDeptId, values);
			if (code == 0) {
				yield put({
					type: 'getUserPageListByDeptId',
					payload: {
						data,
						code
					}
				});
			}
		},
		//获取组织架构的列表信息
		*organizationList({ payload: values }, {call,put }){
	      const {
	      	data: {
		      		data,
		      		total,
		      		page,
		      		size,
		      		code
	      }} = yield call(organizationService.organizationPage, values);
	      if(code == 0) {
	        yield put({
					type: 'organizationPage',
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
		        if(pathname === '/system/organization') {
		            dispatch({
						type: 'getDepartmentNodes',
						payload: query
					});
		         	dispatch({
						type: 'organizationList',
						payload: {
							...query,
							nodeid: 3,
			                page: 1,
			                size: 5,
			                tissueProperty: 2
						}
					});
		        }
		        if(pathname === '/system/organization/addUser') {
		        	dispatch({
						type: 'getEmpSerialList',
						payload: query
					});
		        }
			})
		}
	},
};
