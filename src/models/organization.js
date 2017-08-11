import * as organizationService from '../services/organization';
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js';
import { PAGE_SIZE } from 'common/constants.js'
import { parse } from 'qs'

export default {
  namespace: 'organization',
  state: {
    data: null,
    total: null,
    list: null,
    leftList: null,
    optionData: null,
    dataId: null,
    dataEndemicId: null,
    userID: null,
    LeagerData: null,
    getDepartmentNode: null,
    TissueProperty: null,
    AllTissueProperty: null,
    getPosition: null,
    getDeptList: null,
    getEndemic: null
  },
  reducers: {
    getDeptListSave(state, { payload: { data: getDeptList } }){
      return { ...state, getDeptList }
    },

    getEndemicSave(state, { payload: { data: getEndemic } }){
      let getEndemicSavedata = { ...state, getEndemic };
      return getEndemicSavedata
    },
    getPositionSave(state, { payload: { data: getPosition } }){
      let getPositionSavedata = { ...state, getPosition };
      return getPositionSavedata
    },
    // getUserPageListByDeptId(state, { payload: { data } }){
    //   let getUserPageListByDeptIddata = { ...state, data };
    //   return getUserPageListByDeptIddata
    // },
    getTissuePropertyList(state, { payload: { data: TissueProperty } }){
      let getTissuePropertyListdata = { ...state, TissueProperty };
      return getTissuePropertyListdata
    },
    getAllTissuePropertyList(state, { payload: { data: AllTissueProperty } }){
      let getTissuePropertyListdata = { ...state, AllTissueProperty };
      return getTissuePropertyListdata
    },
    deleteDepartmentSave(state, { payload: { data } }){
      let deleteDepartmentdata = { ...state, data };
      return deleteDepartmentdata
    },
    modifyDepartmentSave(state, { payload: { data } }){
      let modifyDepartmentdata = { ...state, data };
      return modifyDepartmentdata
    },
    getDepartmentSave(state, { payload: { data: getDepartmentNode } }){
      let getDepartmentdata = { ...state, getDepartmentNode };
      return getDepartmentdata
    },
    getLeagerDepartmentNodesSave(state, { payload: { data: LeagerData } }){
      let getLeagerDepartmentNodesdata = { ...state, LeagerData };
      return getLeagerDepartmentNodesdata
    },
    getUserListByIdSave(state, { payload: { data: userID } }){
      let getUserListByIddata = { ...state, userID };
      return getUserListByIddata
    },
    saveDepartmentSave(state, { payload: { data } }){
      let saveDepartmentdata = { ...state, data };
      return saveDepartmentdata
    },
    getDeptListByEndemicIdSave(state, { payload: { data: dataEndemicId } }){
      let getDeptListByEndemicIddata = { ...state, dataEndemicId };
      return getDeptListByEndemicIddata
    },
    roleSelectAllDataSave(state, { payload: { data: selectData } }){
      local.set("rolSelectData", selectData)
      return { ...state, selectData }
    },
    positionSave(state, { payload: { data: dataId } }){
      let Positiondata = { ...state, dataId };
      return Positiondata
    },
    addUserSave(state, { payload: { data } }){
      let addUserdata = { ...state, data };
      return addUserddata
    },
    getEmpSerial(state, { payload: { data } }){
      let getEmpSerialdata = { ...state, data };
      return getEmpSerialdata
    },
    getDepartmentNodesList(state, { payload: { data: leftList } }){
      let getDepartmentNodesdata = { ...state, leftList };
      return getDepartmentNodesdata
    },
    refreshPage(state, { payload: { list } }){
      return { ...state, list };
    },
    organizationPage(state, { payload: { data: list, total, page, size } }){
      let organizationdata = {
        ...state,
        list,
        total,
        page,
        size,
      };
      let range = {
        start: page == 1 ? 1 : (page - 1) * 10 + 1,
        end: page == 1 ? list.length : (page - 1) * 10 + list.length,
        totalpage: Math.ceil(total / size)
      }
      return { ...organizationdata, range };
    },

  },
  effects: {
    //获取组织架构的列表
    *getDepartmentNodes({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(organizationService.getDepartmentNodes, values);
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
    *getTissueProperty({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(organizationService.getTissueProperty, values);
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
    *getPosition({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(organizationService.getPosition, values);
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
    *getDeptList({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(organizationService.getDeptList, values);
      if (code == 0) {
        yield put({
          type: 'getDeptListSave',
          payload: { data, }
        });
      }
    },
    //获取所有的地方中心
    *getEndemic({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(organizationService.getEndemic, values);
      if (code == 0) {
        yield put({
          type: 'getEndemicSave',
          payload: {
            data,
            code
          }
        });
      }
    },
    //获取所有组织性质字典
    *getAllTissueProperty({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(organizationService.getAllTissueProperty, values);
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
    *deleteDepartment({ payload: values }, { call, put }) {
      console.log("删除该组织架构节点成功",values)
      const { data: { data, code } } = yield call(organizationService.deleteDepartment, {dataId:values.dataId});
      if (code == 0) {
        message.success("删除该组织架构节点成功");
        if(values.TissueProperty == 2){
          yield put({
            type:'layout/logout',
            payload:{ }
          })
        }else{
          yield put({
            type: 'getDepartmentNodes',
            payload: {}
          });
        }
      }
    },
    //根据节点id更新组织架构节点
    *modifyDepartment({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(organizationService.modifyDepartment, values);
      if (code == 0) {
        message.success("修改该组织架构节点成功");
        yield put({
          type: 'getDepartment',
          payload: {
            "dataId": values.id
          }
        });
      }
    },
    //根据节点id获取组织架构节点信息
    *getDepartment({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(organizationService.getDepartment, values);
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
    *getLeagerDepartmentNodes({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(organizationService.getLeagerDepartmentNodes, values);
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
    *modifyUser({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(organizationService.modifyUser, values);
      if (code == 0) {
        message.success("修改用户信息成功");
        // yield put(routerRedux.push(`/system/organization/ViewTheInformation?data=${values.id}`));
        history.go(-1)
      }
    },
    //根据用户id查看用户信息
    *getUserListById({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(organizationService.getUserListById, values);
      if (code == 0) {
        yield put({
          type: 'getUserListByIdSave',
          payload: { data  }
        });
      }
    },
    //根据用户id禁用用户
    *forbiddenUser({ payload: values }, { call, put, select }) {
      const { data: { data, code } } = yield call(organizationService.forbiddenUser, values);
      if (code == 0) {
        message.success("该用户信息禁用成功");
        const list = yield select(state => state.organization.list);
         if (list != null) {
           list.map((record)=>{
            if (record.id == values.dataId) {
              record.status = 1;
            };
          })
        }
        yield put({
          type: 'refreshPage',
          payload: { list }
        })
      }
    },
    //根据入职信息id删除入职信息
    *deleteUserEntry({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(organizationService.deleteUserEntry, values);
      if (code == 0) {

      }
    },
    //系统角色下拉列表
    *roleSelectAllData({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(organizationService.roleSelectAllData, values);
      if (code == 0) {
        yield put({
          type: 'roleSelectAllDataSave',
          payload: {
            data,
          }
        });
      }
    },

    //保存组织架构节点信息
    *saveDepartment({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(organizationService.saveDepartment, values);
      if (code == 0) {
        //刷新地方中心的菜单
        message.success("保存组织架构节点信息成功");
        yield put({
          type: 'getDepartmentNodes',
          payload: {}
        });
        yield put({
          type: 'layout/getCurrentUserEndemicList',
        });
      }
    },

    //添加用户入职信息
    *addUserEntry({ payload: values }, { call, put }) {
      const { data: { code } } = yield call(organizationService.addUserEntrydata, values);
      if (code == 0) {
        message.success("添加用户入职信息成功");
        const param = parse(location.search.substr(1))
        yield put({
          type: 'getUserListById',
          payload: param
        })
      }
    },
    //根据地方中心id查询下属部门
    *getDeptListByEndemicId({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(organizationService.getDeptListByEndemicId, values);
      local.set("department", data)
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
    *addUser({ payload: values }, { call, put }) {
      message.config({
        top: 100,
        duration: 4,
      });
      const { data: { data, code } } = yield call(organizationService.addUser, values);
      switch (data.type) {
        case 1:
          message.success("添加用户信息成功");
          yield put(routerRedux.push("/system/organization"));
          break;
        case 2:
          message.error("该手机号已被注册");
          break;
        case 3:
          message.error(`用户${data.name}已在${data.endemicName}注册过`);
          break;
        default:
          break;
      }
    },
    //生成用户编码
    *getEmpSerialList({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(organizationService.getEmpSerial, values);
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
    *position({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(organizationService.getPositionByDeptId, values);
      if (code == 0) {
        yield put({ type: 'positionSave', payload: { data, code } });
      }
    },
    // //根据条件获取用户列表
    // *getUserPageListByDeptId({ payload: values }, { call, put }) {
    //   const { data: { data, code } } = yield call(organizationService.getUserPageListByDeptId, values);
    //   if (code == 0) {
    //     yield put({
    //       type: 'getUserPageListByDeptId',
    //       payload: {
    //         data,
    //         code
    //       }
    //     });
    //   }
    // },
    //获取组织架构的列表信息
    *organizationList({ payload: values }, { call, put }){
      const {
              data: {
                data,
                total,
                page,
                size,
                code
              }
            } = yield call(organizationService.organizationPage, values);
      if (code == 0) {
        yield put({
          type: 'organizationPage',
          payload: {
            data,
            total,
            page,
            size,
          }
        });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/system/organization') {
          dispatch({
            type: 'roleSelectAllData',
            payload: query
          });
          dispatch({
            type: 'getDepartmentNodes',
            payload: query
          });

        }
        if (pathname === '/system/organization/addUser') {
          dispatch({
            type: 'getEmpSerialList',
            payload: query
          });
        }
      })
    }
  }
};
