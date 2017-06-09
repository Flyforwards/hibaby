
import * as systemService from '../services/system';
import * as usersService from '../services/users';
import * as organizationService from '../services/organization';
import { message } from 'antd';
import  { session } from 'common/util/storage.js';
import { parse } from 'qs'
import { routerRedux } from 'dva/router';


// tissueProperty 3是部门 2是地方中心
export default {
  namespace: 'permission',
  state: {
    data: [],
    role: 0,
    permissionList: [],
    userList: null,
    club: null,
    departmentList:[],
    memberTotal: 0,
    currentDeptTree: [],
    undisUserList: [], // 未分配角色的列表
    undisUserTotal: 0,
    selectedRows: [],
    selectedRowKeys: [],
    getPosition: null,
    getDeptList: null,
    users:[],
    // 默认选择的节点 --添加成员
    nodeid: null,
    // 默认节点的组织信心  --添加成员
    tissueProperty: null,
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname, query}) => {
        //查看集团列表数据
        if (pathname === '/system/permission') {
          dispatch({
            type: 'getRolesByPage',
            payload: query
          });
          dispatch({
            type: 'getPosition',
          });
          dispatch({
            type: 'getDeptList',
          });
        }
      })
    }
  },

  effects: {

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
          payload: {
            data,
            code
          }
        });
      }
    },

    *getRolesByPage({ payload: values }, {call,put }) {
      values = parse(location.search.substr(1))
      const { data: { data, total, page, size, code, err }} = yield call(systemService.getRolesByPage, values);
      if (code == 0) {
        if(data.length == 0 && page > 1){
          yield put(routerRedux.push(`/system/permission?page=${page -1}&size=10`))
        }
        else {
          yield put({
            type : 'getRolesSuccess',
            payload : {
              data,
              pagination: {
                current: Number(page) || 1,
                pageSize: Number(size) || 10,
                total: total,
              },
            },
          });
        }

      }
    },
    *submitCreateRole({ payload: values }, {call,put }) {

      const { data: { data, code, err }} = yield call(systemService.roleAdd, values);
      if (code == 0) {
        message.success('创建角色成功');
        yield put({
          type : 'getRolesByPage',
        });
      }
    },
    *submitEditRole({ payload: values }, {call,put }) {
      const { id, roleName } = values
      const { data: { code, err }} = yield call(systemService.roleEdit, { id, roleName });
      if (code == 0) {
        message.success('编辑角色成功');
        yield put({
          type : 'getRolesByPage',
        });
      }
    },
    *submitDelRole({ payload: values }, {call,put }) {
      const { dataId } = values
      const { data: { data, code, err }} = yield call(systemService.roleDel, { dataId });
      if (code == 0) {
        message.success('删除角色成功');
        yield put({
          type : 'getRolesByPage',
        });
      }
    },
    *treeByRoleID({ payload }, {call, put}) {
      const  { record } = payload
      const values = { dataId : record.id }
      const {data: {data , code , err}} =  yield call(usersService.treeByRoleID, values)
      if (code == 0 && err == null) {
        yield put({
          type : 'getTreeSuccess',
          payload : { data }
        });
      }
    },

    // 根据角色Id 请求成员列表
    *getUserPageListByRoleId({ payload: values }, {call, put}) {
      const  { first }  = values;
      if (first) {
        let departmentLists =[];
        // const selClub =  session.get("endemic");
        // const arg = { dataId: selClub.id };

        //  获取部门字典
        // const {data:  {data : departmentList, code , err }} =  yield call(usersService.getDeptListByEndemicId, arg)
        // if (code == 0 && err == null) {
        //   departmentLists = departmentList;
        // }

        // yield put({
        //   type: 'getDictionSuccess',
        //   payload: { selClub, departmentLists}
        // });
        //  获取职位字典
      }

      const {data: {data, total ,page, code , err}} =  yield call(usersService.getUserPageListByRoleId, values)


      if (code == 0 && err == null) {

        if(data.length == 0 && page > 1){

          yield put({
            type : 'getUserPageListByRoleId',
            payload: { page:page - 1, size: 10, roleId:values.roleId }
          })
        }else{
          yield put({
            type : 'getRoleUserPagSuccess',
            payload : { data, total,}
          });
        }
      }
    },
    // 给角色分配权限
    *configRolePermission({ payload: values }, {call, put}) {
      const {data: {data, code , err}} =  yield call(usersService.configRolePermission, values)
      if (code == 0 && err == null) {
        message.success("设置权限成功");
      }
    },

    // 获取当前地区的部门信息
    *getDeptByCurrentEndemic({ payload: { roleId } },{call, put}) {
      const {data: {data, code , err}} =  yield call(usersService.getRoleDepartmentNodes, { dataId: roleId })
      if (code == 0 && err == null) {
        yield put({
          type: "getDeptByEndemicSuccess",
          payload: { data }
        })
        if (data.nodes && data.nodes.length > 0) {
          const dept = data.nodes[0];
          const { id: nodeid , tissueProperty } = dept
          // 默认选择第一个部门，将这个部门的信息保存起来
          yield put({
            type: "setDefaultDepatInfo",
            payload: { nodeid, tissueProperty }
          })
          yield put({
            type: "getUserPageListByUserRole",
            payload: { roleId, nodeid, tissueProperty, page : 1, pageSize: 10 },
          })
        }

      }
    },

    *DelUserRoleInput({ payload: values },{call, put}) {
      const { page, pageSize, userId, roleId} = values
      const {data: {data, code , err}} =  yield call(usersService.DelUserRoleInput, { userId,roleId })
      if (code == 0 && err == null) {
        // 解绑成功重新查询用户列表
        message.success("解绑用户成功")
        yield put({
          type: "getUserPageListByRoleId",
          payload: { page, pageSize,roleId }
        })
      }
    },

    *getUserPageListByUserRole({ payload: values },{call, put}) {
      const { nodeid } = values;
      const {data: {data, code, total , err}} =  yield call(usersService.getUserPageListByUserRole, values)

      if (code == 0 && err == null) {
        yield put({
          type: "getUserByNodeIdSuccess",
          payload: { data, total, nodeid }
        })
      }
    },

    *bindUserRole({ payload: { selectedRows, roleId  } },{call, put}) {
      let str = "";
      selectedRows.map((record,index)=> {
        if (index == 0) {
          str = str+String(record.id);
        } else {
          str = str+","+String(record.id);
        }
      })
      const {data: {data, code, err}} =  yield call(usersService.bindUserRole, { userId:str, roleId  })
      if (code == 0 && err == null) {
        message.success("角色添加用户成功");
        yield put({
          type: "getUserPageListByRoleId",
          payload: { roleId, page: 1, size: 10, first: true }
        })
      }
    },

    // 清除选择的行
    *removeSelected({ payload: { record  } },{ put, select }) {

      const selectedRowKeys = yield select(state => state.permission.selectedRowKeys);
      selectedRowKeys.remove(record.key);
      yield put({
        type: 'selectedRowsChange',
        payload: { selectedRowKeys }
      })
    },

  },
  reducers: {
    getDeptListSave(state, { payload: { data: getDeptList, code } }){
      let getDeptListSavedata = { ...state, getDeptList, code };
      return getDeptListSavedata
    },
    getPositionSave(state, { payload: { data: getPosition, code } }){
      let getPositionSavedata = { ...state, getPosition, code };
      return getPositionSavedata
    },
    getRolesSuccess( state, { payload: { data, pagination }}) {
      return {...state, data, pagination: {  ...state.pagination,...pagination }};
    },
    removeSelectKeys (state, { payload }) {
      state.selectedRows = [];
      state.selectedRowKeys = [];
      return {...state };
    },
    selectedRowsChange(state, {payload: { selectedRowKeys }}) {
      let selectedRows = [];
      selectedRowKeys.map((record)=> {
        const key = record;
        state.users.map((record)=>{
          if (record.key == key) {
            selectedRows.push(record);
          }
        })
      })

      return {...state, selectedRows, selectedRowKeys };
    },

    // roleAddSuccess(state, {payload: { data }}) {
    //   return {...state, data};
    // }
    getTreeSuccess(state, { payload: { data: permissionList } }) {
      return {...state, permissionList};
    },
    // 获取角色下的用户列表成功
    getRoleUserPagSuccess(state, { payload: { data: userList, total: memberTotal } }) {
      return {...state, userList, memberTotal};
    },
    getDictionSuccess(state, { payload: { selClub: club, departmentLists: departmentList } }) {
      return {...state, club, departmentList};
    },

    // 获取当前地方中心组织架构树成功
    getDeptByEndemicSuccess(state, { payload: { data: currentDeptTree }}) {
      return {...state, currentDeptTree};
    },
    // 根据选择组织架构下的部门获取未分配的用户成功
    getUserByNodeIdSuccess(state, { payload: { data: undisUserList, total: undisUserTotal, nodeid }}) {
      state.users = state.users.concat(undisUserList);

      state.users.removeRepeatAttr();
      return {...state, undisUserList, undisUserTotal };
    },

    clearPermissionList(state, { payload }) {
      const permissionList = [];
      return { ...state,permissionList};
    },

    setDefaultDepatInfo(state, { payload: { nodeid, tissueProperty } }) {
      return { ...state, nodeid, tissueProperty };
    },
  },
}
