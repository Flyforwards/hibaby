import React from 'react';
import { connect } from 'dva';
import './CustomerIndex.scss'
import { routerRedux } from 'dva/router';
import PermissionLink from 'common/PermissionLink';
import moment from 'moment'
import BigImageModal from './BigImageModal';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'

import {Alert,Table, Modal,Row, Col,Button,Spin} from 'antd';


function ResultsTable(props) {
  console.log(props)

  const {loading,dispatch,orderList,orderPage,orderSize,orderTotal} = props.data;

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
                <PermissionLink testKey='ROOM_DETAIL' className="one-link link-style" onClick={ ()=>{onLook(record)} }> 查看 </PermissionLink>
              </div>
            );
          },
        }
      )
    }
    else if(dict.title === "订单支付状态"){
       return{
         title: '订单支付状态',
         render: (record) => {

           return record ? "已支付" : "未支付"
         }
       }
     }
    else if(dict.title === "创建时间"){
       return{
         title: '创建时间',
         render: (record) => {
           return moment(record).format("YYYY-MM-DD")
         }
       }
     }
    else {

      return(
        {title:dict.title, dataIndex:dict.key, key:dict.key,render:( record)=>{
          return(
            record
          )
        }}
      )
    }
  }

  function onLook(record) {
    dispatch(routerRedux.push({
      pathname: '/crm/customer/order/detail',
      query: {orderid:record.id}
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
    dataSource : orderList,
      pagination: {
        showQuickJumper: true,
        showTotal: orderTotal => `共 ${orderTotal} 条`,
        current: orderPage,
        pageSize:orderSize,
        total: orderTotal,
      },
    columns,
    onChange (page) {
      const query = parse(location.search.substr(1))
      dispatch({type:"order/getOrderList",payload:{customerId:query.dataId,page:page}})
    }
  }

  return(
    <div className="CustomerConent">
      <Table className='customer-table' bordered {...tableProps} />
    </div>
  )
}


class OrderIndex extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log(this.props);
    const query = parse(location.search.substr(1))
    this.props.dispatch({type:"order/getOrderList",payload:{customerId:query.dataId}})
  }

  render(){

    return (
      <div className="customerContent">
            {/*<SearchBar ref="creatRoom" isSearch={true} onSearch={this.onSearch.bind(this)}/>*/}
            <ResultsTable data={this.props}/>
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
