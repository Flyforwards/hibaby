import React from 'react'
import { connect } from 'dva'
import './CustomerCompIndex.scss'
import { Table,Input,Icon,Button,Popconfirm, Modal } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import moment from 'moment'
const confirm = Modal.confirm;

class CustomerComplaintsIndex extends React.Component {

  constructor(props) {
    super(props);
    this.selectRecord = null;
    this.state={
      appointmentVisible: false,
      memberVisible: false,
      notMemberVisible: false,
      alertModalVisible: false
    }
    const state = { "0": '处理中',"1": '待确认',"2": '已确认'}
    this.columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: '7%'
    },{
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      width: '18%'
    }, {
      title: '投诉内容',
      dataIndex: 'content',
      key: 'content',
      width: '35%'
    }, {
      title: '处理部门',
      dataIndex: 'responsibilityDepartment',
      key: 'responsibilityDepartment',
      width: '10%'
    }, {
      title: '处理时间',
      dataIndex: 'activityTime',
      width: '10%',
      render: (record) => {
        return moment(record).format("YYYY-MM-DD HH:mm")
      }
    },{
      title: '处理状态',
      width: '7%',
      dataIndex: 'state',
      render: (record) => {
        return state[record];
      }
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: '13%',
      render: (text, record, index) => {
        const detail = !this.props.permissionAlias.contains('CUSTOMERCOMP_DETAIL');
        const del = !this.props.permissionAlias.contains('CUSTOMERCOMP_DELETE');
          return (
            <div key = { index }>
              <Link disabled={detail} className="firstA" onClick={ this.pushDetail.bind(this,record) }> 查看 </Link>
              <Link disabled={del} className="firstB" onClick={ this.deleteCustomerComp.bind(this,record)} > 删除 </Link>
            </div>
          )
        }
      },
    ];
  }

  deleteCustomerComp(record) {
    const { dispatch } = this.props;
    confirm({
      title: '提示',
      content: '是否确定删除此投诉？',
      onOk() {
        dispatch({
          type: 'customerComp/deleteCustomerComp',
          payload: { dataId: record.id }
        })
      },
      onCancel() {
      },
    });
  }

  // 确认删除
  onOk(record) {
    this.props.dispatch({
      type: 'activity/deleteActivity',
      payload: { dataId: record.id }
    })
    this.onCancel();
  }

  // 查看
  pushDetail(record) {
    this.selectRecord = record;
    this.props.dispatch(routerRedux.push({
      pathname:'/crm/customer-comp/detail',
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
    const { list, loading, pagination, dispatch } = this.props;
    const tableProps = {
      loading: loading.effects['activity/getActivityPage'],
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

    const add = !this.props.permissionAlias.contains('CUSTOMERCOMP_ADD');
    return (
      <div className = "activity-cent">
        <div className = "button-wrapper">
          <Link to = '/crm/customer-comp/add'>
            <Button disabled={add} className="button-add BackBtn"> 创建投诉 </Button>
          </Link >
        </div>
        <div className="CreateModaList">
            <Table className="" {...tableProps}  bordered  columns = { this.columns } rowKey={record => record.id}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    list,
    pagination
  } = state.customerComp;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading,
    list,
    pagination,
    permissionAlias,
  };
}

export default connect(mapStateToProps)(CustomerComplaintsIndex);
