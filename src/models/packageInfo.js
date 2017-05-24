
import * as packageInfoService from '../services/packageInfo';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {local, session} from 'common/util/storage.js';
import {PAGE_SIZE} from 'common/constants.js'
export default {
	namespace: 'packageInfo',
	state: {
		data:null,
		total:null,
		list:null,
		page:null,
		size:null,
		serviceListByPage:null,
		roomData:null,
		findById:null,
		selectDataSave:null,
		getDictionary:null,
		suiteListByPage:null,
		roomFindById:null,
	},
	reducers: {
	    listByPageSave(state,{payload:{data:list,total,page,size,code}}){
	      let listByPagedata = {...state,
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
			return {...listByPagedata,range};
	    },
	    roomListSave(state,{payload:{ data:roomData,code }}){
	      let roomListSavedata = {...state,roomData,code};
	      return roomListSavedata
	    },
	    findByIdSave(state,{payload:{ data:findById,code }}){
	      let findByIdSavedata = {...state,findById,code};
	      return findByIdSavedata
	    },
	    roomFindByIdSave(state,{payload:{ data:roomFindById,code }}){
	      let roomFindByIdSavedata = {...state,roomFindById,code};
	      return roomFindByIdSavedata
	    },
	    getDictionarySave(state,{payload:{ data:getDictionary,code }}){
	      let getDictionarySavedata = {...state,getDictionary,code};
	      return getDictionarySavedata
	    },
	    selectDataSave(state,{payload:{ data:selectData,code }}){
	      let selectDataSavedata = {...state,selectData,code};
	      return selectDataSavedata
	    },
	    suiteListByPageSave(state,{payload:{data:suiteListByPage,total,page,size,code}}){
	      let suiteListByPagedata = {...state,
				suiteListByPage,
				total,
				page,
				size,
				code,
			};
			let range = {
				start: page == 1 ? 1 : (page - 1) * 3 + 1,
				end: page == 1 ? suiteListByPage.length : (page - 1) * 3 + suiteListByPage.length,
				totalpage:Math.ceil(total/size),
			}
			return {...suiteListByPagedata,range};
	    },
	    serviceListByPageSave(state,{payload:{data:serviceListByPage,total,page,size,code}}){
	      let serviceListByPagedata = {...state,
				serviceListByPage,
				total,
				page,
				size,
				code,
			};
			let range = {
				start: page == 1 ? 1 : (page - 1) * 3 + 1,
				end: page == 1 ? serviceListByPage.length : (page - 1) * 3 + serviceListByPage.length,
				totalpage:Math.ceil(total/size),
			}
			return {...serviceListByPagedata,range};
	    },
	},
	effects: {
		//获取分页的列表
		*listByPage({payload: values}, { call, put }) {
			const {
				data: {
		      		data,
		      		total,
		      		page,
		      		size,
		      		code
	      }} = yield call(packageInfoService.listByPage, values);
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
		//添加套餐
		*add({payload: values}, { call, put }) {
			const {
				data: {
		      		data,
		      		code
	      }} = yield call(packageInfoService.add, values);
			if (code == 0) {
				message.success("添加套餐成功");
			}
		},
		//修改套房信息
		*roomEdit({payload: values}, { call, put }) {
			const {
				data: {
		      		data,
		      		code
	      }} = yield call(packageInfoService.roomEdit, values);
			if (code == 0) {
				message.success("修改套房信息成功");
			}
		},
		//删除套房
		*roomDel({payload: values}, { call, put }) {
			const {
				data: {
		      		data,
		      		code
	      }} = yield call(packageInfoService.roomDel, values);
			if (code == 0) {
				message.success("删除套房成功");
			}
		},
		//添加套房
		*roomAdd({payload: values}, { call, put }) {
			const {
				data: {
		      		data,
		      		code
	      }} = yield call(packageInfoService.roomAdd, values);
			if (code == 0) {
				message.success("添加套房成功");
			}
		},
		//套房列表信息
		*suiteListByPage({payload: values}, { call, put }) {
			const {
				data: {
		      		data,
		      		total,
		      		page,
		      		size,
		      		code
	      }} = yield call(packageInfoService.suiteListByPage, values);
			if (code == 0) {
				yield put({
					type: 'suiteListByPageSave',
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
		//根据字典主表id和删除标识和字典类型获取字典
		*getDictionary({payload: values}, { call, put }) {
			const {
				data: {
		      		data,
		      		code
	      }} = yield call(packageInfoService.getDictionary, values);
			if (code == 0) {
				yield put({
					type: 'getDictionarySave',
					payload: {
						data
					}
				});
			}
		},
		//修改套餐
		*edit({payload: values}, { call, put }) {
			const {
				data: {
		      		data,
		      		code
	      }} = yield call(packageInfoService.edit, values);
			if (code == 0) {
				message.success("修改套餐成功");
			}
		},
		//获取套房下拉数据
		*selectData({payload: values}, { call, put }) {
			const {
				data: {
		      		data,
		      		code
	      }} = yield call(packageInfoService.selectData, values);
			if (code == 0) {
				yield put({
					type: 'selectDataSave',
					payload: {
						data
					}
				});
			}
		},
		//根据套餐ID查询套餐详情
		*findById({payload: values}, { call, put }) {
			const {
				data: {
		      		data,
		      		code
	      }} = yield call(packageInfoService.findById, values);
			if (code == 0) {
				yield put({
					type: 'findByIdSave',
					payload: {
						data
					}
				});
			}
		},
		//根据套房ID查询套房详情
		*roomFindById({payload: values}, { call, put }) {
			const {
				data: {
		      		data,
		      		code
	      }} = yield call(packageInfoService.roomFindById, values);
			if (code == 0) {
				yield put({
					type: 'roomFindByIdSave',
					payload: {
						data
					}
				});
			}
		},
		//获取房间分页的列表
		*roomList({payload: values}, { call, put }) {
			const {
				data: {
		      		data,
		      		code
	      }} = yield call(packageInfoService.roomList, values);
			if (code == 0) {
				yield put({
					type: 'roomListSave',
					payload: {
						data
					}
				});
			}
		},
	    //服务项目分页列表
	    *serviceListByPage({payload: values}, { call, put }) {
			const {
				data: {
		      		data,
		      		total,
		      		page,
		      		size,
		      		code
	      }} = yield call(packageInfoService.serviceListByPage, values);
			if (code == 0) {
				yield put({
					type: 'serviceListByPageSave',
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
		*del({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(packageInfoService.del, values);
			if (code == 0) {
				message.success("删除成功");
				window.location.href="/crm/serviceinfo"
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
		        
		        
			})
		}
	},
};
