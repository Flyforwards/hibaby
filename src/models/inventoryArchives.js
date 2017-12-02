
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
    allStockClassificationNodes:[],
    treeData:[],
    treeSelectData:[]
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
            console.log(data)
            yield put({type:'setAllStockClassificationNodes',payload:data} );

          }
          catch (err){
            throw err
          }
        },
      *addInventoryFile({payload:values},{call,put}){
        try {
          const { data:{data,code}} = yield call(InventotyService.addInventoryFile,values);


        }
        catch (err){
          throw err
        }
      },
      *getInventoryFilePageList({payload:values},{call,put}){
        try {
          const { data:{data,code}} = yield call(InventotyService.getInventoryFilePageList,{page:1,size:10});


        }
        catch (err){
          throw err
        }
      },
      *deleteInventoryFile({payload:values},{call,put}){
        try {
          const { data:{data,code}} = yield call(InventotyService.deleteInventoryFile,values);


        }
        catch (err){
          throw err
        }
      },
      *getInventoryFileDetailById({payload:values},{call,put}){
        try {
          const { data:{data,code}} = yield call(InventotyService.getInventoryFileDetailById,values);


        }
        catch (err){
          throw err
        }
      },
  },
  reducers: {
    setCreatModalVisible(state, {payload:todo}) {
      return {...state, creatModalVisible:todo};
    },
    setAttributeModalVisible(state, {payload:todo}) {
      return {...state, attributeModalVisible:todo};
    },
    setEditAttModalVisible(state, {payload:todo}) {
      return {...state, editAttModalVisible:todo};
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
