"use strict"
import React, {Component} from 'react'
import { connect } from 'dva'
import { Modal, Form, } from 'antd'
import './AddChildNode.scss'
import { parse } from 'qs'

import _ from 'lodash';
const createForm = Form.create

@createForm()
class DeleteEntry extends Component {
    constructor(props) {
        super(props)
    }
    handleCancel() {
        this.props.onCancel()
    }
    handleOk(index) {
        const param = parse(location.search.substr(1))
        this.props.dispatch({
           type: 'organization/deleteUserEntry',
            payload: {
              "dataId":index
            }
        })
        this.props.dispatch({
          type: 'organization/getUserListById',
          payload: param
        })
        window.location.reload( true )
    }
    handleAfterClose() {
        this.props.form.resetFields()
    }
    componentDidMount() {
        this.asyncValidator = _.debounce(this.asyncValidator, 1000 * 3)
    }
    // 在componentDidMount里面使用函数节流防抖等功能
    asyncValidator(rule, value, callback) {
        //console.log(Date.now())
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
                afterClose={this.handleAfterClose.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                onOk={this.handleOk.bind(this,this.props.DeleteIndex)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
                width={ 200 }
            >
            <div>
              是否确定删除该入职信息？
            </div>
            </Modal>
        )
    }
}


function mapStateToProps(state) {
  return {
     loading: state.loading.models.organization
    };
}
export default connect(mapStateToProps)(DeleteEntry)
