import * as addCustomerInformation from '../services/addCustomerInformation';
import { message } from 'antd'

export default {
  namespace: 'addCustomer',
  state: {
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
    guestInformationSourceAry:[],
    concernsAry:[],
    networkSearchWordsAry:[],
    intentionPackageAry:[],
    remarkListColumns : [{
      title: '备注内容',
      dataIndex: 'remark',
      key: 'name',
      width:'70%',
    }, {
      title: '备注时间',
      dataIndex: 'remarkDate',
      key: 'remarkDate',
      width:'15%',
    }, {
      title: '备注人',
      dataIndex: 'remarkMan',
      key: 'remarkMan',
      width:'15%',
    }]
  },
  reducers: {
    addRemark(state, { payload: todo }){
      const {remarkList} = state;

      const date = new Date();

      const dict = {remark:todo,remarkDate:date.toLocaleString(),remarkMan:'小李子'};

      const tempDict = [...remarkList,dict];

      return {...state,remarkList:tempDict,modal:false};
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
    addHeadIcon(state, { payload: todo }){
      return {...state,headIcon:todo.key,headIconUrl:todo.url};
    },
    addMutDictData(state, { payload: todo }){

      if(todo.id === 2){
        return {...state,guestInformationSourceAry:todo.data};
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
  },
  effects: {
    *getProvinceData({ payload: values }, { call, put }) {
      const { data: { code, data } } = yield call(addCustomerInformation.getCityData, values);
      if (code == 0) {
        yield put({
          type: 'addProvinceData',
          payload: {
            data,
          }
        });
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
      const { data: { code, data } } = yield call(addCustomerInformation.getDataDict,
        {
        "id": value.id,
        "softDelete": 0,
        "type": 2
        });
      if (code == 0) {
        console.log(data)
        yield put({
          type: 'addMutDictData',
          payload: {
            id:value.id,
            data:data,
          }
        });
      }
    },

    *savaBaseInfo({ payload: values },{ call, put }) {

      const dict =  {
        "age": values.age,
        "birthTime": values.birthTime.format(),
        "city": values.city,
        "contact": values.contact,
        "detailed": values.detailed,
        "dueDate": values.dueDate.format(),
        "fetus": values.fetus,
        "focus": 0,
        "gestationalWeeks":values.gestationalWeeks,
        "hospital":0,
        "intentionPackage": 0,
        "name":values.name,
        "operator":values.operator,
        "province": values.province,
        "resourceCustomer":0,
        "webSearchTerm":0
      };

      const { data: { code, data,err } } = yield call(addCustomerInformation.saveCustomer,dict);
      if (code == 0) {

        // yield put({
        //
        // });
      }
      else {
        message(err)
      }
    },


    *savaExtensionInfo({ payload: values },{ call, put ,select}) {
      const state = yield select(state => state.addCustomer);



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

      const dict = {
        "associatedRooms": 0,
        "cityPermanent": 0,
        "contact": values.excontact,
        "contractAppendices": contractStr,
        "contractNumber": values.contractNumber,
        "customerId": 45,
        "customerPhoto": state.headIcon,
        "detailedPermanent": values.detailedPermanent,
        "idcard": values.idcard,
        "idcardScan": caridStr,
        "imgURL": state.headIconUrl,
        "insuranceSituation": values.insuranceSituation,
        "member": 0,
        "memberNumber": "0",
        "nation": values.nation,
        "operator": values.operator,
        "placeOrigin": values.placeOrigin,
        "productionDate": values.productionDate.format(),
        "provincePermanent": values.provincePermanent,
        "purchasePackage": 0,
        "specialIdentity": 0};


      const { data: { code, data ,err} } = yield call(addCustomerInformation.savaExtensionInfo,dict);
      if (code == 0) {

        // yield put({
        //
        // });
      }
      else {
        message(err);


      }
    },

    *savaRemark({ payload: values },{ call, put }) {

      // const inputs =[];
      //
      // for (let i = 0;i<remarkList.length;i++)
      // {
      //   const remark = remarkList[i];
      //   inputs.push({"customerId": 3,"remarkInfo": remark.remark})
      // }

      const { data: { code, data } } = yield call(addCustomerInformation.savaRemark,values);
      if (code == 0) {
        yield put({

        });
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/crm/customer/AddCustomerInfo') {
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
            type: 'getDataDict',
            payload:{
              "id": 2,
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
        }
        ;
      })
    }
  },
};
