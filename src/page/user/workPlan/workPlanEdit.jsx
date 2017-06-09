import React from 'react'
import { connect } from 'dva'
import { Form, Button, Card, Input, DatePicker, Row, Col } from 'antd'
import './workPlanIndex.scss'
const FormItem = Form.Item;
import moment from 'moment';
import { Link } from 'react-router'
import { routerRedux } from 'dva/router';
class WorkPlanAdd extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  handleSubmit = (e) => {
    const { dispatch, record } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        id: record.id,
        ...fieldsValue,
        'planTime': fieldsValue['planTime'].format('YYYY-MM-DD')
      };
      dispatch({
        type: 'workPlanIndex/editWorkPlan',
        payload: values
      })
    });
  }
  
  back() {
    this.props.dispatch(
      routerRedux.push('/user/work-plan')
    )
  }
  
  render() {
    const { form, record } = this.props;
    const { planInfo, planTime } = record ? record : '';
    let time = moment(planTime).format("YYYY-MM-DD");
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
                initialValue: moment(time)
              })(
                <DatePicker />
              )}
            </FormItem>
            <FormItem label="计划内容"   {...formItemLayout}>
              {getFieldDecorator('planInfo', {
                rules: [{ required: true, message: '此项为必填项' }],
                initialValue: planInfo
              })(
                <Input type="textarea" rows={6}/>
              )}
            </FormItem>
            {/*<FormItem>*/}
            {/*<Button className="SaveBtn" type="primary" htmlType="submit" size="large">保存</Button>*/}
            {/*</FormItem>*/}
            {/*<Button className="BackBtn" onClick={()=>this.back()}>返回</Button>*/}
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
  const { record } = state.workPlanIndex;
  return {
    loading: state.loading,
    record
  };
}

export default connect(mapStateToProps)(WorkPlanAddForm);
