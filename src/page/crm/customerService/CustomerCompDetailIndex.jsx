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

    const backBtn = <Button key='1' className="button-group-bottom-1" onClick={this.back.bind(this)}>返回</Button>
    const delBtn = <Button key='2' disabled={!del} className="button-group-bottom-2" onClick={ this.delete.bind(this) }>删除</Button>
    const saveBtn = <Button key='3' disabled={!save} className="button-group-bottom-3" onClick={ this.handleSubmit.bind(this) }>保存</Button>;
    const finishBtn = <Button key='4' disabled={!finish} className="button-group-bottom-3" onClick={ this.finish.bind(this) }>已处理</Button>
    let buttons = (
      <div className="button-group-bottom-common">
        { [backBtn, delBtn] }
      </div>)
    if (item.state == 0) {
      if (save) {
        buttons = (
          <div className="button-group-bottom-common">
            { [backBtn, delBtn, saveBtn] }
          </div>)
        card = (
          <Card title = "投诉处理:"  style={{ marginTop: '10px'}}>
            <Form >
              <FormItem {...formItemLayout} label={"处理结果"}>
                {getFieldDecorator('treatmentResult', {rules: [{ required: true, message: '请填写处理结果!' }],initialValue:item.treatmentResult,
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
          <div className="button-group-bottom-common">
            { [backBtn, delBtn, finishBtn] }
          </div>)
      }
      card = (
        <Card title = "投诉处理:"  style={{ marginTop: '10px'}}>
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
        <Card title = "投诉处理:" style={{ marginTop: '10px'}}>
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
        <div className="add-customer-comp">
          <Card title = "客户投诉:">
              <FormItem {...formItemLayout} label="投诉者" >
                {getFieldDecorator('name', {
                  initialValue:item.name,
                })(
                  <Input readOnly className="input" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label={ "客诉名称"}>
                {getFieldDecorator('complaint', {
                  initialValue:String(item.complaint),
                })(
                  <DictionarySelect disabled placeholder="请选择" selectName="KSMC" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={ "客诉等级"}>
                {getFieldDecorator('complaintGrade', {
                  initialValue:String(item.complaintGrade)  ,
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
