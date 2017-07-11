/**
 * Created by UI on 2017/5/24.
 */
import * as etcService from '../services/etc';
import {keyToText} from '../utils';
import {session} from 'common/util/storage';

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
       let { name:selectName } = params;
       const {data: {data: selectDataItem}} = yield call(etcService.getRawData, params);
       let {selectData, trigger} = yield select(state => state.etc);
        const endemic = session.get('endemic');
        let {id:endemic_id} = endemic ? endemic : {id: ''};
        endemic_id = endemic_id + '_';
        selectName = endemic_id + selectName;
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
