import React from 'react';
import {connect} from 'dva';
import FindPass from './findPassword.js';

function Find({ dispatch }) {
    return ( < div className = "loginForm find" id="model">
        < FindPass dispatch={dispatch} / >
        < /div>
    )

}

export default connect()(Find);