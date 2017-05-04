import React from 'react';
import {connect} from 'dva';
import ClubSelect from './clubSelect.js';

function Club({ dispatch, layout }) {

  const { club } = layout

  const componentDidMount = () => {
      handleRequest()
  };

  const handleRequest = () => {
      // const { currntRequest } = this.state
      // const { desc, ...requestParams } = currntRequest
      // this.setState({
      //   ...this.state,
      //   result: <div key="sending">
      //     请求中<br />
      //     url:{currntRequest.url}<br />
      //     method:{currntRequest.method}<br />
      //     params:{currntRequest.data ? JSON.stringify(currntRequest.data) : 'null'}<br />
      //   </div>,
      // })
      // request({ ...requestParams }).then((data) => {
      //   const state = this.state
      //   state.result = [this.state.result, <div key="complete"><div>请求完成</div>{JSON.stringify(data)}</div>]
      //   this.setState(state)
      // })
      // dispatch();
    };

    return ( < div className = "selectForm" >
        < ClubSelect dispatch={dispatch} club={club} / >
        < /div>
    )
}

export default connect(( layout )=>( layout ))(Club);
