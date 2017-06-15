import React from 'react'
import './dinner.scss'
import { connect } from 'dva'
import {
  Select,
  Button,
  DatePicker,
  Table,
  Input,
  Form,
  Icon,
  Popconfirm,
  Pagination,
  Cascader,
  Col,
  Row,
  InputNumber,
  Modal
} from 'antd'
import moment from 'moment'
import  CreateModal from './CreateModal.jsx'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import DictionarySelect from 'common/dictionary_select';
import Current from '../../Current'
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const monthFormat = 'YYYY'
const confirm = Modal.confirm;
const FormItem = Form.Item;
const createForm = Form.create

@createForm()
class CustomerIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addList:[]
    }
    this.uuid = 5; 
  }
  
  addIngredients(){
    this.uuid=this.uuid+1;
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(this.uuid);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }
  componentDidMount() {
    this.props.dispatch({ type: 'customer/getCustomerPage' });
    this.props.dispatch({ type: 'customer/listByMain' });
    this.props.dispatch({ type: 'customer/getMemberShipCard' });
    this.props.dispatch({ type: 'customer/getDataDict', payload: { "abName": 'YCC' } });
  }
  onBack(){
    history.go(-1)
  }
  addHeadel(){
    const fields = this.props.form.getFieldsValue()
    console.log("保存",fields)

  }
  render() {
    const columns = this.columns;
    const { list, loading, pagination, dispatch, form, shipCards, fetusAry, packageList } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', {initialValue: [0,1,2,3,4,5]});
    const keys = getFieldValue('keys');
    const formChooseOneAge = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 }
    }
    const formChooseOneSugar = {
      labelCol: { span: 3},
      wrapperCol: { span: 21 }
    }
    const formItems= keys.map((k, index) => {
      if(k>5){
        return (
        <Col span={6} className="delDisplan" key={k}>
          <FormItem
            label="禁忌食材"
            {...formChooseOneAge}
          >
          {getFieldDecorator(`ingredients${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [],
          })(
            <Input />
          )}
          </FormItem>
        </Col>
        );
      }else{
        return (
        <Col span={6} className="delDisplan" key={k}>
          <FormItem
            label="禁忌食材"
            {...formChooseOneAge}
          >
          {getFieldDecorator(`ingredients${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            initialValue:"禁忌食材",
            rules: [],
          })(
            <Input />
          )}
          </FormItem>
        </Col>
        );
    }
  });
    return (
      <div className="Taboo">
       <div className="TabooTital">
        <p className="basicInformation"> 
            <span>客户姓名 : 杨幂</span>
            <span>客户年龄 : 32</span>
            <span>第几胎 : 2</span>
        </p>
        <Form>
          <Col span={6} className="delDisplan">
            <FormItem label="糖" {...formChooseOneSugar}>
              {getFieldDecorator('sugar', {
                initialValue:["1"],
                rules: []
              })(
                <Select placeholder="请选择" allowClear={ true }>
                  <Option key={1} value={"1"}>有糖</Option>
                  <Option key={0} value={"0"}>无糖</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          { formItems }
          <Col span={6} className="delDisplan">
            <FormItem {...formChooseOneAge}>
              <Icon type="plus-circle" onClick={ this.addIngredients.bind(this)}/>
            </FormItem>
          </Col>
        </Form>
       </div>
        <div className="TabooButton">
          <Button  onClick={this.addHeadel.bind(this)} style={{
            width: '15%',
            height: '40px',
            lineHeight: '40px',
            marginLeft:'40px',
            marginRight: '40px',
            float:'right',
            backgroundColor: 'rgba(255, 102, 0, 1)'
          }}>保存</Button>
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
  const {
          list,
          pagination,
          shipCards,
          fetusAry,
          packageList
        } = state.customer;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading,
    list,
    fetusAry,
    pagination,
    shipCards,
    permissionAlias,
    packageList
  };
}
export default connect(mapStateToProps)(CustomerIndex)
