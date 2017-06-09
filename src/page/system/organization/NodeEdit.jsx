"use strict"
import React, {Component} from 'react'
import { connect } from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, Button} from 'antd'
import './AddChildNode.scss'
import SelectTheNodeFrom from './SelectTheNodeFrom.js'
import {local, session} from '../../../common/util/storage.js'

const createForm = Form.create
const FormItem = Form.Item
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
        const fields = this.props.form.getFieldsValue();
      /*  console.log("组织性质",this.props.TissuePropertyID)
        console.log("parentId",NodesdataEdit)
        console.log("ssd",fields)
        console.log("dsdsd",this.state.TableData)*/
        this.props.dispatch({
            type: 'organization/modifyDepartment',
            payload: {
              "abbreviation": fields.referredTo,
              "englishName": fields.englishName,
              "leaderId": this.state.TableData?this.state.TableData.id:NodesdataEdit.leaderId,
              "leaderName": this.state.TableData?this.state.TableData.name:NodesdataEdit.leaderName,
              "name": fields.fullName,
              "parentId":NodesdataEdit.parentId,
              "tissueProperty":this.props.TissuePropertyID,
              "id":this.props.ID
            }
        })
        this.setState({
          TableData:null
        })
        this.props.onCancel()
    }
    handleAfterClose() {
      this.setState({
        TableData:null
      })
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
      let endemic  = session.get("endemic")
      this.setState({
        visible:true
      })
    //  console.log("endemic.id",endemic.id)
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
      let localCenterData = []
      const {visible, form, confirmLoading, Nodesdata} = this.props
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
        if(this.props.TissueProperty != null){
          const loops = (roleId) => {
            return roleId.map((item)=>{
               return <Option value={item.id+""} key={item.id}>{item.tissueProperty}</Option>
            })
          }
          localCenterData = loops(this.props.TissueProperty)
        }
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
                onOk={this.handleOk.bind(this,Nodesdata,this.props.ID)}
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
                        <Input disabled={true}/>
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="组织性质"
                    >
                      {getFieldDecorator('localCenter', {
                        initialValue:this.props.TissuePropertyName,
                        rules: [],
                      })(
                         <Input disabled = { true }/>
                      )}
                    </FormItem>
                    <FormItem className="formText"
                     {...formItemLayout}
                      label="全称"
                    >
                      {getFieldDecorator('fullName', {
                        initialValue:Nodesdata.name,
                        rules: [{
                          max: 100, message: '输入内容过长'
                        }],
                      })(
                        <Input type="textarea" />
                      )}
                    </FormItem>
                    <FormItem className="formText"
                     {...formItemLayout}
                      label="简称"
                    >
                      {getFieldDecorator('referredTo', {
                        initialValue:Nodesdata.abbreviation,
                       rules: [{
                          max: 100, message: '输入内容过长'
                        }],
                      })(
                        <Input type="textarea" />
                      )}
                    </FormItem>
                    <FormItem className="formText"
                     {...formItemLayout}
                      label="英文名称"
                    >
                      {getFieldDecorator('englishName', {
                        initialValue:Nodesdata.englishName,
                        rules: [{
                          max: 100, message: '输入内容过长'
                        }],
                      })(
                        <Input type="textarea" />
                      )}
                    </FormItem>
                    <div className="leaderNode">
                    <FormItem
                     {...formItemLayout}
                      label="节点负责人"
                      className="nodeLeaderIput"
                    >
                      {getFieldDecorator('nodeLeaderIput', {
                        initialValue:this.state.TableData?this.state.TableData.name:Nodesdata.leaderName
                      })(
                        <Input className="nodeInput"/>
                      )}
                    </FormItem>
                    <FormItem
                    className="nodeLeader"
                    >
                      {getFieldDecorator('nodeLeader', {
                      })(
                        <Button className="selBtn" onClick={this.directLeader.bind(this)}>选择</Button>
                      )}
                    </FormItem>
                    </div>
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
