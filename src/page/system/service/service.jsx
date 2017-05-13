"use strict"
import React, {Component} from 'react'
import {connect} from 'dva'
import './service.scss'
import {Icon, Table, Input,Modal, Button, Form, Row, Col, Popconfirm, message} from 'antd'
import {classification,dataList,ww} from 'common/constants.js'
import {routerRedux} from 'dva/router';
import {Link} from 'react-router';
import Current from '../../Current';
import AlertModalFrom from 'common/AlertModalFrom'
class serviceData extends Component {
    constructor(props) {
        super(props)
        this.delete=this.delete.bind(this)
        this.state = {

        }
        this.columns = [{
          title: '服务项目名称',
          dataIndex: 'name',
          key:'name',
          width: '300px',
        }, {
          title: '服务项目内容',
          dataIndex: 'contents',
          key:'contents',
          width: '600px',
        },{
          title: '服务项目价格',
          dataIndex: 'price',
          key:'price',
          width: '150px',
        },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          width: '150px',
          render: (text, record, index) => {
          console.log(record)
            return (
                <div>

                  <Link to={{ pathname: '/service/LookService', query: { id:record.id } }}className="firstA" >查看</Link>
                  <a href="#" className="firstB" onClick={this.delete.bind(this,record)}>删除</a>
                </div>
            );
          },
        }];
    }
    componentWillMount() {

    }
    editPermissions(record){
      this.record = record;
      this.setState({
        modifyModalVisible: true,
        add: false,
      })
    }
    managementInquire() {
      console.log("查询")
    }
    Edit(){
      console.log("查看")
    }
    // 删除弹框
    delete(record){
      this.record = record;
      this.setState({
        alertModalVisible: true,
      })
    }
    //确定删除
    handleAlertModalOk(record) {
        this.props.dispatch({
          type: 'service/deleteService',
          payload: {
            dataId: record.id,
            page: this.page,
            pageSize: this.pageSize,
          }
        })
      this.handleCreateModalCancel();
    }
    handleCreateModalCancel() {
        this.setState({
          alertModalVisible: false,
        })
    }
    render() {
        const columns = this.columns;
        const pagination = {
          total: this.props.total, //数据总条数
          showQuickJumper: true,
          pageSize:10,
          onChange: (current) => {
            this.props.dispatch(routerRedux.push({
              pathname: '/system/serviceitem',
              query: {
                "page": current,
                "results": 10,
                "type": 1
              },
            }));
          },
        };
        return (
           <div className="management-cent">
              <div className="name"><Link to="/service/Addservice"><span >添加</span></Link></div>
              <div className="CreateModaList">
                  <Table bordered dataSource={this.props.data} columns={columns} pagination = {pagination}
                  rowKey="Numbering"/>
                  <p className="allList">共计0条,范围1-10</p>
              </div>
              <AlertModalFrom
                visible ={ this.state.alertModalVisible }
                onCancel ={ this.handleCreateModalCancel.bind(this) }
                onOk = { this.handleAlertModalOk.bind(this, this.record) }
                message = { "是否确定删除此服务项?" }
              />
           </div>

        )
    }
}

function service({
  dispatch,
  loading,
  total,
  page,
  results,
  range,
  code
}) {
  return ( < div >
    < serviceData dispatch = {
      dispatch
    }
    loading = {
      loading
    }
    total = {
      total
    }
    page={page}
    results={results}
    range={range}
    /> </div >
  )

}
function mapStateToProps(state) {
  console.log("modelss",state.service)
  const {
    data,
    total,
    page,
    range,
    list,
    code
  } = state.service;

  return {
    loading: state.loading.models.service,
    data,
    total,
    list,
    page,
    range,
    code
  };
}

export default connect(mapStateToProps)(serviceData);
