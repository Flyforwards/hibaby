
import * as serviceService from '../services/service';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js';
import { parse } from 'qs';

export default {
	namespace: 'service',
	state: {
		data: [],
		page:null,
		size:null,
    list: [],
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
	},
	reducers: {
		//服务列表
		ServicePageSave(state, { payload: { list, pagination }}) {
      return {...state, list, pagination: {  ...state.pagination,...pagination }};
		},

		//添加服务项目
		AddServiceSave(state, { payload: { data }}) {
			let addservicedata = {...state, data };
			return addservicedata;
		},
		//查看服务详情
		LookServiceSave(state, { payload: { data }}) {
			let lookservicedata = {...state, data};
			return lookservicedata;
		},

		//删除服务项目
		deleteServiceSave(state, { payload: { record }}) {
			state.selectedRows.remove(record);
			state.selectedRowKeys.remove(record.key);
			return {...state, };
		},
		//编辑服务内容
		editServiceSave(state, { payload: {data,code}}) {
			let editservice = { ...state,data, };
			return editservice;
		},
		//其他
},
	effects: {
		//项目列表
		*ServicePage({ payload: values }, { call, put }) {
      values = parse(location.search.substr(1))
			const { data: { data, total, page, size, code } } = yield call(serviceService.ServicePage, values);
			if (code == 0) {
        yield put({
          type: 'ServicePageSave',
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
		//添加服务项目
		*AddService({ payload: values }, { call, put }) {
			const { data: { data, code } } = yield call(serviceService.AddService, values);
			if (code == 0) {
				message.success("添加服务项目成功")
				yield put(
					routerRedux.push('/system/service-item')
				);
			}
		},
		//查看服务详情
		*LookService({ payload: values }, { call, put }) {
			const { data: { data, code } } = yield call(serviceService.LookService, values);
			if (code == 0) {
				yield put({
					type: 'LookServiceSave',
					payload: {
						data,
						code
					}
				});
			}
		},
		//删除服务项目
		*deleteService({ payload: values }, {call,put }) {
      const { page, pageSize, dataId } = values
      const { data: { data, code, err }} = yield call(serviceService.deleteService, { id: dataId });
      if (code == 0) {
        message.success('删除服务项目成功');
        yield put(routerRedux.push("/system/service-item"))
      } else {
        throw err || "请求出错";
      }
    },
		//编辑服务内容
		*editService({ payload: values }, { call, put }) {
			const {
				data: { data, code } } = yield call(serviceService.editService, values);
			if (code == 0) {
				message.success("服务项目数据更新成功")
				yield put(routerRedux.push("/system/service-item"))
			}
		},
		//其他
	},
	subscriptions: {
		setup({
			dispatch,
			history
		}) {
			return history.listen(({ pathname, query }) => {
				//服务项目列表
				if (pathname === '/system/service-item') {
					dispatch({
						type: 'ServicePage',
						payload: query
					});
				}
				//查看服务详情
				if (pathname === '/system/service/detail') {
					dispatch({
						type: 'LookService',
						payload: {
							...query,
						}
					});
				}
				//其他
			})
		}
	},
};
