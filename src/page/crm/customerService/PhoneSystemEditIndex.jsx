
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
      labelCol:{ span: 2 },
      wrapperCol:{ span:22 }
    }
    return (
      <div className="customer-phone-system-cent">
        <Card title = "添加客服信息:">
          <Form>
            <FormItem {...formItemLayout} label={"热线号码"}>
              {getFieldDecorator('hotLine', {rules: [{ required: true, }],initialValue: item.hotLine
              })(<Input className="input"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"座席号"}>
              {getFieldDecorator('cno', {rules: [{ required: true, }],initialValue: item.cno
              })(<Input className="input"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"密码"}>
              {getFieldDecorator('pwd', {rules: [{ required: true, }],initialValue: item.pwd
              })(<Input className="input"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"绑定电话"}>
              {getFieldDecorator('bindTel', {rules: [{ required: true, }],initialValue: item.bindTel
              })(<Input className="input"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"电话类型"}>
              {getFieldDecorator('bindType', {rules: [{ required: true, }],initialValue: String(item.bindType)
              })(<Select className="input">
                  <Option value='1' >电话号码</Option>
                  <Option value='2' >分级号码</Option>
                  <Option value='3' >软电话</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"初始状态"}>
              {getFieldDecorator('initStatus', {rules: [{ required: true, } ],initialValue: item.initStatus
              })(<Select className="input">
                  <Option value='online' >空闲</Option>
                  <Option value='pause' >置忙</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"绑定员工"}>
              {getFieldDecorator('userId', {rules: [{ required: true, }],initialValue: item.userName
              })(
                <Input readOnly className="input"/>
              )}
              <Button onClick={ this.onChoose.bind(this)}>选择员工</Button>
            </FormItem>
          </Form>
          <div>
            <Row>
              <Col offset={16} span={4}>
                <Link to='/crm/phone-system'>
                  <Button className="backBtn"> 返回 </Button>
                </Link>
              </Col>
              <Col span={4}>
                <Button className="saveBtn"  onClick={ this.handleSubmit.bind(this) }> 保存 </Button>
              </Col>
            </Row>
          </div>
        </Card>
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
