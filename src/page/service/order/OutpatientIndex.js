/**
 * 门诊
 * Created by LHW on 2017/9/5.
 */
import React, { Component } from 'react';
import {Card} from 'antd';
import { connect } from 'dva';
class SwimmingIndex extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <Card>1111111111111</Card>
        <Card>222222222222</Card>
        <Card>333333333333</Card>
      </div>
    );
  }

}
function mapStateToProps(state) {
  return {...state.outpatient,loading:state.loading}
}
export default connect(mapStateToProps)(SwimmingIndex);
