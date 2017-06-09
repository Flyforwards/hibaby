import React from 'react'
import { connect } from 'dva'
import { Form, Button, Card, Input, DatePicker, Row, Col } from 'antd'
import './workPlanIndex.scss'
const FormItem = Form.Item;
import moment from 'moment';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router'
class WorkPlanAdd extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  handleSubmit = (e) => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue,
        'planTime': fieldsValue['planTime'].format('YYYY-MM-DD')
      };
      dispatch({
        type: 'workPlanIndex/addWorkPlanInfo',
        payload: values
      })
    });
  }
  
  //back() {
  //  this.props.dispatch(
  //    routerRedux.push('/user/work-plan')
  //  )
  //}
  
  render() {
    const { date, form } = this.props;
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 19 }
    };
    return (
      <div className="workPlanAdd">
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="计划日期"   {...formItemLayout}>
              {getFieldDecorator('planTime', {
                rules: [{ required: true, message: '此项为必选项' }],
                initialValue: moment(date, 'YYYY-MM-DD')
              })(
                <DatePicker />
              )}
            </FormItem>
            <FormItem label="计划内容"   {...formItemLayout}>
              {getFieldDecorator('planInfo', {
                rules: [{ required: true, message: '此项为必填项' }]
              })(
                <Input type="textarea" rows={6}/>
              )}
            </FormItem>
            <Row gutter={16}>
              <Col span={6}/>
              <Col span={8}/>
              <Col span={4}>
                <FormItem>
                  <Button className="backLink"><Link to='/user/work-plan'>返回</Link>
                  </Button>
                </FormItem>
              </Col>
  
              <Col span={6}>
                <FormItem>
                  <Button className="saveInfoBtn" type="primary" htmlType="submit" size="large">保存</Button>
                </FormItem>
              </Col>
             
            
            </Row>
          </Form>
        
        
        </Card>
      
      </div>
    );
  }
}
const WorkPlanAddForm = Form.create()(WorkPlanAdd);

function mapStateToProps(state) {
  const { date } = state.workPlanIndex;
  return {
    loading: state.loading,
    date
  };
}

export default connect(mapStateToProps)(WorkPlanAddForm);
