
import React from 'react';
import { routerRedux } from 'dva/router'
import { Button } from 'antd';
import { connect } from 'dva';
import './loginIndex.scss';

import logo from './images/logo.png'

function ClubSelect({dispatch, club}){

  const btnClick = (index) => {
    // console.log(club);
    // console.log(index);
    const selClub = club[index];
    // console.log(selClub);
    dispatch({
      type: 'login/getUserMenu',
      payload: { selClub },
    });
  };

  return (
   <div className = "container">
     <div className = "select">
       <img className = "findimg" src ={logo} />
       {
         club.map(
           (item, index) => {
             console.log(index);
             return (<Button key={ index }  onClick = { btnClick.bind(this, index) }  type = "primary" > {item.name} </Button>)
           }
         )
       }
     </div>
   </div>
      )
}



export default connect()(ClubSelect);
