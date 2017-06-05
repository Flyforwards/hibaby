
import React from 'react'
import {connect} from 'dva'
import { } from 'antd'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'

class WorkPlanIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div >
        工作计划
      </div>
    );
  }
}

function mapStateToProps(state) {


  return {
    loading: state.loading,

  };
}

export default connect()(WorkPlanIndex);
