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
  
  
  render() {
    const { prepareMeals } = this.props;
    const { dayInfo, defaultValueRadio, menuInfo, findMenuInfo, changeBorder } = prepareMeals;
    let arr = [];
    findMenuInfo.length != 0 && findMenuInfo.map((v, k) => {
      arr.push(v.week.toString() + v.day.toString());
    })
    
    return (
      <div className="prepareMeals">
        <Row className="Row">
          <Col span={12} className="colLeft">
            <Search placeholder="请输入菜名" style={{ width: 400, marginBottom: 20 }} onSearch={this.onSearch}/>
            <RadioGroup defaultValue={findMenuInfo.length == 0 ? JSON.stringify(defaultValueRadio) : ''} onChange={this.onChange}>
              {
                dayInfo.map((v, k) => {
                  return (
                    <div key={k} className="timeInfo">
                      <span className="weekName">{v.weekName}</span>
                      {
                        v.info.map((vv, kk) => {
                          return (
                            $.inArray(vv.week.toString() + vv.day.toString(), arr) == -1 ?
                              <RadioButton key={kk} value={JSON.stringify(vv)}>{vv.day}</RadioButton> :
                              <RadioButton key={kk} className="changeBorder" value={JSON.stringify(vv)}>{vv.day}</RadioButton>
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
              menuInfo.length != 0 && menuInfo.map((v, k) => {
                return (
                  <div key={k} className="menuInfo">
                    <p>{v.title}：</p>
                    <ul>
                      {
                        v.info.map((vv, kk) => {
                          return (
                            <li key={kk}>{vv.dishesName}</li>
                          )
                        })
                      }
                      <li>{v.week == '0' ? <HighModal info={v}/> : <LowModal info={v}/>}</li>
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
