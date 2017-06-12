/**
 * 创建/修改菜品表单页面
 * Created by yangjingjing on 2017/6/12.
 */
"use strict"

import React from 'react';
import {connect} from 'dva';
import {message, Button, Icon,Form,Row,Col,Input,Select,Tag } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option
const createForm = Form.create
@createForm()
class DishesFormPage extends React.Component{
  constructor(props){
    super(props);
  }

  handleSubmit(){

  }

  handleBack(){

  }
  render(){
    const {getFieldDecorator,initialValue} = this.props.form;
    const formItemLayout = {
      labelCol:{ span: 4 },
      wrapperCol:{ span:15 }
    }


    return (
      <div>
        <Form>
          <div>
            <Row>菜品信息</Row>
            <Row>
              <Col span={8}>
                <FormItem
                  label="菜品名称"
                  {...formItemLayout}
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
                  {...formItemLayout}
                >
                  {getFieldDecorator('name', {
                    initialValue: (initialValue==null ? '' : initialValue.name),
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
                  {...formItemLayout}
                >
                  {getFieldDecorator('name', {
                    initialValue: (initialValue==null ? '' : initialValue.name),
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

          <div>
            <Row>食材信息</Row>
            <Row>
              <Col span={2}>
                <Tag color="#f50">主食材</Tag>
              </Col>
              <Col span={12}>
                <FormItem
                  label="食材名称"
                  {...formItemLayout}
                >
                  {getFieldDecorator('name', {
                    initialValue: (initialValue==null ? '' : initialValue.name),
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
                    initialValue: (initialValue==null ? '' : initialValue.name),
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

            <Row>
              <Col span={2}>
                <Tag color="#f50">辅食材</Tag>
              </Col>
              <Col span={12}>
                <FormItem
                  label="食材名称"
                  {...formItemLayout}
                >
                  {getFieldDecorator('name', {
                    initialValue: (initialValue==null ? '' : initialValue.name),
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
                    initialValue: (initialValue==null ? '' : initialValue.name),
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

            <Row>
              <Col span={2}>
                <Tag color="#f50">辅食材</Tag>
              </Col>
              <Col span={12}>
                <FormItem
                  label="食材名称"
                  {...formItemLayout}
                >
                  {getFieldDecorator('name', {
                    initialValue: (initialValue==null ? '' : initialValue.name),
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
                    initialValue: (initialValue==null ? '' : initialValue.name),
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

            <Row>
              <Col span={2}>
                <Tag color="#f50">辅食材</Tag>
              </Col>
              <Col span={12}>
                <FormItem
                  label="食材名称"
                  {...formItemLayout}
                >
                  {getFieldDecorator('name', {
                    initialValue: (initialValue==null ? '' : initialValue.name),
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
                    initialValue: (initialValue==null ? '' : initialValue.name),
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

            <Row>
              <Col span={2}>
                <Tag color="#f50">辅食材</Tag>
              </Col>
              <Col span={12}>
                <FormItem
                  label="食材名称"
                  {...formItemLayout}
                >
                  {getFieldDecorator('name', {
                    initialValue: (initialValue==null ? '' : initialValue.name),
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
                    initialValue: (initialValue==null ? '' : initialValue.name),
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
