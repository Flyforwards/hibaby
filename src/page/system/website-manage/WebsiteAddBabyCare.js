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

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 }
};

@createForm()
class WebsiteBabyAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state={ikeys:[]}
  }

  // 返回
  onBack(){
    this.props.dispatch(routerRedux.push({pathname:'/system/websiteActManage',})
    )
  }
  //移除当前
  remove = (k) => {
    let ikeys = this.state.ikeys;
    for (let i = 0;i<ikeys.length;i++){
      ikeys.splice(i,1)
    }
    this.setState({
      ikeys:ikeys
    })
  }
  //保存禁忌信息
  onSave(){
    const fields = this.props.form.getFieldsValue();
    const {content, dispatch ,initialList} =this.props;

    let tempAry = []
    if(content){
      eval(content).map((v,i) => {
        if(i != queryURL("id")){
          tempAry.push(v)
        }
      })
    }


    let itemStr ='';
    for(var item in fields){
      if(item.match("taboo")){
        if(fields[item]){
          itemStr+= fields[item]+'#';
        }
      }
    }
    itemStr = itemStr.substr(0,itemStr.length-1);
    let contents ={};
    contents.title = fields.title;
    contents.data = itemStr;
    let contentList = {};


    if(queryURL('id')){
      tempAry.splice(parseInt(queryURL('id')),0,contents);
      contentList = tempAry
    }
    else{
      contentList = tempAry.concat(contents);
    }

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
  }

  //添加禁忌
  onAdd() {
    let ikeys = this.state.ikeys;
    ikeys.push('')
    this.setState({
      ikeys:ikeys
    })
  }

  render() {
    const { form,content } = this.props;
    const {getFieldDecorator} = form

    let init;

    let array = ['','','','','','']
    if(queryURL("id")){
      let ary = eval(content);
      init = ary[queryURL("id")]
      array = init.data.split('#')
    }

    let itemAry = []

    let tempAry = []

    function creatCol(i){
      return <Col key={i} span={8}>
        <FormItem
          {...formItemLayout}
          label="二级标题"
          required={false}
        >
          {getFieldDecorator(`taboo-${i}`, {
            initialValue:array[i] == undefined ? '':array[i]
          })(
            <Input placeholder="请输入二级标题"/>
          )}
        </FormItem>
      </Col>
    }


    for(let i = 0;i<array.length;i++){
      if(tempAry.length == 3){
        itemAry.push(<Row style={{height:'56px'}}>{tempAry}</Row>)
        tempAry = []
        tempAry.push( creatCol(i))
      }else{
        tempAry.push( creatCol(i))
      }
    }

    for(let i = 0;i<this.state.ikeys.length;i++){
      if(tempAry.length == 3){
        itemAry.push(<Row style={{height:'56px'}}>{tempAry}</Row>)
        tempAry = []
        tempAry.push( creatCol(i+array.length))
      }else{
        tempAry.push( creatCol(i+array.length))
      }
      console.log(i+array.length)
    }

    if(tempAry.length > 0){
      itemAry.push(<Row style={{height:'56px'}}>{tempAry}</Row>)
      tempAry = [];
    }
    console.log(itemAry)



    return (
      <div className="WebsiteAddBabyCare" style={{overflow:'hidden'}}>
        <Card title="标题">
        <Spin spinning={false}>
          <div className="TabooTital">
            <Form className="formPadding" style={{overflow:'hidden'}}>
              <Row style={{height:'56px',width:300}}>
                  <FormItem label="一级标题" {...formItemLayout}>
                  {getFieldDecorator('title', {
                  initialValue:init? init.title:'',
                  rules: [{ required: true, message: '请输入一级标题' }]
                  })(
                  <Input placeholder="请输入一级标题"/>
                  )}
                  </FormItem>
              </Row>
              <Row>
                {itemAry}
              </Row>
            </Form>
          </div>
          <div className="TabooButtons">
            <Button  onClick={this.onAdd.bind(this)}  className='button-group-bottom-1' style={{ marginLeft:'10px', marginButtom:'20px'}}>添加标题</Button>
            <Button  onClick={this.onSave.bind(this)} className='button-group-bottom-1' style={{ marginLeft:'10px', marginRight: '10px'}}>保存</Button>
            <Button  onClick={this.onBack.bind(this)} className='button-group-bottom-2' style={{ marginButtom:'20px'}}>返回</Button>
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
