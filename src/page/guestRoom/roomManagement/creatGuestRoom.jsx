"use strict"

import React from 'react'
import {connect} from 'dva'
import './roomManagementIndex.scss'
import SearchBar from './SearchBar'
import {Button,Card} from 'antd'
import { routerRedux } from 'dva/router';

class creatGuestRoom extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){

  }

  handleSubmit(){
    this.refs.creatRoom.validateFields((err, values) => {

    });
  }

  backBtnClick(){
    this.props.dispatch(routerRedux.push('/chamber/roomindex'))
  }

  render() {
    return (
      <div className="creatGuestRoom">
        <Card title="建立房间"  style={{ width: '100%' }}>
          <SearchBar ref="creatRoom" isSearch={false}/>
        </Card>
        <div className='saveDiv'>
          <Button className='backBtn SaveBtn' onClick={this.handleSubmit.bind(this)}>保存</Button>
          <Button className='backBtn' onClick={this.backBtnClick.bind(this)}>返回</Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.roomManagement,
  };
}

export default connect(mapStateToProps)(creatGuestRoom) ;
