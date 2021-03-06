"use strict"
import React, {Component} from 'react'
import { connect } from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, Button} from 'antd'
import '../../system/organization/AddChildNode.scss'
import _ from 'lodash';

const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option
@createForm()
class UserServiceinfo extends Component {
    constructor(props) {
        super(props)
    }
    handleCancel() {
        this.props.onCancel()
    }
    handleOk(record,code) {
        //console.log("次数",this.props.ID)
        if(record.usageCount<=0){
            return this.props.onCancel()
        }else{
            this.props.dispatch({
              type: 'addCourse/useServiceInfo',
              payload: {
                "dataId":record.id,
                "userID":this.props.ID
              }
            });
        this.props.onCancel()
        }
    }
    checkbox() {
        /*console.log("checkbox")*/

    }
    handleAfterClose() {
        this.props.form.resetFields()
    }
    componentDidMount() {
        this.asyncValidator = _.debounce(this.asyncValidator, 1000 * 3)
    }
    // 在componentDidMount里面使用函数节流防抖等功能
    asyncValidator(rule, value, callback) {
      //  console.log(Date.now())
        setTimeout(() => {
            let now = Date.now()
            if (now % 2 === 1) {
                callback()
            } else {
                callback(new Error('自定义验证函数未通过'))
            }
        }, 1000)
    }
    render() {
        const {visible, form, confirmLoading, codeName} = this.props
        // console.log("codeName???????",codeName)
        return (
            <Modal
                visible={visible}
                title="提示"
                okText="确定"
                cancelText="取消"
                wrapClassName="Disabled"
                closable={false}
                confirmLoading={confirmLoading}
                afterClose={this.handleAfterClose.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                onOk={this.handleOk.bind(this,this.props.record,codeName)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
                width={ 300 }
            >
            <div>
              是否确定要使用该服务项？
            </div>
            </Modal>
        )
    }
}


function UserServiceinfoed({
  dispatch
}) {
  return ( < div >
    <UserServiceinfo dispatch = {
      dispatch
    }
    /> </div >
  )
}
function mapStateToProps(state) {
  const {
    codeName
  } = state.addCourse;
  return {
    loading: state.loading.models.addCourse,
    codeName
    };
}
export default connect(mapStateToProps)(UserServiceinfo)
