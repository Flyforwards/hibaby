import * as moduleService from '../services/module';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {local, session} from 'common/util/storage.js';
import {PAGE_SIZE} from 'common/constants.js'

export default {
	namespace: 'module',
	state: {
		data: null,
		total: null,
		list:[],
		leftList:null,
		dictionarySideDOs:null,
		item: [],
		permission:[],
		menu:[],
		edit:[],
	},
	reducers: {
		//菜单列表
		MainMenuList(state, {
			payload: {data:item,size,page,total}
		}) {
			let menulist={
				...state,item ,size,page,total
			}
			let range = {
				start: page == 1 ? 1 : (page - 1) * 3 + 1,
				end: page == 1 ? item.length : (page - 1) * 3 + item.length,
				totalpage:Math.ceil(total/size),
			}
			local.set("MainMenuList",item)
			return {...menulist,range };
		},
		//删除服务项目
		deleteServiceSave(state, { payload: { record }}) {

			state.selectedRows.remove(record);
			state.selectedRowKeys.remove(record.key);
			return {...state, };
		},
		//增添菜单数据
		AddMenuList(state,{payload:{data}}){
			return{
				...state,
				data
			}
		},
		//编辑菜单数据
		EditMenuListData(state,{payload:{data:edit}}){
				return{
					...state,
					edit
				}
		},
		//主模块下拉
		MainModuleSelect(state,{payload:{data:list,code}}){
			local.set("Dictionary",list)
				return{
					...state,
					list,
					code
				}
		},
		//菜单权限下拉
		MenuPermissionSelect(state,{payload:{data:permission,projectId}}){
			let permissiondata={
				...state,
				permission,
				projectId,
			}
			  local.set("index",permissiondata.data)
				console.log("菜单下拉>>>",permission)
				return permissiondata;
		},

		//上级菜单下拉
		ParentNodeSelect(state,{payload:{data:menu,dataId,code}}){
				let menudata={
					...state,
					menu,
					dataId,
				}
				local.set("index",menudata.data)
				console.log("上级下拉",menu)
				return {
					...state,
					menu,
					dataId,
				}
		},
	},
	effects: {

		//菜单列表页数据
		*MenuData({payload: values}, { call, put }) {
			const {data: { data,size,total,page,code} } = yield call(moduleService.MainMenuList, values);
			if (code == 0) {
				yield put({
						type:'MainMenuList',
						payload:{
							data,
							size,
							total,
							page,
							code
						}
				});
			}
		},
		//删除菜单数据
		*deleteService({ payload: values }, {call,put }) {
      const { page, pageSize, dataId} = values
      const { data: { data, code, err }} = yield call(moduleService.deleteService, { dataId});
      if (code == 0) {
        message.success('删除成功');
        yield put({
          type : 'MenuData',
          payload : { page : page || 0 , size : pageSize || 10 }
        }
			);
      } else {
        throw err || "请求出错";
      }
    },
		//增加菜单数据列表
		*AddMenuData({payload: values}, { call, put }) {
			const {data: { data,code} } = yield call(moduleService.AddMenuList, values);
			if (code == 0) {
				message.success("菜单数据保存成功")
				yield put({
						type:'AddMenuList',
						payload:{
							data,
							code
						}
				});
			}
		},
		//编辑菜单数据列表
		*EditMenuData({payload: values}, { call, put }) {
			const {data: { data,code} } = yield call(moduleService.EditMenuListData, values);
			if (code == 0) {
				message.success("菜单数据更新成功")
				yield put({
						type:'EditMenuListData',
						payload:{
							data,
							code
						}
				});
			}
		},
		//菜单主模块下拉选项
		*MainModuleSelectData({payload: values}, {call,put}) {
			const {
				data: {
					data,
					code
				}
			} = yield call(moduleService.MainModuleSelect, values);
			if (code == 0) {
				yield put({
						type:'MainModuleSelect',
						payload:{
							data,
							code
						}
				});
			}
		},
		//菜单权限下拉选项
		*MenuPermissionData({payload: values}, {call,put}) {

			const {
				data: {
					data,
					projectId,
					code
				}
			} = yield call(moduleService.	MenuPermissionSelect, values);
			if (code == 0) {
				yield put({
						type:'MenuPermissionSelect',
						payload:{
							data,
							code
						}
				});
			}
		},
		//上级菜单下拉
		*ParentNodeData({payload: values}, {call,put}) {
			const {
				data: {
					data,
					dataId:projectId,
					code
				}
			} = yield call(moduleService.	ParentNodeSelect, values);
			if (code == 0) {
				yield put({
						type:'ParentNodeSelect',
						payload:{
							data,
							code
						}
				});
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

				//菜单列表数据
				if (pathname === '/system/module') {
					dispatch({
						type: 'MenuData',
						payload:{...query,
							"size":10,
							}
					});
				}
				//菜单添加保存数据列表
				//菜单主模块下拉
				if (pathname === '/system/module') {
					dispatch({
						type: 'MainModuleSelectData',
						payload:{...query,

							}
					});
				}
				//菜单权限下拉数据
				if (pathname === '/system/module') {
					dispatch({
						type: 'MenuPermissionData',
						payload:{...query,

							}
					});
				}
				//菜单上级下拉
				if (pathname === '/system/module') {
					dispatch({
						type: 'ParentNodeData',
						payload:{...query,

							}
					});
				}
			})
		}
	},
};
