"use strict"

import React, {Component} from 'react'
import { connect } from 'dva'
import { Modal, Form, Input, Radio, Select, Checkbox, Icon, Button} from 'antd'
import './AddChildNode.scss'
import SelectTheNodeFrom from './SelectTheNodeFrom.js'
import { local, session} from '../../../common/util/storage.js'
import NodeEdit from './NodeEdit.jsx'
import PermissionButton from 'common/PermissionButton';
import _ from 'lodash'

const createForm = Form.create
const FormItem = Form.Item
const endemic  = session.get("endemic")
const Option = Select.Option

@createForm()
class SeeDtailed extends Component {
    constructor(props) {
        super(props)
        this.state = {
          visible:false,
          TableData:null,
          display:"inline-block",
          NodeEditVisible:false
        }
    }
    handleCancel() {
        this.props.onCancel()
    }
    handleOk() {
        this.props.onCancel()
    }
    checkbox() {
      //  console.log("checkbox")
    }
    ReturnLeader(){
      this.props.onCancel()
    }
    handleAfterClose(id) {
      this.props.dispatch({
        type: 'organization/getDepartmentNodes',
        payload: { }
      })
        this.props.form.resetFields()
    }
    componentDidMount() {
      this.asyncValidator = _.debounce(this.asyncValidator, 1000 * 3)
    }
    deleteNode(id){
      this.props.dispatch({
        type: 'organization/deleteDepartment',
          payload: {
            "dataId":id
          }
      })
      this.props.onCancel()
    }

    editNode(node){
      this.setState({
        NodeEditVisible: true
      })

    }
    handleNodeEditCancel(id){
      this.setState({
          NodeEditVisible: false
        })
      this.props.dispatch({
        type: 'organization/getDepartment',
          payload: {
            "dataId":id
          }
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
      let Nodesdata = {}
      let tissueProperty = ""
      let tissuePropertyId = ""
      let display = 'inline-block'
      let dataIndex = this.props.dataIndex
      let AllTissueProperty= this.props.AllTissueProperty
      if(dataIndex !=null && AllTissueProperty !=null){
          AllTissueProperty.map((item)=>{
            if(item.id == dataIndex){
              tissueProperty=item.tissueProperty
              tissuePropertyId = item.id
            }
          })
      }
      if(this.props.Nodesdata!=null){
        Nodesdata = this.props.Nodesdata
      }
        if(this.props.ID == 1 || this.props.ID == 3){
            display = 'none'
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
      const footer = (<div>
          <Button onClick={this.ReturnLeader.bind(this)}>返回</Button>
          <PermissionButton testKey='NODE_DELETE' onClick={this.deleteNode.bind(this,this.props.ID)} style={{display:display}}>删除</PermissionButton>
          <PermissionButton testKey='NODE_EDIT'  onClick={this.editNode.bind(this,Nodesdata)}>编辑</PermissionButton>
        </div>)

        return (
            <Modal
                visible={visible}
                title="节点详情"
                wrapClassName="SeeChildNode"
                closable={false}
                confirmLoading={confirmLoading}
                afterClose={this.handleAfterClose.bind(this,this.props.ID)}
                onCancel={this.handleCancel.bind(this)}
                onOk={this.handleOk.bind(this)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
                width={ 600 }
                footer={ footer }
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
                        <Input readOnly={ true }/>
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="组织性质"
                    >
                      {getFieldDecorator('localCenter', {
                        initialValue:tissueProperty,
                        rules: [],
                      })(
                       <Input readOnly={ true }/>
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
                        <Input readOnly={true}/>
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
                        <Input readOnly={ true }/>
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
                        <Input readOnly={ true }/>
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
                        <Input readOnly={ true }/>
                      )}
                    </FormItem>
                </Form>


                <NodeEdit
                    visible={ this.state.NodeEditVisible }
                    handleOk={this.state.handleOk}
                    onCancel={ this.handleNodeEditCancel.bind(this,this.props.ID) }
                    ID = {this.props.ID}
                    parentId ={this.props.parentId}
                    Nodesdata = {Nodesdata}
                    TissuePropertyName ={ tissueProperty }
                    TissuePropertyID = { tissuePropertyId }
                    TissueProperty = {this.props.TissueProperty}
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
