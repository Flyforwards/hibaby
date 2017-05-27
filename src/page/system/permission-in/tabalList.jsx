
import React, {Component} from 'react'
import {connect} from 'dva'
import {Modal, Select, Icon, TreeSelect,Table} from 'antd'
import './fromModal.scss'
import {local, session} from 'common/util/storage.js'
import FromCreateModal from './fromCreateModal'
import AlertModalFrom from 'common/AlertModalFrom'
import {routerRedux} from 'dva/router'

class TabalListed extends Component {
  constructor(props) {
        super(props)
        const projectAndModuleTree=session.get("projectAndModuleTree");
        this.record = {};
        this.columns = [{
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          width: '90px',
        },{
          title: '主模块',
          dataIndex: 'projectId',
          width: '90px',
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
        }, {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        }, {
          title: '别名-对应按钮权限',
          dataIndex: 'alias',
          key: 'alias',
        },{
          title: '描述',
          dataIndex: 'description',
          key: 'description',
        },{
          title: '排序',
          dataIndex: 'orderBy',
          key: 'orderBy',
        },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          render: (text, record, index) => {
            return (
                <div>
                  <a className="firstA" onClick={this.delete.bind(this,record)}>删除</a>
                  <a className="firstB" onClick={this.modify.bind(this,record)}>修改</a>
                </div>
            );
          },
        }];
        this.state = {
              createModalVisible: false,
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
            createModalVisible: false,
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
          <div>
          <Table bordered {...tableProps} columns={this.columns} className="fromModal" rowKey ="id"/>
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
