"use strict"

import React from 'react'
import {connect} from 'dva'
import {
  Button,
  Card,
  Checkbox,
  Row,
  Col,
  Form,
  DatePicker,
  Select,
  Switch,
  Spin,
  message,
} from 'antd'
import {routerRedux} from 'dva/router';
import './roomStatusManagementIndex.scss'
import DictionarySelect from 'common/dictionary_select';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option = Select.Option;
import moment from 'moment';
import {parse} from 'qs';
import RoomStateForMonthView from "./roomStateForMonthView.js";

const statusDict = {0: '空房', 1: '维修', 2: '脏房', 3: '样板房', 4: '住客房', 5: '入所', 6: '出所', 7: '预约', 8: '取消维修'}


function ScreenBar(props) {
  const {getFieldDecorator} = props.form;
  const {statusChange, selectValue} = props;
  const {dispatch} = props.supProps;
  const {dayStatusData, packageAry, FloorAry, MainFloorAry, AreaAry, TowardAry} = props.supProps.users;


  function textforkey(array, value, valuekey = 'name') {
    if (array) {
      for (let i = 0; i < array.length; i++) {
        let dict = array[i];
        if (dict.id == value) {
          return dict[valuekey];
        }
      }
    } else {
      return value
    }
  }

  function onSearch() {
    props.form.validateFields((err, values) => {
      if (!err) {
        let param = {};
        Object.keys(values).map((key) => {
          const value = values[key];
          if (value) {
            if (typeof value === 'object') {
              param[key] = value.key ? value.key : value.format();
            }
            else {
              param[key] = value;
            }
          }
        });
        dispatch(routerRedux.push({
          pathname: '/chamber/roomstatusindex',
          query: param
        }))
      }
    })
  }

  function reset() {
    dispatch(routerRedux.push({
      pathname: '/chamber/roomstatusindex',
    }))
  }

  function onChange(e) {
    statusChange(e)
  }

  let packageChi = [];

  for (let i = 0; i < packageAry.length; i++) {
    packageChi.push(<Option key={packageAry[i].id}>{packageAry[i].name}</Option>);
  }

  const formItemLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 17},
  };

  function cusFromItem(dict) {
    return (
    <Col key={dict.submitStr} span={8}>
      <FormItem  {...formItemLayout} label={dict.title}>
        {getFieldDecorator(dict.submitStr, {initialValue: dict.initValue})
        (
          dict.selectName ?
            (dict.selectName === 'package' ?
                <Select labelInValue={true} placeholder="请选择" className='antCli'>
                  {packageChi}
                </Select>
                :
                <DictionarySelect labelInValue={true} className='antCli' placeholder="请选择"
                                  selectName={dict.selectName}/>
            )
            :
            <DatePicker style={{width: '100%'}}/>
        )}
      </FormItem>
    </Col>

    )
  }


  const selectData = [
    {title: '主副楼', submitStr: 'building', selectName: 'MainFloor', dataArray: MainFloorAry},
    {title: '楼层', submitStr: 'floor', selectName: 'Floor', dataArray: FloorAry},
    {title: '区域', submitStr: 'region', selectName: 'Area', dataArray: AreaAry},
    {title: '朝向', submitStr: 'orientation', selectName: 'Toward', dataArray: TowardAry},
    {title: '套餐', submitStr: 'packageInfoId', selectName: 'package', dataArray: packageAry},
    {title: '日期', submitStr: 'useDate', initValue: moment()},
  ];


  let oneDiv = [];
  let twoDiv = [];

  const netParam = parse(location.search.substr(1))

  for (let i = 0; i < selectData.length; i++) {
    let dict = selectData[i];
    if (netParam) {
      if (netParam[dict.submitStr]) {
        if (dict.title === '日期') {
          dict.initValue = moment(netParam[dict.submitStr]);
        } else {
          dict.initValue = {key: netParam[dict.submitStr], label: textforkey(dict.dataArray, netParam[dict.submitStr])};
        }
      }
    }

    if (i < 3) {
      oneDiv.push(cusFromItem(dict))
    } else {
      twoDiv.push(cusFromItem(dict))
    }
  }

  const options = [];
  options.push({label: '全选', value: 'all'})
  Object.keys(statusDict).map((key) => {
    if (key != 8) {
      options.push({label: statusDict[key], value: key})
    }
  });


  const roomViewStateChange = (checked) => {
    dispatch({type: 'roomStatusManagement/setRoomViewState', payload: checked});
  };

  return (

    <div className="ScreenBarDiv">

      <div className="headDiv">
        <Switch className='switchDiv' onChange={roomViewStateChange} checkedChildren={'日房态'} unCheckedChildren={'月房态'}/>
        <span className="titlespan">计划入住 <span
          style={{color: 'rgb(0,185,156)'}}>{dayStatusData.beginCount}</span> 客人</span>
        <span className="titlespan">计划离所 <span
          style={{color: 'rgb(247,171,63)'}}>{dayStatusData.endCount}</span> 客人</span>
        <span className="titlespan">
          今日在所 <span style={{color: 'rgb(243,106,105)'}}>{dayStatusData.useCount}</span> 客人
        </span>
      </div>

      <Card className="SelectDiv" bodyStyle={{padding: '20px 20px 0px 20px'}}>
        <Row style={{height: 50, width: '800px', overflow: 'hidden'}}>
          {oneDiv}
        </Row>
        <Row style={{height: 50, width: '800px', overflow: 'hidden', display:'inline-block'}}>
          {twoDiv}
        </Row>
        <Button className='btn' onClick={ onSearch}>查询</Button>
        <Button className='btn' onClick={ reset}>重置</Button>
      </Card>


      <div className="radioDiv">
        <Card bodyStyle={{padding: '20px'}} style={{width: '100%'}}>
          <h4>状态筛选</h4>
          <CheckboxGroup value={selectValue} options={options} onChange={onChange}/>
        </Card>
      </div>
    </div>
  )
}

function CardArray({roomList, dispatch}) {

  function creatChiCard(dict, key) {

    let chiAry = [1];
    if (dict.status === 0 || dict.status === 2 || dict.status === 3) {
      chiAry = [0, 1, 2, 3];
      chiAry.map((index) => {
        if (chiAry[index] === dict.status) {
          chiAry.splice(index, 1)
        }
      })
    }
    if (dict.status === 0) {
      chiAry = [...chiAry, 2, 3]
    }
    if (dict.isRepair == 1) {
      chiAry = [8]
    }

    let chiDivAry = [];

    for (let i = 0; i < chiAry.length; i++) {
      chiDivAry.push(<Option key={chiAry[i]}>{statusDict[chiAry[i]]}</Option>);
    }

    let chiDiv = <div>
      <h1>{dict.isRepair == 1 ? '维修' : statusDict[dict.status]}</h1>
    </div>


    if (dict.status === 4 || dict.status === 6 || dict.status === 5) {
      if(dict.customerConsume){
        chiDiv = <div >
          <p>客户姓名：{dict.customerConsume.customerName}</p>
          <p>母婴护理师：朱禹桥</p>
          <p>会员卡种：{dict.customerConsume.membershipCardName}</p>
          <p>会员卡号：{dict.customerConsume.membershipCardId}</p>
          <p>离所日期：{moment(dict.endDate).format('YYYY年MM月DD日') }</p>
        </div>
      }
      else{
        chiDiv = <div>
          <h1>客户信息不存在</h1>
        </div>
      }
    }
    else if(dict.customerConsume){
      chiDiv = <div >
        <p>预约人：{dict.customerConsume.customerName}</p>
        <p>入所日期：{moment(dict.beginDate).format('YYYY年MM月DD日') }</p>
      </div>
    }

    let disabled = false;
    const webparam = parse(location.search.substr(1))
    if (webparam.useDate) {
      if(moment(webparam.useDate).format('YYYYMMDD') !== moment().format('YYYYMMDD') && dict.isRepair != 1){
        disabled = true;
      }
    }

    return (
      <Card className="smallCard" bodyStyle={{padding: '10px'}} key={key} title={dict.roomNo}
            extra={dict.isRepair == 1 ? '维修' : statusDict[dict.status]}>
        {chiDiv}
        <Row className='bottomLine'>
          <Col span={7}><p>房间状态</p></Col>
          <Col span={17}>
            <Select disabled={disabled} value={dict.isRepair == 1 ? '维修' : statusDict[dict.status]} key={key} onChange={(index) => {
              handleChange(index, dict)
            }} className='antCli' placeholder='请选择'>
              {chiDivAry}
            </Select>
          </Col>
        </Row>
      </Card>
    )
  }

  function handleChange(index, dict) {
    const webparam = parse(location.search.substr(1))
    let param = {"roomId": dict.roomId, "status": index};
    if (webparam.useDate) {
      param.useDate = webparam.useDate;
    }
    dispatch({type: 'roomStatusManagement/dayStatusUpdate', payload: param})
  }

  let array = [];
  if (roomList) {
    for (let i = 0; i < roomList.length; i++) {
      array.push(creatChiCard(roomList[i], i));
    }
  }


  return (
    <div className="cardArrayDiv">
      {array}
    </div>
  )
}

class DayRoomStatus extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({type: 'roomStatusManagement/dayStatus'});
  }

  statusChange(array) {
    if (isAll) {
      isAll = false;
      if (array.indexOf('all') != -1) {
        array.map((value, index) => {
          if (value == 'all') {
            array.splice(index, 1);
          }
        })

      } else {
        array = ''
      }
    } else {

      if (array.indexOf('all') != -1) {
        isAll = true;
        array = ['all', '0', '1', '2', '3', '4', '5', '6', '7']
      } else {
        if (array.length === 8) {
          isAll = true;
          array.push('all')
        }
      }
    }

    this.props.dispatch({type: 'roomStatusManagement/setSelectValue', payload: {data: array}})
  }


  render(){

    const ScreenBarDiv = Form.create()(ScreenBar);
    const {loading} = this.props;
    const {selectValue, roomList} = this.props.users;

    return(
      <div>
        <ScreenBarDiv selectValue={selectValue} supProps={this.props}
                      statusChange={this.statusChange.bind(this)}/>
        <Spin
          spinning={loading.effects['roomStatusManagement/dayStatus'] !== undefined ? loading.effects['roomStatusManagement/dayStatus'] : false}>
          <CardArray dispatch={this.props.dispatch}
                     roomList={roomList || this.props.users.dayStatusData.roomList}/>
        </Spin>
      </div>
    )
  }
}

let isAll = true;

class roomStatusIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const MonthRoomStatus = <RoomStateForMonthView {...this.props}/>;
    const RoomStatus = <DayRoomStatus {...this.props}/>;
    return (
      <div className="roomStatusDiv">
        {
          this.props.users.roomState === "day"
            ?
            RoomStatus
            :
            MonthRoomStatus
        }

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.roomStatusManagement,
    loading: state.loading,
  };
}

export default connect(mapStateToProps)(roomStatusIndex) ;
