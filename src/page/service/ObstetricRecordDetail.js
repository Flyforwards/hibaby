/**
 *  婴儿护理记录单详情
 * Created by yangjingjing on 2017/8/21.
 */
import React, { Component } from 'react';
import {CreatCard,creatButton,detailComponent} from './ServiceComponentCreat'
import {Card ,Input,Form,Table,Spin,Row,Col} from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux,Link } from 'dva/router'


class Detail extends Component {

  constructor(props) {
    super(props);
    this.state={}
  }


  componentWillUnmount() {
    this.props.dispatch({type: 'serviceCustomer/removeData'})
  }

  onEdit(){

  }

  onDelete(){

  }

  render() {
    const {loading,baseInfoDict,summary} = this.props

    const columns = [
      {title:'体温',dataIndex:'temperature',unit:'℃'},
      {title:'心跳',dataIndex:'pulse',unit:'次/分'},
      {title:'呼吸',dataIndex:'breathing',unit:'次/分'},
      {title:'体重',dataIndex:'weight',unit:'g'},
      {title:'身长',dataIndex:'length',unit:'cm'},
      {title:'脐带',dataIndex:'umbilicalCord'},
      {title:'黄疸',dataIndex:'jaundice',unit:'mg/dl'},
      {title:'托管状态',dataIndex:'towState'},
      {title:'托管时长',dataIndex:'towStart'},
      {title:'操作人',dataIndex:'operator'},
      {title:'操作时间',dataIndex:'operatorTime'},
      {
        title: '操作',
        dataIndex: 'operating',
        render: (text, record, index) => {
          return (
            <div className="operation-list">
              <Link className="one-link link-style" onClick={ this.onEdit.bind(this, record)}> 查看 </Link>
              <Link className="two-link link-style" onClick={ this.onDelete.bind(this, record)}> 删除 </Link>
            </div>
          );
        }
      }
    ];

    let tableProps = {
      dataSource: [],
      columns,
    }

    let baseInfoDivAry = detailComponent(baseInfoDict);

    return (
      <Card noHovering={true}  className='bigDetailDiv' style={{width: '100%'}} bodyStyle={{padding: (0, 0, '20px', 0)}}>
        {summary?"":baseInfoDivAry}
        <Table className="CustomerTable" {...tableProps}/>
      </Card>
    )
  }
}

const DetailForm = Form.create()(Detail);


function mapStateToProps(state) {
  return {...state.serviceCustomer,loading:state.loading}
}

export default connect(mapStateToProps)(DetailForm) ;
