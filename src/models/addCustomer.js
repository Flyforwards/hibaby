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
    NewuserImg:null,
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
    headUpdate(state, { payload: todo }) {
      return {...state,NewuserImg:todo};
    },
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


    *savaBaseInfo({ payload: values },{ call, put }) {

      const { data: { code, data } } = yield call(addCustomerInformation.saveCustomer,{
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
      });
      if (code == 0) {
        yield put({

        });
      }
    },


    *savaExtensionInfo({ payload: values },{ call, put }) {
      const { data: { code, data } } = yield call(addCustomerInformation.savaExtensionInfo,values);
      if (code == 0) {
        yield put({

        });
      }
    },

    *savaRemark({ payload: values },{ call, put }) {
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
        }
        ;
      })
    }
  },
};
