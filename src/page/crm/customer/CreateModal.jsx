"use strict"

import React, { Component } from 'react';
import { Modal, Form, Input, Radio, Select, Checkbox, Icon,Row, Col } from 'antd';
import _ from 'lodash';
import { filterItemList } from 'common/constants'
const createForm = Form.create
const FormItem = Form.Item
const Option = Select.Option

@createForm()
class CreateModal extends Component {
    constructor(props) {
        super(props)
    }
    state = { visible: false }
    handleCancel() {
        this.props.onCancel()
    }
    handleOk(visible) {
        //console.log("ok")
        this.props.onCancel()
    }
    onChange(index) {
      //  console.log("index",index)

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
        const {visible, form, confirmLoading} = this.props
        const {getFieldDecorator} = form
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        }
        const length = filterItemList.length
        let elements=[];
        for (let i=0;i<length;i=i+4) {
          let nodes=[];
          for (let j=0;j<4 && i+j<length;j++) {
            const record = filterItemList[i+j];
            nodes.push(
              <Col key={ i+j } span = { 6 }>
                <Checkbox onChange={ this.onChange }>{ record.name }</Checkbox>
              </Col>
            )
          }
          elements.push((<Row key={ i }>{ nodes }</Row>));

        }

        return (
            <Modal
                visible={visible}
                title="筛选项"
                okText="确定"
                afterClose={ this.handleAfterClose.bind(this) }
                onCancel={ this.handleCancel.bind(this) }
                onOk={ this.handleOk.bind(this,visible) }
                confirmLoading = { confirmLoading }
            ><div >
              {
                elements
              }
            </div>
            </Modal>
        )
    }
}

CreateModal.propTypes = {}
CreateModal.defaultProps = {}

export default CreateModal
