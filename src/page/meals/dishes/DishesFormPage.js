/**
 * 创建/修改菜品表单页面
 * Created by yangjingjing on 2017/6/12.
 */
"use strict"

import React from 'react';
import {connect} from 'dva';
import {message, Button, Icon,Form,Row,Col,Input,Select,Tag } from 'antd';
import { routerRedux } from 'dva/router';


const FormItem = Form.Item;
const Option = Select.Option
const createForm = Form.create
@createForm()
class DishesFormPage extends React.Component{
  constructor(props){
    super(props);
  }

  handleSubmit(){
    const {dispatch} = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const id = this.props.dishes.initialValue ? this.props.dishes.initialValue.id : null;
        dispatch({
          type: 'dishes/saveDishes',
          payload: {
            ...values,
            id : id
          }
        });
      }
    });
  }
  //返回
  handleBack(){
    const {dispatch} = this.props;
    dispatch(routerRedux.push(`/meals/dishes`));
  }

  render(){
    const _this = this;
    const {getFieldDecorator} = this.props.form;
    const formItemLayout0 = {
      labelCol:{ span: 4 },
      wrapperCol:{ span:15 }
    }
    const formItemLayout = {
      labelCol:{ span: 3 },
      wrapperCol:{ span:18 }
    }
    const {initialValue} = this.props.dishes;
    const IngredientsDOs = initialValue ? initialValue.IngredientsDOs : [];
    let mainIngredients = null; //主食材
    const auxiliaryArr = new Array();
    const IngredientsDOsRows = [];
    if(IngredientsDOs && IngredientsDOs.length > 0){
      IngredientsDOs.map(function (item,index) {
        if(item.type === 1){
          mainIngredients =  item;
        }else{
          auxiliaryArr.push(item);
        }
      });
    }
    let record = null;
    for(let i = 0; i < 4; i++){
      record = auxiliaryArr[i];
      IngredientsDOsRows.push(
        <Row>
          <Col span={1}>
            <Tag color="#f50">辅食材</Tag>
          </Col>
          <Col span={12}>
            <FormItem
              label="食材名称"
              {...formItemLayout}
            >
              {getFieldDecorator('name', {
                initialValue: (record==null ? '' : record.name),
                rules: [
                  {
                    required: true,
                    message: '食材名称不能为空'
                  }
                ],
              })(
                <Input disabled={_this.state.disabled}  />
              )}
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem
              label="食材用量"
              {...formItemLayout}
            >
              {getFieldDecorator('name', {
                initialValue: (record==null ? '' : record.volume),
                rules: [
                  {
                    required: true,
                    message: '食材用量不能为空'
                  }
                ],
              })(
                <Input disabled={_this.state.disabled}  suffix="g" />
              )}
            </FormItem>
          </Col>
        </Row>
      );
    }

    return (
      <div>
        <Form>
          <div>
            <Row><Col><div>菜品信息</div></Col></Row>
            <Row>
              <Col span={8}>
                <FormItem
                  label="菜品名称"
                  {...formItemLayout0}
                >
                  {getFieldDecorator('name', {
                    initialValue: (initialValue==null ? '' : initialValue.name),
                    rules: [
                      {
                        required: true,
                        message: '菜品名称不能为空'
                      }
                    ],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="荤素类型"
                  {...formItemLayout0}
                >
                  {getFieldDecorator('name', {
                    initialValue: (initialValue==null ? '' : initialValue.mvType+""),
                    rules: [
                      {
                        required: true,
                        message: '荤素类型不能为空'
                      }
                    ],
                  })(
                    <Select placeholder="请选择" allowClear={true}>
                      <Option value="0">正常</Option>
                      <Option value="1">禁用</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="菜品类型"
                  {...formItemLayout0}
                >
                  {getFieldDecorator('name', {
                    initialValue: (initialValue==null ? '' : initialValue.vdType+""),
                    rules: [
                      {
                        required: true,
                        message: '菜品类型不能为空'
                      }
                    ],
                  })(
                    <Select placeholder="请选择" allowClear={true}>
                      <Option value="0">正常</Option>
                      <Option value="1">禁用</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
          </div>

          <div style={{border:"solid"}}>
            <Row><Col><div>食材信息</div></Col></Row>
            <Row>
              <Col span={1}>
                <Tag color="#f50">主食材</Tag>
              </Col>
              <Col span={12}>
                <FormItem
                  label="食材名称"
                  {...formItemLayout}
                >
                  {getFieldDecorator('name', {
                    initialValue: (mainIngredients==null ? '' : mainIngredients.name),
                    rules: [
                      {
                        required: true,
                        message: '食材名称不能为空'
                      }
                    ],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem
                  label="食材用量"
                  {...formItemLayout}
                >
                  {getFieldDecorator('name', {
                    initialValue: (mainIngredients==null ? '' : mainIngredients.volume),
                    rules: [
                      {
                        required: true,
                        message: '食材用量不能为空'
                      }
                    ],
                  })(
                    <Input suffix="g" />
                  )}
                </FormItem>
              </Col>
            </Row>
            {IngredientsDOsRows}
          </div>
        </Form>
        <div>
          <Button className='commitButton SaveBtn'onClick={this.handleSubmit.bind(this)}>保存</Button>
          <Button className='commitButton BackBtn' onClick={this.handleBack.bind(this)}>返回</Button>
        </div>
      </div>
    );
  }

}
function mapStateToProps(state) {
  return {
    dishes: state.dishes
  };
}
export default connect(mapStateToProps)(DishesFormPage);
