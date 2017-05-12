
import React from 'react';
import {connect} from 'dva';
import ClubSelect from './clubSelect.js';

function loginClub({ dispatch, layout }) {

  const { clubs } = layout;
  return (
    <div className = "selectForm" >
      <ClubSelect dispatch={dispatch} clubs= { clubs } />
    </div>
  )
}

export default connect(( layout )=>( layout ))(loginClub);
