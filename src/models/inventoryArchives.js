
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
    attributesGroupByGoodsId:[],
    inventoryAttTableKey:[],
    attributesPageList:[],
    editingAtt:[],
    creatModelStyle:"creat",
    selectRowId:"",
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
          yield put({type:'setCreatModalVisible',payload:false} );
          yield put({type:'getInventoryFilePageList'} );

        }
        catch (err){
          throw err
        }
      },
      *getInventoryFilePageList({payload:values},{call,put,select}){
        const state = yield select(state => state.inventoryArchives)
        if (!values){
          values = {};
        }
        if (!values.page){
          values.page = state.page;
        }
        if (!values.size){
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
      *getAttributesGroupByGoodsId({payload:values},{call,put,select}){
        const state = yield select(state => state.inventoryArchives)
        try {
          const { data:{data}} = yield call(InventotyService.getAttributesGroupByGoodsId,{dataId:state.selectRowId});
          yield put({type:'savaAttributesGroupByGoodsId',payload:data} );
        }
        catch (err){
          throw err
        }
      },
      *getAttributesPageList({payload:values},{call,put}){
        try {
          const { data:{data,code}} = yield call(InventotyService.getAttributesPageList,values);
          yield put({type:'saveAttributesPageList',payload:data} );
        }
        catch (err){
          throw err
        }
      },
      *saveGoodsByAttributesAndId({payload:values},{call,put}){

        try {
          const { data:{data,code}} = yield call(InventotyService.saveGoodsByAttributesAndId,values);
          message.success("保存成功")
          yield put({type:'getAttributesGroupByGoodsId'} );
        }
        catch (err){
          throw err
        }
      },
    *saveInventoryAttTableKey({payload:values},{call,put}){

      try {
        const { data:{data,code}} = yield call(InventotyService.saveInventoryAttTableKey,values);
        yield put({type:'setInventoryAttTableKey',payload:data.split(",")} );
      }
      catch (err){
        throw err
      }
    },
    *getInventoryAttTableKey({payload:values},{call,put}){

      try {
        const { data:{data,code}} = yield call(InventotyService.getInventoryAttTableKey,values);
        yield put({type:'setInventoryAttTableKey',payload:data.split(",")} );
      }
      catch (err){
        throw err
      }
    },
    *deleteAttributesGroupByResultId({payload:values},{call,put}){
      try {
        const { data:{data,code}} = yield call(InventotyService.deleteAttributesGroupByResultId,values);
        message.success("删除成功")
        yield put({type:'getAttributesGroupByGoodsId'} )
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
      return {...state, ...dict};
    },
    setInventoryAttTableKey(state, {payload:todo}) {
      return {...state, inventoryAttTableKey:todo};
    },
    setAttributeModalVisible(state, {payload:todo}) {
      return {...state, attributeModalVisible:todo};
    },
    setEditAttModalVisible(state, {payload:todo}) {
      let tempDict = {editAttModalVisible:todo}
      if (!todo){
        tempDict.editingAtt = ""
      }

      return {...state,...tempDict };
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
    savaAttributesGroupByGoodsId(state, {payload:todo}) {
      let ary = []
      todo.map(value=>{
        let tempDict = [];
        let dict = JSON.parse(value.attibuteValue)
        Object.keys(dict).map(key=>{
          tempDict[key] = dict[key].split('|*|')[1]
        })

        ary.push({...tempDict,...value})
      })

      return {...state, attributesGroupByGoodsId:ary};
    },
    savaSelectRowId(state, {payload:todo}) {
      return {...state, selectRowId:todo};
    },
    saveAttributesPageList(state, {payload:todo}) {
      return {...state, attributesPageList:todo};
    },
    setEditingAtt(state, {payload:todo}) {
      return {...state, editingAtt:todo ? {...todo} : todo};
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
