
import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal,  Select,Input,Button,Form, Table } from 'antd'
import PropTypes from 'prop-types'
import './PhoneSystemIndex.scss'
const FormItem = Form.Item;
const createForm = Form.create
const Option = Select.Option;

@createForm()
class PhoneSystemModalFrom extends Component {
  constructor(props) {
    super(props)
    this.columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '10%'
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: '10%'
    },];
    this.state = {
      selectedRowKeys: [],
    }
  }
  handleCancel(){
    this.props.dispatch({
      type: 'phoneSystem/hideModal',
    })
  }

  handleOk() {
    if (this.selectedRows && this.selectedRows.length > 0) {
      this.props.onOk(this.selectedRows[0])
      this.handleCancel()
    }

  }

  cellOnChange = ( selectedRowKeys, selectedRows ) => {
    this.selectedRows = selectedRows;
    this.setState({
      selectedRowKeys,
    })
  }

  render() {

    const { selectedRowKeys } = this.state;

    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: this.cellOnChange.bind(this)
    };

    const { users, loading, userPagination, dispatch, modalVisible } = this.props;
    const tableProps = {
      rowSelection,
      loading: loading.effects['phoneSystem/getUserListByPage'],
      dataSource: users ,
      pagination: userPagination,
      size: 'small',
      onChange (page) {
        dispatch({
          type: 'phoneSystem/getUserListByPage',
          payload: { page:page.current, size: page.pageSize }
        })
      },
    }

    return (
      <Modal
        key = { modalVisible }
        visible = { modalVisible }
        title = { "添加客服信息" }
        onCancel = { this.handleCancel.bind(this) }
        onOk = { this.handleOk.bind(this) }
        width = { 500 }
        wrapClassName = { "vertical-center-modal" }
      >
        <Table {...tableProps}  bordered  columns = { this.columns } rowKey={record => record.id}/>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  const {
    userPagination,
    users,
    modalVisible,
  } = state.phoneSystem;
  return {
    loading: state.loading,
    userPagination,
    users,
    modalVisible
  };
}


export default connect(mapStateToProps)(PhoneSystemModalFrom)
