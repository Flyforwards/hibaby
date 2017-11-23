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

  const {loading,dispatch,transactionrecordList,transactionrecordPage,transactionrecordSize,transactionrecordTotal} = props.data;

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


    if(dict.title === "创建时间"){
      return{
        title: dict.title,
        render: (record) => {
          return moment(record).format("YYYY-MM-DD")
        }
      }
    }
    else if(dict.title === "类型"){
      return{
        title: dict.title,
        render: (record) => {
          return record.type == 1 ? "充值" :(record.type == 2 ? "消费": "提现")
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
    // dispatch(routerRedux.push({
    //   pathname: '/chamber/roomindex/roomdetail',
    //   query: {dataId:record.id}
    // }))
  }


  const columnAry = [
    {title: '创建时间', key: 'createTime'},
    {title: '单号', key: 'id'},
    {title: '金额', key: 'amt'},
    {title: '描述', key: 'memo'},
    {title: '类型', key: 'type'},
    {title: '状态', key: 'state'}
  ]

  const  columns = [];

  for(let i = 0;i<columnAry.length;i++){
    columns.push(creatColumn(columnAry[i]))
  }
  const tableProps = {
    loading: loading.effects['roomManagement/listByPage'] !== undefined ? loading.effects['roomManagement/listByPage']:false,
    dataSource : transactionrecordList,
    pagination: {
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: transactionrecordPage,
      pageSize:transactionrecordSize,
      total: transactionrecordTotal,
    },
    columns,
    onChange (page) {
      const query = parse(location.search.substr(1))
      dispatch({type:"order/getTransactionrecordList",payload:{customerId:query.dataId,page:page}})
    }
  }

  return(
    <div className="CustomerConent">
      <Table className='customer-table' bordered {...tableProps} />
    </div>
  )
}


class TransactIndex extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const query = parse(location.search.substr(1))
    this.props.dispatch({type:"order/getTransactionrecordList",payload:{customerId:query.dataId}})
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

export default connect(mapStateToProps)(TransactIndex) ;
