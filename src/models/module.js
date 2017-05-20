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
		list:null,
		leftList:null,
		dictionarySideDOs:null,
		item: null,
		permission:null,
		menu:null,
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
		EditMenuList(state,{payload:{data:item,code}}){
				return{
					...state,
					item,
					code
				}
		},
		//主模块下拉
		MainModuleSelect(state,{payload:{data:list,code}}){
				return{
					...state,
					list,
					code
				}
		},
		//菜单权限下拉
		MenuPermissionSelect(state,{payload:{data:permission,code}}){
				return{
					...state,
					permission,
					code
				}
		},
		//上级菜单下拉
		ParentNodeSelect(state,{payload:{data:menu,code}}){
				return{
					...state,
					menu,
					code
				}
		},
	},
	effects: {

		//菜单列表页数据
		*MenuData({payload: values}, { call, put }) {
			const {data: { data,size,total,page=1,code} } = yield call(moduleService.MainMenuList, values);
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
		//删除服务项目
		*deleteService({ payload: values }, {call,put }) {
      const { page, pageSize, dataId} = values
      const { data: { data, code, err }} = yield call(moduleService.deleteService, { dataId});
      if (code == 0) {
        message.success('删除服务项目成功');
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
		*EditMenuData({
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
			} = yield call(moduleService.EditMenuList, values);
			console.log("effects>>>",data)
			if (code == 0) {
				message.success("菜单数据更新成功")
				yield put(routerRedux.push("/system/module"))
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
			console.log("effects>>>",data)
			if (code == 0) {
				message.success("菜单下拉选项")
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
					code
				}
			} = yield call(moduleService.	MenuPermissionSelect, values);
			console.log("effects>>>",data)
			if (code == 0) {
				message.success("权限下拉选项")
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
					code
				}
			} = yield call(moduleService.	ParentNodeSelect, values);
			console.log("effects>>>",data)
			if (code == 0) {
				message.success("权限下拉选项")
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
