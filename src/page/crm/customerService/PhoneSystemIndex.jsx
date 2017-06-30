
import React from 'react'
import { connect } from 'dva'
import './PhoneSystemIndex.scss'
import { Table,Input,Icon,Button,Popconfirm, Modal, DatePicker, Card,Timeline } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import {local, session} from 'common/util/storage.js';
import { VISIT_TIME } from 'common/constants.js'
import PermissionButton from 'common/PermissionButton';

class CustomerVisIndex extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: '10%'
    },{
      title: '客服名称',
      dataIndex: 'userName',
      key: 'userName',
      width: '10%'
    }, {
      title: '热线号码',
      dataIndex: 'hotLine',
      key: 'hotLine',
      width: '10%'
    }, {
      title: '座席号',
      dataIndex: 'cno',
      key: 'cno',
      width: '10%'
    },{
      title: '密码',
      dataIndex: 'pwd',
      key: 'pwd',
      width: '10%'
    },{
      title: '绑定电话',
      dataIndex: 'bindTel',
      key: 'bindTel',
      width: '15%'
    },{
      title: '电话类型',
      dataIndex: 'bindType',
      width: '10%',
      render: (record) => {
        switch (record) {
          case 1:
            return '电话号码';
            break;
          case 2:
            return '分级号码';
            break;
          case 3:
            return '软电话';
            break;
        }
      },
    },{
      title: '初始状态',
      dataIndex: 'initStatus',
      width: '10%',
      render: (record) => {
        switch (record) {
          case 'online':
            return '空闲';
            break;
          case 'pause':
            return '置忙';
            break;
        }
      },
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: '15%',
      render: (text, record, index) => {
        return (<div key={ index }>
          <Link to={{ pathname: '/crm/phone-system/edit', query:{ dataId:record.id }  }}> 编辑 </Link>
          <Link onClick={ this.del.bind(this, record) }> 删除 </Link>
        </div>)
      }
    }];
  }

  del(record){
    this.props.dispatch({
      type: 'phoneSystem/phoneSystemDelete',
      payload: { dataId: record.id }
    })
  }

  render() {
    const { list, loading, pagination, dispatch } = this.props;

    const tableProps = {
      loading: loading.effects['phoneSystem/listByPage'],
      dataSource : list ,
      pagination,
      onChange (page) {
        const { pathname } = location
        dispatch(routerRedux.push({
          pathname,
          query: {
            page: page.current,
            size: page.pageSize,
          },
        }))
      },
    }
    return (
      <div className = "customer-phone-system-cent">
        <div className = "button-wrapper">
          <Link to = '/crm/phone-system/add'>
            <PermissionButton testKey='ACTIVITY_ADD' className="button-add"> 添加 </PermissionButton>
          </Link>
        </div>
        <Table {...tableProps}  bordered  columns = { this.columns } rowKey={record => record.userId}/>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const {
    list,
    pagination,
  } = state.phoneSystem;
  return {
    loading: state.loading,
    pagination,
    list,
  };
}

export default connect(mapStateToProps)(CustomerVisIndex);
