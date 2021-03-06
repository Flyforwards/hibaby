"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, Input, Tabs, Checkbox } from 'antd'
import "./SettingpermissionFrom.scss"
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;

class SettingPermissionFrom extends Component {
  constructor(props) {
    super(props)
    this.checkPermission = {
    }
  }

  handleCancel() {
    this.props.onCancel()
    this.props.dispatch({
      type: "permission/clearPermissionList",
    });
  }

  handleOk() {
    let ids = [];
    Object.keys(this.checkPermission).map((record)=> {
      ids = ids.concat(this.checkPermission[record])
    });
    this.props.dispatch({
      type : "permission/configRolePermission",
      payload: { roleId: this.props.selectRole.id, permissionIdList: ids }
    })
    this.props.onCancel()
  }

  callback() {

  }


  render() {

    let { permissionList, visible, loading  } = this.props;
    let nodes = permissionList.map((record, index) => {
      let subNodes = [];
      if (record.children != null) {
        let subSubNodes = [];
        subNodes = record.children.map((subRecord, index1) => {
            if (subRecord.children != null) {
                subSubNodes = subRecord.children.map((subRec, index2) => {
                  let selectValues = [];
                  if (subRec.children != null) {
                    subRec.children.map((sub) => {
                      sub.label = sub.name + String(sub.id);
                      sub.key = sub.id;
                      sub.value = sub.id;
                      if (sub.isHave) {
                        selectValues.push(sub.value);
                      }
                    });
                  }
                  this.checkPermission[subRec.id] = selectValues;

                  let onChange = (checkedValue) => {
                    this.checkPermission[subRec.id] = checkedValue;
                  }
                  return (
                    <div className="overflow" key= {index1 * 10 + index2}>
                      <div className="subTagThree"> { subRec.name }</div>
                      <div className="checkBox">
                        <CheckboxGroup options={ subRec.children } defaultValue = { selectValues } onChange={ onChange.bind(this) } />
                      </div>
                    </div>)
              })
            }
            return (
                <div key = { index1 * 10 }>
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
          <TabPane className="settingFrom" tab={ record.projectName }  key = { index }>
            {
              subNodes
            }
          </TabPane>)
    });

    return (
      <Modal
        key = { visible }
        visible = { visible }
        title = "设置权限"
        okText =  "保存"
        cancelText = "返回"
        onCancel = { this.handleCancel.bind(this) }
        onOk = { this.handleOk.bind(this) }
        wrapClassName = { "SettingPermissionModal" }
        closable = { false }
        width = { 1000 }
      >
        <Tabs onChange={ this.callback } defaultActiveKey = { "0" }  type="card" key = { visible }>
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
    loading: state.loading,
    permissionList
  };
}
export default connect(mapStateToProps)(SettingPermissionFrom)
