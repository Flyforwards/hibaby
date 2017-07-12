
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
class PhoneSystemEditIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (!this.record) {
          values.userId = this.props.item.userId ;
        } else {
          values.userId = this.record.id;
        }

        values.id = this.props.item.id;
        this.props.dispatch({
          type: 'phoneSystem/phoneSystemEditSave',
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
    const { form, item } = this.props;

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
              {getFieldDecorator('hotLine', {rules: [{ required: true, }],initialValue: item.hotLine
              })(<Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"座席号"}>
              {getFieldDecorator('cno', {rules: [{ required: true, }],initialValue: item.cno
              })(<Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"密码"}>
              {getFieldDecorator('pwd', {rules: [{ required: true, }],initialValue: item.pwd
              })(<Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"绑定电话"}>
              {getFieldDecorator('bindTel', {rules: [{ required: true, }],initialValue: item.bindTel
              })(<Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"电话类型"}>
              {getFieldDecorator('bindType', {rules: [{ required: true, }],initialValue: String(item.bindType)
              })(<Select>
                  <Option value='1' >电话号码</Option>
                  <Option value='2' >分级号码</Option>
                  <Option value='3' >软电话</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"初始状态"}>
              {getFieldDecorator('initStatus', {rules: [{ required: true, } ],initialValue: item.initStatus
              })(<Select>
                  <Option value='online' >空闲</Option>
                  <Option value='pause' >置忙</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"绑定员工"}>
              {getFieldDecorator('userId', {rules: [{ required: true, }],initialValue: item.userName
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
          <Button className="button-group-bottom-2" onClick={ this.handleSubmit.bind(this) }> 保存 </Button>
        </div>
        <PhoneSystemModalFrom  onOk={ this.onOk.bind(this) }/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    item
  } = state.phoneSystem;
  return {
    item
  };
}

export default connect(mapStateToProps)(PhoneSystemEditIndex);
