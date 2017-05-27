/**
 * Created by UI on 2017/5/24.
 */
import * as etcService from '../services/etc';

export default {
  namespace: 'etc',
  state: {
    selectData:{}
  },
  reducers: {
    putDicData(state, {payload : {selectData}}) {
      return {...state, selectData};
    }
  },
  effects: {
    *getDicData({ payload: params }, { call, put }) {
        // console.log('etc:models1>>', selectData);
        const { name:selectName } = params;
        let selectDataGroup = {};
        const {data: {data: selectDataItem}} = yield call(etcService.getRawData, params);
        // console.log('etc:models>>', selectData);
        selectDataGroup[selectName] = selectDataItem;
        yield put({
          type: 'putDicData',
          payload: {
            selectData: selectDataGroup
          }
        })
    }
  },
  subscriptions: {

  }
}
