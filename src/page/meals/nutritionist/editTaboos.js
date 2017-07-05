/**
 * Created by Flyforwards on 2017/6/20.
 */
import React from 'react';
import './index.scss';
import { connect } from 'dva';
import {Select, Button, Input, Form, Col, Icon,Row, InputNumber, Modal,Spin} from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import { queryURL } from '../../../utils/index';
const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create;

@createForm()
class EditTaboo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addList:[],
      uids:6,
    }
  }
  componentDidMount(){
    const dataId = queryURL("dataId");
    this.props.dispatch({
      type:'dinner/getTabooFood',
      payload:{
        dataId:dataId,
      }
    })
  }
 // 返回
  onBack(){
    this.props.dispatch(routerRedux.push({
        pathname:'/meals/nutritionist/dinner'
      })
    )
    //history.go(-1)
  }
  //移除当前
  remove = (k) => {
    const { form } = this.props;
    const ikeys = form.getFieldValue('ikeys');
    form.setFieldsValue({
      ikeys: ikeys.filter(key => key !== k)
    });
  }
  //保存禁忌信息
  onSave(){
    const fields = this.props.form.getFieldsValue();
    console.log("保存",fields)
    const { dispatch } =this.props;
    const customerId = queryURL("dataId");
    let itemStr ='';
    for(var item in fields){
      if(item.match("taboo")){
        if(fields[item].trim()){
          itemStr+= fields[item]+',';
        }
      }
    }
    itemStr = itemStr.substr(0,itemStr.length-1);
   dispatch({
     type:'dinner/setTabooFood',
     payload:{
       "customerId":customerId,
       "sugar":fields.sugar,
       "taboo":itemStr,
       "id":this.props.tabooData ?this.props.tabooData.id :'',
     }
   })

  }

  //添加禁忌
  onAdd() {
    this.setState({
      uids: this.state.uids + 1
    })
    const { form } = this.props;
    const ikeys = form.getFieldValue('ikeys');
    const nextKeys = ikeys.concat(this.state.uids);
    form.setFieldsValue({
      ikeys: nextKeys
    });
  }
  render() {
    const {loading, dispatch, form,tabooData,customerData } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 }
    };
    const formChooseOneSugar = {
      labelCol: { span:3},
      wrapperCol: { span: 19 }
    };
    getFieldDecorator('keys', {initialValue: [0,1,2,3,4,5]});
    getFieldDecorator('ikeys', {initialValue: []});
    const keys = getFieldValue('keys');
    const tabooArr = tabooData ? tabooData.taboo.split(','):[];
    tabooArr.length > keys.length ? this.state.uids = tabooArr.length:6;
    const items = tabooArr.length > keys.length ? tabooArr.map((i,index) => {
      return(
        <Col key={i} span={8} className="delDisplan">
          <FormItem
            {...formItemLayout}
            label="禁忌食材"
            required={false}
            key={i}
          >
            {getFieldDecorator(`taboo-${i}`, {
              initialValue:tabooArr[index] == undefined ? '':tabooArr[index]
            })(
              <Input placeholder="请输入禁忌食材"/>
            )}
          </FormItem>
        </Col>
      )
    }): keys.map((k,index) => {
        return(
          <Col key={k} span={8} className="delDisplan">
            <FormItem
              {...formItemLayout}
              label="禁忌食材"
              required={false}
              key={k}
            >
              {getFieldDecorator(`taboo-${k}`, {
                initialValue:tabooArr[index] == undefined ? '':tabooArr[index]
              })(
                <Input placeholder="请输入禁忌食材"/>
              )}
            </FormItem>
          </Col>
        )
      });

   //添加禁忌
    const ikeys = getFieldValue('ikeys');
    const newItems = ikeys .map((v,index) => {
      return(
        <Col key={v} span={8} className="delDisplan">
          <FormItem
            {...formItemLayout}
            label="禁忌食材"
            required={false}
            key={v}
          >
            {getFieldDecorator(`taboo-${v}`, {
            })(
              <Input placeholder="请输入禁忌食材"  style={{ width: '90%', marginRight: 8 }}/>
            )}
            <Icon
              type="minus-circle-o"
              onClick={() => this.remove(v)}
            />
          </FormItem>
        </Col>
      )
    });


    return (
      <div className="Taboo">
        <Spin spinning={loading.effects['dinner/getCustomerMsg'] !== undefined ? loading.effects['dinner/getCustomerMsg']:false}>
        <div className="TabooTital">
          <p className="basicInformation">
            <span>客户姓名 : {customerData ? customerData.name:''}</span>
            <span>客户年龄 :{customerData ? customerData.age:''} </span>
            <span>第几胎 : {customerData ? customerData.fetus :''}</span>
          </p>
          <Form className="formPadding">
            <Row>
            <Col span={8} className="delDisplan">
              <FormItem label="糖" {...formChooseOneSugar}>
                {getFieldDecorator('sugar', {
                  initialValue:tabooData ?tabooData.sugar+'':1+'',
                  rules: []
                })(
                  <Select placeholder="请选择是否加糖" allowClear={ true }  >
                    <Option key="0" value="0">有糖</Option>
                    <Option key="1" value="1">无糖</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            {items}
            {newItems}
            </Row>
          </Form>
        </div>
        <div className="TabooButton">
          <Button  onClick={this.onAdd.bind(this)} style={{width: '15%', height: '40px', lineHeight: '40px', marginLeft:'40px', marginButtom:'20px', backgroundColor: 'rgba(255, 102, 0, 1)'}}>添加禁忌</Button>
          <Button  onClick={this.onSave.bind(this)} style={{width: '15%', height: '40px', lineHeight: '40px', marginLeft:'40px', marginRight: '40px',  backgroundColor: 'rgba(255, 102, 0, 1)'}}>保存</Button>
          <Button  onClick={this.onBack.bind(this)} style={{width: '15%', height: '40px', lineHeight: '40px', marginButtom:'20px', backgroundColor: 'rgba(255, 102, 0, 1)'}}>返回</Button>
        </div>
        </Spin>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { tabooData,customerData } = state.dinner;
  return {
    customerData,
    tabooData,
    loading: state.loading,
  };
}
export default connect(mapStateToProps)(EditTaboo)
