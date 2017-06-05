import * as moduleService from '../services/module';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {local, session} from 'common/util/storage.js';
import {PAGE_SIZE} from 'common/constants.js'
import { parse } from 'qs'

export default {
	namespace: 'module',
	state: {
		data: null,
		list:[],
    projectList: [],
    permissionList: [],
		menu:[],
		edit:[],
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
	},
	reducers: {
		//菜单列表
    mainMenuListSave(state, { payload: { list ,pagination} }) {
      return {...state, list, pagination: {  ...state.pagination,...pagination }};
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
    mainModuleSelectSave(state,{payload:{ projectList }}){
				return{ ...state, projectList,	}
		},

		//菜单权限下拉
		menuPermissionSelectSave(state,{ payload:{ permissionList }}){
      return { ...state, permissionList};
		},

		//上级菜单下拉
    ParentNodeSelectSave(state,{payload:{ data:menu }}){
				return { ...state, menu }
		},
	},
	effects: {

		//菜单列表页数据
		*getMenuData({payload: values}, { call, put }) {
      values = parse(location.search.substr(1))
      if (values.page === undefined) {
        values.page = 1;
      }
      if (values.size === undefined) {
        values.size = 10;
      }
			const {data: { data,size,total,page,code} } = yield call(moduleService.mainMenuList, values);
      if (code == 0) {
        yield put({
          type: 'mainMenuListSave',
          payload: {
            list: data,
            pagination: {
              current: Number(page) || 1,
              pageSize: Number(size) || 10,
              total: total,
            },
          },
        })
      }

		},

		//删除菜单数据
		*deleteService({ payload: values }, {call,put }) {
      const { page, pageSize, dataId} = values
      const { data: { data, code, err }} = yield call(moduleService.deleteService, { dataId});
      if (code == 0) {
        message.success('删除成功');
        yield put({
          type: 'getMenuData'
        })
      }
    },

		//增加菜单数据列表
		*AddMenuData({payload: values}, { call, put }) {
			const {data: { data,code} } = yield call(moduleService.addMenuList, values);
			if (code == 0) {
				message.success("菜单数据保存成功")
        yield put({
          type: 'getMenuData'
        })
			}
		},

		//编辑菜单数据列表
		*EditMenuData({payload: values}, { call, put }) {
			const {data: { data,code} } = yield call(moduleService.editMenuListData, values);
			if (code == 0) {
				message.success("菜单数据更新成功")
        yield put({
          type: 'getMenuData'
        })
			}
		},
		//菜单主模块下拉选项
		*MainModuleSelectData({payload: values}, {call,put}) {
			const { data: { data, code } } = yield call(moduleService.mainModuleSelect, values);
			if (code == 0) {
				yield put({
						type:'mainModuleSelectSave',
						payload:{
							projectList: data,
						}
				});
			}
		},
		// 菜单权限下拉选项
		*menuPermissionData({payload: values}, {call,put}) {

			const { data: { data, code } } = yield call(moduleService.menuPermissionSelect, values);
			if (code == 0) {
				yield put({
						type:'menuPermissionSelectSave',
						payload:{
							permissionList: data,
						}
				});
			}
		},
		//上级菜单下拉
		*parentNodeData({payload: values}, {call,put}) {
			const { data: { data, code } } = yield call(moduleService.parentNodeSelect, values);
			if (code == 0) {
				yield put({
						type:'ParentNodeSelectSave',
						payload:{
							data,
						}
				});
			}
		},
	},
	subscriptions: {
		setup({ dispatch, history }) {
      return history.listen(({pathname, query}) => {

        //菜单列表数据
        if (pathname === '/system/module') {
          dispatch({
            type: 'getMenuData',
            payload: query
          });
          dispatch({
            type: 'MainModuleSelectData',
            payload: {}
          });
        }

      })
    }
	},
};
