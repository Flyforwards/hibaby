"use strict" 
import React, {Component} from 'react'
import { connect } from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, Button} from 'antd'
import './AddChildNode.scss'


const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option
@createForm()
class DeleteNode extends Component {
    constructor(props) {
        super(props)
    }
    handleCancel() {
        this.props.onCancel()
    }
    handleOk() {
        console.log("ok",Number(this.props.ID))
        this.props.dispatch({
            type: 'organization/deleteDepartment',
            payload: {
              dataId:Number(this.props.ID)
            }
        })
        this.props.onCancel()
    }
    checkbox() {
        console.log("checkbox")

    }
    handleAfterClose() {
        this.props.form.resetFields()
    }
    componentDidMount() {
        this.asyncValidator = _.debounce(this.asyncValidator, 1000 * 3)
    }
    // 在componentDidMount里面使用函数节流防抖等功能
    asyncValidator(rule, value, callback) {
        console.log(Date.now())
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
        const {visible, form, confirmLoading} = this.props
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
                onOk={this.handleOk.bind(this)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
                width={ 200 }
            >
            <div>
              是否确定删除此节点？
            </div>
            </Modal>
        )
    }
}

DeleteNode.propTypes = {}
DeleteNode.defaultProps = {}
function Disabled({
  dispatch
}) {
  return ( < div >
    <DeleteNode dispatch = {
      dispatch
    }
    /> </div >
  )
}
function mapStateToProps(state) {
  const {
  } = state.organization;
  return {
    loading: state.loading.models.organization
    };
}
export default connect(mapStateToProps)(DeleteNode)

