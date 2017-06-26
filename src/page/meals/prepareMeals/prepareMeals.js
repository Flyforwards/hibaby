import React, { Component }from 'react';
import { connect } from 'dva';
import './prepareMeals.scss'
import { message, Button, Radio, Icon, Modal, Form, Row, Col, Input, Select } from 'antd';
import LowModal from './lowModel'
import HighModal from './highModel'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Search = Input.Search;
import $ from 'jquery'


let test = { title: '111', info: [{ name: 'aa', key: 1 }] }
const b = [{ name: 'nnn', key: 1, week: 2, day: 3 }, { name: 'bbb', key: 2, week: 5, day: 6 }]
b.map((v, k) => {
  const { week, day } = v;
  let arr = [];
  arr.push(v);
  test = { ...test }
})

class PrepareMeals extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  componentWillMount() {
    this.props.dispatch({
      type: 'prepareMeals/getMenuByDay',
      payload: {
        'day': '1',
        'week': '1'
      }
    });
  }
  
  onChange = (e) => {
    const { dispatch } = this.props;
    const postDate = JSON.parse(e.target.value);
    postDate.week == '0' ?
      dispatch({
        type: 'prepareMeals/changeHighTime',
        payload: { postDate }
      }) : dispatch({
      type: 'prepareMeals/changeLowTime',
      payload: { postDate }
    })
    
    postDate.week == '0' ?
      dispatch({
        type: 'prepareMeals/getTopMenuByDay',
        payload: postDate
      }) : dispatch({
      type: 'prepareMeals/getMenuByDay',
      payload: postDate
    })
  }
  
  onSearch = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'prepareMeals/getMenuByDishes',
      payload: {
        name: value
      }
    })
  }
  showHighModal = (info) => {
    const { dispatch } = this.props;
    const { week, day, type } = info;
    dispatch({
      type: 'prepareMeals/getTopMenuByType',
      payload: {
        week, day, type
      }
    })
    dispatch({
      type: 'prepareMeals/changeTopVisible',
      payload: {
        topVisible: true
      }
    })
  }
  
  
  showLowModal = (info) => {
    const { dispatch } = this.props;
    const { week, day, type } = info;
    dispatch({
      type: 'prepareMeals/getMenuByType',
      payload: {
        week, day, type
      }
    })
    dispatch({
      type: 'prepareMeals/changeVisible',
      payload: {
        visible: true
      }
    })
  }
  
  render() {
    const { prepareMeals } = this.props;
    const { dayInfo, defaultValueRadio, menuInfo, findMenuInfo } = prepareMeals;
    let colorType = '#dddddd'
    return (
      <div className="prepareMeals">
        <LowModal/>
        <HighModal/>
        <Row className="Row">
          <Col span={12} className="colLeft">
            <Search placeholder="请输入菜名" style={{
              width: 400,
              marginBottom: 20
            }} onSearch={this.onSearch}/>
            <RadioGroup onChange={this.onChange} key={defaultValueRadio} defaultValue={JSON.stringify(defaultValueRadio)}>
              {
                dayInfo.map((v, k) => {
                  return (
                    <div key={k} className="timeInfo">
                      <span className="weekName">{v.weekName}</span>
                      {
                        v.info.map((vv, kk) => {
                          return (
                            <RadioButton className="borderCol" key={kk} value={JSON.stringify(vv)} style={{ borderColor: vv.colorType }}>{vv.day}</RadioButton>
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
                if (v.info.length == 0) {
                  switch (v.type) {
                    case 0:
                      v.info = [
                        {
                          dishesName: '菜一',
                          number: 1
                        }, {
                          dishesName: '菜二',
                          number: 2
                        }, {
                          dishesName: '菜三',
                          number: 3
                        }, {
                          dishesName: '菜四',
                          number: 4
                        }, {
                          dishesName: '菜五',
                          number: 5
                        }, {
                          dishesName: '菜六',
                          number: 6
                        }, {
                          dishesName: '菜七',
                          number: 7
                        }
                      ];
                      break;
                    case 1:
                      v.info = [{
                        dishesName: '菜一',
                        number: 1,
                        dishesId: 1
                      }, {
                        dishesName: '菜二',
                        number: 2
                      }, {
                        dishesName: '菜三',
                        number: 3
                      }, {
                        dishesName: '菜四',
                        number: 4
                      }];
                      break;
                    case 2:
                      v.info = [{
                        dishesName: '菜一',
                        number: 1
                      }];
                      break;
                    case 3:
                      v.info = [{
                        dishesName: '菜一',
                        number: 1
                      }, {
                        dishesName: '菜二',
                        number: 2
                      }, {
                        dishesName: '菜三',
                        number: 3
                      }, {
                        dishesName: '菜四',
                        number: 4
                      }, {
                        dishesName: '菜五',
                        number: 5
                      }];
                      break;
                    case 4:
                      v.info = [{
                        dishesName: '菜一',
                        number: 1
                      }, {
                        dishesName: '菜二',
                        number: 2
                      }];
                      break;
                    case 5:
                      v.info = [{
                        dishesName: '菜一',
                        number: 1
                      }, {
                        dishesName: '菜二',
                        number: 2
                      }, {
                        dishesName: '菜三',
                        number: 3
                      }, {
                        dishesName: '菜四',
                        number: 4
                      }, {
                        dishesName: '菜五',
                        number: 5
                      }];
                      break;
                    case 6:
                      v.info = [{
                        dishesName: '菜一',
                        number: 1,
                        dishesId: 3
                      }, {
                        dishesName: '菜二',
                        number: 2
                      }];
                      break;
                    default:
                      v.info = [{
                        dishesName: '菜一',
                        number: 1
                      }];
                      break;
                  }
                }
                return (
                  <div key={k} className="menuInfo">
                    <p>{v.title}：</p>
                    <ul>
                      {
                        v.info.map((vv, kk) => {
                          //colorType = vv.dishesName && $.inArray(vv.dishesName, findMenuInfo) != -1 ? 'red' : '#fff';
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
                        <Button className="lastBtn" onClick={v.week == '0' ? () => {this.showHighModal(v)} : () => {this.showLowModal(v)}}>编辑/添加</Button>
                      </li>
                    </ul>
                  </div>
                )
              })
            }
          </Col>
        </Row>
      </div>
    );
  }
}
function mapStateToProps(state) {
  
  return {
    prepareMeals: state.prepareMeals
  };
}
export default connect(mapStateToProps)(PrepareMeals);
