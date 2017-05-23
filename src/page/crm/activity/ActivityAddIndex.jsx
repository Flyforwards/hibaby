
import React from 'react';
import {connect} from 'dva';
import './activityIndex.scss';
import { Card,Input,Button,Form,DatePicker } from 'antd';
import { Link } from 'react-router';
import { routerReducer } from 'react-router-redux';

import manager from 'common/util'
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
        console.log(values);
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
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const config = {
      rules: [{ type: 'object', required: true, message: '请选择活动时间!' }],
    };

    return (
      <div className="activity-cent">
        <Card title = "活动信息:" >
          <Form >
            <FormItem  {...formItemLayout} label="活动名称" >
              {getFieldDecorator('name', {rules: [{ required: true, message: '请填写活动名称' }],
              })(
                <Input className="input"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="活动时间" >
              {getFieldDecorator('activityTime', config)(
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
              })(<Input className="input"/>
              )}
            </FormItem>
          </Form>
        </Card>
        <div>
          <Link to='/crm/activity'>
            <Button> 返回 </Button>
          </Link>
          <Button onClick={ this.handleSubmit.bind(this) }> 创建 </Button>
        </div>

      </div>
    )
  }
}

export default connect()(AddGroupChar);
