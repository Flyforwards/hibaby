
import React from 'react';
import { routerRedux } from 'dva/router'
import { Button } from 'antd';
import { connect } from 'dva';
import './loginIndex.scss';

import logo from './images/logo.png'

function ClubSelect({dispatch, club}){

  const btnClick = (index) => {
    const selClub = club[index];
    // dispatch({
    //   type: 'login/getCurrUserMenu',
    //   payload: { selClub },
    // });
    dispatch({
      type: 'layout/setEndemic',
      payload: { selClub },
    });
  };
  let buttonNodes = {};
  if (club != null) {
     buttonNodes =  club.map((item, index) => {
      return (<Button key={ index }  onClick = { btnClick.bind(this, index) }  type = "primary" > {item.name} </Button>)
    })
  }
  return (
   <div className = "container">
     <div className = "select">
       <img className = "findimg" src ={logo} />
       {
         buttonNodes
       }
     </div>
   </div>
      )
}



export default connect()(ClubSelect);
