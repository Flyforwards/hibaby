import React from 'react';
import './customerInformation.scss';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment'
import BigImageModal from './BigImageModal';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'

import {Alert,Table, Modal,Row, Col,Button,Spin} from 'antd';

const confirm = Modal.confirm;

function rowDiv(dict) {
  let titSpan = 9;
  let contentSpan = 15;
  if ( dict.title === '户籍地址'){
    titSpan = 2;
    contentSpan = 22
  }
  if ( dict.title === '现住址'){
    titSpan = 4;
    contentSpan = 20
  }

  return(
    <Row className='rowHeight'>
      <Col className='leftTitle' span={titSpan}>{`${dict.title}：`}</Col>
      <Col span={contentSpan}>{dict.isDLC ? <Button onClick={dict.onClick.onClickForCardid||dict.onClick.onClickForContractAppendices}>查看附件</Button>
        :dict.value }</Col>
    </Row>
  )
}

function textforkeyChi(array,value,valuekey = 'name') {
  for (let i = 0 ;i<array.length ;i++){
    let dict = array[i];
    if(dict['id'] === value){
      return  dict[valuekey];
    }
  }
}

function textforkey(array,value,valuekey = 'name') {

  if(value){
    if(typeof value === 'string'){
      const ary = value.split(',');
      if(ary.length > 0){
        let str = ''
        ary.map(chivalue=>{
          for (let i = 0 ;i<array.length ;i++){
            let dict = array[i];
            if(dict['id'] == chivalue){
              str = str + ',' + dict[valuekey]
              continue
            }
          }
        })
        return str.substr(1)
      }
      else{
        return textforkeyChi(array,value,valuekey)
      }
    }
    else
    {

      return textforkeyChi(array,value,valuekey)
    }

  }

}

function BaseInfo(props) {

  const netData = props.users.baseData;

  const {gravidityAry,fetusAry,hospitalAry,intentionPackageAry,guestInformationSourceAry,concernsAry,networkSearchWordsAry,
    provinceData,cityData} = props.users;

  const baseInfoData = [
    {title:'客户姓名',value:netData.name},
    {title:'联系电话',value:netData.contact},
    {title:'出生日期',value:moment(netData.birthTime).format('YYYY-MM-DD')},
    {title:'年龄',value:netData.age},
    {title:'预产期',value:moment(netData.dueDate).format('YYYY-MM-DD')},
    {title:'孕周',value:netData.gestationalWeeks},
    {title:'分娩医院',value:textforkey(hospitalAry, netData.hospital) },
    {title:'孕次',value:textforkey(gravidityAry, netData.gravidity)},
    {title:'产次',value:textforkey(fetusAry, netData.fetus)},
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
      <Col span={dict.title === '现住址' ? 12 : 6} key={i}>
        {rowDiv(dict)}
      </Col>
    );
  }

  return(
      <div className='contentDiv detail'>
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

  const {idTypeAry,memberAry,specialIdentityAry,nationalData} = props.users;

  const expandInfo = [

    {title:'证件类型',value:textforkey(idTypeAry, netData.idType)},
    {title:'证件号码',value:netData.idcard},
    {title:'籍贯', value:netData.placeOrigin},
    {title:'民族',value: textforkey(nationalData, netData.nation,'nation')},
    {title:'购买套餐',value:netData.purchasePackage?netData.purchasePackage:"无"},
    {title:'紧急联系人姓名',value:netData.contactName},
    {title:'紧急联系人电话',value:netData.contact},
    {title:'会员身份',value:textforkey(memberAry, netData.member,'name')},
    {title:'特殊身份',value:textforkey(specialIdentityAry, netData.specialIdentity,'name')},
    {title:'宝宝生产日期',value:netData.productionDate? moment(netData.productionDate).format('YYYY-MM-DD'):''},
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
      <Col className={"lineP"+i} span={8} key={i}>
        {rowDiv(dict)}
      </Col>
    );
  }

  function imgOnClick() {
    dispatch({type:'addCustomer/lookDlc',payload:{head:true}})
  }

  return(
        <div className='contentDiv detail'>
          <h3>扩展信息</h3>

          <Row>
            <Col span={6}>
              <Row>
                <Col className='leftTitle' span={7}>
                  客户照片
                </Col>
                <Col span={7}>
                  <div className="avatar-uploader">
                    <img onClick={imgOnClick}  src={netData.imgURL} alt="" className="avatar" />
                  </div>
                </Col>
              </Row>

            </Col>

            <Col span={18}>
              <div>{expandInfoDiv}</div>
            </Col>
          </Row>

        </div>
  )
}

function Remark(props) {
  const {remarkListColumns} = props.users;
  const remarkList = props.users.remarkData;
  return(
    <div className='contentDiv detail customRemark'>
        <h3>客户备注</h3>
        <Table texta bordered dataSource={remarkList} columns={remarkListColumns} />
    </div>
  )
}



class customerDetails extends React.Component{
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.netData = props.users.baseData;
  }


  backBtnClick() {
    this.dispatch(routerRedux.push("/crm/customer"))
  }

  onDelete(record) {
    const that = this;
    confirm({
      title: '提示',
      content: '确定删除此用户?',
      onOk() {
        that.dispatch({
          type: 'customer/deleteCustomer',
          payload: { dataId: that.props.users.baseData.id }
       })
        that.backBtnClick()
      },
      onCancel() {
      },
    });
  }

  handleCancel() {

    this.dispatch({type:'addCustomer/hideDlc'})
  }

  editBtnClick() {
    const query = parse(location.search.substr(1))
    this.props.dispatch(routerRedux.push({
      pathname:'/crm/customer/edit',
      query
    }))
  }

  componentDidMount(){
    this.dispatch({type: 'addCustomer/getCustomerById'});
    this.dispatch({type: 'addCustomer/getCustomerExtendById'});
    this.dispatch({type: 'addCustomer/getCustomerRemarkById'});
  }

  render(){
    const ary = [];

    if ( this.props.users.expandData){
      ary.push(<ExtensionInfo key="ExtensionInfo"  {...this.props}/>)
    }
    if (this.props.users.remarkData.length > 0){
      ary.push(<Remark key="Remark"  {...this.props}/>)
    }

    let outTime = false;
    if((!this.props.users.expandData.purchasePackage || this.props.users.expandData.purchasePackage == 0) &&  this.props.users.baseData.dueDate) {
      if(moment().diff(this.props.users.baseData.dueDate,"days") > 3){
        outTime = true
      }
    }

      const {loading} = this.props;

    return (
      <div className="customerContent">
        <Spin spinning={loading.effects['addCustomer/getCustomerById'] !== undefined ? loading.effects['addCustomer/getCustomerById']:false}>
          {
            outTime?<Alert message="此客户还未绑定套餐哦" type="error" />:""
          }
          <BaseInfo  {...this.props}/>
          {ary}
          <BigImageModal
            images={this.props.users.bigImageData}
            isOpen={this.props.users.bigImageHidden}
            onClose={this.handleCancel.bind(this)}
          />

          <div className='button-group-bottom-common'>
            <Button className='button-group-bottom-1' onClick={this.backBtnClick.bind(this)}>返回</Button>
            <PermissionButton testKey='CUSTOMER_DELETE' className='button-group-bottom-2' onClick={this.onDelete.bind(this)}>删除</PermissionButton>
            <PermissionButton testKey='CUSTOMER_EDIT' className='button-group-bottom-3' onClick={this.editBtnClick.bind(this)}>编辑</PermissionButton>
          </div>
        </Spin>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    users: state.addCustomer,
    customer:state.customer,
    loading:state.loading,
  };
}

export default connect(mapStateToProps)(customerDetails) ;
