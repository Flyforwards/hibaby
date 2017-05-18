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
		item: null
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
      const { data: { data, code, err }} = yield call(moduleService.deleteService, { id: dataId});
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
			})
		}
	},
};
