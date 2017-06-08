
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
		saveCustomerPackage:null,
		getCustomerPackageById:null,
		listByType:null,
		addSuccess:false,
		useServiceInfo:null,
	},
	reducers: {

		    getCustomerPackageByIdSave(state,{payload:{ data:getCustomerPackageById,code }}){
		      let getCustomerPackageByIdSavedata = {...state,getCustomerPackageById,code};
		      return getCustomerPackageByIdSavedata
		    },
		    listByTypeSave(state,{payload:{ data:listByType,code }}){
		      let listByTypeSavedata = {...state,listByType,code};
		      return listByTypeSavedata
		    },
		    setAddCustomerTab(state, { payload: todo }){
      			return {...state,addSuccess:todo};
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
			//根据套餐类型查询 dataID为套餐类型的id
			*listByType({payload: values}, { call, put }) {
				const {
					data: {
			      		data,
			      		code
		      }} = yield call(addCourseService.listByType, values);
				if (code == 0) {
					yield put({
						type: 'listByTypeSave',
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
				//console.log(data);
				if (code == 0) {
					message.success("添加套餐成功");

					yield put({type:'setAddCustomerTab',payload:true});

          yield put(routerRedux.push(`/crm/customer/customerDetails?dataId=${values.customerId}`))

				}else if(code == 210){
					message.warning('已存在主套餐，只能绑定一个主套餐')
				}else{
          message.error( err || "请求出错")
				}
			},
			*useServiceInfo({payload: values}, { call, put }) {
				//console.log("values>>>",values)
				const {
					data: {
			      		data,
			      		code,
			      		err
		      }} = yield call(addCourseService.useServiceInfo, {"dataId":values.dataId});
				if (code == 0) {
					message.success("使用服务项成功");
					yield put({type:'getCustomerPackageById',payload:{dataId:values.userID}});
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
