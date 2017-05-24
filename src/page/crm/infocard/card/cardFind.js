import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'dva'
import './card.scss'
import { Button, Icon, Form, Input, Select, Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class CardFind extends Component {
  handleSubmit = (e) => {
    const { dispatch, form } = this.props;
    const { validateFields } = form;
    e.preventDefault();
    validateFields((err, values) => {
      const postData = {
        ...values,
        "page": 1,
        "size": 2,
        "sortField": "string",
        "sortOrder": "string"
      };
      dispatch({
        type: 'card/getPostInfo',
        payload: postData
      });
      dispatch({
        type: 'card/getCard',
        payload: postData
      })

    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol:{ span: 8 },
      wrapperCol:{ span:15 }
    }
    return (
      <div className="cardFind">
        <Form>
          <Row>
            <Col span={ 16 } style={{ marginRight:'16px' }}>
              <FormItem>
                {getFieldDecorator('sear')(
                  <Input placeholder="输入会员卡名称、储值金额搜索…"/>
                )}
              </FormItem>
            </Col>
            <Col span={ 6 }>
              <Button type="primary" size="large" style={{width:'120px',height:'40px',lineHeight:'38px',marginRight:'10px'}}><Icon type="search"/>搜索</Button>
              <Link to={{ pathname: '/crm/cardInfo' }} href="#"><Button type="primary" style={{width:'120px',height:'40px',lineHeight:'38px'}} size="large">创建卡种</Button></Link>
            </Col>
          </Row>
          <Row>
            <Col span= { 7 }>
              <FormItem  {...formItemLayout} label="折扣权限">
                {getFieldDecorator('salesDiscount')(
                  <Select
                    showSearch
                    allowClear
                    placeholder="请选择"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option value="100">100</Option>
                    <Option value="90">90</Option>
                    <Option value="80">80</Option>
                    <Option value="70">70</Option>
                    <Option value="60">60</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={ 7 }>
              <FormItem {...formItemLayout} label="卡种类型">
                {getFieldDecorator('cardType')(
                  <Select
                    showSearch
                    allowClear
                    placeholder="请选择"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option value="1">模板卡种</Option>
                    <Option value="2">自定义卡种</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const CardKindForm = Form.create()(CardFind);

function CardFindCom({ dispatch }) {

  return (
    <CardKindForm dispatch={dispatch}/>
  )
}
function mapStateToProps(state) {
  const { cardInfo } = state.card;
  return {
    loading: state.loading.models.card,
    cardInfo
  };
}
export default connect(mapStateToProps)(CardFindCom)
