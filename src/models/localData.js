
import * as placeService from '../services/placeData';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'

export default {
	namespace: 'localData',
	state: {
		data: null,
		list: [],
    item: null,
    editData: null,
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
	},
	reducers: {

		//查看地方列表数据
		PlaceFindSave(state, { payload: { data: item } }) {
      return  {...state,item };
    },
		//编辑列表数据
		EditPlaceDataSave(state,  {
			payload: { data: item }
		}) {
			return {...state, item}
		},
    getEditLocalSave(state,  {  payload: { data: editData } }) {
      return {...state, editData}
    },
    localCharSave(state, { payload: { list, pagination }}) {
      return {...state, list, pagination: {  ...state.pagination,...pagination }};
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
				yield put(routerRedux.push('/system/local-char'));
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

    // 编辑数据的数据源
    *getEditLocal({payload: values}, { call, put }) {
      const {data: {code,data,err}} = yield call(placeService.PlaceFind, values);
      if (code == 0 && err == null) {
        yield put({
          type: 'getEditLocalSave',
          payload: { data }
        });
      }
    },

		//编辑地方列表数据
		*EditPlaceData({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(placeService.EditPlaceData, values);
			if (code == 0) {
				message.success("更改用户信息成功");
				yield put(routerRedux.push("/system/local-char"));
			}
		},

    *localChar({ payload: values }, { call, put }) {
      values = parse(location.search.substr(1))
      if (values.page === undefined) {
        values.page = 1;
      }
      if (values.size === undefined) {
        values.size = 10;
      }
      if (values.type === undefined) {
        values.type = 2;
      }
      const { data: { data, total, page, size, code } } = yield call(placeService.localCharList, values);
      if (code == 0) {
        console.log(total,page,size)
        yield put({
          type: 'localCharSave',
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
				//查看地方列表数据
				if (pathname === '/system/local-char/detail') {
					dispatch({
						type: 'PlaceFind',
						payload: query
					});
				}
				//编辑地方列表数据
				if (pathname === '/system/local-char/edit') {
            dispatch({
              type: 'getEditLocal',
              payload: query
            });
				}
        if (pathname === '/system/local-char') {
          dispatch({
            type: 'localChar',
            payload: query
          });
        }
			})
		}
	},
};
