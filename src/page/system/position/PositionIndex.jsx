
import React, { Component } from 'react'
import { connect } from 'dva'
import './positionIndex.scss'
import EditPosition from './editPositionIndex'
import { Button, Input,  Form, Table, } from 'antd'
const FormItem = Form.Item;
const createForm = Form.create
import moment from 'moment'
import { routerRedux } from 'dva/router';

@createForm()
class PositionIndex extends Component {
  constructor(props) {
    super(props);
    this.name ='';

    this.columns = [{
      title: '序号',
      dataIndex: 'id',
      width: '10%'
    }, {
      title: '部门',
      dataIndex: 'name',
      width: '40%'
    }, {
      title: '最后编辑人',
      dataIndex: 'operatorName',
      width: '20%'
    }, {
      title: '最后编辑时间',
      dataIndex: 'modifyTime',
      render: (record) => {
        return moment(record).format("YYYY-MM-DD HH:mm:ss")
      }
    }, {
      title: '操作',
      dataIndex: 'edit',
      width: '10%',
      render: function (text, record) {
        return (
          <div>
            <EditPosition record={record}/>
          </div>)
      }
    }];
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values);
      this.props.dispatch({
        type: 'position/getDepartmentInfo',
        payload: values
      })
      this.name = values.name
    });
  }



  render() {
    const { form, list, pagination, dispatch, loading} = this.props
    const { getFieldDecorator } = form;
    const name = this.name;
    const tableProps = {
      loading: loading.effects['position/getDepartmentInfo'],
      dataSource : list ,
      pagination,
      onChange (page) {
        const { pathname } = location
        dispatch(routerRedux.push({
          pathname,
          query: {
            page: page.current,
            size: page.pageSize,
            name,
          },
        }))
      },
    }
    const formItemLayout = {
      labelCol: {
        span: 1
      },
      wrapperCol: {
        span: 4
      },
    };
    return (
      <div className="position-cent">
        <div style={{ overflow: 'hidden' }}>
          <Form className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
            <FormItem label="部门">
              {
                getFieldDecorator('name', {})(
                  <Input placeholder="请输入部门名称"/>
                )}
            </FormItem>
            <Button style={{ marginTop: '10px', marginLeft: '10px' }} className="button-group-2" htmlType="submit">查询</Button>
          </Form>
        </div>
        <Table {...tableProps} bordered rowKey='id' columns={this.columns}/>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {
    list,
    pagination
  } = state.position;

  return {
    loading: state.loading,
    list,
    pagination,
  };
}

export default connect(mapStateToProps)(PositionIndex)
