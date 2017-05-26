import React from 'react';
import './customerInformation.scss';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';


import {Icon,Table, Modal,Row, Col,Button} from 'antd';


function rowDiv(dict) {
  return(
    <Row className='rowHeight'>
      <Col className='leftTitle' span={7}>{`${dict.title}：`}</Col>
      <Col span={17}>{dict.value}</Col>
    </Row>
  )
}


function BaseInfo(props) {

  const netData = props.users.baseData;
  const baseInfoData = [
    {title:'客户姓名',value:netData.name},
    {title:'联系电话',value:netData.contact},
    {title:'出生日期',value:netData.birthTime},
    {title:'年龄',value:netData.age},
    {title:'预产期',value:netData.dueDate},
    {title:'孕周',value:netData.gestationalWeeks},
    {title:'分娩医院',value:netData.hospital},
    {title:'孕次/产次',value:netData.fetus},
    {title:'客资来源',value:netData.resourceCustomer},
    {title:'关注点',value:netData.focus},
    {title:'意向套餐',value:netData.intentionPackage},
    {title:'网络搜索词',value:netData.webSearchTerm},
    {title:'现住址',value:netData.detailed},
    {title:'操作者',value:netData.operator},
  ];

  const baseInfoDiv = [];

  for (let i = 0; i < baseInfoData.length; i++) {
    const dict = baseInfoData[i];
    baseInfoDiv.push(
      <Col span={6} key={i}>
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

  const expandInfo = [
    {title:'身份证',value:netData.idcard},
    {title:'籍贯',value:netData.placeOrigin},
    {title:'民族',value:netData.nation},
    {title:'购买套餐',value:netData.purchasePackage},
    {title:'保险情况',value:netData.insuranceSituation},
    {title:'联系人电话',value:netData.excontact},
    {title:'会员身份',value:netData.member},
    {title:'特殊身份',value:netData.specialIdentity},
    {title:'宝宝生产日期',value:netData.productionDate},
    {title:'合同编号',value:netData.contractNumber},
    {title:'关联客房',value:netData.associatedRooms},
    {title:'身份证扫描',value:netData.idcardScan},
    {title:'合同附件',value:netData.contractAppendices},
    {title:'会员编号',value:netData.memberNumber},
    {title:'操作者2',value:netData.operator},
  ];


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
                  <div className="avatar-uploader">
                    <img src={netData.imgURL} alt="" className="avatar" /> :
                  </div>
                </Col>
              </Row>

            </Col>

            <Col span={18}>
              <div>{expandInfoDiv}</div>
            </Col>
          </Row>

          <Row>
            <p>454545</p>
          </Row>
        </div>
  )
}

function Remark(props) {
  const {remarkListColumns} = props.users;
  const remarkList = props.users.remarkData;

  console.log(remarkList);

  return(
    <div className='contentDiv'>
        <Row>
          <h3>客户备注</h3>
        </Row>
        <Table texta dataSource={remarkList} columns={remarkListColumns} />
    </div>
  )

}



function customerDetails(props) {

  function backBtnClick() {

  }

  return (
    <div className="customerContent">
      <BaseInfo  {...props}/>
      <ExtensionInfo {...props}/>
      <Remark  {...props}/>
      <div className='savaDiv'>
        <Button className='backBtn' onClick={backBtnClick}>返回</Button>
        <Button className='backBtn' type="primary" onClick={backBtnClick}>保存</Button>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    users: state.addCustomer,
  };
}

export default connect(mapStateToProps)(customerDetails) ;

