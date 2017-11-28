import React from 'react';
import { connect } from 'dva';
import './order.scss'
import { routerRedux } from 'dva/router';
import moment from 'moment'
import { parse } from 'qs'

import {Row, Col,Spin,Button,Card} from 'antd';

function creatRow(dict,valueDict) {
  var value = "";
  if (valueDict){
    value = valueDict[dict.key];
    if (dict.key === "paymentState"){
      value = valueDict[dict.key] ? "已支付" : "未支付"
    }
    else if (dict.key === "createTime"){
      value = moment(valueDict[dict.key]).format("YYYY-MM-DD")
    }
  }

  return <Col span = {dict.span ? dict.span : 6}>
    <label>
      {dict.title} : {value}
    </label>

  </Col>
}

const chiDivAry = [{title: '商品名', key: 'name'},
  // {title: '商品类型', key: 'goodsType'},
  {title: '购买数量', key: 'quantity'},
  {title: '优惠', key: 'promoInfoJson'},
  {title: '总金额', key: 'totalPrice'}]

function creatChiCard(dict) {
  return <Card>
    <Row>
      {
        chiDivAry.map(value=>{
          return creatRow(value,dict);
        })
      }
    </Row>
  </Card>
}


class OrderDetail extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log(this.props);
    const query = parse(location.search.substr(1))
    this.props.dispatch({type:"order/getOrderDetail",payload:{orderId:query.orderid}})
  }

  backBtnClick(){
    const {orderDetail} = this.props;
    this.props.dispatch({type:'order/setOrderPush',payload:true});
    this.props.dispatch(routerRedux.push(`/crm/customer/detail?dataId=${orderDetail.customerId}`))
  }

  render(){

    const {orderDetail} = this.props;

    const supDivAry = [{title: '订单号', key: 'orderId',span:5},
      {title: '创建时间', key: 'createTime',span:5},
      {title: '总价', key: 'totalPrice',span:4},
      {title: '订单支付状态', key: 'paymentState',span:5},
      {title: '订单支付方式', key: 'paymentType',span:5}]

    return (
      <div className="OrderContent">
        <Card noHovering={true}>
          <Row>
            { supDivAry.map(value=>{
              return creatRow(value,orderDetail)
            })}
          </Row>

          {
            orderDetail ? orderDetail.list.map(value=>{
              return creatChiCard(value)
            }) : ""
          }
          <div className='button-group-bottom-common'>
            <Button className='button-group-bottom-1' onClick={this.backBtnClick.bind(this)}>返回</Button>
          </div>
        </Card>

      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    ...state.order,
    loading:state.loading,
  };
}

export default connect(mapStateToProps)(OrderDetail) ;
