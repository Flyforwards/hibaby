
"use strict"
import React from 'react';

import {connect} from 'dva';
import './place.scss';
import {Table,Input,Icon,Button,Popconfirm,Pagination} from 'antd';
import {routerRedux} from 'dva/router';
import {Link} from 'react-router';
import Current from '../../Current'

class localCharIndex extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
        title: '序号',
        dataIndex: 'id',
        key: 'id'
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
        dataIndex: 'modifiyId',
        key: 'modifiyId'

      }, {
        title: '最后编辑时间',
        dataIndex: 'modifyTime',
        key: 'modifyTime'
      }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record, index) => {
          return (
            <Link to = {`/system/local-char/detail?dataId=${record.id}`} > 查看 </Link>)
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
      // <Current page = { this.props.page }
      //         totalpage = { this.props.totalpage }
      //         total = { this.props.total }
      //         results = { this.props.results }
      //         range = { this.props.range }
      // />
      return (
        <div className = "PlaceProject">
          <div className = "buttonwrapper">
              <Link to = "/system/local-char/add" >
                  <Button className="addBtn"> 添加 </Button>
              </Link>
          </div>
          <Table {...tableProps} rowKey = { record=>record.id } bordered columns = { this.columns } />

        </div>
    );
  }
}
function getLocalTime(nS) {
  var now = new Date(parseInt(nS));
  var year=now.getFullYear();
  var month=now.getMonth()+1;
  var date=now.getDate();
  if(month<10){
    month = "0"+month
  }
  if(date<10){
    date = "0"+date
  }
  return `${year}-${month}-${date}`
}
/*time = getLocalTime(USER.gmt_entry)*/

function mapStateToProps(state) {

  const {
    list,
    pagination
  } = state.localData;

  return {
    loading: state.loading,
    list,
    pagination
  };
}

export default connect(mapStateToProps)(localCharIndex);
