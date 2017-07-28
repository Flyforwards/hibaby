
import React from 'react';
import {connect} from 'dva';
import './activityIndex.scss';
import { Card, Input, Button, Form, DatePicker, Row, Col } from 'antd';

import { Link } from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create

@createForm()
class AddGroupChar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'activity/saveActivity',
          payload: values
        })
      }
    })
  }

  render() {

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

    return (
      <div className="activity-cent">
          <Card title = "活动信息:">
            <Form >
                <FormItem {...formItemLayout} label="活动名称" >
                  {getFieldDecorator('name', {rules: [{ required: true, message: '请填写活动名称' }],
                  })(
                    <Input />
                  )}
                </FormItem>
              <FormItem {...formItemLayout} label="活动时间" >
                {getFieldDecorator('activityTime', {rules: [{ type: 'object', required: true, message: '请选择活动时间!' }],
                })(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={ "活动地点"}>
                {getFieldDecorator('address', {rules: [{ required: true, message: '请填写活动地点！' }],
                })(<Input/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={"活动内容"}>
                {getFieldDecorator('content', {rules: [{ required: true, message: '请填写活动内容！' }],
                })(<Input type="textarea" rows={6} />
                )}
              </FormItem>
            </Form>
          </Card>
          <div className="button-group-bottom-common">
            <Link to='/crm/activity'>
              <Button className="button-group-bottom-1"> 返回 </Button>
            </Link>
            <Button className="button-group-bottom-2"  onClick={ this.handleSubmit.bind(this) }> 创建 </Button>
          </div>
      </div>
    )
  }
}

export default connect()(AddGroupChar);
