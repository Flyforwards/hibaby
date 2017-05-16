import * as postionService from '../services/position';

export default {
  namespace: 'position',
  state: {},
  reducers: {
    departmentInfo(state, { payload: { data, code, page, size, total } }) {
      let getDepartmentInfo = { ...state, data, code, page, size, total }
      return getDepartmentInfo;
    },
    getPosition(state, { payload: { data: positionInfo, code } }) {
      positionInfo.map((v, k) => {
        v.rank = k;
      })
      let getPositionInfo = { ...state, positionInfo, code }
      return getPositionInfo;
    },
    showPosition(state, { payload: positionInfo }) {
      return { ...state, ...positionInfo }
    },
    
    addPosition(state, { payload: positionDOs }) {
      return { ...state, positionDOs }
    }
  },
  effects: {
    //获取部门分页信息
    *getDepartmentInfo({ payload: values }, { call, put }) {
      const { data: { data, code, page, size, total } } = yield call(postionService.getDepartmentByEndemicId, values);
      if (code == 0) {
        yield put({
          type: 'departmentInfo',
          payload: {
            data, code, page, size, total
          }
        });
      }
    },
    
    //根据部门id获取下属职位
    *getPositionInfo({ payload: values }, { call, put }) {
      const { data: { data, code } } = yield call(postionService.getPosition, values);
      if (code == 0) {
        yield put({
          type: 'getPosition',
          payload: {
            data,
            code
          }
        });
      }
    },
    
    //保存或修改职位信息
    *addEditPosition({ payload: positionDOs }, { call, put }) {
      console.log(positionDOs, 'valus')
      const { data: { code } } = yield call(postionService.addPosition, positionDOs);
      if (code == 0) {
        yield put({
          type: 'addPosition',
          payload: {
            code
          }
        });
      }
    },
    
    
    *del({ payload: values }, { put, call }) {
      const { data: { code } } = yield call(postionService.delPosition, values);
      if (code == 0) {
        yield put({
          type: 'delPosition',
          payload: {
            data
          }
        });
      }
    },
    
    
    *edit({ payload: { name, rank } }, { select, put }) {
      let positionInfo = yield select(state => state.position.positionInfo);
      positionInfo = positionInfo.map((item, index) => {
        if (item.rank == rank) {
          item.name = name;
        }
        return item;
      })
      yield put({
        type: 'showPosition',
        payload: {
          positionInfo
        }
      })
    },
    
    
    *add({ payload: { positionInfo } }, { select, put }) {
      yield put({
        type: 'showPosition',
        payload: {
          positionInfo
        }
      })
    }
    
  },
  
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/system/position') {
          dispatch({
            type: 'getDepartmentInfo',
            payload: {
              'name': "",
              'page': 1,
              'size': 4,
              'sortField': "string",
              'sortOrder': "string"
            }
          });
        }
      })
    }
  }
}


