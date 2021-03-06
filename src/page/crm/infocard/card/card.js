/*
* updataed by Flyforwards 2015/5/25
* */
import React, { Component } from 'react';
import { connect } from 'dva';
import './card.scss';
import {Link} from 'react-router';
import { Table, Icon, Modal,Popconfirm } from 'antd';;
import CardFind from './cardFind';
import CardModal from './cardInfo';
import { keyToText } from '../../../../utils';

let VIPLEVEL = [];
class Card extends Component {
  constructor(props) {
    super(props);
    this.btnTxt = '查看';
    const _this = this;
    this.columns = [{
      title: '会员卡名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '储值金额',
      dataIndex: 'storedValue',
      key: 'storedValue'
    }, {
      title: '折扣权限',
      dataIndex: 'salesDiscount',
      key: 'salesDiscount',
      render:(text,record,index)=>{
        return text+'%';
      }
    }, {
      title: '会员卡级别',
      dataIndex: 'level',
      key: 'level',
      render:(text,record,index)=>{
        if (VIPLEVEL[text]) {
          return VIPLEVEL[text]
        } else {
          return '自定义卡';
        }
      }
    }, {
      title: '卡种类型',
      dataIndex: 'cardType',
      key: 'cardType',
      render:(text,record,index) => {
        if(text == 1){
          return "模板卡种"
        }else if(text == 2){
          return "自定义卡种"
        }
      }
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => {
      const detail = !this.props.permissionAlias.contains('CARD_DETAIL');
      const del = !this.props.permissionAlias.contains('CARD_DELETE');
      return (
        <div className="operation-list">
          <Link disabled={detail} className="one-link link-style" to={{pathname: '/crm/card/detail', query: {dataId: record.id}}} >查看</Link>
          <Popconfirm title="确定删除吗?" onConfirm={() => this.onDelete(record.id)}>
             <Link disabled={del} className="two-link link-style">删除</Link>
          </Popconfirm>
        </div>)
      }
    }];

  }

  //刪除卡種信息
  onDelete(dataId){
    this.props.dispatch({
      type:'card/deleteCardById',
      payload:{
        dataId:dataId,
      }
    })
  }
  componentDidMount(){
    // this.props.dispatch({
    //   type:'card/getCardType',
    // })
    // this.props.dispatch({
    //   type: 'card/getZhekouInfo',
    // })
  }
  render() {
    const { cardInfo, dispatch, total, postValues, typeValues,loading,pagination,level } = this.props;
    const { sear, salesDiscount, cardType ,} = postValues;
    const {level:levelInfo} = this.props;
    VIPLEVEL = keyToText(levelInfo, "id", "name", "LEVELS");
    const tableProps = {
      loading:loading,
      pagination:pagination,
      dataSource:cardInfo,
      onChange: (page) => {
        dispatch({
          type: 'card/getCard',
          payload: {
            sear,
            salesDiscount,
            cardType,
            'page': page.current,
            'size': page.pageSize,
          }
        })
      }
    };
    return (
      <div className="info-card-cent">
        <CardFind permissionAlias/>
        <Table className='info-card-center' columns={this.columns} bordered rowKey="id" { ...tableProps }/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { cardInfo, total, postValues, typeValues ,pagination,level} = state.card;
  const { permissionAlias } = state.layout;
  return {
    loading: state.loading.models.card,
    permissionAlias,
    cardInfo,
    total,
    postValues,
    level,
    typeValues,
    pagination,
  };
}
export default connect(mapStateToProps)(Card)
