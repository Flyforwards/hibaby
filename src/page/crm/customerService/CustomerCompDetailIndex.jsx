/**
 * Created by wang on 2017/6/6.
 */

import React from 'react';
import {connect} from 'dva';
import './CustomerCompIndex.scss';
import { Card, Input, Button, Form, DatePicker,Select, Row, Col, Modal } from 'antd';
import DictionarySelect from 'common/dictionary_select';
import { Link } from 'react-router';
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

  render() {
    const { departments, form, item } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol:{ span: 2 },
      wrapperCol:{ span:22 }
    }

    const options =  departments.map((record)=>{
      return (<Option value={record.id}  key={record.id}>{record.name}</Option>)
    });
    return (
      <div className="activity-cent">
        <div className="add-activity">
          <Card title = "客户投诉:">
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
          <Card title = "投诉处理:">
            <Form >
              <FormItem {...formItemLayout} label={"处理结果"}>
                {getFieldDecorator('treatmentResult', {initialValue:item.treatmentResult,
                })(<Input type="textarea" rows={6} className="input"/>
                )}
              </FormItem>
            </Form>
          </Card>
          <div>
            <Row>
              <Col offset={4} span={4}>
                <Link to='/crm/customer-comp'>
                  <Button className="backBtn"> 返回 </Button>
                </Link>
              </Col>
              <Col span={4}>
                <Button type='primary' onClick={ this.delete.bind(this) }> 删除 </Button>
              </Col>
              <Col span={4}>
                <Button type='primary' onClick={ this.handleSubmit.bind(this) }> 保存 </Button>
              </Col>
            </Row>
          </div>
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
  return {
    loading: state.loading,
    item,
    departments
  };
}

export default connect(mapStateToProps)(CustomerCompDetailIndex);
