import React from 'react';
import './index.scss';
import { connect } from 'dva';
import {Select, Button, Input, Form, Icon, Col, Row, InputNumber, Modal} from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create;

@createForm()
class TabooList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addList:[]
    };
    this.uuid = 5;
    this.edit = null;
  }
  componentDidMount() {
    this.edit = window.location.search.split("=")[1];
  }
  onBack(){
    history.go(-1)
  }
  render() {
    const { loading, pagination, dispatch, form,} = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', {initialValue: [0,1,2,3,4,5]});
    const keys = getFieldValue('keys');
    const formChooseOneAge = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 }
    };
    const formChooseOneSugar = {
      labelCol: { span: 3},
      wrapperCol: { span: 21 }
    };
    const formItems= keys.map((k, index) => {
        return (
        <Col span={8} className="delDisplan" key={k}>
          <FormItem
            label="禁忌食材"
            {...formChooseOneAge}
          >
              {getFieldDecorator(`ingredients${k}`, {
                validateTrigger: ['onChange', 'onBlur'],
                initialValue:"禁忌食材",
                rules: [],
              })(
                <Input readOnly={true} />
              )}
          </FormItem>
        </Col>
        );
      });
    return (
      <div className="Taboo">
       <div className="TabooTital">
        <p className="basicInformation">
            <span>客户姓名 : 杨幂</span>
            <span>客户年龄 : 32</span>
            <span>第几胎 : 2</span>
        </p>
        <Form className="formPadding">
          <Col span={8} className="delDisplan">
            <FormItem label="糖" {...formChooseOneSugar}>
              {getFieldDecorator('sugar', {
                initialValue:["1"],
                rules: []
              })(
                <Select placeholder="请选择" disabled={true} >
                  <Option key={1} value={"1"}>有糖</Option>
                  <Option key={0} value={"0"}>无糖</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          { formItems }
        </Form>
       </div>
        <div className="TabooButton">
        <Link to={{pathname:'/meals/nutritionist/taboo/edittaboo',query:{ dataId:`${this.edit}`}}}>
          <Button   style={{
            width: '15%',
            height: '40px',
            lineHeight: '40px',
            marginLeft:'40px',
            marginRight: '40px',
            float:'right',
            backgroundColor: 'rgba(255, 102, 0, 1)'
          }}>编辑</Button>
         </Link>
          <Button  onClick={this.onBack.bind(this)} style={{
            width: '15%',
            height: '40px',
            lineHeight: '40px',
            marginLeft:'40px',
            float:'right',
            marginButtom:'20px',
            backgroundColor: 'rgba(255, 102, 0, 1)'
          }}>返回</Button>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    loading: state.loading,
  };
}
export default connect(mapStateToProps)(TabooList)
