
import moment from 'moment'
import React from 'react';
import {connect} from 'dva';
import './place.scss';
import { Table,Input,Icon,Button,Popconfirm,Pagination } from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import Current from '../../Current'

class localCharIndex extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
        title: '别名',
        dataIndex: 'abName',
        key: 'abName'
      },{
        title: '字段名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '字段描述',
        dataIndex: 'description',
        key: 'description'
      }, {
        title: '最后编辑人',
        dataIndex: 'operatorName',
        key: 'operatorName'

      }, {
        title: '最后编辑时间',
        dataIndex: 'operatorTime',
        render: (record) => {
          return moment(record).format("YYYY-MM-DD HH:mm:ss")
        }
      }, {
        title: '操作',
        dataIndex: 'operation',

        render: (text, record, index) => {
          const detail = !this.props.permissionAlias.contains('LOCAL_CHAR_DETAIL');
          return (
            <Link disabled={detail} className="one-link" to = {`/system/local-char/detail?dataId=${record.id}`} > 查看 </Link>)
          },
        }];
    }

    render() {
      const { list, loading, pagination, dispatch } = this.props;
      const tableProps = {
        loading: loading.effects['localData/localChar'],
        dataSource : list ,
        pagination,
        onChange (page) {
          const { pathname } = location
          dispatch(routerRedux.push({
            pathname,
            query: {
              page: page.current,
              size: page.pageSize,
              type: 2,
            },
          }))
        },
      }

      const add = !this.props.permissionAlias.contains('LOCAL_CHAR_ADD');
      return (
        <div className = "place-cent">
          <div className="top-button">
              <Link to = "/system/local-char/add" >
                  <Button disabled={add} className="one-button" style={{ marginBottom: '10px',float: 'right' }}> 添加 </Button>
              </Link>
          </div>
          <Table className='place-center' {...tableProps} rowKey = { record=>record.id } bordered columns = { this.columns } />
        </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    list,
    pagination
  } = state.localData;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading,
    permissionAlias,
    list,
    pagination
  };
}

export default connect(mapStateToProps)(localCharIndex);
