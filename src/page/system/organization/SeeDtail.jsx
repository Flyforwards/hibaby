"use strict" 
import React, {Component} from 'react'
import { connect } from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, Button} from 'antd'
import './AddChildNode.scss'
import SelectTheNodeFrom from './SelectTheNodeFrom.js'
import {local, session} from '../../../common/util/storage.js'
import NodeEdit from './NodeEdit.jsx'

const createForm = Form.create
const FormItem = Form.Item
const endemic  = session.get("endemic")
const CheckboxGroup = Checkbox.Group
const Option = Select.Option
@createForm()
class SeeDtailed extends Component {
    constructor(props) {
        super(props)
        this.state = {
          visible:false,
          TableData:null,
          display:"block",
          NodeEditVisible:false
        }
    }
    handleCancel() {
        this.props.onCancel()
    }
    handleOk() {
        console.log("ok",this.props.ID)
        const fields = this.props.form.getFieldsValue();
        console.log("fields",fields)
        this.props.onCancel()
    }
    checkbox() {
        console.log("checkbox")
    }
    ReturnLeader(){
      this.props.onCancel()
    }
    handleAfterClose() {
        this.props.form.resetFields()
    }
    componentDidMount() {
        this.asyncValidator = _.debounce(this.asyncValidator, 1000 * 3)
        console.log(this.props.ID)
    }
    delet(id){
      this.props.dispatch({
        type: 'organization/deleteDepartment',
          payload: {
            "dataId":id
          }
      })
    }
    EditNode(){
      this.setState({
          NodeEditVisible: true
        })
    }
    handleNodeEditCancel(){
      this.setState({
          NodeEditVisible: false
        })
    }

     handleCreateModalCancel() {
        this.setState({
          visible: false,
        })
    }
    headelReturnTabal(data){
      this.setState({
        TableData:data[0]
      })
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
      let Nodesdata = {}
      let display = "block"
      if(this.props.getDepartmentNode!=null){
        Nodesdata = this.props.getDepartmentNode
      }
        if(this.props.ID == 1 || this.props.ID == 3){
            display = "none"
        }
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
                title="节点详情"
                wrapClassName="SeeChildNode"
                closable={false}
                confirmLoading={confirmLoading}
                afterClose={this.handleAfterClose.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                onOk={this.handleOk.bind(this)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
                width={ 600 }
            >
            <div className="SeeChildNode">
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
                      label="组织性质"
                    >
                      {getFieldDecorator('localCenter', {
                        initialValue:Nodesdata.id,
                        rules: [],
                      })(
                       <Input disabled={ true }/>
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="全称"
                    >
                      {getFieldDecorator('fullName', {
                        initialValue:Nodesdata.name,
                        rules: [],
                      })(
                        <Input disabled={true}/>
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="简称"
                    >
                      {getFieldDecorator('referredTo', {
                        initialValue:Nodesdata.abbreviation,
                        rules: [],
                      })(
                        <Input disabled={ true }/>
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="英文名称"
                    >
                      {getFieldDecorator('englishName', {
                        initialValue:Nodesdata.englishName,
                        rules: [],
                      })(
                        <Input disabled={ true }/>
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="节点负责人"
                    >
                      {getFieldDecorator('englishName', {
                        initialValue:Nodesdata.leaderName,
                        rules: [],
                      })(
                        <Input disabled={ true }/>
                      )}
                    </FormItem>
                </Form>
                 <Button type="primary" className="edit" onClick={this.EditNode.bind(this,Nodesdata)}>编辑</Button>
                 <Button type="primary" className="delet" onClick={this.delet.bind(this,this.props.ID)} style={{display:display}}>删除</Button>
                <Button  type="primary" onClick={this.ReturnLeader.bind(this)}>返回</Button>
                <NodeEdit
                    visible={ this.state.NodeEditVisible }
                    handleOk={this.state.handleOk}
                    onCancel={ this.handleNodeEditCancel.bind(this) }
                    ID = {this.props.ID}
                    parentId ={this.props.parentId}
                    Nodesdata = {Nodesdata}
                    TissueProperty ={this.props.TissueProperty}
                />
            </div>
            </Modal>
        )
    }
}

SeeDtailed.propTypes = {}
SeeDtailed.defaultProps = {}
function SeeDtail({
  dispatch,
  getDepartmentNode
}) {
  return ( < div >
    <SeeDtailed dispatch = {
      dispatch
    }
    getDepartmentNode = {
      getDepartmentNode
    }
    /> </div >
  )
}
function mapStateToProps(state) {
  const {
    getDepartmentNode
  } = state.organization;
  return {
    loading: state.loading.models.organization,
    getDepartmentNode
    };
}
export default connect(mapStateToProps)(SeeDtailed)