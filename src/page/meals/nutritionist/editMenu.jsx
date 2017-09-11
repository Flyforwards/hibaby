import React from 'react';
import './index.scss';
import { connect } from 'dva';
import {Select, Button, Table, Input, Form, Icon, Pagination, Col, Row, InputNumber, Modal} from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import PrepareMeals from './prepareMeals.js';
import { queryURL } from '../../../utils/index.js';
import PermissionButton from '../../../common/PermissionButton';

const Option = Select.Option;
const confirm = Modal.confirm;
const FormItem = Form.Item;
const createForm = Form.create;


@createForm()
class EditMenu extends React.Component {
  constructor(props) {
    super(props);
    this.edit = null
  }
  onBack(){
    this.props.dispatch(routerRedux.push({
        pathname:'/meals/nutritionist/dinner'
      })
    )
  }
  componentDidMount() {
    this.edit = window.location.search.split("=")[1];
    // this.props.dispatch({ type: 'customer/getCustomerPage' });
    // this.props.dispatch({ type: 'customer/listByMain' });
    // this.props.dispatch({ type: 'customer/getMemberShipCard' });
    // this.props.dispatch({ type: 'customer/getDataDict', payload: { "abName": 'YCC' } });
  }
  //点击导出
  onExport() {
    const { dispatch } = this.props;
    const dataId = queryURL("dataId");
    dispatch({
      type:'dinner/getPrintMsg',
      payload:{
        "customerId":dataId,
        "type":0
      }
    })
    dispatch(routerRedux.push({
      pathname: '/meals/nutritionist/taboo/export',
      query: {
        dataId:dataId,
      },
    }))
  }
  render() {
    const { loading, dispatch, form} = this.props
    return (
      <div className="CustomerConents">
        <div className="button">

          <PermissionButton testKey='CUSTOMER_MENU_EXPORT' style={{
            width: '15%',
            height: '40px',
            lineHeight: '40px',
            marginLeft:'40px',
            float:'right',
            color:'#fff',
            borderRadius:'5px',
            backgroundColor: 'rgba(255, 102, 0,1)'
          }} onClick={this.onExport.bind(this)}>
            导出餐单
          </PermissionButton>

          {/*<Button  style={{*/}
            {/*width: '15%',*/}
            {/*height: '40px',*/}
            {/*lineHeight: '40px',*/}
            {/*marginLeft:'40px',*/}
            {/*float:'right',*/}
            {/*backgroundColor: 'rgba(255, 102, 0, 1)'*/}
          {/*}} onClick={this.onExport.bind(this)}>导出</Button>*/}
          <Button  onClick={this.onBack.bind(this)} style={{
            width: '15%',
            height: '40px',
            lineHeight: '40px',
            marginLeft:'40px',
            float:'right',
            marginButtom:'20px',
            color:'#fff',
            borderRadius:'5px',
            backgroundColor: 'rgba(255, 102, 0,1)'
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
  return {
  };
}
export default connect(mapStateToProps)(EditMenu)
