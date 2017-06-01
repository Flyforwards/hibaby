
import * as addCourseService from '../services/addCourse.js';
import { local, session } from 'common/util/storage.js'
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { Link} from 'react-router'
export default {
	namespace:'addCourse',
	state: {
		getDictionary: null,
		findById: null,
		getDictionary:null,
		saveCustomerPackage:null,
		getCustomerPackageById:null,
	},
	reducers: {
			getDictionarySave(state,{payload:{ data:getDictionary,code }}){
		      let getDictionarySavedata = {...state,getDictionary,code};
		      return getDictionarySavedata
		    },
		    getCustomerPackageByIdSave(state,{payload:{ data:getCustomerPackageById,code }}){
		      let getCustomerPackageByIdSavedata = {...state,getCustomerPackageById,code};
		      return getCustomerPackageByIdSavedata
		    },
		    saveCustomerPackageSave(state,{payload:{ data:saveCustomerPackage,code }}){
		      let saveCustomerPackageSavedata = {...state,saveCustomerPackage,code};
		      return saveCustomerPackageSavedata
		    },
		    findByIdSave(state,{payload:{ data:findById,code }}){
		      let findByIdSavedata = {...state,findById,code};
		      return findByIdSavedata
		    },
		    getDictionarySave(state,{payload:{ data:getDictionary,code }}){
		      let getDictionarySavedata = {...state,getDictionary,code};
		      return getDictionarySavedata
		    },
		},
	effects: {
			*getDictionary({payload: values}, { call, put }) {
				const {
					data: {
			      		data,
			      		code
		      }} = yield call(addCourseService.getDictionary, values);
				if (code == 0) {
					yield put({
						type: 'getDictionarySave',
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
		      }} = yield call(addCourseService.findById, values);
				if (code == 0) {
					yield put({
						type: 'findByIdSave',
						payload: {
							data
						}
					});
				}
			},
			//根据客户id查询客户套餐信息
			*getCustomerPackageById({payload: values}, { call, put }) {
				const {
					data: {
			      		data,
			      		code
		      }} = yield call(addCourseService.getCustomerPackageById, values);
		      console.log("ss",code)
				if (code == 0) {
					yield put({
						type: 'getCustomerPackageByIdSave',
						payload: {
							data
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
		      }} = yield call(addCourseService.getDictionary, values);
				if (code == 0) {
					yield put({
						type: 'getDictionarySave',
						payload: {
							data
						}
					});
				}
			},
			*saveCustomerPackage({payload: values}, { call, put }) {
				const {
					data: {
			      		data,
			      		code,
			      		err
		      }} = yield call(addCourseService.saveCustomerPackage, values);
				if (code == 0) {
					message.success("添加套餐成功");
					yield put(routerRedux.push("/crm/customer/Add"));
				}else{
					throw err || "请求出错";
				}
			},
		},
	subscriptions: {
	    setup({ dispatch, history }) {
	      return history.listen(({ pathname }) => {
	        
	      })
	    }
	}
}
