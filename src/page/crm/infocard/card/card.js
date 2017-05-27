/*
* updataed by Flyforwards 2015/5/25
* */
import React, { Component } from 'react'
import { connect } from 'dva'
import './card.scss'
import {Link} from 'react-router'
import { Table, Icon, Modal,Popconfirm } from 'antd';
import CardFind from './cardFind'
import CardModal from './cardInfo'

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
      key: 'salesDiscount'
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
      render: (text, record) => (
        <span style={{ cursor: 'pointer'}}>
          <Link className="firstA" to={{ pathname: '/crm/cardDetail', query: { data:record.id } }} href="#" style={{ marginRight:'20px' }}>查看</Link>
          <Popconfirm  title="确定删除吗?" onConfirm={() => this.onDelete(record.id)}>
             <span className="firstB">删除</span>
          </Popconfirm>

        </span>
      )
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
    const { cardInfo, dispatch, total, postValues, typeValues,loading,pagination } = this.props;
    const { sear, salesDiscount, cardType } = postValues;
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
            'sortField': "string",
            'sortOrder': "string"
          }
        })
      }
    };
    return (
      <div className="card">
        <CardFind style={{ clear:'both'}}/>

        <Table class="cardTable" columns={this.columns} bordered rowKey="id" { ...tableProps }/>
      </div>

    )
  }
}


function CardCom({ dispatch, loading,cardInfo, total, postValues, typeValues, pagination }) {
  return (
    <Card dispatch={dispatch} cardInfo={cardInfo} total={total} postValues={postValues} typeValues={typeValues} loading={loading} pagination={pagination}/>
  )
}
function mapStateToProps(state) {
  const { cardInfo, total, postValues, typeValues ,pagination} = state.card;
  return {
    loading: state.loading.models.card,
    cardInfo,
    total,
    postValues,
    typeValues,
    pagination,
  };
}
export default connect(mapStateToProps)(CardCom)
