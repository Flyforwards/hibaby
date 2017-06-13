"use strict"

import React from 'react'
import {connect} from 'dva'
import './roomManagementIndex.scss'
import {Link,routerRedux} from 'react-router'
import SearchBar from './SearchBar'
import {Table,pagination,Modal} from 'antd'
const confirm = Modal.confirm;


function ResultsTable(props) {
  const {loading,dispatch} = props.data;
  const {listData,FloorAry,MainFloorAry,AreaAry,TowardAry} = props.data.users;

  function textforkey(array,value,valuekey = 'name') {
    if(array){
      for (let i = 0 ;i<array.length ;i++){
        let dict = array[i];
        if(dict['id'] === value){
          return  dict[valuekey];
        }
      }
    }
    else {
      return value
    }
  }

  function creatColumn(dict) {
      if(dict.title === '房间号'){
        return(
          {title:dict.title, dataIndex:dict.key, key:dict.key, width:dict.width?dict.width:'13%'}
        )
      }
      else if(dict.title === '操作'){
        return(
          {title: '操作',width:'15%', dataIndex: 'operating',
            render: (text, record, index) => {
              return (
                <div>
                  <Link className="firstA" onClick={ ()=>{onLook(record)}}  > 查看 </Link>
                  <Link className="firstB" onClick={ ()=>{onDelete(record)}}> 删除 </Link>
                </div>
              );
            },
          }
        )
      }
      else {
        return(
          {title:dict.title, dataIndex:dict.key, key:dict.key, width:dict.width?dict.width:'13%',render:( record)=>{
            return(
                textforkey(dict.dataArray,record)
            )
          }}
        )
      }
  }

  function onLook(record) {
    dispatch(routerRedux.push({
      pathname: '/chamber/roomdetail',
      query: {dataId:record.id}
    }))
  }

  function onDelete(record) {
      confirm({
        title: '提示',
        content: '是否确定删除此房间',
        onOk() {
          dispatch({
            type: 'roomManagement/delRoom',
            payload:{dataId:record.id}
          })
        },
        onCancel() {
        }
      });
  }

  const columnAry = [
      {title: '房间号', key: 'roomNo'},
      {title: '主副楼', key: 'building', dataArray:MainFloorAry},
      {title: '楼层', key: 'floor',dataArray:FloorAry },
      {title: '区域', key: 'region',dataArray:AreaAry},
      {title: '朝向', key: 'orientation',dataArray:TowardAry},
      {title: '套餐', key: 'name', width:'20%'},
      {title: '操作'}
  ]

  const  columns = [];

  for(let i = 0;i<columnAry.length;i++){
    columns.push(creatColumn(columnAry[i]))
  }

  const tableProps = {
    loading: loading.effects['roomManagement/listByPage'] !== undefined ? loading.effects['roomManagement/listByPage']:false,
    dataSource : listData,
    pagination,
    columns,
  }

  return(
    <div className="tableDiv">
      <Table bordered {...tableProps} />
    </div>
  )
}


class roomManagementIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  onSearch(){
    this.refs.creatRoom.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(routerRedux.push({
          pathname: '/chamber/roomindex',
          query: values
        }))
      }
    })
  }

  render() {
    return (
        <div className='roomManagementDiv'>
          <main className="yt-admin-framework-Customer">
            <SearchBar ref="creatRoom" isSearch={true} onSearch={()=>{this.onSearch}}/>
            <ResultsTable data={this.props}/>
          </main>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    users: state.roomManagement,
  };
}

export default connect(mapStateToProps)(roomManagementIndex) ;
