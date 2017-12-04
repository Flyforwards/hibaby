
import  * as  InventotyService from '../services/inventory';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { local, session } from 'common/util/storage.js';

export default {
  namespace: 'inventoryArchives',
  state: {
    creatModalVisible:false,
    attributeModalVisible:false,
    editAttModalVisible:false,
    inventoryFileDetail:"",
    creatModelStyle:"creat",
    allStockClassificationNodes:[],
    treeData:[],
    treeSelectData:[],
    list:[],
    page:1,
    size:10,
    total:0
  },


  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname, query}) => {
        console.log(pathname)
        if (pathname === '/inventory/archives') {
          dispatch({type:'getAllStockClassificationNodes'})
          dispatch({type:'getInventoryFilePageList'})
        }
      });
    }
  },

  effects: {
      *getAllStockClassificationNodes({payload:values},{call,put}){
        try {
            const { data:{data,code}} = yield call(InventotyService.getAllStockClassificationNodes,values);
            yield put({type:'setAllStockClassificationNodes',payload:data} );

          }
          catch (err){
            throw err
          }
        },
      *addInventoryFile({payload:values},{call,put}){
        try {
          const { data:{data,code}} = yield call(InventotyService.addInventoryFile,values);

          message.success("添加成功")
        }
        catch (err){
          throw err
        }
      },
      *getInventoryFilePageList({payload:values},{call,put,select}){
        const state = yield select(state => state.inventoryArchives)
        if (!values){
          values = {}
          values.page = state.page;
          values.size = state.size;
        }

        try {
          const { data} = yield call(InventotyService.getInventoryFilePageList,values);
           yield put({type:'saveInventoryFilePageList',payload:data} );
          }
        catch (err){
          throw err
        }
      },
      *deleteInventoryFile({payload:values},{call,put}){
        try {
          const { data:{data,code}} = yield call(InventotyService.deleteInventoryFile,values);
          message.success("删除成功")
          yield put({type:'getInventoryFilePageList',payload:data} );

        }
        catch (err){
          throw err
        }
      },
      *getInventoryFileDetailById({payload:values},{call,put}){
        try {
          const { data:{data,code}} = yield call(InventotyService.getInventoryFileDetailById,values);
          yield put({type:'saveInventoryFileDetailById',payload:data} );
        }
        catch (err){
          throw err
        }
      },
  },
  reducers: {
    setCreatModalVisible(state, {payload:todo}) {
      let dict = {creatModalVisible:todo};
      if (!todo){
        dict.inventoryFileDetail = ""
      }
      console.log(dict)
      return {...state, ...dict};
    },
    setAttributeModalVisible(state, {payload:todo}) {
      return {...state, attributeModalVisible:todo};
    },
    setEditAttModalVisible(state, {payload:todo}) {
      return {...state, editAttModalVisible:todo};
    },
    setCreatModelStyle(state, {payload:todo}){
      return {...state, creatModelStyle:todo};
    },
    saveInventoryFilePageList(state, {payload:todo}) {
      const {page,size,total,data} = todo
      return {...state, list:data,page,size,total};
    },
    saveInventoryFileDetailById(state, {payload:todo}) {
      return {...state, inventoryFileDetail:todo};
    },
    setAllStockClassificationNodes(state, {payload:todo}) {
      let treeSelectData = []
      let  treeData = todo.map(value=>{
        let selectChi = []
        let chiValue = value.nodes.map(chiValue=>{
          selectChi.push({label:chiValue.name,key:chiValue.name+chiValue.id,value:chiValue.id.toString()})
          return {title:chiValue.name,key:chiValue.id.toString()}
        })
        treeSelectData.push({label:value.name,key:value.name+value.id,value:value.id.toString(),children:selectChi})
        return {title:value.name,key:value.id.toString(),children:chiValue}
      })
      return {...state, allStockClassificationNodes:todo,treeData,treeSelectData};
    },
  }
}
