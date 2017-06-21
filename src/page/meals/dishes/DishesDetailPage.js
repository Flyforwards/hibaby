/**
 * 菜品详情页面
 * Created by yangjingjing on 2017/6/12.
 */
"use strict"

import React from 'react';
import {connect} from 'dva';
import {message, Button, Icon,Form,Row,Col,Input,Select,Tag,Modal } from 'antd';
import { routerRedux } from 'dva/router';
import DishesDetailPageCss from './DishesDetailPage.css';
import PermissionButton from '../../../common/PermissionButton';


const FormItem = Form.Item;
const Option = Select.Option
const createForm = Form.create
@createForm()
class DishesDetailPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      disabled : true
    }
  }
  //编辑点击事件
  handleEdit(){
    const {dispatch} = this.props;
    dispatch(routerRedux.push(`/meals/dishes/editDishes`));
  }
  //删除点击事件
  handleDelate(id){
    const _this = this;
    Modal.confirm({
      title: '提示',
      content: '是否确定删除此菜品?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        const {dispatch} = _this.props;
        dispatch({
          type: 'dishes/deleteDishes',
          payload: {
            dataId : id
          }
        });
        _this.handleBack();
      }
    });
  }
  //返回点击事件
  handleBack(){
    const {dispatch} = this.props;
    dispatch(routerRedux.push(`/meals/dishes`))
  }

  render(){

    const formItemLayout0 = {
      labelCol:{ span: 4 },
      wrapperCol:{ span:15 }
    }
    const formItemLayout = {
      labelCol:{ span: 3 },
      wrapperCol:{ span:18 }
    }
    const _this = this;
    const {getFieldDecorator} = this.props.form;
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
                    required: false,
                    message: '食材名称不能为空'
                  }
                ],
              })(
                <Input disabled={this.state.disabled}/>
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
                    required: false,
                    message: '食材用量不能为空'
                  }
                ],
              })(
                <Input suffix="g" disabled={this.state.disabled}/>
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
                    <Input disabled={this.state.disabled} />
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
                    <Select placeholder="请选择" allowClear={true} disabled={this.state.disabled} >
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
                    <Select placeholder="请选择" allowClear={true} disabled={this.state.disabled} >
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
                    <Input disabled={this.state.disabled} />
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
                    <Input suffix="g" disabled={this.state.disabled} />
                  )}
                </FormItem>
              </Col>
            </Row>
            {IngredientsDOsRows}
          </div>
        </Form>
        <div>
          <PermissionButton testKey="DISHES_EDIT" className='myBtn SaveBtn' onClick={this.handleEdit.bind(this)}>编辑</PermissionButton>
          <PermissionButton testKey="DISHES_DELETE" className='myBtn RemoveBtn' onClick={this.handleDelate.bind(this,initialValue?initialValue.id:null)}>删除</PermissionButton>
          {/*<Button className='myBtn SaveBtn'onClick={this.handleEdit.bind(this)}>编辑</Button>*/}
          {/*<Button className='myBtn RemoveBtn'onClick={this.handleDelate.bind(this,initialValue?initialValue.id:null)}>删除</Button>*/}
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
export default connect(mapStateToProps)(DishesDetailPage);
