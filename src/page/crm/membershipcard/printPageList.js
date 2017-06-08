/**
 * Created by Flyforwars on 2017/6/5.
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import {Card,DatePicker,Table } from 'antd';
import { Link } from 'react-router';
import './index.scss';
import './printPage.css';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';
import { format } from '../../../utils/index.js';
//import './print.css';

class MemberShipCard extends Component {
  constructor(props) {
    super(props);
    this.state={
        time:'',
    }
    this.columns = [{
      title: '时间',
      dataIndex: 'renewTime',
      key: 'renewTime'
    }, {
      title: '服务项目名称',
      dataIndex: 'renewAmount',
      key: 'renewAmount'
    }, {
      title: '服务项目数量',
      dataIndex: 'renewAmount',
      key: 'leverlChange'
    },{
      title: '金额',
      dataIndex: 'operatorName',
      key: 'operatorName',
    }, ];
    this.dataSource = [{
      key: '1',
      renewTime: '胡彦斌',
      renewAmount: 32,
      renewAmount: '西湖区湖底公园1号'
    }, {
      key: '2',
      renewTime: '胡彦斌',
      renewAmount: 32,
      renewAmount: '西湖区湖底公园1号'
    }];
  }

  tdList(printList){
    let childrenList = [];
    printList ? printList.map(function(elem,index){
      if(elem.type == 1) {
        //扣费
        childrenList.push(
          <tr style={{textAlign:'center',height:40,fontSize:'14px',lineHeight:'40px',color:'#333333',}}>
            <td style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}>{new Date(elem.time).format('yyyy-MM-dd HH:mm:ss')}</td>
            <td style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}>{elem.commodity_name}</td>
            <td style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}>{elem.commodity_quantity}</td>
            <td style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}>￥{elem.amount}</td>
          </tr>
        )
      }else if(elem.type == 2) {
        //续费
        childrenList.push(
          <tr style={{textAlign:'center',height:40,fontSize:'14px',lineHeight:'40px',color:'#ffffff',backgroundColor:'#666666'}}>
            <td colSpan="4" style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}> {new Date(elem.time).format('yyyy-MM-dd HH:mm:ss')}  续费  ￥{elem.amount} {elem.level_change }</td>
          </tr>
        )
      }else if(elem.type == 3) {
        //退费
        childrenList.push(
          <tr style={{textAlign:'center',height:40,fontSize:'14px',lineHeight:'40px',color:'#ffffff',backgroundColor:'#666666'}}>
            <td colSpan="4" style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}> {new Date(elem.time).format('yyyy-MM-dd HH:mm:ss')}  退费  ￥{elem.amount} {elem.level_change }</td>
          </tr>
        )
      }
    }):'';

    return childrenList;
  }

 tableList(printList) {
   let list='';
   return (<table width='98%'  rules='all' className='table_d'  height='auto' cellSpacing='1' cellPadding='0'  style={{margin:'10px auto 10px',borderCollapse:'collapse',border:'1px solid #e9e9e9'}}>
       <thead style={{height:40,backgroundColor:'#666666',fontSize:'14px',lineHeight:'40px',color:'#ffffff',}}>
         <tr style={{textAlign:'center',}}>
           <td style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}>时间</td>
           <td style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}>服务项目名称</td>
           <td style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}>服务项目数量</td>
           <td style={{ borderLeft: '1px solid #e9e9e9', borderTop: '1px solid #e9e9e9',}}>金额</td>
         </tr>
       </thead>
      <tbody>
      {this.tdList(printList)}
      </tbody>
      </table>
   )
 }



  render() {
    const { loading, printBaseMsg, systemTime,times ,printList} = this.props;
    const danTime = printBaseMsg ? new Date(printBaseMsg.billTime).format('yyyy-MM-dd HH:mm:ss') : '';

    return (
      <div className="print_all" style={{ width: '100%',margin:'0px auto 0px',border:'1px solid #e5e5e5',background: '#FFFFFF',fontFamily: '微软雅黑 Bold',marginTop: '10px', borderTopLeftRadius: '5px', borderTopRightRadius: '5px',}}>
        <div className="print_w100" style={{ width:'100%', padding:'16px', overflow: 'hidden', border:'none', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', backgroundColor:'rgba(102, 102, 102, 1)', color: '#FFFFFF', margin:'0px auto 0px'}}>
          <p className="print_w_ll_50" style={{ width:'50%', float: 'left', textAlign: 'left', fontSize: '28px', fontWeight: 700,}}>{times}账单</p>
          <p className="print_w_rr_50" style={{ width: '32%', float: 'right', textAlign: 'right', fontSize: '14px'}}>出单时间:<span>{ danTime }</span></p>
        </div>
        <div className="print_normal" style={{width:'100%', padding:'16px', overflow: 'hidden', backgroundColor:'rgba(102, 102, 102, 1)', color: '#FFFFFF'}}>
          <p className="print_w_ll_30" style={{width:'30%', float: 'left', textAlign: 'left', fontSize: '14px',}}>客户姓名:<span>{ printBaseMsg ? printBaseMsg.name:'' }</span></p>
          <p className="print_w_lc_30" style={{width:'30%', float: 'left', textAlign: 'center', fontSize: '14px',}}>房间号码:<span>{ printBaseMsg ? printBaseMsg.roomNumber:'' }</span></p>
          <p className="print_w_rr_30" style={{width:'30%', float: 'right', textAlign: 'right', fontSize: '14px',}}>合计金额:<span>{ printBaseMsg ? printBaseMsg.amount:'' }</span></p>
        </div>
        { this.tableList(printList) }
        {/*<Table class="cardTable" style={{width:'98%',margin:'10px auto 0px'}} columns={this.columns} pagination={false} bordered rowKey="id" dataSource={ this.dataSource}/>*/}

      </div>


    )
  }
}


function mapStateToProps(state) {
  const { printBaseMsg,systemTime,times,printList } = state.membershipcard;
  return {
    loading: state.loading.models.membershipcard,
    printBaseMsg,
    systemTime,
    times,
    printList,
    user:state.addCustomer,
    cards:state.membershipcard,
  };
}
export default connect(mapStateToProps)(MemberShipCard)

