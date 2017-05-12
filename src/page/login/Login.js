
import React from 'react';
import {connect} from 'dva';
import LoginIndex from './loginIndex.js';

function Login({ dispatch }) {
    return (
      <div className = "loginForm login" >
         <LoginIndex dispatch={ dispatch } />
      </div>
    )

}

export default connect()(Login);
