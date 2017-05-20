
export default {
  namespace: 'addCustomer',
  state: {
    remark:[],
    modal:false,
    addCustomerInformation:{
      headUpdate:false
    },
    tempRemark:''
  },
  reducers: {
    headUpdate(state, { payload: todo }) {
      const {addCustomerInformation} = state;
      const tempDict = {...addCustomerInformation,headUpdate:todo}
      return {...state,addCustomerInformation:tempDict};
    },
    addRemark(state, { payload: todo }){
      const {remark} = state;
      const tempDict = [...addCustomerInformation,todo]
      return {...state,remark:tempDict,modal:false};
    },
    hideOrShowModal(state, { payload: todo }){
      return {...state,modal:todo};
    },
  },
  effects: {},
  subscriptions: {},
};
