/**
 * Created by wang on 2017/6/6.
 */

import React from 'react';
import {connect} from 'dva';
import './CustomerCompIndex.scss';
import { Card, Input, Button, Form, DatePicker,Select, Row, Col, Modal } from 'antd';
import DictionarySelect from 'common/dictionary_select';
import { Link } from 'react-router';
import { routerRedux } from 'dva/router'
const FormItem = Form.Item;
const createForm = Form.create
const Option = Select.Option

const confirm = Modal.confirm;

@createForm()
class CustomerCompDetailIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch, item } = this.props;
        // treatmentResult 应该填写当前用户的部门Id
        dispatch({
          type: 'customerComp/submitTreatmentResult',
          payload: { customerCompId: item.id, responsibilityDepartment: values.responsibilityDepartment, treatmentResult: values.treatmentResult}
        })
      }
    })
  }

  delete() {
    const { dispatch, item } = this.props;
    confirm({
      title: '提示',
      content: '是否确定删除此投诉？',
      onOk() {
        dispatch({
          type: 'customerComp/deleteCustomerCompFromDetail',
          payload: { dataId: item.id }
        })
      },
      onCancel() {
      },
    });
  }
  back () {
    this.props.dispatch(routerRedux.push('/crm/customer-comp'))
  }

  finish() {
    const { dispatch, item } = this.props;
    dispatch({
      type: 'customerComp/confirmTreatmentFinish',
      payload: { dataId: item.id }
    })
  }


  render() {
    const { departments, form, item } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol:{ span: 3 },
      wrapperCol:{ span:20 }
    }

    const options =  departments.map((record)=>{
      return (<Option value={record.id}  key={record.id}>{record.name}</Option>)
    });
    const save = this.props.permissionAlias.contains('CUSTOMERCOMP_SAVE');
    const finish = this.props.permissionAlias.contains('CUSTOMERCOMP_FINISH');
    const del = this.props.permissionAlias.contains('CUSTOMERCOMP_DELETE');

    let card = null;

    let buttons = (
      <div className="button-wrapper">
        <Button disabled={!del} className="delBtn" style={{ float:"right", marginRight: "20px" }} onClick={ this.delete.bind(this) }>删除</Button>
        <Button className="BackBtn" style={{ float:"right", marginRight: "20px" }} onClick={this.back.bind(this)}>返回</Button>
      </div>)
    if (item.state == 0) {
      if (save) {
        buttons = (
          <div className="button-wrapper">
            <Button disabled={!save} className="editBtn SaveBtn" style={{ float:"right", marginRight: "20px" }} onClick={ this.handleSubmit.bind(this) }>保存</Button>
            <Button disabled={!del} className="delBtn" style={{ float:"right", marginRight: "20px" }} onClick={ this.delete.bind(this) }>删除</Button>
            <Button className="BackBtn" style={{ float:"right", marginRight: "20px" }} onClick={this.back.bind(this)}>返回</Button>
          </div>)
        card = (
          <Card className="ComplaintHandle" title = "投诉处理:">
            <Form >
              <FormItem {...formItemLayout} label={"处理结果"}>
                {getFieldDecorator('treatmentResult', {initialValue:item.treatmentResult,
                })(<Input type="textarea" rows={6} className="input"/>
                )}
              </FormItem>
            </Form>
          </Card>
        )
      }

    }
    if (item.state == 1) {
      if (finish) {
        buttons = (
          <div className="button-wrapper">
            <Button disabled={!finish} className="editBtn" style={{ float:"right", marginRight: "20px" }} onClick={ this.finish.bind(this) }>已处理</Button>
            <Button disabled={!del} className="delBtn" style={{ float:"right", marginRight: "20px" }} onClick={ this.delete.bind(this) }>删除</Button>
            <Button className="backBtn" style={{ float:"right", marginRight: "20px" }} onClick={this.back.bind(this)}>返回</Button>
          </div>)
      }
      card = (
        <Card title = "投诉处理:">
          <Form >
            <FormItem {...formItemLayout} label={"处理结果"}>
              {getFieldDecorator('treatmentResult', {initialValue:item.treatmentResult,
              })(<Input readOnly type="textarea" rows={6} className="input"/>
              )}
            </FormItem>
          </Form>
        </Card>
      )
    }
    if (item.state == 2) {
      card = (
        <Card title = "投诉处理:">
          <Form >
            <FormItem {...formItemLayout} label={"处理结果"}>
              {getFieldDecorator('treatmentResult', {initialValue:item.treatmentResult,
              })(<Input readOnly type="textarea" rows={6} className="input"/>
              )}
            </FormItem>
          </Form>
        </Card>
      )
    }


    return (
      <div className="customer-comp-cent">
        <div className="add-activity">
          <Card className="CustomerComplaints" title = "客户投诉:">
            <Form >
              <FormItem {...formItemLayout} label="投诉者" >
                {getFieldDecorator('name', {
                  initialValue:item.name,
                })(
                  <Input readOnly className="input" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label={ "客诉名称"}>
                {getFieldDecorator('complaint', {
                  initialValue:item.complaint,
                })(
                  <DictionarySelect disabled placeholder="请选择" selectName="KSMC" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={ "客诉等级"}>
                {getFieldDecorator('complaintGrade', {
                  initialValue:item.complaintGrade,
                })(
                  <DictionarySelect disabled placeholder="请选择" selectName="KSDJ" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={"客诉内容"}>
                {getFieldDecorator('content', {initialValue:item.content,
                })(<Input readOnly type="textarea" rows={6} className="input"/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={"主责任部门"}>
                {getFieldDecorator('responsibilityDepartment', {
                  initialValue:item.responsibilityDepartment,
                })(
                  <Select disabled className="input" >
                    {
                      options
                    }
                  </Select>
                )}
              </FormItem>
            </Form>
          </Card>
          {
            card
          }
          {
            buttons
          }
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {
    item,
    departments
  } = state.customerComp;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading,
    item,
    departments,
    permissionAlias
  };
}

export default connect(mapStateToProps)(CustomerCompDetailIndex);
