"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, Form, Input, Tabs, Checkbox } from 'antd'
import "./SettingPormissionFrom.scss"
const createForm = Form.create
const FormItem = Form.Item
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;

@createForm()
class SettingPormissionFrom extends Component {
  constructor(props) {
    super(props)
  }
  state = { visible: false }
  handleCancel() {
    this.props.onCancel()
  }
  handleOk() {
    this.props.onCancel()
  }



  handleAfterClose() {

  }
  componentDidMount() {


  }
  callback() {

  }



  render() {
    const { visible, record } = this.props
    const { getFieldDecorator } = this.props.form;
    const values = [
      {
        name : "系统管理",
        key : 1,
      },{
        name : "个人中心",
        key : 2,
      },{
        name : "CRM",
        key : 3,
      },{
        name : "客房管理",
        key : 4,
      },{
        name : "膳食管理",
        key : 5,
      },{
        name : "服务管理",
        key : 6,
      }];
    const plainOptions = ['Apple', 'Pear', 'Orange'];
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
    ];
    const optionsWithDisabled = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange', disabled: false },
    ];


    const nodes = values.map((record, index) => {
        return (
          <TabPane tab={record.name} key={index}>
            <div className="subTagTwo">
              会员卡管理
            </div>
            <div>
              <div className="subTagThree">我的消息</div>
              <div>
                <CheckboxGroup options={plainOptions} defaultValue={['Apple']} onChange={ this.onChange } />
              </div>

            </div>
          </TabPane>)
    });

    return (
      <Modal
        visible = { visible }
        title = "设置权限"
        okText =  "保存"
        cancelText = "返回"
        onCancel = {this.handleCancel.bind(this)}
        afterClose = {this.handleAfterClose.bind(this)}
        onOk = {this.handleOk.bind(this)}
        closable = { false }
        width = { 800 }
        style = {{ height: 1000 }}
      >
        <Tabs onChange={this.callback} type="card">
          {
            nodes
          }
        </Tabs>
      </Modal>
    )
  }
}
function SettingPormissionFrom({
  dispatch,
  data,
  code
}) {
  return (
    <div>
      <AddFromCreateModal dispatch = { dispatch } />
    </div>
  )
}
function mapStateToProps(state) {
  const {
    data,
    code
  } = state.pormission;
  return {
    loading: state.loading.models.system,
    data
  };
}
export default connect(mapStateToProps)(SettingPormissionFrom)
