
import React, { Component } from 'react'
import { connect } from 'dva'
import { Card, Input, DatePicker, Button, Form,Table, Select,Cascader, Row, Col } from 'antd'
import {routerRedux} from 'dva/router';
import AlertModalFrom from 'common/AlertModalFrom'
import moment from 'moment'
import util from 'common/util'
import { parse } from 'qs'
const FormItem = Form.Item;
const createForm = Form.create
const Option = Select.Option;
import ReservedUserComponent from './ReservedUserComponent'

@createForm()
class ActivityDetailIndex extends Component {
  constructor(props) {
    super(props)
  }

  back() {
    const values = parse(location.search.substr(1))
    this.props.dispatch(
      routerRedux.push({
        pathname:'/crm/activity/detail',
        query: values,
      })
    )
  }

  // 保存
  saveEdit() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
      //  console.log(values)
        this.props.dispatch({
          type: 'activity/updateActivity',
          payload: values
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { editItem, editSignUserList,loading, dispatch, editSignPagination } = this.props;

    const formItemLayout = {
      labelCol:{ span: 2 },
      wrapperCol:{ span:22 }
    }


    getFieldDecorator('id', { initialValue: editItem?editItem.id:0 });
    let activityInfo = (<Card></Card>)
    let itemName = "";
    let address = "";
    let content = "";
    let activityTime = moment()
    if (editItem != null) {
      itemName = editItem.name;
      activityTime = moment(editItem.activityTime);
      address = editItem.address;
      content = editItem.content;
      activityInfo=(
        <Card>
        <div className="card-title">
          <h3>活动信息:</h3>
        </div>
        <Form >
          <FormItem  {...formItemLayout} label="活动名称" >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请填写活动名称' }],
              initialValue: itemName
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="活动时间" >
            {getFieldDecorator('activityTime', {
              rules: [{ required: true, message: '请选择活动时间' }],
              initialValue: activityTime
            })(
              <DatePicker format="YYYY-MM-DD HH:mm" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label= "活动地点">
            {getFieldDecorator('address', {
              rules: [{ required: true, message: '请填写活动地点' }],
              initialValue: address
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={"活动内容"}>
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '请填写活动内容' }],
              initialValue: content
            })(
              <Input type="textarea" rows={6}/>
            )}
          </FormItem>
        </Form>
      </Card>)
    }
    const tableProps = {
      loading: loading.effects['activity/getActivityCustomerPageListEdit'],
      dataSource : editSignUserList ,
      pagination: editSignPagination,
      onChange (page) {
        dispatch({
          type: 'activity/getActivityCustomerPageListEdit',
          payload:{
            activityId: editItem.id,
            page: page.current,
            size: page.pageSize,
          }
        })
      },
    }
    return (
      <div className="activity-cent">
        <div className="add-activity">
        {
          activityInfo
        }
        </div>
        <div className="add-activity">
          <ReservedUserComponent editItem={ editItem } tableProps={ tableProps }/>
          <div className="button-wrapper">
            <Button className="saveBtn" style={{ float:"right", marginRight: "20px" }} onClick={ this.saveEdit.bind(this) } >保存</Button>
            <Button className="backBtn" style={{ float:"right", marginRight: "20px" }} onClick={this.back.bind(this)} >返回</Button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    editItem,
    editSignUserList,
    editSignPagination
  } = state.activity;
  const {
    systemTime
  } = state.layout;
  return {
    loading: state.loading,
    systemTime,
    editItem,
    editSignUserList,
    editSignPagination
  };
}


export default connect(mapStateToProps)(ActivityDetailIndex)
