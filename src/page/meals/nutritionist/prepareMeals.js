import React, { Component }from 'react';
import { connect } from 'dva';
import './prepareMeals.scss'
import { message, Button, Radio, Icon, Modal, Form, Row, Col, Input, Select, Spin } from 'antd';
import LowModal from './lowModel'
import HighModal from './highModel'
import PermissionButton from '../../../common/PermissionButton';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Search = Input.Search;
import $ from 'jquery'

class PrepareMeals extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

  componentWillMount() {
    // this.props.dispatch({
    //   type: 'prepareMealsDinner/getMenuByDay',
    //   payload: {
    //     'day': '1',
    //     'week': '1'
    //   }
    // });
   // this.props.dispatch({
   //    type:'prepareMealsDinner/getLoopByCustomerId',
   //  });
  }

  onChange = (e) => {
    const { dispatch } = this.props;
    const postDate = JSON.parse(e.target.value);
    postDate.week == '0' ?
      dispatch({
        type: 'prepareMealsDinner/changeHighTime',
        payload: { postDate }
      }) : dispatch({
      type: 'prepareMealsDinner/changeLowTime',
      payload: { postDate }
    });

    postDate.week == '0' ?
      dispatch({
        type: 'prepareMealsDinner/getTopMenuByDay',
        payload: postDate
      }) : dispatch({
      type: 'prepareMealsDinner/getMenuByDay',
      payload: postDate
    })
  };

  onSearch = (value) => {
    const { dispatch } = this.props;
    if (!value) {
      return message.error('请输入菜名！')
    } else {
      dispatch({
        type: 'prepareMealsDinner/getMenuByDishes',
        payload: {
          name: value
        }
      })
    }


  };
  showHighModal = (info) => {
    const { dispatch } = this.props;
    const { week, day, type } = info;
    dispatch({
      type: 'prepareMealsDinner/getTopMenuByType',
      payload: {
        week, day, type
      }
    });
    dispatch({
      type: 'prepareMealsDinner/changeTopVisible',
      payload: {
        topVisible: true
      }
    })
  };


  showLowModal = (info) => {
    const { dispatch } = this.props;
    const { week, day, type } = info;
    dispatch({
      type: 'prepareMealsDinner/changeVisible',
      payload: {
        visible: true
      }
    });
    dispatch({
      type: 'prepareMealsDinner/getMenuByType',
      payload: {
        week, day, type
      }
    })

  };

  render() {
    const { prepareMeals, loading,defaultValueRadio } = this.props;
    const { dayInfo ,menuInfo,findMenuInfo, leftDish,customerLoop } = prepareMeals;
    let colorType = '#dddddd';
    const { infoZero, infoOne, infoTwo, infoThr, infoFor, infoFiv, infoSix } = leftDish;
    return (
     <div className="prepareMeals">
        <LowModal/>
        <HighModal/>
       {customerLoop && JSON.stringify(customerLoop) != '{}'? <Row className="Row">
          <Col span={12} className="colLeft">
            <Search placeholder="请输入菜名" style={{
              width: 400,
              marginBottom: 20
            }} onSearch={this.onSearch}/>
            <RadioGroup onChange={this.onChange} key={defaultValueRadio} defaultValue={JSON.stringify(defaultValueRadio)}>
              { dayInfo.map((v, k) => {
                  return (
                    <div key={k} className="timeInfo">
                      <span className="weekName">{v.weekName}</span>
                      {
                        v.info.map((vv, kk) => {
                          return (
                            <RadioButton className="borderCol" checked={true} defaultChecked={true} key={kk} value={JSON.stringify(vv)} style={{ borderColor: vv.colorType }}>{vv.day}</RadioButton>
                          )
                        })
                      }
                    </div>
                  )
                })
              }
            </RadioGroup>
          </Col>
          <Col span={12} className="colRight">
            {
              menuInfo.map((v, k) => {
                const length = v.info.length;
                switch (v.type) {
                  case 0:
                    length < 7 ? v.info = v.info.concat(infoZero.slice(length)) : v.info;
                    break;
                  case 1:
                    length < 4 ? v.info = v.info.concat(infoOne.slice(length)) : v.info;
                    break;
                  case 2:
                    length < 1 ? v.info = infoTwo : v.info;
                    break;
                  case 3:
                    length < 5 ? v.info = v.info.concat(infoThr.slice(length)) : v.info;
                    break;
                  case 4:
                    length < 2 ? v.info = v.info.concat(infoFor.slice(length)) : v.info;
                    break;
                  case 5:
                    length < 5 ? v.info = v.info.concat(infoFiv.slice(length)) : v.info;
                    break;
                  case 6:
                    length < 2 ? v.info = v.info.concat(infoSix.slice(length)) : v.info;
                    break;
                  default:
                    v.info = infoSix;
                }
                return (
                  <div key={k} className="menuInfo">
                    <p>{v.title}：</p>
                    <ul>
                      {
                        v.info.map((vv, kk) => {
                          if (vv.dishesId && $.inArray(vv.dishesId, findMenuInfo) != -1) {
                            colorType = 'red';
                          } else {
                            colorType = '#dddddd';
                          }
                          return (
                            <li key={kk} style={{ borderColor: colorType }}>{vv.dishesName}</li>
                          )
                        })
                      }
                      <li>
                        <PermissionButton testKey='CUSTOMER_MENU_ADJUST' className="lastBtn"  onClick={v.week == '0' ? () => {this.showHighModal(v)} : () => {this.showLowModal(v)}}>
                          编辑/添加
                        </PermissionButton>

                        {/*<Button className="lastBtn" onClick={v.week == '0' ? () => {this.showHighModal(v)} : () => {this.showLowModal(v)}}>*/}
                          {/*编辑/添加*/}
                        {/*</Button>*/}
                      </li>
                    </ul>
                  </div>
                )
              })
            }
          </Col>
        </Row>:''}
      </div>
    );
  }
}
function mapStateToProps(state) {
const { defaultValueRadio } = state.prepareMealsDinner;
  return {
    defaultValueRadio,
    prepareMeals: state.prepareMealsDinner,
    loading: state.loading

  };
}
export default connect(mapStateToProps)(PrepareMeals);
