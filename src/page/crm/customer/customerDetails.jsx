import React from 'react';
import './customerInformation.scss';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment'
import BigImageModal from './BigImageModal';
import {keyToText} from '../../../utils'


import {Icon,Table, Modal,Row, Col,Button} from 'antd';
const confirm = Modal.confirm;

function rowDiv(dict) {
  return(
    <Row className='rowHeight'>
      <Col className='leftTitle' span={7}>{`${dict.title}：`}</Col>
      <Col span={17}>{dict.isDLC ? <Button onClick={dict.onClick.onClickForCardid} type="primary">查看附件</Button>  :dict.value }</Col>
    </Row>
  )
}


function textforkey(array,value,valuekey = 'name') {
  for (let i = 0 ;i<array.length ;i++){
    let dict = array[i];
    if(dict['id'] === value){
      return  dict[valuekey];
    }
  }
}

function BaseInfo(props) {

  const netData = props.users.baseData;

  const {fetusAry,hospitalAry,intentionPackageAry,guestInformationSourceAry,concernsAry,networkSearchWordsAry,
    provinceData,cityData} = props.users;

  const baseInfoData = [
    {title:'客户姓名',value:netData.name},
    {title:'联系电话',value:netData.contact},
    {title:'出生日期',value:moment(netData.birthTime).format('YYYY-MM-DD')},
    {title:'年龄',value:netData.age},
    {title:'预产期',value:moment(netData.dueDate).format('YYYY-MM-DD')},
    {title:'孕周',value:netData.gestationalWeeks},
    {title:'分娩医院',value:textforkey(hospitalAry, netData.hospital) },
    {title:'孕次/产次',value:textforkey(fetusAry, netData.fetus)},
    {title:'客资来源',value:textforkey(guestInformationSourceAry, netData.resourceCustomer)},
    {title:'关注点',value:textforkey(concernsAry, netData.focus)},
    {title:'意向套餐',value:textforkey(intentionPackageAry, netData.intentionPackage)},
    {title:'网络搜索词',value:textforkey(networkSearchWordsAry, netData.webSearchTerm)},
    {title:'现住址',value:`${textforkey(provinceData, netData.province,'description')} ${textforkey(cityData, netData.city,'description')} ${netData.detailed}`},
    {title:'操作者',value:netData.operator},
  ];

  const baseInfoDiv = [];

  for (let i = 0; i < baseInfoData.length; i++) {
    const dict = baseInfoData[i];
    baseInfoDiv.push(
      <Col span={dict.title === '现住址' ? 18 : 6} key={i}>
        {rowDiv(dict)}
      </Col>
    );
  }

  return(
      <div className='contentDiv'>
        <h3>基本信息</h3>
          <Row>
            {baseInfoDiv}
          </Row>
      </div>
  )
}


function ExtensionInfo(props) {

  const netData = props.users.expandData;

  const dispatch = props.dispatch;

  const {memberAry,specialIdentityAry,provinceData,permanentCityData,nationalData} = props.users;

  const expandInfo = [
    {title:'身份证',value:netData.idcard},
    {title:'籍贯', value:netData.placeOrigin},
    {title:'民族',value: textforkey(nationalData, netData.nation,'nation')},
    {title:'购买套餐',value:netData.purchasePackage},
    {title:'保险情况',value:netData.insuranceSituation},
    {title:'联系人电话',value:netData.contact},
    {title:'会员身份',value:textforkey(memberAry, netData.member,'name')},
    {title:'特殊身份',value:netData.specialIdentity},
    {title:'宝宝生产日期',value:moment(netData.productionDate).format('YYYY-MM-DD')},
    {title:'合同编号',value:netData.contractNumber},
    {title:'关联客房',value:netData.associatedRooms},
    {title:'身份证扫描',value:netData.idcardScan,isDLC:true,onClick:{onClickForCardid}},
    {title:'合同附件',value:netData.contractAppendices,isDLC:true,onClick:{onClickForContractAppendices}},
    {title:'会员编号',value:netData.memberNumber},
    {title:'操作者2',value:netData.operator},
  ];


  function onClickForCardid(){
    dispatch({type:'addCustomer/lookDlc',payload:{isCardid:true}})
  }

  function onClickForContractAppendices(){
    dispatch({type:'addCustomer/lookDlc',payload:{isCardid:false}})
  }

  const expandInfoDiv = [];

  for (let i = 0; i < expandInfo.length; i++) {
    const dict = expandInfo[i];

    expandInfoDiv.push(
      <Col className="lineP" span={8} key={i}>
        {rowDiv(dict)}
      </Col>
    );
  }


  return(
        <div className='contentDiv'>
          <h3>扩展信息</h3>

          <Row>
            <Col span={6}>
              <Row>
                <Col className='leftTitle' span={7}>
                  用户照片
                </Col>
                <Col span={7}>
                  <div>
                    <img src={netData.imgURL} alt="" className="avatar" />
                  </div>
                </Col>
              </Row>

            </Col>

            <Col span={18}>
              <div>{expandInfoDiv}</div>
            </Col>
          </Row>

          <Row>
            <p>{rowDiv({title:'户籍地址',value:`${textforkey(provinceData, netData.provincePermanent,'description')} ${textforkey(permanentCityData, netData.cityPermanent,'description')} ${netData.detailedPermanent}`})}</p>
          </Row>
        </div>
  )
}

function Remark(props) {
  const {remarkListColumns} = props.users;
  const remarkList = props.users.remarkData;
  return(
    <div className='contentDiv'>
        <Row>
          <h3>客户备注</h3>
        </Row>
        <Table texta dataSource={remarkList} columns={remarkListColumns} />
    </div>
  )

}



class customerDetails extends React.Component{
  constructor(props) {
    super(props);

    this.dispatch = props.dispatch;
    this.netData = props.users.baseData;
    this.editCustomer = false;
  }


  backBtnClick() {
    this.dispatch(routerRedux.push("/crm/customer"))
  }

  onDelete(record) {
    confirm({
      title: '提示',
      content: '确定删除此用户?',
      onOk() {
        this.dispatch({
          type: 'customer/deleteCustomer',
          payload: { dataId: this.netData.id }
        })
      },
      onCancel() {
      },
    });
  }

  handleCancel() {

    this.dispatch({type:'addCustomer/hideDlc'})
  }

  editBtnClick() {
    this.editCustomer = true;
    this.dispatch({
      type: 'addCustomer/editCustomerAct',
      payload: { data:true}
    })
    this.dispatch(routerRedux.push("/crm/customer/Add"))
  }

  componentWillUnmount(){

    if(!this.editCustomer){
      this.props.dispatch({type:'addCustomer/reductionState'})
    }
  }

  render(){
    return (
      <div className="customerContent">
        <BaseInfo  {...this.props}/>
        <ExtensionInfo {...this.props}/>
        <Remark  {...this.props}/>
        <BigImageModal handleCancel={this.handleCancel} bigImageData={this.props.users.bigImageData} visible={this.props.users.bigImageHidden}/>
        <div className='savaDiv'>
          <Button className='backBtn' onClick={this.backBtnClick.bind(this)}>返回</Button>
          <Button className='backBtn' type="danger" onClick={this.onDelete.bind(this)}>删除</Button>
          <Button className='backBtn' type="primary" onClick={this.editBtnClick.bind(this)}>编辑</Button>
        </div>
      </div>
    )
  }


}


function mapStateToProps(state) {
  return {
    users: state.addCustomer,
    customer:state.customer,
  };
}

export default connect(mapStateToProps)(customerDetails) ;

