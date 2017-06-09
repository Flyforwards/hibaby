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
          width: '300px',
        }, {
          title: '服务项目内容',
          dataIndex: 'contents',
          key: 'contents',
          width: '600px',
        },{
          title: '服务项目价格',
          dataIndex: 'price',
          width: '150px',
          render: ( (record) => {
            return ("￥"+String(record))
          }),
        },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          width: '150px',
          render: (text, record, index) => {
            const detail = !this.props.permissionAlias.contains('SERVICE_ITEM_DETAIL');
            const del = !this.props.permissionAlias.contains('SERVICE_ITEM_DELETE');
            return (
                <div className="OperateList" key={ index }>
                  <Link disabled={detail} to={{ pathname: '/system/service-item/detail', query: { id:record.id } }} className="firstA" >查看</Link>
                  <Link disabled={del} className="firstB" onClick={ this.delete.bind(this,record )}>删除</Link>
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
           <div className="ServiceBox">
              <div className="name">
                <Link to="/system/service-item/add">
                  <Button className="addBtn" disabled={add} >添加</Button>
                </Link>
              </div>
              <div className="CreateModaList">
                  <Table {...tableProps} rowKey = { record=>record.id } bordered dataSource={ list } columns={ this.columns }/>
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
