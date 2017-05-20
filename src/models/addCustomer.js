
export default {
  namespace: 'addCustomer',
  state: {
    addCustomerInformation:{
      headUpdate:false
    }
  },
  reducers: {
    headUpdate(state, { payload: todo }) {
      const {addCustomerInformation} = state;
      const tempDict = {...addCustomerInformation,headUpdate:payload}
      return {...state,addCustomerInformation:tempDict};
    },
  },
  effects: {},
  subscriptions: {},
};
