import React from 'react';
import './customerInformation.scss';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment'
import BigImageModal from './BigImageModal';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'

import {Alert,Table, Modal,Row, Col,Button,Spin} from 'antd';


function ResultsTable(props) {
  const {loading,dispatch} = props.data;
  const {listData,FloorAry,MainFloorAry,AreaAry,TowardAry,pagination} = props.data.users;

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

     if(dict.title === '操作'){
      return(
        {title: '操作',width:'15%', dataIndex: 'operating',
          render: (text, record, index) => {
            return (
              <div>
                <PermissionLink testKey='ROOM_DETAIL' className="firstA" onClick={ ()=>{onLook(record)} }> 查看 </PermissionLink>
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
            record
          )
        }}
      )
    }
  }

  function onLook(record) {
    dispatch(routerRedux.push({
      pathname: '/chamber/roomindex/roomdetail',
      query: {dataId:record.id}
    }))
  }


  const columnAry = [
    {title: '订单号', key: 'id'},
    {title: '创建时间', key: 'createTime'},
    {title: '总价', key: 'totalPrice'},
    {title: '订单支付状态', key: 'paymentState'},
    {title: '订单支付方式', key: 'paymentType'},
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
    onChange (page) {
      const { pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          page: page.current,
          size: page.pageSize
        }
      }))
    }
  }

  return(
    <div className="tableDiv">
      <Table bordered {...tableProps} />
    </div>
  )
}


class OrderIndex extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const query = parse(location.search.substr(1))
    this.props.dispatch({name:"order/getOrderList",payload:{customerId:query.dataId}})
  }

  render(){

    return (
      <div className="customerContent">
          <main className="yt-admin-framework-Customer">
            {/*<SearchBar ref="creatRoom" isSearch={true} onSearch={this.onSearch.bind(this)}/>*/}
            {/*<ResultsTable data={this.props}/>*/}
          </main>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    ...state.order,
    loading:state.loading,
  };
}

export default connect(mapStateToProps)(OrderIndex) ;
