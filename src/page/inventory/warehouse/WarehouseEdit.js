/**
 * Created by Administrator on 2017/11/22.
 */
/**
 * Created by Flyforwards on 2017/11/21.
 */

import React,{ Component } from 'react';
import { connect } from 'dva'
import { Card, Input, Button, Form, DatePicker, Row, Col,Table,Popconfirm,Select } from 'antd';
import { Link } from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create
import moment from 'moment'
const Option = Select.Option;
import './inventoryIndex.scss'
import { format,queryURL } from '../../../utils/index.js';
import { routerRedux } from 'react-router';

@createForm()
class WarehouseEdit extends Component {
  constructor(props){
    super(props);
    this.state={
      edit:true,
    }

  }

//搜索
  handleSearch(){
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     // this.props.dispatch({
    //     //   type: 'activity/saveActivity',
    //     //   payload: values
    //     // })
    //   }
    // })
    // console.log("xx")
  }
  /*返回*/
  onBack(){
    if(queryURL('id')){
      this.props.dispatch(
        routerRedux.push({
          pathname:'/inventory/warehouse/detail',
          query:{
            id:queryURL('id')
          }
        })
      )
    }else{
      this.props.dispatch(
        routerRedux.push({
            pathname:'/inventory/warehouse'
        }
        )
      )
    }
  }
  /*保存*/
  onSave(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(queryURL('id')){
          values.id = queryURL('id');
        }
        this.props.dispatch({
          type: 'inventory/saveWarehouse',
          payload: values
        })
      }
    })
  }
  /*改变状态*/
  handleChange(){

  }
  componentWillUnmount() {
    this.props.dispatch({ type: 'inventory/removeData' })
  }
  render(){
    const { detailData} = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        span:6
      },
      wrapperCol: {
        span:18
      },
    }
    const formItemLayouts = {
      labelCol: {
        span:2
      },
      wrapperCol: {
        span:21
      },
    }
    return (
      <div className="inventoryIndex">
        <Card>
          <Row>
            <Form >
              <Col span={8}>
                <FormItem {...formItemLayout} label="仓库名字" style={{textAlign:'center'}} >
                  {getFieldDecorator('warehouseName', {
                    initialValue:detailData ? detailData.warehouseName:'',
                    rules: [{ required: true, message: '请填写仓库名字' }],
                  })(
                    <Input placeholder="请输入仓库名字" />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="所属机构" style={{textAlign:'center'}}>
                  {getFieldDecorator('belongOrganization', {
                    initialValue: detailData ? detailData.belongOrganization:'',
                    rules: [{ required: true, message: '请填写仓库所属机构' }],
                  })(
                    <Input placeholder="请输入所属机构"/>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="管理人" style={{textAlign:'center'}} >
                  {getFieldDecorator('managerName', {
                    initialValue: detailData ? detailData.managerName:'',
                    rules: [{ required: true, message: '请填写仓库管理人' }],
                  })(
                    <Input placeholder="请输入仓库管理人" />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="联系电话" style={{textAlign:'center'}} >
                  {getFieldDecorator('mobile', {
                    initialValue: detailData ? detailData.mobile:'',
                    rules: [{ required: true, message: '请填写仓库联系电话' }],
                  })(
                    <Input placeholder="请输入仓库联系电话" />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="仓库状态" style={{textAlign:'center'}} >
                  {getFieldDecorator('status', {
                    initialValue: detailData ? detailData.status+'':'',
                    rules: [{ required: true, message: '请选择仓库状态' }],
                  })(
                    <Select
                      placeholder="请选择仓库状态"
                      onChange={this.handleChange.bind(this)}
                    >
                      <Option value="0">正常</Option>
                      <Option value="1">停用</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem {...formItemLayouts} label="备注"  style={{textAlign:'center'}} >
                  {getFieldDecorator('remarks', {
                    initialValue: detailData ? detailData.remarks:'',
                    rules: [{ required: false, message: '' }],
                  })(
                    <Input type="textarea"/>
                  )}
                </FormItem>
              </Col>
            </Form>
          </Row>
          <Row>
            <Col>
              <div className="button-group-bottom-common">
                <Button className="button-group-bottom-1" onClick={this.onBack.bind(this)} >返回</Button>
                <Button className="button-group-bottom-2" onClick={ this.onSave.bind(this) } >保存</Button>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }

}

function mapStateToProps(state) {
  const {detailData } = state.inventory;
  return{
    loading: state.loading.models.inventory,
    detailData
  };
}

export default connect(mapStateToProps)(WarehouseEdit);
