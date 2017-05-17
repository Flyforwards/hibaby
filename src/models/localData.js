
import * as placeService from '../services/placeData';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {local, session} from 'common/util/storage.js';
import {PAGE_SIZE} from 'common/constants.js'

export default {
	namespace: 'localData',
	state: {
		data: null,
		total: null,
		list:null,
		leftList:null,
		dictionarySideDOs: null,
    item: null
	},
	reducers: {
		//添加地方列表数据
		AddPlaceDataSave(state, {
			payload: {
				data,
				code
			}
		}) {
			let addplacedata = {...state,
				data,
				code
			}

			return  addplacedata;
		},
		//查看地方列表数据
		PlaceFindSave(state, {
					payload: { data: item }
				}) {
					return  {...state,item };
				},
		//编辑列表数据
		EditPlaceDataSave(state,  {
			payload: { data: item }
		}) {
			return {...state,item}
		},
	},
	effects:{

		//添加地方列表数据
		*AddPlaceData({payload: values}, { call, put }) {
			const {data: {data,id,code}} = yield call(placeService.AddPlaceData, values);
			console.log(data)
			if (code == 0) {
				console.log(data)
				message.success("添加用户信息成功");
				yield put(routerRedux.push('/system/localchar'));
			}
		},

		//查看地方列表数据
		*PlaceFind({payload: values}, { call, put }) {
			const {data: {code,data,err}} = yield call(placeService.PlaceFind, values);
			if (code == 0 && err == null) {
				yield put({
					type: 'PlaceFindSave',
					payload: {
						data,
					}
				});
			}
		},

		//编辑地方列表数据
		*EditPlaceData({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(placeService.EditPlaceData, values);
			if (code == 0) {
				message.success("更改用户信息成功");
				yield put(routerRedux.push("/system/localchar"));
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
				//添加地方列表
				// if (pathname === '/localchar/add') {
				// 	dispatch({
				// 		type: 'AddPlaceData',
				// 		payload:query
				// 	});
				// }
				//查看地方列表数据
				if (pathname === '/localchar/find') {
					dispatch({
						type: 'PlaceFind',
						payload:query
					});
				}
				//编辑地方列表数据
				// if (pathname === 'localchar/editplace') {
				// 	dispatch({
				// 		payload:query
				// 	});
				// }
			})
		}
	},
};
