import * as organizationService from '../services/organization';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {local, session} from '../common/util/storage.js';
import {PAGE_SIZE} from '../constants.js'

export default {
	namespace: 'organization',
	state: {
		data: null,
		total: null,
		list:null,
	},
	reducers: {
		getUserPageListByDeptId(state,{payload:{ data,code }}){
	      let getUserPageListByDeptIddata = {...state,data,code};
	      return getUserPageListByDeptIddata
	    },
		getDepartmentNodesList(state,{payload:{ data,code }}){
	      let getDepartmentNodesdata = {...state,data,code};
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
		//根据条件获取用户列表
		*getUserPageListByDeptId({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.getUserPageListByDeptId, values);
			console.log("getUserPageListByDeptId",data,code)
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
			})
		}
	},
};
