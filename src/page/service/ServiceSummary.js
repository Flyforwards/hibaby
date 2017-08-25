/**
 *  婴儿护理记录单详情
 * Created by yangjingjing on 2017/8/21.
 */
import React, { Component } from 'react';
import {creatSummaryCard,creatButton,detailComponent} from './ServiceComponentCreat'
import {Card ,Input,Form,Button,Spin,Tabs,Col} from 'antd';
import { connect } from 'dva';
import CheckBeforeDetail from './CheckBeforeDetail'
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
const TabPane = Tabs.TabPane;
import { routerRedux,Link } from 'dva/router'


const ary = [
  {title:'入住前评估',chiComponent:<CheckBeforeDetail summary={true}/>}
]

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state={}
  }

  callback(){

  }

  render() {
    const {loading,baseInfoDict} = this.props
    let baseInfoDivAry = detailComponent(baseInfoDict);
    return (
      <Spin spinning={loading.effects['serviceCustomer/getAssessmentByCustomerId'] !== undefined ? loading.effects['serviceCustomer/getAssessmentByCustomerId']:false}>
        <Card className='CheckBeforeInput' style={{ width: '100%' }} bodyStyle={{ padding:(0,0,'20px',0)}}>
          {baseInfoDivAry}
          <Tabs defaultActiveKey="1" type="card" onChange={this.callback.bind(this)}>
            <TabPane tab="入住汇总" key="1">{ary.map(value=>{return creatSummaryCard(value)})}</TabPane>
            <TabPane tab="查房汇总" key="2">查房汇总</TabPane>
            <TabPane tab="护理部" key="3">护理部</TabPane>
          </Tabs>
        </Card>
      </Spin>
    )
  }
}

const DetailForm = Form.create()(Detail);


function mapStateToProps(state) {
  return {...state.serviceCustomer,loading:state.loading}
}

export default connect(mapStateToProps)(DetailForm) ;
