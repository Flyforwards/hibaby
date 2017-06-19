/**
 * 创建/修改菜品表单页面
 * Created by yangjingjing on 2017/6/12.
 */
"use strict"

import React from 'react';
import {connect} from 'dva';
import {message, Button, Icon,Form,Row,Col,Input,Select,Tag } from 'antd';
import { routerRedux } from 'dva/router';
import DishesDetailPageCss from './DishesDetailPage.css'



const FormItem = Form.Item;
const Option = Select.Option
const createForm = Form.create
@createForm()
class DishesFormPage extends React.Component{
  constructor(props){
    super(props);
  }

  handleSubmit(){
    const {dispatch,form} = this.props;
    form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        const id = this.props.dishes.initialValue ? this.props.dishes.initialValue.id : null;
        //菜品信息
        const dishes = {
          id : id,
          name : values.name,
          mvType : values.mvType,
          vdType : values.vdType,
          nodeId : this.props.dishes.nodeId
        };
        //食材信息
        const ingredientsDOJson = [];
        for(let i=0;i<5;i++){
          ingredientsDOJson.push({
            name : values["name"+i],
            volume : values["volume"+i],
            type : i==0 ? 1:2
          });
        }
        dispatch({
          type: 'dishes/saveDishes',
          payload: {
            ...dishes,
            ingredientsDOJson : JSON.stringify(ingredientsDOJson)
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
    const IngredientsDOs = initialValue ? initialValue.ingredientsDOs : [];
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
        <Row key={(i+5)+""}>
          <Col span={1}>
            <Tag color="#f50">辅食材</Tag>
          </Col>
          <Col span={12}>
            <FormItem
              label="食材名称"
              {...formItemLayout}
            >
              {getFieldDecorator(`${"name"+(i+1)}`, {
                initialValue: (record==null ? '' : record.name),
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
              {getFieldDecorator(`${"volume"+(i+1)}`, {
                initialValue: (record==null ? '' : record.volume),
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
      );
    }

    return (
      <div className="dishesDiv">
        <Form>
          <div className="dishes-info-div">
            <Row key="1"><Col><h3>菜品信息</h3></Col></Row>
            <Row key="2">
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
                  {getFieldDecorator('mvType', {
                    initialValue: (initialValue==null ? '' : initialValue.mvType+""),
                    rules: [
                      {
                        required: true,
                        message: '荤素类型不能为空'
                      }
                    ],
                  })(
                    <Select placeholder="请选择" allowClear={true}>
                      <Option value="0">荤</Option>
                      <Option value="1">素</Option>
                      <Option value="2">半荤</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="菜品类型"
                  {...formItemLayout0}
                >
                  {getFieldDecorator('vdType', {
                    initialValue: (initialValue==null ? '' : initialValue.vdType+""),
                    rules: [
                      {
                        required: true,
                        message: '菜品类型不能为空'
                      }
                    ],
                  })(
                    <Select placeholder="请选择" allowClear={true}>
                      <Option value="0">主食</Option>
                      <Option value="1">配菜</Option>
                      <Option value="2">点心</Option>
                      <Option value="3">水果</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
          </div>

          <div className="dishes-info-div">
            <Row key="3"><Col><h3 className="ingredients-info-div">食材信息</h3></Col></Row>
            <Row key="4">
              <Col span={1}>
                <Tag color="#f50">主食材</Tag>
              </Col>
              <Col span={12}>
                <FormItem
                  label="食材名称"
                  {...formItemLayout}
                >
                  {getFieldDecorator('name0', {
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
                  {getFieldDecorator('volume0', {
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
          <Button className='myBtn SaveBtn'onClick={this.handleSubmit.bind(this)}>保存</Button>
          <Button className='myBtn BackBtn' onClick={this.handleBack.bind(this)}>返回</Button>
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
