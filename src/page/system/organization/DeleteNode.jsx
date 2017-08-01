"use strict"
import React, {Component} from 'react'
import { connect } from 'dva'
import { Modal,  Button } from 'antd'
import './AddChildNode.scss'
import _ from 'lodash'


class DeleteNode extends Component {
    constructor(props) {
        super(props)
    }
    handleCancel() {
        this.props.onCancel()
    }
    handleOk() {
        this.props.dispatch({
            type: 'organization/deleteDepartment',
            payload: {
              dataId:Number(this.props.ID),
              TissueProperty:this.props.TissueProperty
            }
        })
        this.props.onCancel()
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
        const {visible, confirmLoading} = this.props
        return (
            <Modal
                visible={visible}
                title="提示"
                okText="确定"
                cancelText="取消"
                wrapClassName="Disabled"
                closable={false}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel.bind(this)}
                onOk={this.handleOk.bind(this)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
                width={ 300 }
            >
            <div>
              是否确定删除此节点？
            </div>
            </Modal>
        )
    }
}

export default connect()(DeleteNode)
