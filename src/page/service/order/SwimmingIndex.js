/**
 * 游泳
 * Created by yangjingjing on 2017/9/5.
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
  return{
    loading:state.loading,
  };
}
export default connect(mapStateToProps)(SwimmingIndex);
