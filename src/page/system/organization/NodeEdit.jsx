"use strict" 
import React, {Component} from 'react'
import { connect } from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, Button} from 'antd'
import './AddChildNode.scss'
import SelectTheNodeFrom from './SelectTheNodeFrom.js'
import {local, session} from '../../../common/util/storage.js'

const createForm = Form.create
const FormItem = Form.Item
const endemic  = session.get("endemic")
const CheckboxGroup = Checkbox.Group
const Option = Select.Option
@createForm()
class NodeEdited extends Component {
    constructor(props) {
        super(props)
        this.state = {
          visible:false,
          TableData:null
        }
    }
    handleCancel() {
        this.props.onCancel()
    }
    handleOk(NodesdataEdit) {
        console.log("ok",this.props.ID)
        console.log("oktablea",this.state.TableData)
        console.log("okdata",data)
        const fields = this.props.form.getFieldsValue();
        console.log("fields",fields)
        
        this.props.dispatch({
            type: 'organization/modifyDepartment',
            payload: {
              "abbreviation": fields.referredTo,//简称
              "englishName": fields.englishName,
              "leaderId": this.state.TableData.id?this.state.TableData.id:NodesdataEdit.leaderId,
              "leaderName": this.state.TableData.name?this.state.TableData.name:NodesdataEdit.operatorName,
              "name": fields.fullName,
             " parentId":this.props.ID,
              "tissueProperty": fields.localCenter,
              "id":NodesdataEdit.id
            }
        })
       
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
    //选择直系领导
    directLeader = ()=>{
      this.setState({
        visible:true
      })
      this.props.dispatch({
        type: 'organization/getLeagerDepartmentNodes',
        payload: {
            "nodeId": endemic.id,
            "tissueProperty": endemic.tissueProperty
        }
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
      let NodesdataEdit ={}
        const {visible, form, confirmLoading, Nodesdata} = this.props
        if( Nodesdata != null){
          NodesdataEdit = Nodesdata
        }
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
        console.log(NodesdataEdit)
        return (
            <Modal
                visible={visible}
                title="节点详情"
                okText="保存"
                cancelText="返回"
                wrapClassName="AddChildNode"
                closable={false}
                confirmLoading={confirmLoading}
                afterClose={this.handleAfterClose.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                onOk={this.handleOk.bind(this,NodesdataEdit)}
                style={{pointerEvents: confirmLoading ? 'none' : ''}}
                maskClosable={!confirmLoading}
                width={ 700 }
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
                        <Input display={true}/>
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="组织性质"
                    >
                      {getFieldDecorator('localCenter', {
                        initialValue:"青岛",
                        rules: [],
                      })(
                        <Select>
                            <Option value="1">地方中心</Option>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="全称"
                    >
                      {getFieldDecorator('fullName', {
                        initialValue:NodesdataEdit.name,
                        rules: [],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="简称"
                    >
                      {getFieldDecorator('referredTo', {
                        initialValue:NodesdataEdit.abbreviation,
                        rules: [],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="英文名称"
                    >
                      {getFieldDecorator('englishName', {
                        initialValue:NodesdataEdit.englishName,
                        rules: [],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="节点负责人"
                      className="nodeLeaderIput"
                    >
                      {getFieldDecorator('nodeLeaderIput', {
                        initialValue:NodesdataEdit.operatorName
                      })(
                        <Input/>
                      )}
                    </FormItem>
                    <FormItem
                    className="nodeLeader"
                    >
                      {getFieldDecorator('nodeLeader', {
                      })(
                        <Button type="primary" onClick={this.directLeader.bind(this)}>选择</Button>
                      )}
                    </FormItem>
                </Form>
                <SelectTheNodeFrom
                 visible={ this.state.visible}
                 onCancel ={ this.handleCreateModalCancel.bind(this) }
                 treeData = {this.props.LeagerData}
                 headelReturnTabal= {this.headelReturnTabal.bind(this)}
                />
            </div>
            </Modal>
        )
    }
}

NodeEdited.propTypes = {}
NodeEdited.defaultProps = {}
function NodeEdit({
  dispatch,
  LeagerData
}) {
  return ( < div >
    <NodeEdited dispatch = {
      dispatch
    }
    LeagerData = {
      LeagerData
    }
    /> </div >
  )
}
function mapStateToProps(state) {
  const {
    LeagerData
  } = state.organization;
  return {
    loading: state.loading.models.organization,
    LeagerData
    };
}
export default connect(mapStateToProps)(NodeEdited)

