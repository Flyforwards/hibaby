/**
 * Created by wang on 2017/6/6.
 */

import React from 'react';
import {connect} from 'dva';
import './CustomerVisIndex.scss';
import { Card, Input, Button, Form,Select, Row, DatePicker, Col } from 'antd';
import DictionarySelect from 'common/dictionary_select';
import { Link } from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create
const Option = Select.Option
import { VISIT_TIME } from 'common/constants.js'
import {local, session} from 'common/util/storage.js';
import moment from 'moment'

@createForm()
class CustomerVisAddIndex extends React.Component {
  constructor(props) {
    super(props);
    // value={ moment(record).format('A hh:mm')}
    this.options =  VISIT_TIME.map((record,index)=>{
      return (<Option value={record.value} key={index}>{record.name}</Option>)
    });
    this.userInfo = session.get("userInfo");
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.operatorId = this.userInfo.id;
        this.props.dispatch({
          type: 'customerVis/saveCustomerVis',
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


    return (
      <div className="customer-comp-cent">
        <div>
          <Card  title = "参观信息:">
            <Form >
              <FormItem {...formItemLayout} label="客户名称" >
                {getFieldDecorator('name', {rules: [{ required: true, message: '请填写投诉者！', max: 10 }],
                })(
                  <Input className="input" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label={ "参观日期"}>
                {getFieldDecorator('visitDate', {rules: [{ required: true, message: '请选择参观日期！' }],
                })(
                  <DatePicker format="YYYY-MM-DD" placeholder="请选择" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={ "参观时段"}>
                {getFieldDecorator('visitTime', {rules: [{ required: true, message: '请选择参观时段' }],
                })(
                  <Select>
                    {
                      this.options
                    }
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={"操作人"}>
                {getFieldDecorator('operatorName', {rules: [{ required: true}], initialValue: this.userInfo.name,
                })(<Input readOnly className="input" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={"预约备注"}>
                {getFieldDecorator('remarks', {rules: [{ required: true, message: '请填写预约备注!'}],
                })(
                  <Input type="textarea" rows={6} className="input"/>
                )}
              </FormItem>
            </Form>
          </Card>
          <div>
            <Row>
              <Col offset={16} span={4}>
                <Link to='/crm/customer-vis'>
                  <Button className="BackBtn"> 返回 </Button>
                </Link>
              </Col>
              <Col span={4}>
                <Button className="SaveBtn" onClick={ this.handleSubmit.bind(this) }> 保存 </Button>
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
  } = state.customerVis;
  return {
    loading: state.loading,
  };
}

export default connect(mapStateToProps)(CustomerVisAddIndex);
