
import React from 'react'
import {connect} from 'dva'
import './userInfoIndex.scss'
import {Row, Col, Button,Input,Form} from 'antd'
import { message } from 'antd'
import moment from 'moment'
const FormItem = Form.Item;

function textforkey(dict,key) {

  if(dict[key] !== undefined){
    return dict[key];
  }
  else if(dict.entrys[0]){
    if (dict.entrys[0][key] !== undefined){
      return dict.entrys[0][key];
    }
  }

  return ''
}

let contact = '';

function CreatUserInfoIndex(props,dispatch,isEdit,validate,editingFun,editFun) {
  let infoChiAry = [];
  const baseInfoDiv = [];
  const contactDiv = [];

  if (props){
    infoChiAry = [{title:'编号',value:textforkey(props,'id')},{title:'性别',value:props.sex === 1 ? '男' : '女'},{title:'地方中心',value:textforkey(props,'locCenter'),},
      {title:'隶属部门',value:textforkey(props,'dept')}, {title:'直系领导',value:textforkey(props,'leaderName')},{title:'职位', value:textforkey(props,'position')},
      {title:'登录手机号',value:textforkey(props,'mobile')}, {title:'联系方式',value:textforkey(props,'contact')},{title:'公司邮箱',value:textforkey(props,'emaill')},
      {title:'内部分机',value:textforkey(props,'extension')}]

    for(let i = 0;i<infoChiAry.length - 4;i++){
      baseInfoDiv.push(creatChiDiv(infoChiAry[i]))
    }

    for(let i = infoChiAry.length - 4;i<infoChiAry.length;i++){
      contactDiv.push(creatChiDiv(infoChiAry[i]))
    }
  }



  function creatChiDiv(dict) {
      if(dict.title === '联系方式' && isEdit){
        return(
          <Row className="cell" key={dict.title}>
            <Col span={6} className="titleLabel">{dict.title}：</Col>
            <Col className='valueLabel' span={18}>
              <FormItem validateStatus={validate}>
                <Input  defaultValue={dict.value} onChange={onChange}/>
              </FormItem>
            </Col>
          </Row>
        )
      }
      else
      {
        return(
          <Row className="cell" key={dict.title}>
            <Col span={6} className="titleLabel">{dict.title}：</Col>
            <Col className='valueLabel' span={18}>{dict.value}</Col>
          </Row>
        )
      }
  }

  function onChange(e) {

    let regu =/^1[34578]{1}\d{9}$/;
    let re = new RegExp(regu);
    if (re.test(e.target.value)) {
      contact = e.target.value;
      editingFun('success')
    }else{
      editingFun('warning')
    }
  }

  function editBtnClick(edit = true) {
    if (props.entrys[0]){
      editFun(edit)
      contact = textforkey(props,'contact');
    }
    else {
      message.error('缺少入职信息')
    }

  }

  function onLogout() {
    dispatch({
      type: "layout/logout",
    })
  }

  function backBtnClick() {
    editFun(false)

  }

  function subMit() {

    if(validate === 'warning'){
      message.warning('请输入正确的手机号')
    }
    else {
      if(contact === textforkey(props,'contact')){
        editFun(false)
        return;
        alert(11)
      }
      else {
        dispatch({
          type: "users/modifyUser",
          payload:{contact:contact}
        })
        editFun(false)

      }
    }
  }

  return (
    <div className = "user-cent">

      <div className="leftContent">

        <div className="topDiv">
          <img className="icon" src={props? props.imgURL : ''} alt=""/>
          <div className="rightChi"> <h3>{props? props.name : ''}</h3> {baseInfoDiv}</div>
        </div>

        <div  className="bottomDiv">

          <p>{props?`${moment( ).format('YYYY年MM月DD日')}入职`:''}<br/>
            {props?`你与凯贝姆已经一起成长 ${moment().diff(props.createTime, 'days')}天 了`:''}
            </p>

        </div>

      </div>

      <div className="rightContent">
        <div className="topDiv"><p>联系方式</p></div>
        <div className="bottomDiv">{contactDiv}</div>
        {
          !isEdit ?
            <div className='buttonDiv'>
            <Button className='button' type="primary" onClick={editBtnClick}>编辑</Button>
            <Button className='button' type="danger" onClick={onLogout}>退出登录</Button>
          </div>
            :
            <div className='buttonDiv'>
              <Button className='button' onClick={backBtnClick}>返回</Button>
              <Button className='button' type="primary" onClick={subMit}>完成</Button>
            </div>
        }

      </div>

    </div>
  );
}

class UserInfoIndex extends React.Component{
  constructor(props) {
    super(props);
  }

  state = {
    isEdit:false,
    validating:'success'
  }

  componentDidMount(){
    this.props.dispatch({type: 'users/getCurrentUserInfo'});
  }

  edit(edit){
    this.setState({isEdit:edit})
  }

  editing(validating){
    this.setState({validating:validating})
  }

  render(){
    return( CreatUserInfoIndex(this.props.users.usersInfo,this.props.dispatch,this.state.isEdit,this.state.validating,this.editing.bind(this),this.edit.bind(this)))
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    users: state.users,
  };
}

export default connect(mapStateToProps)(UserInfoIndex);
