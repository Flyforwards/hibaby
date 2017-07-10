
import React, {Component} from 'react'
import {connect} from 'dva'
import {Modal, Select, Icon, TreeSelect,Table} from 'antd'
import './fromModal.scss'
import {local, session} from 'common/util/storage.js'
import FromCreateModal from './fromCreateModal'
import AlertModalFrom from 'common/AlertModalFrom'
import {routerRedux} from 'dva/router'
import { Link } from 'react-router';

class TabalListed extends Component {
  constructor(props) {
        super(props)
        const projectAndModuleTree=session.get("projectAndModuleTree");
        this.record = {};
        this.columns = [{
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          width: '6%',
        },{
          title: '主模块',
          dataIndex: 'projectId',
          width: '12%',
          render:(record)=>{
            if (projectAndModuleTree!=null&&projectAndModuleTree.length>0) {
              const instance =projectAndModuleTree.find((value)=>{
                return value.id==record;
              })
              return instance.name||record;
            }
          }
        }, {
          title: '上级权限',
          dataIndex: 'parentName',
          key: 'parentName',
          width: '12%',
        }, {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          width: '12%',
        }, {
          title: '别名-对应按钮权限',
          dataIndex: 'alias',
          key: 'alias',
          width: '18%',
        },{
          title: '描述',
          dataIndex: 'description',
          key: 'description',
          width: '18%',
        },{
          title: '排序',
          dataIndex: 'orderBy',
          key: 'orderBy',
          width: '6%',
        },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          render: (text, record, index) => {
            return (
              <div className="operate-list" key={ index }>
                <Link className="one-link" style={{ width: '50%'}} onClick={this.modify.bind(this,record)}>编辑</Link>
                <Link className="two-link" style={{ width: '50%'}} onClick={this.delete.bind(this,record)}>删除</Link>
              </div>
            );
          },
          width: '16%',
        }];
        this.state = {
            modifyModalVisible: false,
            alertModalVisible:false,
        }
    }

    // 删除弹框
    delete(record){
      this.record = record;
      this.setState({
        alertModalVisible: true,
      })
    }

    handleAlertModalOk(record) {
        this.props.dispatch({
          type: 'myPermission/delpermission',
          payload: {
             id: record.id,
          }
        })
      this.handleCreateModalCancel();
    }

    handleModifyModalCancel() {
        this.setState({
            modifyModalVisible: false,
        })
    }

    handleCreateModalCancel() {
        this.setState({
            alertModalVisible:false
        })
    }

    modify(record){
      this.record = record;
      this.setState({
        modifyModalVisible: true,
      })
    }
    render() {
        const { list, loading, pagination, dispatch,form } = this.props;
        const tableProps = {
          loading: loading.effects['myPermission/listByPage'],
          dataSource : list ,
          pagination,
          onChange (page) {
            form.validateFields((err, values) => {
              let query = {
                page: page.current,
                size: page.pageSize,
              }
              if (!err) {
                query = {...query,...values}
              }
              const { pathname } = location
              dispatch(routerRedux.push({
                pathname,
                query,
              }))
            })

          },
        }
        return (
          <div className="form-center">
          <Table bordered {...tableProps} columns={ this.columns } rowKey ="id"/>
          <FromCreateModal
            handleOk={this.state.handleOk}
            record={this.record}
            visible={ this.state.modifyModalVisible}
            onCancel={ this.handleModifyModalCancel.bind(this) }
          />
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
  } = state.myPermission;
  return {
    loading: state.loading,
    list,
    pagination
  };
}

export default connect(mapStateToProps)(TabalListed)
