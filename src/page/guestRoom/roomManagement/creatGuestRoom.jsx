"use strict"

import React from 'react'
import {connect} from 'dva'
import './roomManagementIndex.scss'
import SearchBar from './SearchBar'
import {Button,Card,Modal} from 'antd'
import { routerRedux, } from 'dva/router';
import { parse } from 'qs'
import PermissionButton from '../../../common/PermissionButton';

const confirm = Modal.confirm;

class creatGuestRoom extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    dataId:parse(location.search.substr(1)).dataId
  }

  componentDidMount(){
    if(this.state.dataId){
      this.props.dispatch({type:'roomManagement/findById'})
    }
  }

  handleSubmit(){
    this.refs.creatRoom.validateFields((err, values) => {
      if (!err) {
        let param = {};
        Object.keys(values).map((key) => {
          const value = values[key];
          if(typeof value === 'object'){
            param[key] = value.key;
          }
          else {
            param[key] = value;
          }
        })


        if(this.state.dataId) {
          param.id = this.state.dataId
          this.props.dispatch({type:'roomManagement/updateRoom',payload:param})
        }
        else {
          this.props.dispatch({type:'roomManagement/addRoom',payload:param})
        }
      }
    })
  }

  backBtnClick(){
    this.props.dispatch(routerRedux.push('/chamber/roomindex'))
  }

  onDelete() {
    const that = this;
    confirm({
      title: '提示',
      content: '是否确定删除此房间',
      onOk() {
        that.props.dispatch({
          type: 'roomManagement/delRoom',
          payload:{dataId:that.state.dataId}
        })
      },
      onCancel() {
      }
    });
  }


  editBtnClick(){
    this.props.dispatch(routerRedux.push({
      pathname:'/chamber/room/creatroom',
      query:{dataId:this.state.dataId}
    }))
  }

  render() {

    const isDetail = location.pathname.indexOf('detail') !== -1;

    let bottomDiv =  <div className='button-group-bottom-common'>
      <Button className='button-group-bottom-1' onClick={this.backBtnClick.bind(this)}>返回</Button>
      {/*<Button className='button-group-bottom-2' onClick={this.handleSubmit.bind(this)}>保存</Button>*/}
      <PermissionButton testKey="ROOM_ADD" className='button-group-bottom-2' onClick={this.handleSubmit.bind(this)}>保存</PermissionButton>

    </div>;

    if(isDetail){
      bottomDiv = <div className='button-group-bottom-common'>
        <Button className='button-group-bottom-1' onClick={this.backBtnClick.bind(this)}>返回</Button>
       {/* <Button className='button-group-bottom-2' onClick={this.onDelete.bind(this)}>删除</Button>
        <Button className='button-group-bottom-3' onClick={this.editBtnClick.bind(this)}>编辑</Button>*/}
        <PermissionButton testKey="ROOM_DELETE" className='button-group-bottom-2' onClick={this.onDelete.bind(this)}>删除</PermissionButton>
        <PermissionButton testKey="ROOM_EDIT" className='button-group-bottom-3' onClick={this.editBtnClick.bind(this)}>编辑</PermissionButton>
      </div>
    }

    return (
      <div className="creatGuestRoom">
        <Card title="建立房间"  style={{ width: '100%' }}>
          <SearchBar ref="creatRoom" isSearch={false} supProps={this.state.dataId?this.props.users:null} isDetail={isDetail}/>
        </Card>
        {bottomDiv}
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












