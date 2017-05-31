import * as addCustomerInformation from '../services/addCustomerInformation';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js'
import { routerRedux } from 'dva/router';

export default {
  namespace: 'addCustomer',
  state: {

    dataDetailId:90,
    baseData:[],
    expandData:[],
    remarkData:[],

    bigImageHidden:false,
    bigImageData:[],
    lookCardIDDLC:[],
    lookContractDLC:[],


    remarkList:[],
    provinceData:[],
    cityData:[],
    permanentCityData:[],
    nationalData:[],
    modal:false,
    cardIDDLC:[],
    contractDLC:[],
    headIcon:'',
    headIconUrl:'',

    operator:'',

    editCustomer:false,

    memberNumberValue:'',
    purchasePackageValue:'',

    //下拉框所需数据
    guestInformationSourceAry:[],
    concernsAry:[],
    networkSearchWordsAry:[],
    fetusAry:[],
    hospitalAry:[],
    intentionPackageAry:[],
    memberAry:[],
    specialIdentityAry:[],

    remarkListColumns : [{
      title: '备注内容',
      dataIndex: 'remarkInfo',
      key: 'name',
      width:'70%',
    }, {
      title: '备注时间',
      dataIndex: 'createTime',
      key: 'remarkDate',
      width:'15%',
    }, {
      title: '备注人',
      dataIndex: 'operator',
      key: 'remarkMan',
      width:'15%',
    }]
  },
  reducers: {
    addRemark(state, { payload: todo }){
      const {remarkList} = state;

      const date = new Date();

      const dict = {remarkInfo:todo,createTime:date.toLocaleString(),operator:state.operator};

      const tempDict = [...remarkList,dict];

      return {...state,remarkList:tempDict,modal:false};
    },

    addRemarkAry(state, { payload: todo }){
      return {...state,remarkList:todo};
    },

    editCustomer(state, { payload: todo }){
      return {...state,editCustomer:todo.data};
    },
    lookDlc(state, { payload: todo }){
      const lookCardIDDLC = state.lookCardIDDLC;
      const lookContractDLC = state.lookContractDLC;
      return {...state,bigImageHidden:true,bigImageData:(todo.isCardid ? lookCardIDDLC
        :lookContractDLC)};

    },

    hideDlc(state, { payload: todo }){
      return {...state,bigImageHidden:false};
    },
    hideOrShowModal(state, { payload: todo }){
      return {...state,modal:todo};
    },
    addProvinceData(state, { payload: todo }){
      return {...state,provinceData:todo.data};
    },
    addCityData(state, { payload: todo }){
      return {...state,cityData:todo.data};
    },
    addPermanentCityData(state, { payload: todo }){
      return {...state,permanentCityData:todo.data};
    },
    addNationalData(state, { payload: todo }){
      return {...state,nationalData:todo.data};
    },
    addCardIDDLC(state, { payload: todo }){
      return {...state,cardIDDLC:todo};
    },
    addContractDLC(state, { payload: todo }){
      return {...state,contractDLC:todo};
    },
    reductionState(state, { payload: todo }){
      return {...state,remarkList:[],cardIDDLC:[],contractDLC:[],headIcon:'',headIconUrl:'',};
    },
    deleteContractDLC(state, { payload: todo }){
      let arr = state.contractDLC;
      for(var i=0; i<arr.length; i++) {
        if(arr[i] == todo) {
          arr.splice(i, 1);
          break;
        }
      }


      return {...state,contractDLC:arr};
    },
    deleteCardIDDLC(state, { payload: todo }){

      let arr = state.cardIDDLC;
      for(var i=0; i<arr.length; i++) {
        if(arr[i] == todo) {
          arr.splice(i, 1);
          break;
        }
      }
      return {...state,cardIDDLC:arr};
    },

    setLookCardIDDLC(state, { payload: todo }){
      return {...state,lookCardIDDLC:todo.data};
    },

    setLookContractDLC(state, { payload: todo }){
      return {...state,lookContractDLC:todo.data};
    },


    addHeadIcon(state, { payload: todo }){
      return {...state,headIcon:todo.key,headIconUrl:todo.url};
    },

    setMemberNumberValue(state, { payload: todo }){
      return {...state,memberNumberValue:todo.data};
    },
    setPurchasePackageValue(state, { payload: todo }){
      return {...state,purchasePackageValue:todo};
    },
    getOperator(state, { payload: todo }){
      const userInfo  = session.get("userInfo");
      return {...state,operator:userInfo.name};
    },

    addMutDictData(state, { payload: todo }){

      if(todo.id === 1){

        return {...state,fetusAry:todo.data};
      }
      else if(todo.id === 2){
        return {...state,guestInformationSourceAry:todo.data};
      }
      else if(todo.id === 3){
        return {...state,hospitalAry:todo.data};
      }
      else if(todo.id === 4){
        return {...state,concernsAry:todo.data};
      }
      else if(todo.id === 6){
        return {...state,networkSearchWordsAry:todo.data};
      }
      else if(todo.id === 5){
        return {...state,intentionPackageAry:todo.data};
      }

      return {...state};
    },
    setMembershipcard(state, { payload: todo }){
      if(todo.dataId === 1){
        return {...state,memberAry:todo.data};
      }
      else if(todo.dataId === 2){
        return {...state,specialIdentityAry:todo.data};
      }
      return {...state};
    },

    setDataDetailId(state, { payload: todo }){
      return {...state,dataDetailId:todo.dataId};
    },

    setBaseData(state, { payload: todo }){
      return {...state,baseData:todo.data};
    },

    setExpandData(state, { payload: todo }){

      return {...state,expandData:todo.data};
    },

    setRemarkData(state, { payload: todo }){
      return {...state,remarkData:todo.data};
    },

  },
  effects: {
    *getProvinceData({ payload: values }, { call, put,select }) {

      const state = yield select(state => state.addCustomer);

      const { data: { code, data } } = yield call(addCustomerInformation.getCityData, values);
      if (code == 0) {
        yield put({type: 'addProvinceData',payload:{data}});
        if (state.editCustomer){
          yield put({type: 'getCityData',payload:{isHouseholdRegistration:false,dataId:state.baseData.province}});
          if(state.expandData){
            yield put({type: 'getCityData',payload:{isHouseholdRegistration:true,dataId:state.expandData.provincePermanent}});
          }
        };

      }
    },

    *getCityData({ payload: values }, { call, put }) {

      const {isHouseholdRegistration,dataId} = values;

      const { data: { code, data } } = yield call(addCustomerInformation.getCityData, {dataId:dataId});
      if (code == 0) {
        if (isHouseholdRegistration){
          yield put({
            type: 'addPermanentCityData',
            payload: {data}
          })
        }
        else{
          yield put({
            type: 'addCityData',
            payload: {data}
          })
        }
      }
    },

    *getNationDictionary({ payload: values },{ call, put }) {
      const { data: { code, data } } = yield call(addCustomerInformation.getNationalData,values);
      if (code == 0) {
        yield put({
          type: 'addNationalData',
          payload: {
            data,
          }
        });
      }
    },

    *getDataDict({ payload: value },{ call, put }){
      const parameter ={
        id: value.id,
        softDelete: 0,
        type: 2,
      };


      const { data: { code, data } } = yield call(addCustomerInformation.getDataDict,parameter);
      if (code == 0) {

        yield put({
          type: 'addMutDictData',
          payload: {
            id:value.id,
            data:data,
          }
        });
      }
    },

    *getMembershipcardByType({ payload: value },{ call, put }){

      const { data: { code, data } } = yield call(addCustomerInformation.getMembershipcardByType,value);

      if (code == 0) {
        yield put({
          type: 'setMembershipcard',
          payload: {
            dataId:value.dataId,
            data:data,
          }
        });
      }
    },

    *getMemberSerial({ payload: value },{ call, put }){
      const { data: { code, data } } = yield call(addCustomerInformation.getMemberSerial,value);
      if (code == 0) {
        yield put({
          type: 'setMemberNumberValue',
          payload: {
            data,
          }
        });
      }
    },

    *getMainCustomerPackageById({ payload: value },{ call, put }){

      const { data: { code, data } } = yield call(addCustomerInformation.getMainCustomerPackageById,{dataId:0});

      if (code == 0) {

        yield put({
          type: 'setPurchasePackageValue',
          payload: {
            data,
          }
        });
      }
    },


    *savaBaseInfo({ payload: values },{ call, put ,select}) {

      const {baseDict,exDict} = values;

      const { data: { code, data,err } } = yield call(addCustomerInformation.saveCustomer,baseDict);
      if (code == 0) {
        if (exDict){
          yield put({
            type:'savaExtensionInfo',
            payload:{
              ...exDict,id:data
            }
          });
        }
        else {
          message.success("新增客户成功");
          yield put(routerRedux.push('/crm/customer'));
          yield put({type:'savaExtensionInfo',} );
        }
      }
      else {
        message(err)
      }
    },


    *savaExtensionInfo({ payload: values },{ call, put ,select}) {
      const state = yield select(state => state.addCustomer);
      const remarkList = state.remarkList;


      let caridStr = '';
      let contractStr = '';

      for (let i = 0; i < state.contractDLC.length;i++){
        contractStr += state.contractDLC[i];
        contractStr += ',';
      }


      for (let i = 0; i < state.cardIDDLC.length;i++){
        caridStr += state.cardIDDLC[i];
        caridStr += ',';
      }

      if (caridStr.length > 0){caridStr = caridStr.substr(0,caridStr.length - 1) }
      if (contractStr.length > 0){contractStr = contractStr.substr(0,contractStr.length - 1) }

      const dict = {
        "associatedRooms": values.associatedRooms,
        "cityPermanent": values.cityPermanent,
        "contact": values.contact,
        "contractAppendices": contractStr,
        "contractNumber": values.contractNumber,
        "customerId": values.id,
        "customerPhoto": state.headIcon,
        "detailedPermanent": values.detailedPermanent,
        "idcard": values.idcard,
        "idcardScan": caridStr,
        "imgURL": state.headIconUrl,
        "insuranceSituation": values.insuranceSituation,
        "member": values.member,
        "memberNumber": state.memberNumberValue,
        "nation": values.nation,
        "operator": state.operator,
        "placeOrigin": values.placeOrigin,
        "productionDate": values.productionDate.format(),
        "provincePermanent": values.provincePermanent,
        "purchasePackage": '0',
        "specialIdentity": values.specialIdentity
      };


      const { data: { code, data ,err} } = yield call(addCustomerInformation.savaExtensionInfo,dict);
      if (code == 0) {
        if (remarkList.length > 0){
          yield put({
            type:'savaRemark',
            payload:{
              id:values.id
            }
          });
        }
        else {
          message.success("新增客户成功");
          yield put(routerRedux.push('/crm/customer'));
          yield put({type: 'savaExtensionInfo',});
        }
      }
      else {
        message(err);
      }
    },

    *savaRemark({ payload: values },{ call, put ,select}) {
      const state = yield select(state => state.addCustomer);

      const remarkList = state.remarkList;

      const inputs =[];

      for (let i = 0;i<remarkList.length;i++)
      {
        const remark = remarkList[i];

        inputs.push({"customerId": values.id,"remarkInfo": remark.remarkInfo})
      }

      const { data: { code, data ,err} } = yield call(addCustomerInformation.savaRemark,{inputs:inputs});
      if (code == 0) {
        message.success("新增客户成功");
        yield put(routerRedux.push('/crm/customer'));
        yield put({type:'savaExtensionInfo',} );

      }
      else {
        message(err)
      }
    },
    *getCustomerById({ payload: values },{ call, put ,select}) {
      const state = yield select(state => state.addCustomer);

      const dataDetailId = state.dataDetailId;

      const { data: { code, data ,err} } = yield call(addCustomerInformation.getCustomerById,{dataId:dataDetailId});

      if (code == 0) {
        yield put({type:'setBaseData',payload:{
          data
        }} );
      }
    },

    *getCustomerExtendById({ payload: values },{ call, put ,select}) {
      const state = yield select(state => state.addCustomer);

      const dataDetailId = state.dataDetailId;

      const { data: { code, data ,err} } = yield call(addCustomerInformation.getCustomerExtendById,{dataId:dataDetailId});
      if (code == 0) {
        yield put({type:'setExpandData',payload:{ data }} );
        yield put({type:'getDlcData'} );
      }
    },

    *getCustomerRemarkById({ payload: values },{ call, put ,select}) {
      const state = yield select(state => state.addCustomer);

      const dataDetailId =state.dataDetailId;

      const { data: { code, data ,err} } = yield call(addCustomerInformation.getCustomerRemarkById,{dataId:dataDetailId});
      if (code == 0) {

        yield put({type:'setRemarkData',payload:{
          data
        }} );
      }
    },

    *getDlcData({ payload: values },{ call, put ,select}) {
      const state = yield select(state => state.addCustomer);

      const  expandData=state.expandData;
      if (expandData.idcardScan){
        const { data: { code, data ,err} } = yield call(addCustomerInformation.getFileURL,{fileKey:expandData.idcardScan});

        if (code == 0) {
          yield put({type:'setLookCardIDDLC',payload:{
            data:data.fileUrlList
          }} );
        }
      }

      if (expandData.contractAppendices) {
        const {data: {code, data, err}} = yield call(addCustomerInformation.getFileURL, {fileKey: expandData.contractAppendices});
        if (code == 0) {

          yield put({
            type: 'setLookContractDLC', payload: {
              data:data.fileUrlList
            }
          });
        }
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/crm/customer/Add') {
          dispatch({
            type: 'getProvinceData',
            payload: {
              dataId:0,
            }
          });
          dispatch({
            type: 'getNationDictionary'
          });
          dispatch({
            type:'getOperator'
          });
          dispatch({
            type: 'getDataDict',
            payload:{
              "id": 1,
            }
          });
          dispatch({
            type: 'getDataDict',
            payload:{
              "id": 2,
            }
          });
          dispatch({
            type: 'getDataDict',
            payload:{
              "id": 3,
            }
          });
          dispatch({
            type: 'getDataDict',
            payload:{
              "id": 4,
            }
          });
          dispatch({
            type: 'getDataDict',
            payload:{
              "id": 5,
            }
          });
          dispatch({
            type: 'getDataDict',
            payload:{
              "id": 6,
            }
          });
          dispatch({
            type: 'getMembershipcardByType',
            payload:{
              "dataId": 1,
            }
          });
          dispatch({
            type: 'getMembershipcardByType',
            payload:{
              "dataId": 2,
            }
          });
          dispatch({
            type: 'getMemberSerial',
          });
          dispatch({
            type: 'getMainCustomerPackageById',
          });
        };
        if (pathname === '/crm/customer/customerDetails'){

          dispatch({
            type: 'getCustomerById',

          });
          dispatch({
            type: 'getCustomerExtendById',

          });
          dispatch({
            type: 'getCustomerRemarkById',
          });
        }
      })
    }
  },
};

