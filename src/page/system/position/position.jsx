
import React, { Component } from 'react'
import { connect } from 'dva'
import './position.scss'
import EditPosition from './editPosition'
import { Button, Input,  Form, Table } from 'antd'
const FormItem = Form.Item;

class FindTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }

    this.columns = [{
      title: '序号',
      dataIndex: 'id',
      width: '20%'
    }, {
      title: '部门',
      dataIndex: 'name',
      width: '20%'
    }, {
      title: '最后编辑人',
      dataIndex: 'operatorName',
      width: '20%'
    }, {
      title: '最后编辑时间',
      dataIndex: 'operatorTime',
      width: '20%'
    }, {
      title: '操作',
      dataIndex: 'edit',
      width: '20%',
      render: function (text, record) {
        return (<div>
          <EditPosition record={record}/>
        </div>)
      }
    }];
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let postInfo = {
        ...values,
        'page': 1,
        'size': 4,
        'sortField': "string",
        'sortOrder': "string"
      }
      this.handlePageChange(postInfo);

    });
  }

  handlePageChange(value) {
    this.setState({
      name: value.name
    })
    this.props.dispatch({
      type: 'position/getDepartmentInfo',
      payload: value
    })
  }

  render() {
    const { form, data, total, dispatch} = this.props
    const { getFieldDecorator } = form;
    const pagination = {
      total: total, //数据总条数
      showQuickJumper: true,
      pageSize: 10,
      onChange: (current) => {
        dispatch({
          type: 'position/getDepartmentInfo',
          payload: {
            'name': this.state.name,
            'page': current,
            'size': 10,
          }
        })
      }
    };
    return (
      <div>
        <Form layout="inline" className="find" onSubmit={this.handleSubmit}>
          <span className="findTxt">部门</span>
          <FormItem className="findInput">
            {
              getFieldDecorator('name', {})(
                <Input size="large" placeholder="请输入部门名称"/>
              )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">查询</Button>
          </FormItem>
        </Form>
        <Table rowKey='id' style={{ 'marginLeft': '20px' }} columns={this.columns} dataSource={data} pagination={ pagination} />
      </div>
    )
  }
}
const Position = Form.create()(FindTop);

function PositionCom({ dispatch, data, code, page, size, total,positionInfo }) {
  return (
    <Position dispatch={dispatch} data={data} code={code} page={page} size={size} total={total} positionInfo={positionInfo}/>
  )
}
function mapStateToProps(state) {
  const { data, code, page, size, total ,positionInfo} = state.position;
  return {
    loading: state.loading.models.position,
    data, code, page, size, total,positionInfo
  };
}
export default connect(mapStateToProps)(PositionCom)
