import React from 'react'
import { connect } from 'dva'
import './CustomerCompIndex.scss'
import { Table,Input,Icon,Button,Popconfirm, Modal } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import moment from 'moment'
const confirm = Modal.confirm;

class CustomerCompIndex extends React.Component {

  constructor(props) {
    super(props);

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
      width: '10%',
      render: (record)=> {
        return this.textforkey(this.props.deptList,record);
      }
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
            <div className="operation-list" key = { index }>
              <Link disabled={detail} className="one-link link-style" onClick={ this.pushDetail.bind(this,record) }> 查看 </Link>
              <Link disabled={del} className="two-link link-style" onClick={ this.deleteCustomerComp.bind(this,record)} > 删除 </Link>
            </div>
          )
        }
      },
    ];
  }

  textforkey(array,value,valuekey = 'name') {
    for (let i = 0 ;i<array.length ;i++){
      let dict = array[i];
      if(dict['id'] === value){
        return  dict[valuekey];
      }
    }
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
    this.props.dispatch(routerRedux.push({
      pathname:'/crm/customer-comp/detail',
      query: {
        dataId:record.id
      },
    }))

  }

  render() {
    const { list, loading, pagination, dispatch } = this.props;
    const tableProps = {
      loading: loading.effects['customerComp/getCustomerCompPage'],
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
      <div className = "customer-comp-cent">
        <div className = "top-button">
          <Link to = '/crm/customer-comp/add'>
            <Button disabled={add} className="one-button" style={{ marginBottom: '10px',float: 'right' }}> 创建投诉 </Button>
          </Link>
        </div>
        <Table className='customer-comp-center' {...tableProps}  bordered  columns = { this.columns } rowKey={record => record.id}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    list,
    pagination,
    deptList
  } = state.customerComp;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading,
    list,
    deptList,
    pagination,
    permissionAlias,
  };
}

export default connect(mapStateToProps)(CustomerCompIndex);
