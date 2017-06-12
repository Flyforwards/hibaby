/**
 * Created by wang on 2017/6/6.
 */

import React from 'react';
import {connect} from 'dva';
import './CustomerCompIndex.scss';
import { Card, Input, Button, Form,Select, Row, Col } from 'antd';
import DictionarySelect from 'common/dictionary_select';
import { Link } from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create
const Option = Select.Option


@createForm()
class CustomerCompAddIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'customerComp/saveCustomerComp',
          payload: values
        })
      }
    })
  }

  render() {
    const { departments, form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol:{ span: 3 },
      wrapperCol:{ span:20 }
    }

    const options =  departments.map((record)=>{
      return (<Option value={record.id} key={record.id}>{record.name}</Option>)
    });
    return (
      <div className="customer-comp-cent">
        <div className="add-activity">
          <Card className="CustomerComplaints"  title = "客户投诉:">
            <Form >
              <FormItem {...formItemLayout} label="投诉者" >
                {getFieldDecorator('name', {rules: [{ required: true, message: '请填写投诉者！', max: 10 }],
                })(
                  <Input className="input" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label={ "客诉名称"}>
                {getFieldDecorator('complaint', {rules: [{ required: true, message: '请选择客诉名称！' }],
                })(
                  <DictionarySelect  placeholder="请选择" selectName="KSMC" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={ "客诉等级"}>
                {getFieldDecorator('complaintGrade', {rules: [{ required: true, message: '请选择客诉等级！' }],
                })(
                  <DictionarySelect  placeholder="请选择" selectName="KSDJ" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={"客诉内容"}>
                {getFieldDecorator('content', {rules: [{ required: true, message: '请填写客诉内容，限200字！' , max: 200}],
                })(<Input type="textarea" rows={6} className="input"/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={"主责任部门"}>
                {getFieldDecorator('responsibilityDepartment', {rules: [{ required: true, message: '请选择主责任部门'}],
                })(
                  <Select className="input" >
                    {
                      options
                    }
                  </Select>
                )}
              </FormItem>
            </Form>
          </Card>
          <div>
            <Row>
              <Col offset={16} span={4}>
                <Link to='/crm/customer-comp'>
                  <Button className="BackBtn"> 返回 </Button>
                </Link>
              </Col>
              <Col span={4}>
                <Button className="SaveBtn" onClick={ this.handleSubmit.bind(this) }> 创建 </Button>
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
    departments
  } = state.customerComp;
  return {
    loading: state.loading,
    departments
  };
}

export default connect(mapStateToProps)(CustomerCompAddIndex);
