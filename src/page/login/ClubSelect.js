
import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import './LoginIndex.scss';

import logo from 'assets/logo2.png'

function ClubSelect({ dispatch, clubs}){
  const btnClick = (index) => {
    const club = clubs[index];
    dispatch({
      type: 'layout/setEndemic',
      payload: { club },
    });
  };

  let buttonNodes =  clubs.map((item, index) => {
    return (<Button key={ index }  onClick = { btnClick.bind(this, index) } > { item.name } </Button>)
  })

  return (
      <div className = "selectForm" >
       <div className = "login-index">
         <div className = "select">
           <img className = "find-img" src ={ logo } />
           <div style={{ maxHeight: '400px', 'overflow': 'hidden','overflowY' : 'auto' }}>
             <div style={{ marginRight: '12px' }}>
               {
                 buttonNodes
               }
             </div>
           </div>
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
