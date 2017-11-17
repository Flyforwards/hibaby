import React from 'react';
import './customerInformation.scss';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment'
import BigImageModal from './BigImageModal';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'

import {Alert,Table, Modal,Row, Col,Button,Spin} from 'antd';


class FingerSubsidiaryIndex extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount(){

  }

  render(){

    return (
      <div className="customerContent">
        收支记录列表
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    ...state.order,
    loading:state.loading,
  };
}

export default connect(mapStateToProps)(FingerSubsidiaryIndex) ;
