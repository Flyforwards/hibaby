
import React from 'react';
import {connect} from 'dva';
import './CourseIndex.scss';
import { Card, Input, Button, Form, DatePicker, InputNumber, Row, Col } from 'antd';

import { Link } from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create

@createForm()
class CourseAddIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'course/saveSerCourse',
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
      <div className="curriculum-cent">
        <Card title = "课程信息:">
          <Form >
            <FormItem {...formItemLayout} label="课程名称" >
              {getFieldDecorator('courseName', {rules: [{ required: true, message: '请填写课程名称' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="时间" >
              {getFieldDecorator('courseDate', {rules: [{ type: 'object', required: true, message: '请选择课程时间!' }],
              })(
                <DatePicker showTime format="YYYY-MM-DD HH:mm" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={ "地点"}>
              {getFieldDecorator('address', {rules: [{ required: true, message: '请填写课程地点！' }],
              })(<Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={ "参与人数"}>
              {getFieldDecorator('num', {rules: [{ required: true, message: '请填写参与人数！' }],
              })(<InputNumber min={1}/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={ "针对人群"}>
              {getFieldDecorator('crowd', {rules: [{ required: true, message: '请填写针对人群！' }],
              })(<Input/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={"内容"}>
              {getFieldDecorator('content', {rules: [{ required: true, message: '请填写课程内容！' }],
              })(<Input type="textarea" rows={6} />
              )}
            </FormItem>
          </Form>
        </Card>
        <div className="button-group-bottom-common">
          <Link to='/service/order-course'>
            <Button className="button-group-bottom-1"> 返回 </Button>
          </Link>
          <Button className="button-group-bottom-2"  onClick={ this.handleSubmit.bind(this) }> 创建 </Button>
        </div>
      </div>
    )
  }
}

export default connect()(CourseAddIndex);
