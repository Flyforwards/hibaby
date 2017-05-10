"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, Form, Input, Tabs, Checkbox } from 'antd'
import "./SettingpermissionFrom.scss"
const createForm = Form.create
const FormItem = Form.Item
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;

@createForm()
class SettingPermissionFrom extends Component {
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
    let permissionLists = []


    const { permissionList } = this.props;
    if (permissionList != null) {
      permissionLists = permissionList;
    }


    const nodes = permissionLists.map((record, index) => {
      let subNodes = [];
      if (record.children != null) {
        let subSubNodes = [];
        subNodes = record.children.map((subRecord, index1) => {
            if (subRecord.children != null) {
              subSubNodes = subRecord.children.map((subRec, index2) => {
                  return (
                    <div className="overflow" key={index1 * 10 + index2}>
                      <div className="subTagThree"> { subRec.name }</div>
                      <div className="checkBox">
                        <CheckboxGroup options={ subRec.children } onChange={ this.onChange } />
                      </div>
                    </div>)
              })
            }
            return (
                <div>
                  <div className="subTagTwo">
                    { subRecord.name }
                  </div>
                  {
                    subSubNodes
                  }
                </div>
              )
        });
      }

        return (
          <TabPane className="settingFrom" tab={record.projectName} key={index}>
            {
              subNodes
            }
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
        width = { 1000 }
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

function mapStateToProps(state) {
  const {
    permissionList
  } = state.permission;
  return {
    loading: state.loading.models.permission,
    permissionList
  };
}
export default connect(mapStateToProps)(SettingPermissionFrom)
