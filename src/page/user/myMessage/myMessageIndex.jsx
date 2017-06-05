
import React from 'react'
import {connect} from 'dva'
import { } from 'antd'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import moment from 'moment'

class MyMessageIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        我的消息
      </div>
    );
  }
}

function mapStateToProps(state) {


  return {
    loading: state.loading,

  };
}

export default connect()(MyMessageIndex);
