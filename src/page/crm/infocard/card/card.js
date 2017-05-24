import React, { Component } from 'react'
import { connect } from 'dva'
import './card.scss'
import {Link} from 'react-router'
import { Table, Icon, Modal } from 'antd';
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
      key: 'cardType'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={{ pathname: '/crm/cardInfo', query: { data:record.id } }} href="#" style={{ marginRight:'20px' }}>查看</Link>
          <span>删除</span>
        </span>
      )
    }];

  }

  render() {
    const { cardInfo, dispatch, total, postValues } = this.props;
    const { sear, salesDiscount, cardType } = postValues;
    const pagination = {
      total: total, //数据总条数
      showQuickJumper: true,
      pageSize: 10,
      onChange: (current) => {
        console.log(current,'当前的页数')
        dispatch({
          type: 'card/getCard',
          payload: {
            sear,
            salesDiscount,
            cardType,
            'page': current,
            'size': 10,
            'sortField': "string",
            'sortOrder': "string"
          }
        })
      }
    };
    return (
      <div className="card">
        <CardFind style={{ clear:'both'}}/>

        <Table class="cardTable" columns={this.columns} bordered rowKey="id" dataSource={cardInfo} pagination={ pagination}/>
      </div>

    )
  }
}


function CardCom({ dispatch, cardInfo, total, postValues }) {

  return (
    <Card dispatch={dispatch} cardInfo={cardInfo} total={total} postValues={postValues}/>
  )
}
function mapStateToProps(state) {
  const { cardInfo, total, postValues } = state.card;
  return {
    loading: state.loading.models.card,
    cardInfo,
    total,
    postValues
  };
}
export default connect(mapStateToProps)(CardCom)
