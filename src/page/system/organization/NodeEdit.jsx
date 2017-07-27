"use strict"
import React, {Component} from 'react'
import { connect } from 'dva'
import {Modal, Form, Input, Radio, Select, Button} from 'antd'
import './AddChildNode.scss'
import SelectTheNodeFrom from './SelectTheNodeFrom.js'
import {local, session} from '../../../common/util/storage.js'
import _ from 'lodash';

const createForm = Form.create
const FormItem = Form.Item
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
      this.setState({
        TableData:null
      })
      this.props.onCancel()
    }

    handleOk(e) {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const { dispatch, Nodesdata, TissuePropertyID, ID } = this.props;
          dispatch({
            type: 'organization/modifyDepartment',
            payload: {
              abbreviation: values.abbreviation,
              englishName: values.englishName,
              leaderId: this.state.TableData?this.state.TableData.id: Nodesdata.leaderId,
              leaderName: this.state.TableData?this.state.TableData.name: Nodesdata.leaderName,
              name: values.fullName,
              parentId: Nodesdata.parentId,
              tissueProperty: TissuePropertyID,
              id: ID
            }
          })
          this.handleCancel()
        }
      })
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
      const { visible, form, confirmLoading, Nodesdata} = this.props
        const { getFieldDecorator } = form;
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
      const bottomItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
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
                title="编辑节点"
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
                        rules: [{required: true}],
                      })(
                        <Input readOnly={true}/>
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="组织性质"
                    >
                      {getFieldDecorator('localCenter', {
                        initialValue:this.props.TissuePropertyName,
                        rules: [{ required: true, message: '请选择组织性质！'}],
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
                        rules: [{ required: true, message: '请输入全称！'},{
                          max: 15, message: '全称不能太长！'
                        }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="简称"
                    >
                      {getFieldDecorator('abbreviation', {
                        initialValue:Nodesdata.abbreviation,
                       rules: [{ required: true, message: '请输入简称！'},{
                         max: 15, message: '简称不能太长！'
                       }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                      label="英文名称"
                    >
                      {getFieldDecorator('englishName', {
                        initialValue:Nodesdata.englishName,
                        rules: [{ required: true, message: '请输入英文名称！'},{
                          max: 15, message: '英文名称不能太长！'
                        }],
                      })(
                        <Input/>
                      )}
                    </FormItem>
                    <FormItem
                     {...bottomItemLayout}
                      label="节点负责人"
                    >
                      {getFieldDecorator('nodeLeader', {
                        initialValue:this.state.TableData?this.state.TableData.name:Nodesdata.leaderName
                      })(
                        <Input readOnly/>
                      )}
                      <Button className="right-button selBtn" onClick={this.directLeader.bind(this)}>选择</Button>
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
