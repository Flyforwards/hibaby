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

//这是表单的数据操作
class Customer extends React.Component {
  state = {
    value: this.props.value,
    editable: false
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

@createForm()
class CustomerIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      createModalVisible: false,
      addList:[]
    }
    this.addIndex = 6
  }
  
  onLook(record) {
    const dispatch = this.props.dispatch;
    dispatch(routerRedux.push(`/crm/customer/customerDetails?dataId=${record.id}`))
  }
  
  onDelete(record) {
    const dispatch = this.props.dispatch;
    confirm({
      title: '提示',
      content: '是否确定删除此用户',
      onOk() {
        dispatch({
          type: 'customer/deleteCustomer',
          payload: { dataId: record.id }
        })
      },
      onCancel() {
      }
    });
  }
  
  handleCreateModalCancel() {
    this.setState({
      createModalVisible: false
    })
  }
  
  showCreateModal() {
    this.setState({
      createModalVisible: true
    })
  }
  
  onSearch() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.time != undefined) {
          values.year = values.time.get('year');
          values.month = values.time.get('month') + 1;
        }
        
        if (values.productionDate != undefined) {
          values.productionDate = values.productionDate.format("YYYY-MM-DD")
        }
        
        this.props.dispatch(routerRedux.push({
          pathname: "/crm/customer",
          query: values
        }))
      }
    })
  }
  
  reset() {
    const { pathname } = location;
    this.props.dispatch(routerRedux.push({
      pathname
    }))
    this.props.form.resetFields()
  }
  
  
  textforkey(array, value, valuekey = 'name') {
    for (let i = 0; i < array.length; i++) {
      let dict = array[i];
      if (dict['id'] === value) {
        return dict[valuekey];
      }
    }
    return value;
  }
  addIngredients(formChooseOneAge,getFieldDecorator){
    this.state.addList.push(
      <Col span={8} className="delDisplan" key={this.addIndex}>
        <FormItem label="禁忌食材" {...formChooseOneAge}>
          {getFieldDecorator(`ingredients${this.addIndex}`, {
            rules: []
          })(
            <Input/>
          )}
        </FormItem>
      </Col>)
    this.setState({
      addList:this.state.addList
    })
    this.addIndex = this.addIndex+1
    console.log("this.addIndex>>",this.addList)
  }
  
  componentDidMount() {
    this.props.dispatch({ type: 'customer/getCustomerPage' });
    this.props.dispatch({ type: 'customer/listByMain' });
    this.props.dispatch({ type: 'customer/getMemberShipCard' });
    this.props.dispatch({ type: 'customer/getDataDict', payload: { "abName": 'YCC' } });
  }
  
  render() {
    const columns = this.columns;
    const { list, loading, pagination, dispatch, form, shipCards, fetusAry, packageList } = this.props;
    
    for (let i = 0; i < list.length; i++) {
      let dict = list[i];
      dict.fetus = this.textforkey(fetusAry, dict.fetus)
      dict.purchasePackage = this.textforkey(packageList, dict.purchasePackage)
    }
    
    
    const { getFieldDecorator } = form;
    const tableProps = {
      loading: loading.effects['customer/getCustomerPage'],
      dataSource: list,
      pagination,
      columns,
      onChange (page) {
        const { pathname } = location
        dispatch(routerRedux.push({
          pathname,
          query: {
            page: page.current,
            size: page.pageSize
          }
        }))
      }
    }
    
    const options = shipCards.map((record) => {
      return (<Option key={record.id+""} value={record.id+""}>{record.name}</Option>)
    });
    
    const formChooseLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    }
    const formChooseOneLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 13 }
    }
    const formChooseOneAge = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 }
    }
    const formChooseTwoAge = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    }
    
    const add = !this.props.permissionAlias.contains('CUSTOMER_ADD');
    return (
      <div className="Taboo">
       <div className="TabooTital">
        <p className="basicInformation"> 
            <span>客户姓名:杨幂</span>
            <span>客户年龄:32</span>
            <span>第几胎:2</span>
        </p>
        <Form>
          <Col span={6} className="delDisplan">
            <FormItem label="糖" {...formChooseOneAge}>
              {getFieldDecorator('sugar', {
                rules: []
              })(
                <Select placeholder="请选择">
                  <Option key={1} value={"1"}>有糖</Option>
                  <Option key={0} value={"0"}>无糖</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8} className="delDisplan">
            <FormItem label="禁忌食材" {...formChooseOneAge}>
              {getFieldDecorator('ingredients0', {
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={8} className="delDisplan">
            <FormItem label="禁忌食材" {...formChooseOneAge}>
              {getFieldDecorator('ingredients1', {
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={8} className="delDisplan">
            <FormItem label="禁忌食材" {...formChooseOneAge}>
              {getFieldDecorator('ingredients1', {
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={8} className="delDisplan">
            <FormItem label="禁忌食材" {...formChooseOneAge}>
              {getFieldDecorator('ingredients1', {
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={8} className="delDisplan">
            <FormItem label="禁忌食材" {...formChooseOneAge}>
              {getFieldDecorator('ingredients1', {
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          <Col span={8} className="delDisplan">
            <FormItem label="禁忌食材" {...formChooseOneAge}>
              {getFieldDecorator('ingredients1', {
                rules: []
              })(
                <Input/>
              )}
            </FormItem>
          </Col>
          {
            this.state.addList
          }
          <Col span={8} className="delDisplan">
            <FormItem {...formChooseOneAge}>
              <Icon type="plus-circle" onClick={ this.addIngredients.bind(this,formChooseOneAge,getFieldDecorator)}/>
            </FormItem>
          </Col>
        </Form>
       </div>
        <div className="TabooButton">
          <Button  style={{
            width: '15%',
            height: '40px',
            lineHeight: '40px',
            marginLeft:'40px',
            marginRight: '40px',
            float:'right',
            backgroundColor: 'rgba(255, 102, 0, 1)'
          }}>保存</Button>
          <Button  style={{
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
