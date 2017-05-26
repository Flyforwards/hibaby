
import * as organizationService from '../services/organization';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import {local, session} from 'common/util/storage.js';
import {PAGE_SIZE} from 'common/constants.js'
export default {
	namespace: 'organization',
	state: {
		data: null,
		total: null,
		list:null,
		leftList:null,
		optionData:null,
		dataId:null,
		dataEndemicId:null,
		userID:null,
		LeagerData:null,
		getDepartmentNode:null,
		TissueProperty:null,
		AllTissueProperty:null,
		getPosition:null,
		getDeptList:null,
	},
	reducers: {
		getDeptListSave(state,{payload:{ data:getDeptList,code }}){
	      let getDeptListSavedata = {...state,getDeptList,code};
	      return getDeptListSavedata
	    },
	    getPositionSave(state,{payload:{ data:getPosition,code }}){
	      let getPositionSavedata = {...state,getPosition,code};
	      return getPositionSavedata
	    },
		getUserPageListByDeptId(state,{payload:{ data,code }}){
	      let getUserPageListByDeptIddata = {...state,data,code};
	      return getUserPageListByDeptIddata
	    },
	    getTissuePropertyList(state,{payload:{ data:TissueProperty,code }}){
	      let getTissuePropertyListdata = {...state,TissueProperty,code};
	      return getTissuePropertyListdata
	    },
	    getAllTissuePropertyList(state,{payload:{ data:AllTissueProperty,code }}){
	      let getTissuePropertyListdata = {...state,AllTissueProperty,code};
	      return getTissuePropertyListdata
	    },
	    deleteDepartmentSave(state,{payload:{ data,code }}){
	      let deleteDepartmentdata = {...state,data,code};
	      return deleteDepartmentdata
	    },
	    modifyDepartmentSave(state,{payload:{ data,code }}){
	      let modifyDepartmentdata = {...state,data,code};
	      return modifyDepartmentdata
	    },
	    getDepartmentSave(state,{payload:{ data:getDepartmentNode,code }}){
	      let getDepartmentdata = {...state,getDepartmentNode,code};
	      return getDepartmentdata
	    },
	    getLeagerDepartmentNodesSave(state,{payload:{ data:LeagerData,code }}){
	      let getLeagerDepartmentNodesdata = {...state,LeagerData,code};
	      return getLeagerDepartmentNodesdata
	    },
	    getUserListByIdSave(state,{payload:{ data:userID,code }}){
	      let getUserListByIddata = {...state,userID,code};
	      return getUserListByIddata
	    },
	    forbiddenUserSave(state,{payload:{ data,code }}){
	      let forbiddenUserdata = {...state,data,code};
	      return forbiddenUserdata
	    },
	    saveDepartmentSave(state,{payload:{ data,code }}){
	      let saveDepartmentdata = {...state,data,code};
	      return saveDepartmentdata
	    },
	    getDeptListByEndemicIdSave(state,{payload:{data:dataEndemicId,code}}){
	      let getDeptListByEndemicIddata= {...state, dataEndemicId, code};
	      return getDeptListByEndemicIddata
	    },
	    roleSelectDataSave(state,{payload:{data:selectData,code}}){
	      let roleSelectdata= {...state, selectData, code};
	      local.set("rolSelectData",selectData)
	      return roleSelectdata
	    },
	    positionSave(state,{payload:{data:dataId,code}}){
	      let Positiondata= {...state, dataId, code};
	      return Positiondata
	    },
	    addUserSave(state,{payload:{ data,code }}){
	      let addUserdata = {...state,data,code};
	      return addUserddata
	    },
	    getEmpSerial(state,{payload:{ data,code }}){
	      let getEmpSerialdata = {...state,data,code};
	      return getEmpSerialdata
	    },
		getDepartmentNodesList(state,{payload:{ data:leftList,code }}){
	      let getDepartmentNodesdata = {...state,leftList,code};
	      return getDepartmentNodesdata
	    },
	    organizationPage(state,{payload:{data:list,total,page,size,code}}){
	      let organizationdata = {...state,
				list,
				total,
				page,
				size,
				code,
			};
			let range = {
				start: page == 1 ? 1 : (page - 1) * 10 + 1,
				end: page == 1 ? list.length : (page - 1) * 10 + list.length,
				totalpage:Math.ceil(total/size),
			}
			return {...organizationdata,range};
	    },
	},
	effects: {
		//获取组织架构的列表
		*getDepartmentNodes({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.getDepartmentNodes, values);
			if (code == 0) {
				yield put({
					type: 'getDepartmentNodesList',
					payload: {
						data,
						code
					}
				});
			}
		},
		//获取组织性质字典
		*getTissueProperty({payload: values}, { call, put }) {
			const {data: {data,code}} =  yield call(organizationService.getTissueProperty, values);
			if (code == 0) {
				yield put({
					type: 'getTissuePropertyList',
					payload: {
						data,
						code
					}
				});
			}
		},
		//获取所有的职位信息
		*getPosition({payload: values}, { call, put }) {
			const {data: {data,code}} =  yield call(organizationService.getPosition, values);
			if (code == 0) {
				yield put({
					type: 'getPositionSave',
					payload: {
						data,
						code
					}
				});
			}
		},
		//获取所有的部门信息
		*getDeptList({payload: values}, { call, put }) {
			const {data: {data,code}} =  yield call(organizationService.getDeptList, values);
			console.log("sdsssssssssssssss",code)
			if (code == 0) {
				yield put({
					type: 'getDeptListSave',
					payload: {
						data,
						code
					}
				});
			}
		},
		//获取所有组织性质字典
		*getAllTissueProperty({payload: values}, { call, put }) {
			const {data: {data,code}} =  yield call(organizationService.getAllTissueProperty, values);
			if (code == 0) {
				yield put({
					type: 'getAllTissuePropertyList',
					payload: {
						data,
						code
					}
				});
			}
		},
		//根据节点id删除组织架构节点
		*deleteDepartment({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.deleteDepartment, values);
			if (code == 0) {
				message.success("删除该组织架构节点成功");
				yield put({
					type: 'getDepartmentNodes',
					payload: { }
				});
			}else{
				message.config({
			        top: 100,
			        duration: 3
			    });
				message.success("该组织架构节点存在关联数据无法删除");
			}
		},
		//根据节点id更新组织架构节点
		*modifyDepartment({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.modifyDepartment, values);
			if (code == 0) {
				message.config({
			        top: 100,
			        duration: 3
			    });
				message.success("修改该组织架构节点成功");
				yield put({
					type: 'getDepartment',
					payload: {
						"dataId":values.id
					}
				});
			}
		},
		//根据节点id获取组织架构节点信息
		*getDepartment({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.getDepartment, values);
			if (code == 0) {
				yield put({
					type: 'getDepartmentSave',
					payload: {
						data,
						code
					}
				});
			}
		},
		//根据节点id加载负责人组织架构列表
		*getLeagerDepartmentNodes({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.getLeagerDepartmentNodes, values);
			console.log("根据节点id加载负责人组织架构列表",data)
			if (code == 0) {
				yield put({
					type: 'getLeagerDepartmentNodesSave',
					payload: {
						data,
						code
					}
				});
			}
		},
		//修改用户信息
		*modifyUser({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.modifyUser, values);
			    console.log("dsds",values)
			if (code == 0) {
				message.success("修改用户信息成功");
				// yield put(routerRedux.push(`/system/organization/ViewTheInformation?data=${values.id}`));
				history.go(-1)
			}
		},
		//根据用户id查看用户信息
		*getUserListById({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.getUserListById, values);
			if (code == 0) {
				yield put({
					type: 'getUserListByIdSave',
					payload: {
						data,
						code
					}
				});
			}
		},
		//根据用户id禁用用户
		*forbiddenUser({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.forbiddenUser, values);
			message.success("用户信息已被禁用");
			if (code == 0) {
				yield put({
					type: 'forbiddenUserSave',
					payload: {
						data,
						code
					}
				});
			}
		},
		//根据入职信息id删除入职信息
		*deleteUserEntry({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.deleteUserEntry, values);
			if (code == 0) {

			}
		},
		//系统角色下拉列表
		*roleSelectData({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.roleSelectData, values);
			if (code == 0) {
				yield put({
					type: 'roleSelectDataSave',
					payload: {
						data,
						code
					}
				});
			}
		},
		//保存组织架构节点信息
		*saveDepartment({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.saveDepartment, values);
			console.log("values",values)
			if (code == 0) {
				message.success("保存组织架构节点信息成功");
				yield put({
					type: 'getDepartmentNodes',
					payload: { }
				});
			}
		},
		//添加用户入职信息
		*addUserEntry({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.addUserEntrydata, values);
			if (code == 0) {
				message.success("添加用户入职信息成功");
			}
		},
		//根据地方中心id查询下属部门
		*getDeptListByEndemicId({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.getDeptListByEndemicId, values);
			local.set("department",data)
			if (code == 0) {
				yield put({
					type: 'getDeptListByEndemicIdSave',
					payload: {
						data,
						code
					}
				});
			}
		},
		//添加用户信息
		*addUser({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.addUser, values);
			message.config({
		        top: 100,
		        duration: 3
		    });
			switch(data.type)
			{
			case 1:
			  message.success("添加用户信息成功");
			  yield put(routerRedux.push("/system/organization"));
			  break;
			case 2:
			  message.success("该手机号已被注册");
			  break;
			case 3:
			  message.success(`用户${data.name}已在${data.endemicName}`);
			  break;
			default:
			  break;
			}
		},
		//生成用户编码
		*getEmpSerialList({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.getEmpSerial, values);
			if (code == 0) {
				yield put({
					type: 'getEmpSerial',
					payload: {
						data,
						code
					}
				});
			}
		},
		//根据部门id获取下属职位
		*position({ payload: values }, {call,put }){
	      const {data: {data, code}} = yield call(organizationService.getPositionByDeptId,values);
	      if(code == 0) {
	        yield put({ type: 'positionSave', payload: { data, code } });
	      }
	    },
		//根据条件获取用户列表
		*getUserPageListByDeptId({payload: values}, { call, put }) {
			const {data: {data,code}} = yield call(organizationService.getUserPageListByDeptId, values);
			if (code == 0) {
				yield put({
					type: 'getUserPageListByDeptId',
					payload: {
						data,
						code
					}
				});
			}
		},
		//获取组织架构的列表信息
		*organizationList({ payload: values }, {call,put }){
	      const {
	      	data: {
		      		data,
		      		total,
		      		page,
		      		size,
		      		code
	      }} = yield call(organizationService.organizationPage, values);
	      if(code == 0) {
	        yield put({
					type: 'organizationPage',
					payload: {
						data,
						total,
						page,
						size,
						code
					}
				});
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
		        if(pathname === '/system/organization') {
		            dispatch({
						type: 'roleSelectData',
						payload: query
					});
					dispatch({
						type: 'getDepartmentNodes',
						payload: query
					});

		        }
		        if(pathname === '/system/organization/addUser') {
		        	dispatch({
						type: 'getEmpSerialList',
						payload: query
					});
		        }
			})
		}
	},
};
