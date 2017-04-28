import React from 'react';
import {connect} from 'dva';
import ClubSelect from './clubSelect.js';

function Club({ dispatch }) {
    return ( < div className = "selectForm" >
        < ClubSelect dispatch={dispatch} / >
        < /div>
    )

}

export default connect()(Club);