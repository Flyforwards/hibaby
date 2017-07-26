
import React from 'react';
import {connect} from 'dva';
import './PhoneSystemIndex.scss';
import { Card, Input, Button, Form, DatePicker, Select, Row, Col } from 'antd';
import { Link } from 'react-router';
const FormItem = Form.Item;
import PhoneSystemModalFrom from './PhoneSystemModalFrom'
const createForm = Form.create
const Option = Select.Option;

@createForm()
class PhoneSystemAddIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.userId = this.record.id;
        this.props.dispatch({
          type: 'phoneSystem/phoneSystemSave',
          payload: values
        })
      }
    })
  }


  onOk(record){
    this.record = record;
    const { setFieldsValue } = this.props.form;
    setFieldsValue({ userId: record.name });
  }

  onChoose () {
    this.props.dispatch({
      type: 'phoneSystem/showModal',
      payload: {
        modalType: 'create',
      },
    })
    this.props.dispatch({
      type: 'phoneSystem/getUserListByPage',
      payload: {}
    })
  }

  render() {
    const { form } = this.props;
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
    return (
      <div className="customer-phone-system-cent">
        <Card title = "添加客服信息:">
          <Form>
            <FormItem {...formItemLayout} label={"热线号码"}>
              {getFieldDecorator('hotLine', {rules: [{ required: true, message: '请填写热线号码!'}],
              })(<Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"座席号"}>
              {getFieldDecorator('cno', {rules: [{ required: true, message: '请填写坐席号!'}],
              })(<Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"密码"}>
              {getFieldDecorator('pwd', {rules: [{ required: true, message: '请填写密码'}],
              })(<Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"绑定电话"}>
              {getFieldDecorator('bindTel', {rules: [{ required: true, message: '请填写绑定电话!'}],
              })(<Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"电话类型"}>
              {getFieldDecorator('bindType', {rules: [{ required: true, }],initialValue: '1',
              })(<Select>
                  <Option value='1' >电话号码</Option>
                  <Option value='2' >分级号码</Option>
                  <Option value='3' >软电话</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"初始状态"}>
              {getFieldDecorator('initStatus', {rules: [{ required: true, } ],initialValue: 'online',
              })(<Select>
                  <Option value='online' >空闲</Option>
                  <Option value='pause' >置忙</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"绑定员工"}>
              {getFieldDecorator('userId', {rules: [{ required: true, message: '请选择绑定客服的员工!'}],
              })(
                <Input readOnly/>
              )}
              <Button className="right-button one-button" onClick={ this.onChoose.bind(this)}>选择员工</Button>
            </FormItem>
          </Form>
        </Card>
        <div className="button-group-bottom-common">
          <Link to='/crm/phone-system'>
            <Button className="button-group-bottom-1"> 返回 </Button>
          </Link>
          <Button className="button-group-bottom-2"  onClick={ this.handleSubmit.bind(this) }> 保存 </Button>
        </div>
        <PhoneSystemModalFrom  onOk={ this.onOk.bind(this) }/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
  } = state.phoneSystem;
  return {
    loading: state.loading,
  };
}

export default connect(mapStateToProps)(PhoneSystemAddIndex);
