"use strict"
import React, {Component} from 'react'
import { connect } from 'dva'
import {Modal, Form, Input, Radio, Select, Row, Col, Icon, Button,message} from 'antd'
import SelectTheNodeFrom from './SelectTheNodeFrom.js'
import {local, session} from 'common/util/storage.js'
import './AddJob.scss'
import _ from 'lodash';

const createForm = Form.create
const FormItem = Form.Item
const Option = Select.Option

let traversalDataId = []

@createForm()
class AddJob extends Component {
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
      const { form, dispatch, param } = this.props;
      form.validateFields((err, values) => {
        if (!err) {
          const { TableData } = this.state;
          let roles = []

          values.roles.map((item)=>{
            roles.push({"roleId":item})
          })
          dispatch({
            type: 'organization/addUserEntry',
            payload: {
              "contact":values.contact,
              "deptId": values.deptId,
              "email": values.email,
              "extension":values.extension,
              "leaderId": TableData ? TableData.id:'', //直系领导
              "positionId": values.positionId,
              "roles": roles,
              "userId": param.userId
            }
          })
          this.handleCancel()
        }
      })
    }


    // 隶属部门被选中时调用的函数
    affiliatedDepartment = (value,node, extra) => {
      traversalDataId = []
       this.props.dispatch({
          type: 'organization/position',
          payload: {
            dataId: value
          }
        })
    }

    handleAfterClose() {
        this.props.form.resetFields()
    }

    select(){
      let endemic  = session.get("endemic")
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
    headelReturnTabal(data){
      this.setState({
        TableData:data[0]
      })
    }
    handleCreateModalCancel() {
        this.setState({
          visible: false,
        })
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
      let traversalEndemicId = []
      const SelectData = local.get("rolSelectData")
      let selectDataList = []
      const {visible, form, confirmLoading} = this.props;
      const { getFieldDecorator } = form;
      if(this.props.dataEndemicId != null){
          traversalEndemicId = this.props.dataEndemicId.map((item)=>{
            return (<Option value={item.id+""} key={item.name}>{item.name}</Option>)
        })
      }

      if(this.props.dataId !== null){
          traversalDataId = this.props.dataId.map((item)=>{
            return (<Option value={item.id+""} key={item.name}>{item.name}</Option>)
        })
      }else{
        traversalDataId = null
      }
      if(SelectData != null){
          selectDataList = SelectData.map((item)=>{
            return (<Option value={item.id+""} key={item.name}>{item.name}</Option>)
        })
      }
      let endemic  = session.get("endemic")

      const formItemLayout = {
        labelCol: {
           span: 6
        },
        wrapperCol: {
           span: 13
        },
      };
      return (
          <Modal
              visible={visible}
              title="添加职位"
              okText="保存"
              cancelText="返回"
              closable={false}
              confirmLoading={confirmLoading}
              afterClose={this.handleAfterClose.bind(this)}
              onCancel={this.handleCancel.bind(this)}
              onOk={this.handleOk.bind(this)}
              style={{pointerEvents: confirmLoading ? 'none' : ''}}
              maskClosable={!confirmLoading}
              wrapClassName="AddJob"
              width={ 900 }
          >
            <Form style={{ margin: '10px' }}>
              <div className="title-information">职位信息</div>
              <Row>
                <Col span={12}>
                  <FormItem
                    label="地方中心"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('localCenter', {
                      initialValue: endemic.name,
                      rules: [{ required: true }]
                    })(
                      <Input  readOnly = { true }/>
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    label="隶属部门"
                    {...formItemLayout}
                  >
                    { getFieldDecorator("deptId",{
                      rules: [{ required: true, message: '请选择隶属部门!'}]
                    })(
                      <Select placeholder="请选择" onSelect = {this.affiliatedDepartment.bind(this)}>
                        { traversalEndemicId }
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem
                    label="直系领导"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('leaderId', {
                      initialValue: this.state.TableData?this.state.TableData.name:"",
                    })(
                      <Input readOnly={true}/>
                    )}
                    <Button className='right-button' onClick={this.select.bind(this)}>选择</Button>
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    label="职位"
                    {...formItemLayout}
                  >
                    { getFieldDecorator("positionId",{
                      rules: [{ required: true, message: '请选择职位!'}]
                    })(
                      <Select placeholder="请选择">
                        { traversalDataId }
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem
                    label="系统角色"
                    {...formItemLayout}
                  >
                    { getFieldDecorator("roles",{
                      rules: [{ required: true, message: '请选择系统角色!'}]
                    })(
                      <Select placeholder="请选择" dropdownMatchSelectWidth mode="multiple">
                        { selectDataList }
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <div className="title-information">联系方式</div>
              <Row>
                <Col span={12}>
                  <FormItem
                    label="联系方式"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('contact', {
                      rules: [{ required: true}, {
                        pattern:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '联系方式不正确'
                      }],
                    })(
                      <Input/>
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    label="公司邮箱"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('email', {
                      rules: [{ required: true}, {
                        type: 'email', message: '邮箱格式不正确'
                      }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem
                    label="内部分机"
                    {...formItemLayout}
                  >
                    {getFieldDecorator('extension', {
                      rules: [ {
                        pattern:/^[0-9\-]{0,20}$/, message: '请正确输入内部分机'
                      }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
          </Form>
          <SelectTheNodeFrom
           visible={ this.state.visible}
           onCancel ={ this.handleCreateModalCancel.bind(this) }
           treeData = {this.props.LeagerData}
           headelReturnTabal= {this.headelReturnTabal.bind(this)}
          />
        </Modal>
      )
    }
}


function mapStateToProps(state) {
  const {
    data,
    dataEndemicId,
    dataId,
    LeagerData,
  } = state.organization;
  return {
    loading: state.loading.models.organization,
    data,
    dataId,
    LeagerData,
    dataEndemicId,
  }
}
export default connect(mapStateToProps)(AddJob)
