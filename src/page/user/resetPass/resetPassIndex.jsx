
import React from 'react'
import {connect} from 'dva'
import { } from 'antd'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import moment from 'moment'

class ResetPassIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div >
        修改密码
      </div>
    );
  }
}

function mapStateToProps(state) {


  return {
    loading: state.loading,

  };
}

export default connect()(ResetPassIndex);
