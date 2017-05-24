/**
 * Created by UI on 2017/5/24.
 */
import React, {Component} from 'react';
import {Select} from 'antd';
import {connect} from 'dva';
import {session} from 'common/util/storage';
import {DictionaryArray} from './dictionary-map';

const Option = Select.Option;

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
    this.selectData = session.get(this.name);

    if (this.params || this.force) {
      this.getData(this.params)
    } else if (this.selectData == null || this.selectData.length == 0) {
      this.getData(this.defaultParams)
    }
  }

  getData(params) {
    this.dispatch({
      type: 'etc/getDicData',
      payload: params,
    })
  }

  render() {
    let options = [];

    if ((this.selectData != null && this.selectData.length != 0) && !this.force) {
      options = this.selectData.map((item) => {
        return (<Option key={item.id}> {item.name} </Option>)
      });
    } else if(this.props.selectData.length > 0) {
       session.set(this.name, this.props.selectData);
       options = this.props.selectData.map((item) => {
        return (<Option key={item.id}> {item.name} </Option>)
      });
    }

    // const {onChange, onSelect, defaultValue, placeholers} = this.props;
    return (
      <Select {...this.props}>
        {options}
      </Select>
    )
  }

}

export default connect(({etc:{selectData}}) => ({ selectData }))(DictionarySelect);

