import React from 'react'
import { connect } from 'dva'
import { Table,Input,Icon,Button,Popconfirm,Pagination } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import moment from 'moment'
import './CourseIndex.scss'
import PermissionButton from 'common/PermissionButton';
import PermissionLink from 'common/PermissionLink';

class CourseIndex extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: '5%'
    },{
      title: '课程名',
      dataIndex: 'courseName',
      key: 'courseName',
      width: '15%'
    }, {
      title: '课程内容',
      dataIndex: 'content',
      key: 'content',
      width: '35%'
    }, {
      title: '地点',
      dataIndex: 'address',
      key: 'address',
      width: '10%'
    }, {
      title: '时间',
      dataIndex: 'courseDate',
      width: '10%',
      render: (record) => {
        return moment(record).format("YYYY-MM-DD HH:mm")
      }
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: '13%',
      render: (text, record, index) => {
          return (
            <div key = { index }>
              <Link style={{width: '30%'}} className="one-link" onClick={ this.pushDetail.bind(this,record) }> 查看 </Link>
            </div>
          )

      },
    }];
  }


  // 查看
  pushDetail(record) {
    this.selectRecord = record;
    this.props.dispatch(routerRedux.push({
      pathname:'/service/order-course/detail',
      query: {
        dataId:record.id
      },
    }))

  }

  render() {
    const { loading, dispatch, pagination, list } = this.props;
    const tableProps = {
      loading: loading.effects['course/getCourseListByPage'],
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
      <div className = "curriculum-cent">
        <div className = "top-button">
          <Link to = '/service/order-course/add'>
            <Button className="one-button" style={{ float:'right', marginBottom:'10px'}}> 添加 </Button>
          </Link >
        </div>
        <Table {...tableProps} className='curriculum-center' bordered  columns = { this.columns } rowKey={record => record.id}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { systemTime, permissionAlias } = state.layout;
  const { list, pagination } = state.course;
  return {
    loading: state.loading,
    systemTime,
    permissionAlias,
    list,
    pagination
  };
}

export default connect(mapStateToProps)(CourseIndex);
