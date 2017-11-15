/**
 * Created by Flyforwards on 2017/8/17.
 */

import React, { Component } from 'react';
import { CreatCard, creatButton } from './ServiceComponentCreat'
import { Card, Input, Form, Button, Spin, Tabs } from 'antd';
import { connect } from 'dva';
import PermissionButton from 'common/PermissionButton';
import { parse } from 'qs'
import { routerRedux } from 'dva/router'
import { queryURL } from '../../utils/index.js';
const TabPane = Tabs.TabPane;
let babyhead11 = true;
let babyhead20allboy = true;
let babyhead163 = true;
let babyhead164 = true;
let babyhead165 = true;
let babyhead141 = true;


class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //腹部
      stateBabyhead11: true,
      //男女生殖
      //骨骼
      stateBabyhead163: true,
      stateBabyhead164: true,
      stateBabyhead165: true,
      //tabs值
      tabKey: 0,
      tabClick: false
    }
  }


  onDelete() {
    if (this.props.BabyAllData && this.props.BabyAllData.length > 1) {
      if (this.state.tabClick) {
        this.props.dispatch({
          type: 'serviceCustomerChild/onDeleteBabydata',
          payload: { type: 3, dataId: queryURL("customerId"), operatorItem: 3, babyId: this.state.tabKey }
        })
      } else {
        this.props.dispatch({
          type: 'serviceCustomerChild/onDeleteBabydata',
          payload: { type: 3, dataId: queryURL("customerId"), operatorItem: 3, babyId: this.props.BabyId }
        })
      }
    } else {
      this.props.dispatch({
        type: 'serviceCustomerChild/onDeleteBabydata',
        payload: { type: 3, dataId: queryURL("customerId"), operatorItem: 3, babyId: this.props.BabyId }
      })
    }
  }


  editBtnClick() {
    let _data = {"operatorItem":3 }
    _data.dataId = this.state.tabClick ? this.state.hostId : this.props.hostId;
    _data.babyId = this.state.tabClick ? this.state.tabKey : this.props.BabyId;
    _data.edit = true;
    this.props.dispatch({
        type:'serviceCustomerChild/getBabyDataById',
        payload:_data
    })


    // if (this.props.BabyAllData && this.props.BabyAllData.length > 1) {
    //   if (this.state.tabClick) {
    //     this.props.dispatch(routerRedux.push(`/service/child-check-in/edit?customerid=${parse(location.search.substr(1)).customerid}&id=${this.state.hostId}&babyId=${this.state.tabKey}`));
    //   } else {
    //     this.props.dispatch(routerRedux.push(`/service/child-check-in/edit?customerid=${parse(location.search.substr(1)).customerid}&id=${this.props.hostId}&babyId=${this.props.BabyId}`));
    //   }
    // } else {
    //   this.props.dispatch(routerRedux.push(`/service/child-check-in/edit?customerid=${parse(location.search.substr(1)).customerid}&id=${this.props.hostId}&babyId=${this.props.BabyId}`));
    // }
  }

  backClicked() {
    this.props.dispatch(routerRedux.push('/service/child-check-in'));
  }

  editBackClicked() {
    this.props.dispatch(routerRedux.push({
      path: '/service/child-check-in/detail',
      query: {
        customerid: queryURL("customerid")
      }
    }))
  }
  createBtnClick() {
   // console.log("xx",this.props.BabyMsg[0].babyId)
    let babyId = this.state.tabClick ? this.state.tabKey : this.props.BabyMsg[0].babyId;
    let dataId = this.state.tabClick ? this.state.hostId : this.props.BabyMsg[0].id;
    this.props.dispatch(routerRedux.push(`/service/child-check-in/edit?customerid=${parse(location.search.substr(1)).customerid}&babyId=${babyId}`));

  }

  print() {

  }

  // submitClicked(){
  //   this.props.form.validateFieldsAndScroll((err, values) => {
  //     if (!err) {
  //       // Object.keys(values).map(key=>{
  //       //   if(typeof values[key] === 'object'){
  //       //     values[key] = values[key].format()
  //       //   }
  //       // })
  //       const assessmentInfo =  JSON.stringify(values);
  //       let dict = { "assessmentInfo": assessmentInfo, "customerId": queryURL('customerid'),"type": 3,operatorItem:3};
  //       if(this.props.ChildCheckInID){
  //         dict.id = this.props.ChildCheckInID
  //       }
  //       this.props.dispatch({type:'serviceCustomer/saveAssessment',payload:dict})
  //     }
  //   });
  // }
  componentWillUnmount() {
    //this.props.dispatch({type: 'serviceCustomer/removeData'})
    this.props.dispatch({ type: 'serviceCustomerChild/removeData' })
  }

  //复选框选择事件
  checkBabyHead11(checkedValues) {
    if (checkedValues.indexOf('3') >= 0) {
      this.setState({
        stateBabyhead11: false
      })
    } else {
      this.setState({
        stateBabyhead11: true
      })
    }
  }

  //骨骼复选
  onbabyhead16Change(checkedValues) {
    if (checkedValues.indexOf('3') >= 0) {
      this.setState({
        stateBabyhead163: false
      })
    } else {
      this.setState({
        stateBabyhead163: true
      })
    }
    if (checkedValues.indexOf('4') >= 0) {
      this.setState({
        stateBabyhead164: false
      })
    } else {
      this.setState({
        stateBabyhead164: true
      })
    }
    if (checkedValues.indexOf('5') >= 0) {
      this.setState({
        stateBabyhead165: false
      })
    } else {
      this.setState({
        stateBabyhead165: true
      })
    }
  }

  //男女选择
  radioMale(e) {
    this.setState({ babyhead20allState: e.target.value })
  }

  //交付状态选择
  onBabyheade141(e) {
    this.setState({ stateBabyheade141: e.target.value })
  }

  //  getChiAry(elem,arys) {
  //   arys.map(value=>{
  //     value.netData = elem.assessmentBabyInfo ? JSON.parse(elem.assessmentBabyInfo):{};
  //   //  value.baseInfoDict = this.props.baseInfoDict?this.props.baseInfoDict:{};
  //     return CreatCard(this.props.form,value)
  //   })
  // }
  //tab转换
  onTabChange(key) {
    this.setState({
      tabKey: key,
      tabClick: true
    })
    this.props.BabyMsg.map(function (elem, index) {
      if (this.state.tabKey === elem.babyId) {
        this.setState({
          hostId: elem.id
        })
      }
    })
  }

  render() {
    babyhead11 = true;
    babyhead20allboy = true;
    babyhead163 = true;
    babyhead164 = true;
    babyhead165 = true;
    babyhead141 = true;
    const { loading, summary, BabyAllData,BabyMsg } = this.props;
    BabyAllData ? BabyAllData.map(function (elem, index) {
      if(JSON.parse(elem.assessmentBabyInfo).babyhead11) {
        JSON.parse(elem.assessmentBabyInfo).babyhead11.map(function (elem, index) {
          babyhead11 = elem == 3 ? false : true;
        });
      }
    }) : '';

    BabyAllData ? BabyAllData.map(function (elem, index) {
      if(JSON.parse(elem.assessmentBabyInfo).babyhead16) {
        JSON.parse(elem.assessmentBabyInfo).babyhead16.map(function (elem, index) {
          babyhead163 = elem == 3 ? false : true;
          babyhead164 = elem == 4 ? false : true;
          babyhead165 = elem == 5 ? false : true;
        })
      }
    }) : '';


    BabyAllData ? BabyAllData.map(function (elem, index) {
      babyhead20allboy = JSON.parse(elem.assessmentBabyInfo).babyhead20all == 0 ? false : true;
    }) : '';

    BabyAllData ? BabyAllData.map(function (elem, index) {
      babyhead141 = JSON.parse(elem.assessmentBabyInfo).babyhead14 == 0 ? false : true;
    }) : '';

    // ChildCheckInData ? ChildCheckInData.babyhead11.map(function(elem,index){
    //   babyhead11 = elem == 3 ? false : true;
    // }):'';
    // ChildCheckInData ? ChildCheckInData.babyhead16.map(function(elem,index){
    //   babyhead163 = elem == 3 ? false : true;
    //   babyhead164 = elem == 4 ? false : true;
    //   babyhead165 = elem == 5 ? false : true;
    // }):''
    // if(BabyAllData) {
    //   babyhead20allboy =ChildCheckInData.babyhead20all ==0 ? false:true;
    // }
    // if(ChildCheckInData) {
    //   babyhead141 =ChildCheckInData.babyhead14 == 0 ? false:true;
    // }
    if (this.state.babyhead20allState) {
      babyhead20allboy = this.state.babyhead20allState == 1 ? true : false;
    }
    if (this.state.stateBabyheade141) {
      babyhead141 = this.state.stateBabyheade141 == 0 ? false : true;
    }
    // 基本信息
    const baseInfoAry = [
      { title: '客户姓名', span: 8, component: 'Input', submitStr: 'name', disable: true },
      { title: '年龄', span: 8, component: 'Input', submitStr: 'age', disable: true },
      { title: '宝宝性别', span: 8, component: 'gender', submitStr: 'babySex', disable: true },
      { title: '分娩日期', span: 8, component: 'DatePicker', submitStr: 'baseInfo1', disable: true },
      { title: '入住日期', span: 8, component: 'DatePicker', submitStr: 'baseInfo2', disable: true },
      { title: '房间', span: 8, component: 'Input', submitStr: 'baseInfo3', disable: true },
      { title: '破水时间', span: 8, component: 'DatePicker', submitStr: 'baseTime0' },
      { title: 'Apgar评分', span: 8, component: 'Input', submitStr: 'select_0', disable: true },
      { title: '孕次', span: 8, component: 'Input', selectName: 'GRAVIDITY', submitStr: 'gravidity', disable: true },
      { title: '产次', span: 8, component: 'Input', selectName: 'FETUS', submitStr: 'fetus', disable: true },
      {
        title: '生产数量',
        span: 15,
        component: 'RadioGroups',
        submitStr: 'babyNum',
        radioAry: [{ 'name': '单胞胎', 'value': '0' }, { 'name': '双胞胎', 'value': '1' }, { 'name': '', 'value': '3' }]
      },
      { title: '周数', span: 8, component: 'Input', submitStr: 'weekNum' },
      {
        title: '生产方式',
        component: 'RadioGroups',
        span: 15,
        submitStr: 'radio_15',
        disable: true,
        radioAry: [{ 'name': '自然生产', 'value': '0' }, { 'name': '剖腹生产', 'value': '1' }]
      }
    ]

    // 新生儿情况
    const newbornAry = [
      { title: '宝宝性别', component: 'gender', submitStr: 'babySex' },
      { title: '出生体重', component: 'Input', unit: 'g', submitStr: 'babyWeight' },
      { title: '出生身长', component: 'Input', unit: 'cm', submitStr: 'babyLength' },
      { title: '出生时头围', component: 'Input', unit: 'cm', submitStr: 'babyHead0' },
      { title: '出生时胸围', component: 'Input', unit: 'cm', submitStr: 'babyHead1' },
      {
        title: '囱门',
        formItems: 'TwoWords',
        items: true,
        component: 'Select',
        span: 12,
        submitStr: 'babyHead2',
        chiAry: ['平坦柔软', '紧绷鼓出', '凹陷']
      },
      {
        title: '头皮',
        formItems: 'TwoWords',
        component: 'CheckBoxGroup',
        span: 12,
        submitStr: 'babyhead3',
        checkAry: [{ 'label': '正常', 'value': '0' }, { 'label': '破皮', 'value': '1' }, {
          'label': '产瘤',
          'value': '2'
        }, { 'label': '头血肿', 'value': '3' }, { 'label': '其他', 'value': '4' }]
      },
      {
        title: '眼睛',
        formItems: 'TwoWords',
        component: 'CheckBoxGroup',
        span: 12,
        submitStr: 'babyhead4',
        checkAry: [{ 'label': '正常', 'value': '0' }, { 'label': '日落眼', 'value': '1' }, {
          'label': '分泌物',
          'value': '2'
        }, { 'label': '眼睑肿胀', 'value': '3' }, { 'label': '巩膜出血', 'value': '4' }, { 'label': '其他', 'value': '5' }]
      },
      {
        title: '瞳孔大小',
        formItems: 'FourWords',
        items: true,
        component: 'Select',
        span: 12,
        submitStr: 'babyhead5',
        chiAry: ['对称', '不对称']
      },
      {
        title: '耳朵',
        formItems: 'TwoWords',
        component: 'CheckBoxGroup',
        span: 12,
        submitStr: 'babyhead6',
        checkAry: [{ 'label': '正常', 'value': '0' }, { 'label': '红', 'value': '1' }, {
          'label': '肿',
          'value': '2'
        }, { 'label': '分泌物', 'value': '3' }, { 'label': '低下', 'value': '4' }, {
          'label': '畸形',
          'value': '5'
        }, { 'label': '耳边瘜肉', 'value': '6' }]
      },
      {
        title: '鼻子',
        formItems: 'TwoWords',
        component: 'CheckBoxGroup',
        span: 16,
        submitStr: 'babyhead8',
        checkAry: [{ 'label': '正常', 'value': '0' }, { 'label': '肿胀', 'value': '1' }, {
          'label': '鼻塞',
          'value': '2'
        }, { 'label': '鼻分泌物', 'value': '3' }, { 'label': '出血', 'value': '4' }, {
          'label': '鼻道畸形',
          'value': '5'
        }, { 'label': '其他', 'value': '6' }]
      },
      {
        title: '口腔',
        formItems: 'TwoWords',
        component: 'CheckBoxGroup',
        span: 16,
        submitStr: 'babyhead7',
        checkAry: [{ 'label': '正常', 'value': '0' }, { 'label': '腭裂', 'value': '1' }, {
          'label': '唇裂',
          'value': '2'
        }, { 'label': '歪嘴', 'value': '3' }, { 'label': '舌苔', 'value': '4' }, {
          'label': '鹅口疮',
          'value': '5'
        }, { 'label': '溃疡', 'value': '6' }, { 'label': '舌系代短', 'value': '7' }]
      },
      {
        title: '颈部',
        formItems: 'TwoWords',
        span: 12,
        component: 'CheckBoxGroup',
        submitStr: 'babyhead9',
        checkAry: [{ 'label': '正常', 'value': '0' }, { 'label': '肿胀', 'value': '1' }, {
          'label': '疑斜颈',
          'value': '2'
        }, { 'label': '僵硬', 'value': '3' }]
      },
      {
        title: '胸部',
        formItems: 'TwoWords',
        items: true,
        span: 12,
        component: 'Select',
        submitStr: 'babyhead10',
        chiAry: ['正常', '胸骨凹陷', '水桶胸']
      },
      {
        title: '腹部',
        formItems: 'TwoWords',
        span: 12,
        component: 'CheckBoxGroup',
        fun: this.checkBabyHead11.bind(this),
        submitStr: 'babyhead11',
        checkAry: [{ 'label': '正常', 'value': '0' }, { 'label': '疤痕', 'value': '1' }, {
          'label': '脐膨出',
          'value': '2'
        }, { 'label': '疝气', 'value': '3' }]
      },
      {
        title: '疝气部位',
        span: 12,
        formItems: 'TwoWords',
        items: true,
        component: 'Input',
        noRequired: true,
        submitStr: 'babyhead11-0',
        hide: babyhead11 && this.state.stateBabyhead11
      },
      {
        title: '脐带脱落',
        formItems: 'FourWords',
        span: 12,
        component: 'RadioGroups',
        submitStr: 'babyhead12',
        radioAry: [{ 'name': '是', 'value': '0' }, { "name": '否', 'value': '1' }]
      },
      {
        title: '脐带状态',
        formItems: 'FourWords',
        span: 12,
        component: 'CheckBoxGroup',
        submitStr: 'babyhead13',
        checkAry: [{ 'label': '干燥', 'value': '0' }, { 'label': '分泌物', 'value': '1' }, {
          'label': '潮湿',
          'value': '2'
        }, { 'label': '渗血', 'value': '3' }, { 'label': '红肿', 'value': '4' }]
      },
      {
        title: '交付状态',
        formItems: 'FourWords',
        span: 12,
        component: 'RadioGroups',
        fun: this.onBabyheade141.bind(this),
        submitStr: 'babyhead14',
        radioAry: [{ 'name': '已交付', 'value': '0' }, { 'name': '未交付', 'value': '1' }]
      },
      {
        title: '交付时间',
        formItems: 'FourWords',
        items: true,
        noRequired: true,
        span: 12,
        hide: babyhead141,
        component: 'DatePicker',
        submitStr: 'babyhead15'
      },
      {
        title: '骨骼',
        formItems: 'TwoWords',
        span: 12,
        component: 'CheckBoxGroup',
        fun: this.onbabyhead16Change.bind(this),
        submitStr: 'babyhead16',
        checkAry: [{ 'label': '正常', 'value': '0' }, { 'label': '脊髓膜膨出', 'value': '1' }, {
          'label': '脊椎弯曲',
          'value': '2'
        }, { 'label': '骨折', 'value': '3' }, { 'label': '脱臼', 'value': '4' }, { 'label': '尾骶凹', 'value': '5' }]
      },
      {
        title: '骨折部位',
        formItems: 'FourWords',
        hide: this.state.stateBabyhead163 && babyhead163,
        span: 12,
        component: 'Input',
        noRequired: true,
        submitStr: 'babyhead163',
        placeholder: '输入骨折部位'
      },
      {
        title: '脱臼部位',
        formItems: 'FourWords',
        items: true,
        hide: this.state.stateBabyhead164 && babyhead164,
        span: 12,
        component: 'Input',
        noRequired: true,
        submitStr: 'babyhead164',
        placeholder: '输入脱臼部位'
      },
      {
        title: '尾骶凹状态',
        formItems: 'FourWords',
        hide: this.state.stateBabyhead165 && babyhead165,
        noRequired: true,
        span: 12,
        component: 'RadioGroups',
        submitStr: 'babyhead165',
        radioAry: [{ 'name': '有毛', 'value': '0' }, { 'name': '无毛', 'value': '1' }]
      },
      {
        title: '上肢',
        formItems: 'TwoWords',
        span: 12,
        component: 'CheckBoxGroup',
        submitStr: 'babyhead17',
        checkAry: [{ 'label': '正常', 'value': '0' }, { 'label': '无力', 'value': '1' }, {
          'label': '僵直',
          'value': '2'
        }, { 'label': '缺损', 'value': '3' }, { 'label': '畸形', 'value': '4' }]
      },
      {
        title: '下肢',
        formItems: 'TwoWords',
        span: 12,
        component: 'CheckBoxGroup',
        submitStr: 'babyhead18',
        checkAry: [{ 'label': '正常', 'value': '0' }, { 'label': '无力', 'value': '1' }, {
          'label': '内翻',
          'value': '2'
        }, { 'label': '外翻', 'value': '3' }, { 'label': '僵直', 'value': '4' }, {
          'label': '缺损',
          'value': '5'
        }, { 'label': '畸形', 'value': '6' }]
      },
      {
        title: '皮肤',
        formItems: 'TwoWords',
        span: 12,
        component: 'CheckBoxGroup',
        submitStr: 'babyhead19',
        checkAry: [{ 'label': '红润', 'value': '0' }, { 'label': '黄', 'value': '1' }, {
          'label': '苍白',
          'value': '2'
        }, { 'label': '青铜', 'value': '3' }, { 'label': '发绀', 'value': '4' }, {
          'label': '红臀',
          'value': '5'
        }, { 'label': '红疹', 'value': '6' }, { 'label': '毒性红斑', 'value': '7' }]
      },
      {
        title: '生殖器',
        formItems: 'TwoWords',
        span: 12,
        component: 'RadioGroups',
        submitStr: 'babyhead20all',
        fun: this.radioMale.bind(this),
        radioAry: [{ 'name': '男', 'value': '0' }, { 'name': '女', 'value': '1' }]
      },
      {
        title: '生殖器男',
        span: 24,
        noRequired: true,
        component: 'CheckBoxGroup',
        hide: babyhead20allboy,
        submitStr: 'babyhead20',
        checkAry: [{ 'label': '正常', 'value': '0' }, { 'label': '睾丸已下降', 'value': '1' }, {
          'label': '睾丸未下降',
          'value': '2'
        }, { 'label': '尿道下裂', 'value': '3' }, { 'label': '红肿', 'value': '4' }, {
          'label': '阴囊水肿',
          'value': '5'
        }, { 'label': '疝气', 'value': '6' }, { 'label': '包皮过长', 'value': '7' }, {
          'label': '阴茎无法外露包皮紧',
          'value': '8'
        }, { 'label': '已行包皮环割术', 'value': '9' }]
      },
      {
        title: '生殖器女',
        noRequired: true,
        formItems: 'FourWords',
        span: 12,
        component: 'CheckBoxGroup',
        hide: !babyhead20allboy,
        submitStr: 'babyhead22',
        checkAry: [{ 'label': '正常', 'value': '0' }, { 'label': '阴唇肿', 'value': '1' }]
      },
      {
        title: '分泌物',
        noRequired: true,
        formItems: 'TwoWords',
        span: 12,
        component: 'InputGroup',
        placeholder: '输入分泌物性状和颜色',
        hide: babyhead20allboy && !babyhead20allboy ? true : false,
        submitStr: 'babyhead21',
        radioAry: [{ 'name': '无', 'value': '0' }, { 'name': '有', 'value': '1' }]
      },
      {
        title: '大便',
        formItems: 'TwoWords',
        span: 12,
        component: 'CheckBoxGroup',
        submitStr: 'babyhead23',
        checkAry: [{ 'label': '正常', value: '0' }, { 'label': '腹泻', value: '1' }, {
          'label': '未解',
          value: '2'
        }, { 'label': '血便', value: '3' }, { 'label': '无肛', value: '4' }]
      },
      { title: '大便颜色', formItems: 'FourWords', span: 12, component: 'RadioClass', submitStr: 'babyhead24' },
      {
        title: '小便',
        formItems: 'TwoWords',
        span: 12,
        component: 'CheckBoxGroup',
        submitStr: 'babyhead25',
        checkAry: [{ 'label': '正常', value: '0' }, { 'label': '血尿', value: '1' }, {
          'label': '少尿',
          value: '2'
        }, { 'label': '尿结晶', value: '3' }, { 'label': '未解', value: '4' }]
      }

    ]

    // 新生儿情况
    const newbornTwoAry = [
      {
        title: '呼吸状态',
        formItems: 'FourWords',
        span: 12,
        component: 'RadioClass',
        submitStr: 'babyCare0',
        radioAry: [{ 'name': '正常', 'value': '0' }, {
          'name': '异常',
          'value': '1',
          'Element': 'Input',
          "submitStr": 'babyCare00'
        }]
      },
      {
        title: '呼吸速率',
        formItems: 'FourWords',
        items: true,
        span: 12,
        component: 'Select',
        submitStr: 'babyCare1',
        chiAry: ['正常', '呼吸急促', '呼吸过慢', '呼吸暂停']
      },
      {
        title: '呼吸音',
        formItems: 'FourWords',
        span: 12,
        component: 'RadioClass',
        submitStr: 'babyCare2',
        radioAry: [{ 'name': '清晰', 'value': '0' }, {
          'name': '异常',
          'value': '1',
          'Element': 'Input',
          'submitStr': 'babyCare2-0'
        }]
      },
      {
        title: '心跳',
        formItems: 'TwoWords',
        items: true,
        span: 12,
        component: 'Select',
        submitStr: 'babyCare3',
        chiAry: ['正常', '心跳过快', '心跳过慢', '心率不整']
      },
      {
        title: '心音',
        formItems: 'TwoWords',
        span: 12,
        component: 'RadioGroups',
        submitStr: 'babyCare4',
        radioAry: [{ 'name': '正常', 'value': '0' }, { 'name': '杂音', 'value': '1' }]
      },
      {
        title: '饮食',
        formItems: 'TwoWords',
        span: 12,
        component: 'CheckBoxGroup',
        submitStr: 'babyCare15',
        checkAry: [{ 'label': '母乳喂养', 'value': '0' }, { 'label': '奶瓶喂食', 'value': '1' }]
      },
      {
        title: '腹部',
        formItems: 'TwoWords',
        span: 12,
        component: 'RadioGroups',
        submitStr: 'babyCare5',
        radioAry: [{ 'name': '柔软', 'value': '0' }, { 'name': '腹胀', 'value': '1' }]
      },
      {
        title: '肠蠕动声',
        formItems: 'FourWords',
        span: 12,
        component: 'RadioGroups',
        submitStr: 'babyCare6',
        radioAry: [{ 'name': '有', 'value': '0' }, { 'name': '无', 'value': '1' }]
      },
      {
        title: '吐奶',
        formItems: 'TwoWords',
        span: 12,
        component: 'InputGroup',
        placeholder: '吐奶性状和颜色',
        submitStr: 'babyCare7',
        radioAry: [{ 'name': '无', 'value': '0' }, { 'name': '有', 'value': '1' }]
      },
      {
        title: '活动力',
        formItems: 'FourWords',
        span: 12,
        component: 'RadioGroups',
        submitStr: 'babyCare8',
        radioAry: [{ 'name': '活动力佳', 'value': '0' }, { 'name': '活动力差', 'value': '1' }]
      },
      {
        title: '姿势',
        formItems: 'TwoWords',
        span: 12,
        component: 'RadioGroups',
        submitStr: 'babyCare9',
        radioAry: [{ 'name': '屈曲状', 'value': '0' }, { 'name': '软弱伸展', 'value': '1' }]
      },
      {
        title: '哭声',
        formItems: 'TwoWords',
        span: 12,
        component: 'RadioGroups',
        submitStr: 'babyCare10',
        radioAry: [{ 'name': '正常', 'value': '0' }, { 'name': '微弱', 'value': '1' }, {
          'name': '沙哑',
          'value': '2'
        }, { 'name': '尖锐', 'value': '3' }]
      },
      {
        title: '拥抱反射',
        formItems: 'FourWords',
        span: 12,
        component: 'RadioClass',
        submitStr: 'babyCare11',
        radioAry: [{ 'name': '正常', 'value': '0' }, {
          'name': '异常',
          'value': '1',
          'Element': 'Input',
          'submitStr': 'babyCare11-0'
        }]
      },
      {
        title: '踏步反射',
        formItems: 'FourWords',
        span: 12,
        component: 'RadioClass',
        submitStr: 'babyCare12',
        radioAry: [{ 'name': '正常', 'value': '0' }, {
          'name': '异常',
          'value': '1',
          'Element': 'Input',
          'submitStr': 'babyCare12-0'
        }]
      },
      {
        title: '吸允反应',
        formItems: 'FourWords',
        span: 12,
        component: 'RadioClass',
        submitStr: 'babyCare13',
        radioAry: [{ 'name': '正常', 'value': '0' }, {
          'name': '异常',
          'value': '1',
          'Element': 'Input',
          'submitStr': 'babyCare13-0'
        }]
      },
      { title: '其他', component: 'TextArea', span: 24, submitStr: 'babyCare14' },
      { title: '评估者', component: 'Input', span: 6, submitStr: 'newborn_3' },
      { title: '评估时间', component: 'DatePicker', offset: 12, span: 6, submitStr: 'newborn_4' }
    ]
    //,{title:'入住时婴儿评估',ary:newbornTwoAry}
    const ary = [{ title: summary ? '' : '基本信息', ary: summary ? baseInfoAry.slice(6) : baseInfoAry }]
    const arys = [{ title: '入住时婴儿评估', ary: newbornAry }, { title: '入住时婴儿评估', ary: newbornTwoAry }]
    let chiAry;
      chiAry = ary.map(value => {
        if (BabyAllData && BabyAllData.length > 1) {
          value.netData = JSON.parse(BabyAllData[0].assessmentBabyInfo);
        } else {
          value.netData = BabyAllData && BabyAllData.length != 0 ? JSON.parse(BabyAllData[0].assessmentBabyInfo) : {}
        }
        value.baseInfoDict = this.props.baseInfoDict ? this.props.baseInfoDict : {};
        return CreatCard(this.props.form, value)
      })


    let tabs = [];
    let chiArys;
    let _this = this;

    if(BabyMsg && BabyMsg.length != 0){
      BabyMsg && BabyMsg.length > 1 ? BabyMsg.map(function (elem, index) {
        tabs.push(<TabPane tab={`宝-${elem.babyId}`} key={elem.babyId}>
          {
            BabyAllData ? BabyAllData.map(function(v,i){
              v.babyId == elem.babyId ? arys.map(value => {
                value.netData = v.assessmentBabyInfo ? JSON.parse(v.assessmentBabyInfo) : {};
                //  value.baseInfoDict = this.props.baseInfoDict?this.props.baseInfoDict:{};
                return CreatCard(_this.props.form, value)
              }):''
            }):''
          }
        </TabPane>)
      }) : (BabyAllData ? chiArys = arys.map(value => {
        value.netData = this.props.BabyAllData ? JSON.parse(this.props.BabyAllData[0].assessmentBabyInfo) : {};
        //value.baseInfoDict = this.props.baseInfoDict?this.props.baseInfoDict:{};
        return CreatCard(this.props.form, value)
      }):'');
    }



    // if(BabyAllData && BabyAllData.length != 0) {
    //   BabyAllData && BabyAllData.length > 1 ? BabyAllData.map(function (elem, index) {
    //     tabs.push(<TabPane tab={`宝-${elem.babyId}`} key={elem.babyId}>
    //       {arys.map(value => {
    //         value.netData = elem.assessmentBabyInfo ? JSON.parse(elem.assessmentBabyInfo) : {};
    //         //  value.baseInfoDict = this.props.baseInfoDict?this.props.baseInfoDict:{};
    //         return CreatCard(_this.props.form, value)
    //       })}
    //     </TabPane>)
    //   }) : chiArys = arys.map(value => {
    //     value.netData = this.props.BabyAllData ? JSON.parse(this.props.BabyAllData[0].assessmentBabyInfo) : {};
    //     //value.baseInfoDict = this.props.baseInfoDict?this.props.baseInfoDict:{};
    //     return CreatCard(this.props.form, value)
    //   });
    // }
    // BabyAllData && BabyAllData.length > 1 ? BabyAllData.map(function (elem, index) {
    //   tabs.push(<TabPane tab={`宝-${elem.babyId}`} key={elem.babyId}>
    //     {arys.map(value => {
    //       value.netData = elem.assessmentBabyInfo ? JSON.parse(elem.assessmentBabyInfo) : {};
    //       //  value.baseInfoDict = this.props.baseInfoDict?this.props.baseInfoDict:{};
    //       return CreatCard(_this.props.form, value)
    //     })}
    //   </TabPane>)
    // }) : chiArys = arys.map(value => {
    //   value.netData = this.props.ChildCheckInData ? this.props.ChildCheckInData : {};
    //   //value.baseInfoDict = this.props.baseInfoDict?this.props.baseInfoDict:{};
    //   return CreatCard(this.props.form, value)
    // });
    const bottomDiv = <div className='button-group-bottom-common'>
      {this.props.BabyAllData ? '' : creatButton('创建', this.createBtnClick.bind(this))}
      {creatButton('返回', this.backClicked.bind(this))}
      {this.props.BabyAllData ? creatButton('删除', this.onDelete.bind(this)) : ''}
      {this.props.BabyAllData ? creatButton('编辑', this.editBtnClick.bind(this)) : ''}
      {this.props.BabyAllData ? creatButton('打印', this.print.bind(this)) : ''}
    </div>;

    return (
      <Spin spinning={loading.effects['serviceCustomerChild/getBabymsgByCustomerId'] !== undefined ? loading.effects['serviceCustomerChild/getBabymsgByCustomerId'] : false}>

        <Card className='CheckBeforeInput' style={{ width: '100%' }} bodyStyle={{ padding: (0, 0, '20px', 0) }}>
          {chiAry}
          {BabyAllData && BabyAllData.length > 1 ? <Tabs onChange={this.onTabChange.bind(this)} type="card">
            {tabs}
          </Tabs> : chiArys
          }
          {summary ? '' : bottomDiv}
        </Card>
      </Spin>
    )
  }
}

const DetailForm = Form.create()(Detail);


function mapStateToProps(state) {
  const { baseInfoDict, BabyAllData, BabyId, hostId,BabyMsg } = state.serviceCustomerChild;
  return {
    BabyAllData,
    BabyId,
    hostId,
    BabyMsg,
    baseInfoDict,
    loading: state.loading
  };
}

export default connect(mapStateToProps)(DetailForm) ;
