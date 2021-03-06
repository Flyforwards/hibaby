import React from 'react';
import { connect } from 'dva';
import './management.scss';
import { Table, Input, Icon, Button, Popconfirm, Pagination } from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import moment from 'moment';

class GroupCharIndex extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [{
      title: '别名',
      dataIndex: 'abName',
      key: 'abName',
      width: '15%'
    }, {
      title: '字段名称',
      dataIndex: 'name',
      key: 'name',
      width: '15%'
    }, {
      title: '字段描述',
      dataIndex: 'description',
      key: 'description',
      width: '25%'
    }, {
      title: '最后编辑人',
      dataIndex: 'operatorName',
      key: 'operatorName',
      width: '100px',
      width: '15%'
    }, {
      title: '最后编辑时间',
      dataIndex: 'operatorTime',
      width: '200px',
      width: '20%',
      render: (record) => {
        return moment(record).format("YYYY-MM-DD HH:mm:ss")
      },
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        const detail = !this.props.permissionAlias.contains('GROUP_CHAR_DETAIL');
        return (
          <Link disabled={detail} className="one-link" to={`/system/group-char/detail?dataId=${record.id}` }> 查看 </Link>)
      },
      width: '10%'
    }];
  }

  render() {
    const { list, loading, pagination, dispatch } = this.props;
    const tableProps = {
      loading: loading.effects['save/groupChar'],
      dataSource: list,
      pagination,
      onChange (page) {
        const { pathname } = location
        dispatch(routerRedux.push({
          pathname,
          query: {
            page: page.current,
            size: page.pageSize,
            type: 1
          }
        }))
      }
    }

    const add = !this.props.permissionAlias.contains('GROUP_CHAR_ADD');
    return (
      <div className="management-cent">
        <div className="top-button">
          <Link to='/system/group-char/add'>
            <Button disabled={add}  className="one-button" style={{ marginBottom: '10px',float: 'right' }}> 添加 </Button>
          </Link >
        </div>
        <Table className='management-center' {...tableProps} bordered columns={ this.columns } rowKey={record => record.id}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    list,
    pagination
  } = state.save;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading,
    list,
    pagination,
    permissionAlias
  };
}

export default connect(mapStateToProps)(GroupCharIndex);
