/**
 * Created by Flyforwards on 2017/7/19.
 */
import React from 'react';
import { connect } from 'dva';
import {Select, Button, Input, Form, Col, Icon,Row, InputNumber, Modal,Spin,Card} from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import { queryURL } from '../../../utils/index';
const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create;
import './WebsiteBanner.scss';

let ids = 2;
@createForm()
class WebsiteBabyAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addList:[],
      uids:6,
    };
    this.uids = 6;
    this.list=[];
  }

  // 返回
  onBack(){
    this.props.dispatch(routerRedux.push({pathname:'/system/websiteActManage',})
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
    const { dispatch ,initialList} =this.props;
    let itemStr ='';
    for(var item in fields){
      if(item.match("taboo")){
        if(fields[item] !=　undefined &&　fields[item].trim()){
          itemStr+= fields[item]+'#';
        }
      }
    }
    itemStr = itemStr.substr(0,itemStr.length-1);
    let contents ={};
    contents.title = fields.title;
    contents.data = itemStr;
    let contentList = {};
    contentList = this.list.concat(contents);
    contentList = JSON.stringify(contentList);
    if(queryURL("type")){
      dispatch({
        type:'websiteBabyCare/updateExpert',
        payload:{
          "id":initialList.id,
          "type":initialList.type,
          "img1":initialList.img1,
           "content":contentList,
          "summary":initialList.summary,
          "title":initialList.title,
        }
      })
    }
    // dispatch({
    //   type:'dinner/setTabooFood',
    //   payload:{
    //   "customerId":customerId,
    //     "sugar":fields.sugar,
    //     "taboo":itemStr,
    //     "id":this.props.tabooData ?this.props.tabooData.id :'',
    //   }
    // })

  }

  //添加禁忌
  onAdd() {
    this.uids =  this.uids + 1
    const { form } = this.props;
    const ikeys = form.getFieldValue('ikeys');
    const nextKeys = ikeys.concat(this.uids);
    form.setFieldsValue({
      ikeys: nextKeys
    });
  }
  render() {
    const {loading, dispatch, form,initialList,content } = this.props;
    console.log("content",content)
    const { getFieldDecorator, getFieldValue } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 }
    };
    getFieldDecorator('keys', {initialValue: [0,1,2,3,4,5]});
    getFieldDecorator('ikeys', {initialValue: []});
    let con =[];
    let init;
    this.list =[];
    content ? eval(content).map((v,i) => {
      if(i == queryURL("id")){
        init = v;
      }else{
        this.list.push(v)
      }
      con.push(v);
    }):null;
    const formChooseOneSugar = {
      labelCol: { span:3},
      wrapperCol: { span: 19 }
    };

    const keys = getFieldValue('keys');
    //添加禁忌
    const ikeys = getFieldValue('ikeys');
    const initArr = init ? init.data.split("#"):[];

    const item = initArr.length > keys.length ? initArr.map((i,index) => {
      return(
        <Col key={i} span={8} className="delDisplan">
          <FormItem
            {...formItemLayout}
            label="二级标题"
            required={false}
            key={i}
          >
            {getFieldDecorator(`taboo-${i}`, {
              initialValue:initArr[index] == undefined ? '':initArr[index]
            })(
              <Input placeholder="请输入二级标题"/>
            )}
          </FormItem>
        </Col>
      )
    }): keys.map((k,index) => {
      return(
        <Col key={k} span={8} className="delDisplan">
          <FormItem
            {...formItemLayout}
            label="二级标题"
            required={false}
            key={k}
          >
            {getFieldDecorator(`taboo-${k}`, {
              initialValue:initArr[index] == undefined ? '':initArr[index]
            })(
              <Input placeholder="请输入二级标题"/>
            )}
          </FormItem>
        </Col>
      )
    });

    const newItems = ikeys .map((v,index) => {
      return(
        <Col key={v} span={8} className="delDisplan">
          <FormItem
            {...formItemLayout}
            label="二级标题"
            required={false}
            key={v}
          >
            {getFieldDecorator(`taboo-${v}`, {
            })(
              <Input placeholder="请输入二级标题"  style={{ width: '90%', marginRight: 8 }}/>
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
      <div className="WebsiteAddBabyCare" style={{overflow:'hidden'}}>
        <Card title="标题">
        <Spin spinning={false}>
          <div className="TabooTital">
            <Form className="formPadding" style={{overflow:'hidden'}}>
              <Row style={{height:'56px'}}>
                <Col span = {12} style={{width:300}}>
                  <FormItem label="一级标题" {...formItemLayout}>
                  {getFieldDecorator('title', {
                  initialValue:init? init.title:'',
                  rules: [{ required: true, message: '请输入一级标题' }]
                  })(
                  <Input placeholder="请输入一级标题"/>
                  )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                {item}
                {newItems}
              </Row>
            </Form>
          </div>
          <div className="TabooButtons">
            <Button  onClick={this.onAdd.bind(this)} style={{width: '15%', height: '40px', lineHeight: '40px', marginLeft:'40px', marginButtom:'20px',color:'#fff', backgroundColor: 'rgba(255, 102, 0, 1)'}}>添加标题</Button>
            <Button  onClick={this.onSave.bind(this)} style={{width: '15%', height: '40px', lineHeight: '40px', marginLeft:'40px', marginRight: '40px', color:'#fff', backgroundColor: 'rgba(255, 102, 0, 1)'}}>保存</Button>
            <Button  onClick={this.onBack.bind(this)} style={{width: '15%', height: '40px', lineHeight: '40px', marginButtom:'20px',color:'#fff', backgroundColor: 'rgba(255, 102, 0, 1)'}}>返回</Button>
          </div>
        </Spin>
        </Card>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { initialList,content } = state.websiteBabyCare;
  return {
    content,
    initialList,
  };
}
export default connect(mapStateToProps)(WebsiteBabyAdd)
