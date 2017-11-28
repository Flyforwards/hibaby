import React from 'react'
import { connect } from 'dva'
import { Row, Col, Modal } from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import moment from 'moment'
import './myMessage.scss'

class MyMessageIndex extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  isType(type) {
    switch (type) {
      case(1):
        return (<span>生产通知单</span>);
        break;
      case(2):
        return (<span>入住通知单</span>);
        break;
      case(3):
        return (<span>外出通知单</span>);
        break;
      case(4):
        return (<span>退房通知单</span>);
        break;
      case(5):
        return (<span>自由通知单</span>);
        break;
      
      default:
        return (<span>生产通知单</span>)
    }
  }
  
  
  modelByType(data) {
    const { type, notificationId, userId } = data
    switch (type) {
      case(1):
        this.productInfo(notificationId);
        this.changeMessageType({ type, notificationId, userId });
        break;
      case(2):
        this.stayInfo(notificationId);
        this.changeMessageType({ type, notificationId, userId });
        break;
      case(3):
        this.outInfo(notificationId);
        this.changeMessageType({ type, notificationId, userId });
        break;
      case(4):
        this.checkOutInfo(notificationId);
        this.changeMessageType({ type, notificationId, userId });
        break;
      case(5):
        this.freeInfo(notificationId);
        this.changeMessageType({ type, notificationId, userId });
        break;
      default:
        this.productInfo(notificationId);
        this.changeMessageType({ type, notificationId, userId });
    }
  }
  
  changeMessageType(data) {
    const { dispatch } = this.props;
    dispatch({
        type: 'users/changeMessageType',
        payload: data
      }
    )
  }
  
  productInfo(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/getProductionNotificationById',
      payload: { dataId: id }
    })
    
  }
  
  stayInfo(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/getOccupancyNoticeById',
      payload: { dataId: id }
    })
    
  }
  
  outInfo(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/getdepartureNoticeById',
      payload: { dataId: id }
    })
  }
  
  checkOutInfo(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/getCheckOutNoticeById',
      payload: { dataId: id }
    })
  }
  
  freeInfo(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/getFreeNoticeById',
      payload: { dataId: id }
    })
    
  }
  
  cancelModal(props, type) {
    props.dispatch({
      type: 'users/getMessageList'
    })
    props.dispatch({
      type: 'layout/getMessageQuantity'
    })
    switch (type) {
      case(1):
        props.dispatch({
          type: 'users/changeProductionVisible',
          payload: false
        })
        break;
      case(2):
        props.dispatch({
          type: 'users/changeStayVisible',
          payload: false
        })
      case(3):
        props.dispatch({
          type: 'users/changeOutVisible',
          payload: false
        })
      case(4):
        props.dispatch({
          type: 'users/changeCheckOutVisible',
          payload: false
        })
      case(5):
        props.dispatch({
          type: 'users/changeFreeVisible',
          payload: false
        })
      default:
        props.dispatch({
          type: 'users/changeProductionVisible',
          payload: false
        })
    }
    
  }
  
  getHospital(id) {
    const { hospitalList } = this.props;
    let name = ''
    hospitalList.map((v, k) => {
      if (v.id == id) {
        return (name = v.name)
      }
    })
    return name;
  }
  
  
  //生产通知单modal
  productionModal() {
    const { productionVisible } = this.props;
    let productionNotification = this.props.productionNotification ? this.props.productionNotification : null
    return (
      <Modal title="生产通知单"
             width={1000}
             visible={productionVisible}
             footer={null}
             onCancel={() => this.cancelModal(this.props, 1)}
             className="production"
      >
        
        {
          productionNotification &&
          <Row className='firstRow'>
            <Col span={6}>妈妈姓名：{productionNotification.name}</Col>
            <Col span={6}>房间号:{productionNotification.roomNo}</Col>
            <Col span={6}>入住日期：{productionNotification.checkDate && moment(productionNotification.checkDate).format("YYYY-MM-DD")}</Col>
            <Col span={6}>套餐级别：{productionNotification.level}</Col>
            <Col span={6}>客户电话：{productionNotification.maternityTel }</Col>
            <Col span={6}>紧急联系人：{productionNotification.emergencyTel}</Col>
            <Col span={6}>紧急电话：{productionNotification.familyTel }</Col>
            <Col span={6}>分娩医院：{this.getHospital(productionNotification.hospital)}</Col>
            <Col span={6}>分娩方式：{productionNotification.production == 0 ? '自然分娩' : '剖宫产'}</Col>
            <Col span={6}>生产日期：{productionNotification.brithDate && moment(productionNotification.brithDate).format("YYYY-MM-DD")}</Col>
            <Col span={6}>母婴护理师：{productionNotification.practitioner}</Col>
            <Col span={6}>联系方式：{productionNotification.contactInformation}</Col>
            <Col span={6}>到院时间：{productionNotification.arrivalTime && moment(productionNotification.arrivalTime).format("YYYY-MM-DD")}</Col>
            <Col span={18}>分娩医院地址：{productionNotification.hospitalAddress}</Col>
          </Row>
        }
        {
          productionNotification && productionNotification.babyList.map((v, k) => {
            return (
              <Row key={k}>
                <Col span={6}>宝宝性别：{v.babySex == 1 ? '男' : '女'}</Col>
                <Col span={6}>宝宝体重：{v.babyWeight}</Col>
                <Col span={6}>宝宝身长：{v.babyLength}</Col>
              </Row>
            )
          })
        }
      </Modal>
    )
  }
  
  //入住通知单modal
  stayModal() {
    const { stayVisible } = this.props;
    let occupancyNotice = this.props.occupancyNotice ? this.props.occupancyNotice : null
    
    return (
      <Modal width={1000}
             title="入住通知单"
             visible={stayVisible}
             footer={null}
             onCancel={() => this.cancelModal(this.props, 2)}
             className="stay"
      >
        {
          occupancyNotice &&
          <Row>
            <Col span={6}>妈妈姓名:{occupancyNotice.name}</Col>
            <Col span={6}>房间号:{occupancyNotice.roomNo}</Col>
            <Col span={6}>入住天数:{occupancyNotice.checkDay}</Col>
            <Col span={6}>入所时间:{occupancyNotice.checkDate && moment(occupancyNotice.checkDate).format("YYYY-MM-DD")}</Col>
            <Col span={6}>出所时间:{occupancyNotice.leaveDate && moment(occupancyNotice.leaveDate).format("YYYY-MM-DD")}</Col>
            <Col span={18}>饮食禁忌:{occupancyNotice.taboo}</Col>
            <Col span={6}>客户电话:{occupancyNotice.maternityTel}</Col>
            <Col span={6}>紧急联系人:{occupancyNotice.emergencyTel}</Col>
            <Col span={6}>紧急电话:{occupancyNotice.familyTel}</Col>
            <Col span={6}>分娩医院:{this.getHospital(occupancyNotice.hospital)}</Col>
            <Col span={6}>喂养方式:{occupancyNotice.feedType}</Col>
            <Col span={6}>母乳量:{occupancyNotice.milkVolume}</Col>
            <Col span={24}>分娩医院地址:{occupancyNotice.hospitalAddress}</Col>
            <Col span={12}>母婴护理师到院时间:{occupancyNotice.arrivalTime && moment(occupancyNotice.arrivalTime).format("YYYY-MM-DD")}</Col>
            <Col span={12}>母婴护理师联系方式:{occupancyNotice.contactInformation}</Col>
          </Row>
        }
      
      </Modal>
    
    
    )
  }
  
  //外出通知单modal
  outModal() {
    const { outVisible } = this.props;
    let departureNotice = this.props.departureNotice ? this.props.departureNotice : null
    
    return (
      <Modal
        width={1000}
        title="外出通知单"
        visible={outVisible}
        footer={null}
        onCancel={() => this.cancelModal(this.props, 3)}
        className="out"
      >
        {
          departureNotice &&
          <Row>
            <Col span={6}>妈妈姓名:{departureNotice.name}</Col>
            <Col span={6}>房间号:{departureNotice.roomNo}</Col>
            <Col span={6}>客户电话:{departureNotice.maternityTel}</Col>
            <Col span={6}>陪同人员:{departureNotice.entourage}</Col>
            <Col span={6}>陪同人员电话:{departureNotice.entourageTel}</Col>
            <Col span={6}>紧急联系人:{departureNotice.emergencyTel}</Col>
            <Col span={6}>出所时间:{departureNotice.leaveDate && moment(departureNotice.leaveDate).format("YYYY-MM-DD")}</Col>
            <Col span={6}>预计回来时间:{departureNotice.estimateBackDate && moment(departureNotice.estimateBackDate).format("YYYY-MM-DD")}</Col>
            <Col span={6}>实际回来时间:{departureNotice.actualBackDate && moment(departureNotice.actualBackDate).format("YYYY-MM-DD")}</Col>
            <Col span={6}>暂停月子餐:{departureNotice.confinementDiet}</Col>
            <Col span={6}>恢复月子餐:{departureNotice.recoveryDiet}</Col>
            <Col span={6}>家属餐:{departureNotice.familyDinner}</Col>
            <Col span={24}>外出地址:{departureNotice.outAddress}</Col>
            <Col span={6}>母婴护理师:{departureNotice.practitioner}</Col>
            <Col span={6}>联系方式:{departureNotice.contactInformation}</Col>
            <Col span={6}>到院时间:{departureNotice.arrivalTime && moment(departureNotice.arrivalTime).format("YYYY-MM-DD")}</Col>
          </Row>
        }
      </Modal>
    )
  }
  
  //退房通知单modal
  checkOutModal() {
    const { checkOutVisible } = this.props;
    let checkOutNotice = this.props.checkOutNotice ? this.props.checkOutNotice : null
    return (
      <Modal
        width={1000}
        title="退房通知单"
        visible={checkOutVisible}
        footer={null}
        onCancel={() => this.cancelModal(this.props, 4)}
        className="checkOut"
      >
        {
          checkOutNotice &&
          <Row>
            <Col span={6}>妈妈姓名:{checkOutNotice.name}</Col>
            <Col span={6}>房间号:{checkOutNotice.roomNo}</Col>
            <Col span={6}>入所时间:{checkOutNotice.checkDate && moment(checkOutNotice.checkDate).format("YYYY-MM-DD")}</Col>
            <Col span={6}>出所时间:{checkOutNotice.leaveDate && moment(checkOutNotice.leaveDate).format("YYYY-MM-DD")}</Col>
          </Row>
        }
      
      </Modal>
    )
  }
  
  
  //自由通知单modal
  FreeModal() {
    const { freeVisible } = this.props;
    let freeNotice = this.props.freeNotice ? this.props.freeNotice : null
    return (
      <Modal
        width={1000}
        title="自由通知单"
        visible={freeVisible}
        footer={null}
        className="free"
        onCancel={() => this.cancelModal(this.props, 5)}>
        {
          freeNotice &&
          <div className="freeInfo">通知内容：{freeNotice.noticeInfo}</div>
        }
      </Modal>
    )
  }
  
  
  render() {
    const { messageList } = this.props;
    return (
      <div className="message">
        {this.productionModal()}
        {this.stayModal()}
        {this.outModal()}
        {this.checkOutModal()}
        {this.FreeModal()}
        {
          messageList.map((v, k) => {
            return (
              <Row className='messageRow' key={k}>
                <Col span={4}>
                  {this.isType(v.type)}
                </Col>
                <Col span={16}>
                  <Link onClick={() => this.modelByType(v)} style={{
                    'fontWeight': v.readType == 0 ? 'bolder' : 'normal',
                    'color': '#000'
                  }}>
                    {v.despatcher}
                  </Link>
                </Col>
                <Col span={4}>{moment(v.sendTime).format("YYYY-MM-DD   HH:MM:SS")}</Col>
              </Row>
            )
          })
        }
      
      
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    ...state.users
  };
}

export default connect(mapStateToProps)(MyMessageIndex) ;
