
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
        //console.log(values);
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
      labelCol:{ span: 2 },
      wrapperCol:{ span:22 }
    }

    return (
      <div className="activity-cent">
        <div className="add-activity">
          <Card title = "活动信息:">
            <Form >
                <FormItem {...formItemLayout} label="活动名称" >
                  {getFieldDecorator('name', {rules: [{ required: true, message: '请填写活动名称' }],
                  })(
                    <Input className="input" />
                  )}
                </FormItem>
              <FormItem {...formItemLayout} label="活动时间" >
                {getFieldDecorator('activityTime', {rules: [{ type: 'object', required: true, message: '请选择活动时间!' }],
                })(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={ "活动地点"}>
                {getFieldDecorator('address', {rules: [{ required: true, message: '请填写活动地点！' }],
                })(<Input className="input"/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={"活动内容"}>
                {getFieldDecorator('content', {rules: [{ required: true, message: '请填写活动内容！' }],
                })(<Input type="textarea" rows={6} className="input"/>
                )}
              </FormItem>
            </Form>
            <div>
              <Row>
                <Col offset={16} span={4}>
                  <Link to='/crm/activity'>
                    <Button className="backBtn"> 返回 </Button>
                  </Link>
                </Col>
                <Col span={4}>
                  <Button type='primary' onClick={ this.handleSubmit.bind(this) }> 创建 </Button>
                </Col>
              </Row>

            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect()(AddGroupChar);
