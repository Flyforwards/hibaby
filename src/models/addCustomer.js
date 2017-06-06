import * as addCustomerInformation from '../services/addCustomerInformation';
import { message } from 'antd'
import { local, session } from 'common/util/storage.js'
import { routerRedux } from 'dva/router';
import moment from 'moment'

export default {
  namespace: 'addCustomer',
  state: {
    dataDetailId:0,
    isDetail:false,

    baseData:'',
    expandData:'',
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
    loading:false,
    headIcon:'',
    headIconUrl:'',

    operator:'',

    editCustomer:false,

    headIconSpin:false,

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
    }]},
  reducers: {

    updataHeadIconSpin(state, { payload: todo }){
      return {...state,headIconSpin:todo};
    },
    pageStatus(state, { payload: todo }){
      return {...state,isDetail:todo.data};
    },
    resetInput(state, { payload: todo }){
      let exdata = state.expandData;
      exdata[todo] = null
      return {...state,expandData:exdata};
    },
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

    editCustomerAct(state, { payload: todo }){
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
      const ary = state.lookCardIDDLC;
      ary.push(todo)
      return {...state,lookCardIDDLC:ary};
    },
    addContractDLC(state, { payload: todo }){
      const ary = state.lookContractDLC;
      ary.push(todo)
      return {...state,lookContractDLC:ary};
    },
    reductionState(state, { payload: todo }){
      return {...state,
        baseData:'',
        expandData:'',
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
        }]};
    },

    setPackageName(state, { payload: todo }){
      const expandData = state.expandData;
      expandData.purchasePackage = todo.data;
      return {...state,expandData:expandData};
    },
    deleteContractDLC(state, { payload: todo }){
      let arr = state.lookContractDLC;
      for(var i=0; i<arr.length; i++) {
        if(arr[i].name == todo.name) {
          arr.splice(i, 1);
          break;
        }
      }
      return {...state,lookContractDLC:arr};
    },
    deleteCardIDDLC(state, { payload: todo }){
      let arr = state.lookCardIDDLC;
      for(var i=0; i<arr.length; i++) {
        if(arr[i].name == todo.name) {
          arr.splice(i, 1);
          break;
        }
      }
      return {...state,lookCardIDDLC:arr};
    },

    setLookCardIDDLC(state, { payload: todo }){
      const ary = state.expandData.idcardScan.split(",");

      let dict = [];
      for (let i = 0 ; i < ary.length ; i++ ){
        const name = ary[i];
        const url = todo.data[i];
        dict.push({name:name,url:url,uid:i});
      }

      return {...state,lookCardIDDLC:dict};
    },

    setLookContractDLC(state, { payload: todo }){
      const ary = state.expandData.contractAppendices.split(",");
      let dict = [];
      for (let i = 0 ; i < ary.length ; i++ ){
        const name = ary[i];
        const url = todo.data[i];
        dict.push({name:name,url:url,uid:i});
      }

      return {...state,lookContractDLC:dict};
    },


    addHeadIcon(state, { payload: todo }){
      return {...state, headIcon:todo.name, headIconUrl:todo.url};
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

      if(todo.abName === 'YCC'){

        return {...state,fetusAry:todo.data};
      }
      else if(todo.abName === 'KZLY'){
        return {...state,guestInformationSourceAry:todo.data};
      }
      else if(todo.abName === 'FMYY'){
        return {...state,hospitalAry:todo.data};
      }
      else if(todo.abName === 'GZD'){
        return {...state,concernsAry:todo.data};
      }
      else if(todo.abName === 'WLSSC'){
        return {...state,networkSearchWordsAry:todo.data};
      }
      else if(todo.abName === 'TCLX'){
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
        abName:value.abName,
        softDelete: 0,
      };


      const { data: { code, data } } = yield call(addCustomerInformation.getDataDict,parameter);
      if (code == 0) {

        yield put({
          type: 'addMutDictData',
          payload: {
            abName:value.abName,
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


    *savaBaseInfo({ payload: values},{ call, put ,select}) {

      const {baseDict,exDict} = values;

      const state = yield select(state => state.addCustomer);

      let dict = {...baseDict,birthTime:baseDict.birthTime.format('YYYY-MM-DD'),dueDate:baseDict.dueDate.format('YYYY-MM-DD'),
        hospital:baseDict.hospital.key, fetus:baseDict.fetus.key, focus:baseDict.focus.key, resourceCustomer:baseDict.resourceCustomer.key,
        intentionPackage:baseDict.intentionPackage.key, webSearchTerm:baseDict.webSearchTerm.key, province:baseDict.province.key, city:baseDict.city.key};

      if (state.editCustomer ){
        dict.id = state.baseData.id;
      }

      const { data: { code, data,err } } = yield call((state.editCustomer ? addCustomerInformation.updateCustomer :addCustomerInformation.saveCustomer ) ,dict);
      if (code == 0) {
        if (exDict){
          yield put({
            type:'savaExtensionInfo',
            payload:{
              ...exDict,id:state.editCustomer ? state.baseData.id : data
            }
          });
        }
        else {
          message.success('信息保存成功');
          yield put(routerRedux.push(`/crm/customer/customerDetails?dataId=${data}`))

        }
      }
    },


    *savaExtensionInfo({ payload: values },{ call, put ,select}) {
      const state = yield select(state => state.addCustomer);
      const remarkList = state.remarkList;


      let caridStr = '';
      let contractStr = '';

      for (let i = 0; i < state.lookCardIDDLC.length;i++){
        const dict = state.lookCardIDDLC[i];
        caridStr += dict.name;
        caridStr += ',';
      }


      for (let i = 0; i < state.lookContractDLC.length;i++){
        const dict = state.lookContractDLC[i];
        contractStr += dict.name;
        contractStr += ',';
      }

      if (caridStr.length > 0){caridStr = caridStr.substr(0,caridStr.length - 1) }
      if (contractStr.length > 0){contractStr = contractStr.substr(0,contractStr.length - 1) }




      const dict = {
        "associatedRooms": values.associatedRooms,
        "cityPermanent": values.cityPermanent.key,
        "contact": values.contact,
        "contractAppendices": contractStr,
        "contractNumber": values.contractNumber,
        "customerId": values.id,
        "customerPhoto": state.headIcon,
        "detailedPermanent": values.detailedPermanent,
        "idcard": values.idcard,
        "idcardScan": caridStr,
        "imgURL": values.imgURL ,
        "insuranceSituation": values.insuranceSituation,
        "member":  (typeof values.member === 'object')  ? values.member.key : '',
        "memberNumber": values.memberNumber,
        "nation": values.nation.key,
        "operator": state.operator,
        "placeOrigin": values.placeOrigin,
        "productionDate": values.productionDate.format('YYYY-MM-DD'),
        "provincePermanent": values.provincePermanent.key,
        "purchasePackage": values.purchasePackage ? values.purchasePackage :  '',
        "specialIdentity": (typeof values.specialIdentity === 'object')  ? values.specialIdentity.key : ''
      };

      if (state.editCustomer ){
        dict.id = state.expandData.id;
      }

      const { data: { code, data ,err} } = yield call( (state.editCustomer ? addCustomerInformation.updateCustomerExtend:addCustomerInformation.savaExtensionInfo),dict);
      if (code == 0) {
        if (remarkList.length > 0) {
          yield put({
            type: 'savaRemark',
            payload: {
              id: values.id
            }
          });
        }
        else {
          message.success('信息保存成功');
          yield put(routerRedux.push(`/crm/customer/customerDetails?dataId=${values.id}`))

        }
      }

    },

    *savaRemark({ payload: values },{ call, put ,select}) {
      const state = yield select(state => state.addCustomer);

      const remarkList = state.remarkList;

      const inputs =[];

      for (let i = 0;i<remarkList.length;i++)
      {
        const remark = remarkList[i];
        if (!remark.id){
          inputs.push({"customerId": values.id,"remarkInfo": remark.remarkInfo})
        }
      }
      if(inputs.length > 0){
        const { data: { code, data ,err} } = yield call(addCustomerInformation.savaRemark,{inputs:inputs});
        if (code == 0) {
          message.success('信息保存成功');
          yield put(routerRedux.push(`/crm/customer/customerDetails?dataId=${values.id}`))
        }
      }
      else {
        message.success('信息保存成功');
        yield put(routerRedux.push(`/crm/customer/customerDetails?dataId=${values.id}`))
      }
    },
    *getCustomerById({ payload: values },{ call, put ,select}) {

      const state = yield select(state => state.addCustomer);

      const dataDetailId = state.dataDetailId;

      const { data: { code, data ,err} } = yield call(addCustomerInformation.getCustomerById,{dataId:dataDetailId});


      if (code == 0) {
        yield put({type:'setBaseData',payload:{data}} );

        yield put({type: 'getCityData',payload:{isHouseholdRegistration:false,dataId:data.province}});
      }
    },

    *getCustomerExtendById({ payload: values },{ call, put ,select}) {
      const state = yield select(state => state.addCustomer);

      const dataDetailId = state.dataDetailId;

      const { data: { code, data ,err} } = yield call(addCustomerInformation.getCustomerExtendById,{dataId:dataDetailId});
      if (code == 0) {
        if (data){
          yield put({type: 'getCityData',payload:{isHouseholdRegistration:true,dataId:data.provincePermanent}});
          yield put({type:'setExpandData',payload:{ data }} );
          yield put({type:'addHeadIcon',payload:{ name:data.customerPhoto ,url: data.imgURL}})
          yield put({type:'getDlcData'} );
          if(data.purchasePackage){

            yield put({type:'getCustomerPackageById',payload:{
              dataId:dataDetailId
            }} );
          }

        }
      }
    },

    *getCustomerRemarkById({ payload: values },{ call, put ,select}) {
      const state = yield select(state => state.addCustomer);

      const dataDetailId =state.dataDetailId;

      const { data: { code, data ,err} } = yield call(addCustomerInformation.getCustomerRemarkById,{dataId:dataDetailId});
      if (code == 0) {
        if (data){

          const tempData = [];
          for (let i = 0;i<data.length;i++){
            let dict = data[i];
            dict.createTime =  moment(dict.createTime ).format('YYYY-MM-DD')
            tempData.push(dict)
          }

          yield put({type:'setRemarkData',payload:{
            data:tempData
          }} );
        }
      }
    },

    *getCustomerPackageById({ payload: values },{ call, put ,select}) {

      const { data: { code, data ,err} } = yield call(addCustomerInformation.getCustomerPackageById,values);

      if (code == 0) {
        if (data){
          yield put({type:'setPackageName',payload:{
            data:data.packageName
          }} );

        }
      }
    },

    *getDlcData({ payload: values },{ call, put ,select}) {
      const state = yield select(state => state.addCustomer);

      const  expandData=state.expandData;
      if (expandData){
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
      }

    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname,query }) => {
        if (pathname === '/crm/customer/AddCustomerInformation') {
          isDetail(dispatch)
          defDis(dispatch)
        };

        if (pathname === '/crm/customer/customerDetails'){
          defDis(dispatch)
          if(query.dataId){
            dispatch({
              type: 'setDataDetailId',
              payload:{dataId:query.dataId}
            })
          }


          dispatch({
            type: 'pageStatus',
            payload:{data:true}
          });

        }
      })
    }
  },
};

function isDetail(dispatch) {
  dispatch({
    type: 'pageStatus',
    payload:{data:false}
  });
}

function defDis(dispatch) {
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
      "abName": 'YCC',
    }
  });
  dispatch({
    type: 'getDataDict',
    payload:{
      "abName": 'KZLY',
    }
  });
  dispatch({
    type: 'getDataDict',
    payload:{
      "abName": 'FMYY',
    }
  });
  dispatch({
    type: 'getDataDict',
    payload:{
      "abName": 'GZD',
    }
  });
  dispatch({
    type: 'getDataDict',
    payload:{
      "abName": 'WLSSC',
    }
  });
  dispatch({
    type: 'getDataDict',
    payload:{
      "abName": 'TCLX',
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
}
