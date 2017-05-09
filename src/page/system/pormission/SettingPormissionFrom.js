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
    const subText3 = [
      { name : "我的消息", key : 10 },
      { name : "活动管理", key : 20 }
      ];
    const plainOptions = ["显示", "搜索", "删除","更改","添加",
      "更新","充值","教育","魔术师","天天向上","喜欢吃饺子",
      "面包","馒头","面条","蛋糕","油条","茶叶蛋","豆浆","豆腐","包子","红薯","甜甜圈","烤红薯","土豆泥","土豆饼","馒头饼","西红柿鸡蛋"
    ];
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
    const subNodes = subText3.map((record, index) => {
      return (
          <div className="overflow" key={index}>
            <div className="subTagThree"> { record.name }</div>
            <div className="checkBox">
              <CheckboxGroup options={ plainOptions } onChange={ this.onChange } />
            </div>
        </div>)
    });


    const nodes = values.map((record, index) => {
        return (
          <TabPane tab={record.name} key={index}>
            <div className="subTagTwo">
              会员卡管理
            </div>
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
