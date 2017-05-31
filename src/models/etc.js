/**
 * Created by UI on 2017/5/24.
 */
import * as etcService from '../services/etc';
import {keyToText} from '../utils'

export default {
  namespace: 'etc',
  state: {
    selectData:{},
    trigger: false,
  },
  reducers: {
    putDicData(state, {payload : {selectData, trigger}}) {
      return {...state, selectData, trigger};
    }
  },
  effects: {
    *getDicData({ payload: params }, { call, put, select }) {
        // console.log('etc:models1>>', selectData);
       const { name:selectName } = params;
       const {data: {data: selectDataItem}} = yield call(etcService.getRawData, params);
       let {selectData, trigger} = yield select(state => state.etc)
      //  console.log('etc:models>>', selectData);
       keyToText(selectDataItem, 'id', 'name', selectName);
        selectData[selectName] = selectDataItem;
        yield put({
          type: 'putDicData',
          payload: {
            selectData,
            trigger: !trigger
          }
        })
    }
  },
  subscriptions: {

  }
}
