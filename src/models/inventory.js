import * as inventoryService from '../services/inventory';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { local, session } from 'common/util/storage.js';
import { parse } from 'qs'

export default {
  namespace: 'inventory',
  state: {
    pageList: null,
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize: 10,
      total: null
    },
    list: [],
    inventoryPagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      pageSize: 10,
      total: null
    },
    title:"新增",
    isDisabled:true,
    editShow:true,
    visible:false,
  },
  reducers: {
    //分页
    getCardPageSave(state, { payload: { list, pagination } }) {
      return { ...state, list, pagination: { ...state.pagination, ...pagination } };
    },
    getInventoryPageSave(state, { payload: { list, inventoryPagination } }){
      return { ...state, list, inventoryPagination: { ...state.inventoryPagination, ...inventoryPagination } };
    },
    saveWarehousePageList(state, { payload: { data: pageList } }){
      return { ...state, pageList }
    },
    //保存仓库详情
    saveWarehouseDetail(state, { payload: { data: detailData } }){
      return { ...state, detailData }
    },
    /*保存仓库明细列表*/
    saveInventoryList(state, { payload: data }){
      let inventoryData = [];
      data.length > 0 && data.map((v, k) => {
        inventoryData.push(v.inventoryDO)
      })
      return { ...state, inventoryData }
    },

    removeData(state, { payload: data }){
      return {
        ...state,
        detailData: null,
       // pageList: null,
        title:'',
        isDisabled:true,
        editShow:true,
        visible:false,
      }
    },
    //点击查看显示modal
    changeVisibleLook(state,{payload:data}){
      return { ...state,visible:data}
    },
    //editshow
    changEditShow(state,{payload:data}){
      return { ...state,editShow:data}
    },
    //disabled
    changeDisabled(state,{payload:data}){
      return { ...state,isDisabled:data}
    },
    //title
    changeTitle(state,{payload:data}){
      return { ...state,title:data }
    }
  },
  effects: {
    /*保存仓库*/
    *saveWarehouse({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(inventoryService.saveWarehouse, values);
      if (code == 0) {

        message.success('仓库保存成功')
          yield put({
            type:'changeVisibleLook',
            payload:false,
          })
          yield put({
            type:'changEditShow',
            payload:true
          })
          yield put({
            type:'changeDisabled',
            payload:true,
          })
          yield put({
            type: 'getWarehousePageList'
          })
         yield put({
            type: 'removeData'
          })
       // yield put(routerRedux.push('/inventory/warehouse'))
      }
    },
    /*获取仓库列表*/
    *getWarehousePageList({ payload: values }, { call, put }){
      values = parse(location.search.substr(1))
      if (values.page === undefined) {
        values.page = 1;
      }
      if (values.size === undefined) {
        values.size = 10;
      }
      const { data: { data, code, page, size, total } } = yield call(inventoryService.getWarehousePageList, values);
      if (code == 0) {
        yield put({
          type: 'saveWarehousePageList',
          payload: {
            data
          }
        })
        yield put({
          type: 'getCardPageSave',
          payload: {
            list: data,
            pagination: {
              current: Number(page) || 1,
              pageSize: Number(size) || 10,
              total: total
            }
          }
        })
      }
    },
    /*根据Id查询仓库详情*/
    *getWarehouseDetailById({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(inventoryService.getWarehouseDetailById, values);
      if (code == 0) {
        yield put({
          type: 'saveWarehouseDetail',
          payload: {
            data
          }
        })
        if(values.type == 1){
          yield put({
            type:'changeVisibleLook',
            payload:true,
          })
          yield put({
            type:'changEditShow',
            payload:false
          })
          yield put({
            type:'changeDisabled',
            payload:true,
          })
        }
        if(values.type == 2){
          yield put({
            type:'changeVisibleLook',
            payload:true,
          })
          yield put({
            type:'changEditShow',
            payload:true
          })
          yield put({
            type:'changeDisabled',
            payload:false,
          })
        }

      }
    },

    /*删除成功*/
    *deleteWarehouse({ payload: values }, { call, put }){
      const { data: { data, code } } = yield call(inventoryService.deleteWarehouse, values);
      if (code == 0) {
        message.success("删除成功")
        yield put(routerRedux.push('/inventory/warehouse'))
      }
    },

    /*仓库明细列表*/
    *getInventoryList({ payload: values }, { call, put }){
      const { data: { data, code,page,size ,total} } = yield call(inventoryService.getInventoryList, values);
      if (code == 0) {
        yield put({
          type: 'saveInventoryList',
          payload: data
        })
        yield put({
          type: 'getInventoryPageSave',
          payload: {
            list: data,
            inventoryPagination: {
              current: Number(page) || 1,
              pageSize: Number(size) || 10,
              total: total
            }
          }
        })
      }
    }

  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/inventory/warehouse') {
          dispatch({
            type: 'getWarehousePageList'
          })
        }
        // if (pathname === '/inventory/warehouse/detail') {
        //   dispatch({
        //     type: 'getWarehouseDetailById',
        //     payload: {
        //       "id": query.id
        //     }
        //   })
        // }
        // if (pathname === '/inventory/warehouse/edit') {
        //   if (query.id) {
        //     dispatch({
        //       type: 'getWarehouseDetailById',
        //       payload: {
        //         "id": query.id
        //       }
        //     })
        //   }
        // }
        /*仓库明细*/
        if (pathname === '/inventory/warehouse-inventory') {
          dispatch({
            type: 'getInventoryList',
            payload: { 'size': 10, 'page': 1 }
          })
        }
      })
    }
  }
}
