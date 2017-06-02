/*
* updated by Flyforwards 2015/5/25
*
* */

import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'dva'
import './card.scss'
import { Button, Icon, Form, Input, Select, Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class CardFind extends Component {

  //点击搜索
  onSearch() {
    const { dispatch, form ,pagination} = this.props;
    const { validateFields } = form;
    form.validateFields((err, values) => {
      const postData = {
        ...values,
      };
      dispatch({
        type: 'card/getCard',
        payload: postData
      })

    });
 }
 //select 改变 权限
  onSelectChange = (value) => {
    let postDatas = null;
    this.props.form.validateFields((err, values) => {
      postDatas = {
        ...values,
      };
    });
    postDatas.salesDiscount=value;
    this.props.dispatch({
      type: 'card/getCard',
      payload: postDatas,
    })
  }
  //select 改变 卡种
  onSelectChangeCard(value) {
    let postDatas = null;
    this.props.form.validateFields((err, values) => {
      postDatas = {
        ...values,
      };
    });
    postDatas.cardType=value;
    this.props.dispatch({
      type: 'card/getCard',
      payload: postDatas,
    })
  }

  render() {
    const { form ,typeValues, zheKou } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol:{ span: 6 },
      wrapperCol:{ span:15 }
    }

    //卡种类型
    let cardTypeOptions=[];
    typeValues ? typeValues.map(function(elem,index){
      cardTypeOptions.push(<Option key={elem.id}>{elem.name}</Option>)
    }): null;
    //折扣權限
    let limitOptions = [];
    zheKou ? zheKou.map(function(elem,index){
      limitOptions.push(<Option key={elem.id}>{elem.name}</Option>)
    }) : null;
    const add = !this.props.permissionAlias.contains('CARD_ADD');
    return (
      <div className="cardFind" style={{ overflow:"hidden" }}>
        <Form>
          <Row>
            <Col span={ 16 } style={{ marginRight:'16px' }}>
              <FormItem>
                {getFieldDecorator('sear')(
                  <Input placeholder="输入会员卡名称、储值金额搜索…"/>
                )}
              </FormItem>
            </Col>
            <Col span={ 7 }>
              <Button type="primary" onClick={this.onSearch.bind(this)} size="large" style={{width:'120px',height:'40px',lineHeight:'38px',marginRight:'10px'}}><Icon type="search"/>搜索</Button>
              <Link to={{ pathname: '/crm/card/add' }} ><Button disabled={add} type="primary" style={{width:'120px',height:'40px',lineHeight:'38px'}} size="large">创建卡种</Button></Link>
            </Col>
          </Row>

          <Row style={{clear:'both' }}>
            <Col span= { 7 } style={{width:'290px'}}>
              <FormItem  {...formItemLayout} label="折扣权限">
                {getFieldDecorator('salesDiscount')(
                  <Select
                    showSearch
                    allowClear

                    placeholder="请选择"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    onChange={ this.onSelectChange.bind(this)}
                  >
                    { limitOptions }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={ 7 } style={{width:'290px'}}>
              <FormItem {...formItemLayout} label="卡种类型">
                {getFieldDecorator('cardType')(
                  <Select
                    showSearch
                    allowClear
                    placeholder="请选择"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    onChange={ this.onSelectChangeCard.bind(this)}
                  >
                    { cardTypeOptions }
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

function mapStateToProps(state) {
  const { cardInfo,typeValues, zheKou,pagination ,} = state.card;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading.models.card,
    permissionAlias,
    cardInfo,
    typeValues,
    zheKou,
    pagination,
  };
}
export default connect(mapStateToProps)(CardKindForm)
