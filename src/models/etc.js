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
    *getDicData({ payload: params }, { call, put, select }) {
        // console.log('etc:models1>>', selectData);
        const { name:selectName } = params;
        let {selectData} = yield select(state => state.etc)
        const {data: {data: selectDataItem}} = yield call(etcService.getRawData, params);
        console.log('etc:models>>', selectData);
        selectData[selectName] = selectDataItem;
        yield put({
          type: 'putDicData',
          payload: {
            selectData
          }
        })
    }
  },
  subscriptions: {

  }
}
