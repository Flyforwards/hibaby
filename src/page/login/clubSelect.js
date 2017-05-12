
import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import './loginIndex.scss';

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
     <div className = "container">
       <div className = "select">
         <img className = "findimg" src ={ logo } />
         {
           buttonNodes
         }
       </div>
     </div>
  )
}



export default connect()(ClubSelect);
