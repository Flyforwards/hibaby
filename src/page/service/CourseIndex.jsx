import React from 'react'
import { connect } from 'dva'
import { Table,Input,Icon,Button,Popconfirm,Pagination } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import moment from 'moment'
import './CourseIndex.scss'
import PermissionButton from 'common/PermissionButton';
import PermissionLink from 'common/PermissionLink';

class CurriculumIndex extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: '5%'
    },{
      title: '课程名',
      dataIndex: 'name',
      key: 'name',
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
      dataIndex: 'time',
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
              <Link style={{width: '30%'}} onClick={ this.appointment.bind(this,record) }> 查看 </Link>;
            </div>
          )

      },
    }];
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

  onCancel() {
    this.setState({
      appointmentVisible: false,
      memberVisible: false,
      notMemberVisible: false,
      alertModalVisible: false
    })
  }
  onChoose(on) {
    if(on){
      this.setState({
        appointmentVisible: false,
        memberVisible: true,
      })
      this.props.dispatch({
        type: 'activity/getNoAppointmentCustomerPageList',
        payload: { 'activityId': this.selectRecord.id }
      })
    } else {
      this.setState({
        notMemberVisible: true,
        appointmentVisible: false,
      })
    }
  }

  render() {
    const { loading, dispatch } = this.props;
    let list = []
    // const tableProps = {
    //   loading: loading.effects['activity/getActivityPage'],
    //   dataSource : list ,
    //   pagination,
    //   onChange (page) {
    //     const { pathname } = location
    //     dispatch(routerRedux.push({
    //       pathname,
    //       query: {
    //         page: page.current,
    //         size: page.pageSize,
    //       },
    //     }))
    //   },
    // }
    return (
      <div className = "curriculum-cent">
        <div className = "top-button">
          <Link to = '/service/order-course/add'>
            <Button className="one-button" style={{ float:'right', marginBottom:'10px'}}> 添加 </Button>
          </Link >
        </div>
        <Table className='curriculum-center'   bordered  columns = { this.columns } rowKey={record => record.id}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { systemTime, permissionAlias } = state.layout;

  return {
    loading: state.loading,
    systemTime,
    permissionAlias,
  };
}

export default connect(mapStateToProps)(CurriculumIndex);
