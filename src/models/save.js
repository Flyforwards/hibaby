import * as saveService from '../services/save';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {local, session} from 'common/util/storage.js';
import {PAGE_SIZE} from 'common/constants.js'

export default {
	namespace: 'save',
	state: {
		data: null,
		total: null,
		list:null,
		leftList:null,
		dictionarySideDOs:null,
		item: null,
    editData: null,
	},
	reducers: {
		//添加集团列表数据
		saveDataSave(state, { payload: { data } }) {
			return  {...state, data };
		},
		//查看集团列表数据
		checkDataSave(state, { payload: { data: item } }) {
			return  {...state, item };
		},
		//编辑集团列表数据
		editDataSave (state, { payload: { data: item } }) {
			return { ...state, item}
		},
    // 编辑页面获取到的数据
    getEditDataSave(state, { payload: { data: editData } }) {
      return  {...state, editData };
    },
	},
	effects: {
		//添加集团列表数据
		*saveData({payload: values}, { call, put }) {
			const {data: { data, code} } = yield call(saveService.saveData, values);
			if (code == 0) {
				message.success("添加用户信息成功");
				yield put(routerRedux.push("/system/group-char"));

			}
		},

		//查看集团列表数据
		*checkData({payload: values}, { call, put }) {
			const {data: {code,data,err}} = yield call(saveService.checkData, values);
			if (code == 0 && err == null) {
				yield put({
					type: 'checkDataSave',
					payload: {
						data,
					}
				});
			}
		},
    *getEditData({payload: values}, { call, put }) {
      const {data: {code,data,err}} = yield call(saveService.checkData, values);
      if (code == 0 && err == null) {
        yield put({
          type: 'getEditDataSave',
          payload: { data }
        });
      }
    },
		//编辑集团列表数据
		*editData({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(saveService.editData, values);
			if (code == 0) {
				message.success("更改用户信息成功");
				yield put(routerRedux.push("/system/group-char"));

			}
		},

	},
	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {

				//查看集团列表数据
				if (pathname === '/system/group-char/detail') {
					dispatch({
						type: 'checkData',
						payload: query
					});
				}
				//编辑集团列表数据
				if (pathname === '/system/group-char/edit') {
					dispatch({
						type: 'getEditData',
						payload: query
					});
				}
			})
		}
	},
};
