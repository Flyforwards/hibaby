
import * as postionService from '../services/position';
import { message } from 'antd'
import { parse } from 'qs'
export default {
  namespace: 'position',
  state: {
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
    list: [],
    item: null,
    positionInfo: []
  },

  reducers: {
    departmentInfoSave(state, { payload: { list,pagination } }) {
      return {...state, list, pagination: {  ...state.pagination,...pagination }};
    },
    getPosition(state, { payload: { data: positionInfo } }) {
      positionInfo.map((v, k) => {
        v.rank = k;
      })
      return { ...state, positionInfo };
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
      values = parse(location.search.substr(1))
      if (values.page === undefined) {
        values.page = 1;
      }
      if (values.size === undefined) {
        values.size = 10;
      }
      const { data: { data, code, page, size, total } } = yield call(postionService.getDepartmentByEndemicId, values);
      if (code == 0) {
        yield put({
          type: 'departmentInfoSave',
          payload: {
            list: data,
            pagination: {
              current: Number(page) || 1,
              pageSize: Number(size) || 10,
              total: total,
            },
          },
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
    *saveOrModifyPosition({ payload: valus }, { call, put }) {
      const { data: { code } } = yield call(postionService.saveOrModifyPosition, valus);

      if (code == 0) {
        message.success("修改职位成功");
        // yield put({
        //   type: 'addPosition',
        //   payload: {
        //     code
        //   }
        // });
      }
    },


    *del({ payload: values }, { put, call }) {
      const { data: { code } } = yield call(postionService.delPosition, values);
      if (code == 0) {
        yield put({
          type: 'delPosition',
        });
        message.success("删除成功");
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
      return history.listen(({ pathname, query }) => {

        if (pathname === '/system/position') {
          dispatch({
            type: 'getDepartmentInfo',
            payload: query
          });
        }
      })
    }
  }
}


