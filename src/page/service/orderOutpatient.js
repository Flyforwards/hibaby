
import React, { Component } from 'react';
import {Card ,Input,Form,Table,Spin,Row,Col} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux,Link } from 'dva/router'

class List extends React.Component{
  render(){
    return(
      <div>
        111
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {...state.outpatient,loading:state.loading}
}

export default connect(mapStateToProps)(List) ;
