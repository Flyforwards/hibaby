import React from 'react'
import './dinner.scss'
import { connect } from 'dva'
import {
  Select,
  Button,
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
import PrepareMeals from './prepareMeals.js'

const Option = Select.Option
const monthFormat = 'YYYY'
const confirm = Modal.confirm;
const FormItem = Form.Item;
const createForm = Form.create



@createForm()
class EditMenu extends React.Component {
  constructor(props) {
    super(props)
    this.edit = null
  }
  onBack(){
    history.go(-1)
  }
  componentDidMount() {
    this.edit = window.location.search.split("=")[1]
    this.props.dispatch({ type: 'customer/getCustomerPage' });
    this.props.dispatch({ type: 'customer/listByMain' });
    this.props.dispatch({ type: 'customer/getMemberShipCard' });
    this.props.dispatch({ type: 'customer/getDataDict', payload: { "abName": 'YCC' } });
  }

  render() {
    const columns = this.columns;
    const { list, loading, pagination, dispatch, form, shipCards, fetusAry, packageList } = this.props
    const options = shipCards.map((record) => {
      return (<Option key={record.id+""} value={record.id+""}>{record.name}</Option>)
    });
    return (
      <div className="CustomerConent">
        <div className="button">
        <Link to={{pathname:'/meals/nutritionist/taboo/export',query:{ dataId:`${this.edit}`}}}>
          <Button  style={{
            width: '15%',
            height: '40px',
            lineHeight: '40px',
            marginLeft:'40px',
            float:'right',
            backgroundColor: 'rgba(255, 102, 0, 1)'
          }}>导出</Button></Link>
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
        <div className="editmeuntMeals">
         <PrepareMeals/>
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
export default connect(mapStateToProps)(EditMenu)
