
import React from 'react'
import {connect} from 'dva'
import './system.scss'
import {Table,Input,Icon,Button,Popconfirm,Pagination} from 'antd'
import {routerRedux} from 'dva/router'
import {Link} from 'react-router'
import moment from 'moment'
import Current from '../../Current'

class GroupCharIndex extends React.Component {

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
        render: (record) => {
          return moment(record).format("YYYY-MM-DD HH:mm:ss")
        }
      }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record, index) => {
          return (
            <Link className="firstA" to = {`/system/group-char/detail?dataId=${record.id}` }  > 查看 </Link>)
          },
        }];
    }

    render() {
      const { list, loading, pagination, dispatch } = this.props;
      const tableProps = {
        loading: loading.effects['save/groupChar'],
        dataSource : list ,
        pagination,
        onChange (page) {
          const { pathname } = location
          dispatch(routerRedux.push({
            pathname,
            query: {
              page: page.current,
              size: page.pageSize,
              type: 1,
            },
          }))
        },
      }
      // <Current page = { this.props.page }  totalpage = { this.props.totalpage }
      //         total = { this.props.total } results = { this.props.results }
      //         range = { this.props.range }
      // />
      return (
        <div className = "container2">
            <div className = "buttonwrapper">
              <Link to = '/system/group-char/add'>
                <Button className="addBtn"> 添加 </Button>
              </Link >
            </div>
            <Table {...tableProps}  bordered  columns = { this.columns } rowKey={record => record.id}/>
       </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    list,
    pagination
  } = state.save;

  return {
    loading: state.loading,
    list,
    pagination
  };
}

export default connect(mapStateToProps)(GroupCharIndex);
