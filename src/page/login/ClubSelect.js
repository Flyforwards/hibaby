
import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import './LoginIndex.scss';

import logo from './images/logo.png'

function ClubSelect({ dispatch, clubs}){
  const btnClick = (index) => {
    const selClub = clubs[index];
    dispatch({
      type: 'layout/setEndemic',
      payload: { selClub },
    });
  };

  let buttonNodes =  clubs.map((item, index) => {
    return (<Button key={ index }  onClick = { btnClick.bind(this, index) }  type = "primary" > { item.name } </Button>)
  })

  return (
      <div className = "selectForm" >
       <div className = "login-index">
         <div className = "select">
           <img className = "find-img" src ={ logo } />
           {
             buttonNodes
           }
         </div>
       </div>
      </div>
  )
}

function mapStateToProps(state) {
  const {
    clubs,
  } = state.layout;
  return {
    loading: state.loading,
    clubs
  };
}



export default connect(mapStateToProps)(ClubSelect);
