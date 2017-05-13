"use strict"

import React from 'react'
import {connect} from 'dva'
import {Table,Input,Icon,Button,Popconfirm,Pagination,Form,Radio,DatePicker,Select} from 'antd'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import './addUser.scss'
import {local, session} from '../../../common/util/storage.js'
import DropDownMenued from './dropDownMenu.jsx'



class UpImged extends React.Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount(){
      this.props.dispatch({
        type: 'organization/getDeptListByEndemicId',
        payload: {
          dataId: endemic.id
        }
      })
  }
    render() {  
     
      return(
        <div className="addUser">
         
        </div>
      )
  }
}

function UpImg({
    dispatch
}) {
  return ( <div>
    <UpImged dispatch = {
      dispatch
    }
    /> </div>
  )
}
function mapStateToProps(state) {
  const {
    
  } = state.organization;

  return {
    loading: state.loading.models.organization
  };
}

export default connect(mapStateToProps)(UpImg)
