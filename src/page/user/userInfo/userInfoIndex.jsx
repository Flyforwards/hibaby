
import React from 'react'
import {connect} from 'dva'
import './userInfoIndex.scss'
import { } from 'antd'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import moment from 'moment'

class UserInfoIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className = "user-cent">
        个人档案
      </div>
    );
  }
}

function mapStateToProps(state) {


  return {
    loading: state.loading,

  };
}

export default connect()(UserInfoIndex);
