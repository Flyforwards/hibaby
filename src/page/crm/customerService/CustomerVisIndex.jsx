import React from 'react'
import { connect } from 'dva'
import './CustomerCompIndex.scss'
import { Table,Input,Icon,Button,Popconfirm, Modal, DatePicker, Card } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import moment from 'moment'
const confirm = Modal.confirm;

class CustomerVisIndex extends React.Component {

  constructor(props) {
    super(props);
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

  onChangeDate(date,dateString) {

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
      <div className = "customer-vis-cent">
        <div className = "button-wrapper">
          <DatePicker defaultValue={ moment()} onChange={this.onChangeDate.bind(this)}/>
          <Link to = '/crm/customer-vis/add'>
            <Button disabled={add} className="button-add BackBtn"> 预约参观 </Button>
          </Link >
        </div>
        <Card>

        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {

  } = state.customerVis;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading,

    permissionAlias,
  };
}

export default connect(mapStateToProps)(CustomerVisIndex);
