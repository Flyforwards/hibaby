/**
 * Created by UI on 2017/5/24.
 */
import React, {Component} from 'react';
import {Select} from 'antd';
import {connect} from 'dva';
import {session} from 'common/util/storage';
import {DictionaryArray} from './dictionary-map';

const Option = Select.Option;
const endemic = session.get('endemic');
let {id:endemic_id} = endemic ? endemic : {id: ''};
endemic_id = endemic_id + '_';

class DictionarySelect extends Component {
  constructor(props) {
    super(props);

    this.dispatch = this.props.dispatch;
    this.params = this.props.params ? this.props.params : null;
    this.force = this.props.force ? this.props.force : false;                   //是否强制从数据库获取
    this.name = this.props.selectName;
    this.defaultParams = {};
    this.selectData = [];

  }

  componentWillMount() {

    this.defaultParams = DictionaryArray[this.name];
    this.selectData = session.get(endemic_id + this.name);
    //console.log("select>>>>>",this.selectData)
    if (this.params || this.force) {
      this.getData(this.params)
    } else if (this.selectData == null || this.selectData.length == 0) {
      this.getData(this.defaultParams)
    }
  }

  getData(params) {
    this.dispatch({
      type: 'etc/getDicData',
      payload: {...params, name: this.name},
    })
  }

  render() {
    let options = [];

    if ((this.selectData != null && this.selectData.length != 0) && !this.force) {
      options = this.selectData.map((item) => {
        return (<Option value={item.id+""} key={item.id}> {item.name} </Option>)
      });
    } else if(this.props.selectData[this.name] && this.props.selectData[this.name].length > 0) {
       session.set(endemic_id + this.name, this.props.selectData[this.name]);
       options = this.props.selectData[this.name].map((item) => {
        return (<Option value={item.id+""}  key={item.id}> {item.name} </Option>)
      });
    }

    // const {onChange, onSelect, defaultValue, placeholers} = this.props;
    return (
      <Select {...this.props} allowClear={ true }>
        {options}
      </Select>
    )
  }

}

export default connect(({etc:{selectData, trigger}}) => ({ selectData, trigger }))(DictionarySelect);

