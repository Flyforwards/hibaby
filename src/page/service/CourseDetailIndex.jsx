import React from 'react'
import { connect } from 'dva'
import { Table,Input,Icon,Button,Popconfirm,Pagination, DatePicker, Row, Col } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import moment from 'moment'
import './CourseIndex.scss'
import PermissionButton from 'common/PermissionButton';
import PermissionLink from 'common/PermissionLink';

class CourseDetailIndex extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [{
      title: '用户',
      dataIndex: 'id',
      key: 'id',
      width: '5%'
    },{
      title: '电话',
      dataIndex: 'name',
      key: 'name',
      width: '15%'
    }, {
      title: '会员等级',
      dataIndex: 'content',
      key: 'content',
      width: '35%'
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: '13%',
      render: (text, record, index) => {
        return (
          <div key = { index }>
            <Link style={{width: '30%'}} onClick={ this.pushDetail.bind(this,record) }> 查看 </Link>;
          </div>
        )

      },
    }];
  }

  back() {
    this.props.dispatch(
      routerRedux.push('/service/order-course')
    )
  }

  // 查看
  pushDetail(record) {
    this.selectRecord = record;
    this.props.dispatch(routerRedux.push({
      pathname:'/crm/activity/detail',
      query: {
        dataId:record.id
      },
    }))

  }

  render() {
    const { loading, dispatch,list2, pagination2, item } = this.props;
    const tableProps = {
      loading: loading.effects['course/getCourseCustomerListByPage'],
      dataSource: list2 ,
      pagination: pagination2,
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
        <Row>
          <Col span="6">{item.courseName}</Col>
          <Col span="6">
            <DatePicker disabled={true} format="YYYY-MM-DD" defaultValue={ moment(item.courseDate) }/>
          </Col>
        </Row>
        <Table {...tableProps} className='curriculum-center'   bordered  columns = { this.columns } rowKey={record => record.id}/>
        <div className="button-group-bottom-common">
          <Button className="button-group-bottom-1" onClick={this.back.bind(this)}>返回</Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { systemTime, permissionAlias } = state.layout;
  const { list2, pagination2, item } = state.course;
  return {
    loading: state.loading,
    systemTime,
    permissionAlias,
    list2,
    pagination2,
    item
  };
}

export default connect(mapStateToProps)(CourseDetailIndex);
