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
class AddChildNodeed extends Component {
    constructor(props) {
        super(props)
    }
    handleCancel() {
        this.props.onCancel()
    }
    handleOk() {
        console.log("ok")
        const fields = this.props.form.getFieldsValue();
        console.log("fields",fields)
        this.props.dispatch({
            type: 'organization/saveDepartment',
            payload: {
              abbreviation: fields.referredTo,//简称
              englishName: fields.englishName,
              leaderId: 2,
              leaderName: "王",
              name: "信息部",
              parentId: 2,
              tissueProperty: fields.localCenter
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
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
          },
        };
        return (
            <Modal
                visible={visible}
                title="添加子节点"
                okText="保存"
                cancelText="返回"
                wrapClassName="AddChildNode"
                closable={false}
                confirmLoading={confirmLoading}
                afterClose={this.handleAfterClose.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                onOk={this.handleOk.bind(this)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
                width={ 600 }
            >
            <div className="AddChildNode">
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                     {...formItemLayout}
                      label="ID"
                    >
                      {getFieldDecorator('id', {
                        initialValue:this.props.ID,
                        rules: [],
                      })(
                        <Input disabled={ true }/>
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="地方中心"
                    >
                      {getFieldDecorator('localCenter', {
                        rules: [],
                      })(
                        <Select>
                            <Option value="86">+86</Option>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="全称"
                    >
                      {getFieldDecorator('fullName', {
                        rules: [],
                      })(
                        <Input/>
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="简称"
                    >
                      {getFieldDecorator('referredTo', {
                        rules: [],
                      })(
                        <Input/>
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="英文名称"
                    >
                      {getFieldDecorator('englishName', {
                        rules: [],
                      })(
                        <Input/>
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="节点负责人"
                      className="nodeLeaderIput"
                    >
                      {getFieldDecorator('nodeLeaderIput', {
                      })(
                        <Input/>
                      )}
                    </FormItem>
                    <FormItem
                    className="nodeLeader"
                    >
                      {getFieldDecorator('nodeLeader', {
                      })(
                        <Button type="primary">选择</Button>
                      )}
                    </FormItem>
                </Form>
            </div>
            </Modal>
        )
    }
}

AddChildNode.propTypes = {}
AddChildNode.defaultProps = {}
function AddChildNode({
  dispatch
}) {
  return ( < div >
    <AddChildNodeed dispatch = {
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
export default connect(mapStateToProps)(AddChildNodeed)

