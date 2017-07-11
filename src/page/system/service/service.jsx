"use strict"
import React, {Component} from 'react'
import {connect} from 'dva'
import './service.scss'
import {Icon, Table, Input,Modal, Button, Form, Row, Col, Popconfirm, message} from 'antd'
import {routerRedux} from 'dva/router';
import {Link} from 'react-router';
import Current from '../../Current';
import AlertModalFrom from 'common/AlertModalFrom'

class serviceIndex extends Component {
    constructor(props) {
        super(props)
        this.state= {
          alertModalVisible: false,
        }
        this.columns = [{
          title: '服务项目名称',
          dataIndex: 'name',
          key:'name',
          width: '24%',
        }, {
          title: '服务项目内容',
          dataIndex: 'contents',
          key: 'contents',
          width: '42%',
        },{
          title: '服务项目价格',
          dataIndex: 'price',
          width: '15%',
          render: ( (record) => {
            return ("￥"+String(record))
          }),
        },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          width: '15%',
          render: (text, record, index) => {
            const detail = !this.props.permissionAlias.contains('SERVICE_ITEM_DETAIL');
            const del = !this.props.permissionAlias.contains('SERVICE_ITEM_DELETE');
            return (
              <div className="operate-list" key={ index }>
                <Link disabled={detail} to={{ pathname: '/system/service-item/detail', query: { id:record.id } }} style={{ width: '50%'}} className="one-link" >查看</Link>
                <Link disabled={del} className="two-link" style={{ width: '50%'}} onClick={ this.delete.bind(this,record )}>删除</Link>
              </div>
            );
          },
        }];
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
        const { list, loading, pagination, dispatch } = this.props;
        const tableProps = {
          loading: loading.effects['service/ServicePage'],
          dataSource : list ,
          pagination,
          onChange (page) {
            const { query, pathname } = location
            dispatch(routerRedux.push({
              pathname,
              query: {
                ...query,
                page: page.current,
                size: page.pageSize,
              },
            }))
          },
        }
        const add = !this.props.permissionAlias.contains('SERVICE_ITEM_ADD');
        return (
           <div className="service-cent">
              <div className="top-button">
                <Link to="/system/service-item/add">
                  <Button className="one-button" style={{ marginBottom: '10px',float: 'right' }} disabled={add} >添加</Button>
                </Link>
              </div>
              <Table  className="service-center" {...tableProps} rowKey = { record=>record.id } bordered dataSource={ list } columns={ this.columns }/>
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


function mapStateToProps(state) {
  const {
    list,
    pagination
  } = state.service;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading,
    list,
    pagination,
    permissionAlias
  };
}

export default connect(mapStateToProps)(serviceIndex);
