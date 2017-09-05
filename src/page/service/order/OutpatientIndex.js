/**
 * 门诊
 * Created by LHW on 2017/9/5.
 */
import React, { Component } from 'react';
import {Card} from 'antd';
import { connect } from 'dva';
class OutpatientIndex extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <Card></Card>

    );
  }

}
function mapStateToProps(state) {
  return {...state.outpatient,loading:state.loading}
}
export default connect(mapStateToProps)(OutpatientIndex);
