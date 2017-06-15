import React from 'react';
import { connect } from 'dva';
import './prepareMeals.scss'
import { message, Radio, Icon, Table, Form, Row, Col, Input, Select } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Search = Input.Search;
class PrepareMeals extends React.Component {
  onChange = (e) => {
    const { dispatch } = this.props;
    const postDate = JSON.parse(e.target.value);
    console.log(postDate, 'postData')
    postDate.week == '0' ?
      dispatch({
        type: 'prepareMeals/getTopMenuByDay',
        payload: postDate
      }) : dispatch({
      type: 'prepareMeals/getMenuByDay',
      payload: postDate
    })
  }
  
  render() {
    const { prepareMeals } = this.props;
    const { dayInfo, defaultValueRadio, menuInfo, heightFoodInfo } = prepareMeals;
    console.log(prepareMeals, 'height')
    return (
      <div className="prepareMeals">
        <Row className="Row">
          <Col span={12} className="colLeft">
            <Search
              placeholder="请输入菜名"
              style={{ width: 400, marginBottom: 20 }}
              onSearch={value => console.log(value)}
            />
            <RadioGroup defaultValue={JSON.stringify(defaultValueRadio)} onChange={this.onChange}>
              {
                dayInfo.map((v, k) => {
                  return (
                    <div key={k}>
                      {
                        v.map((vv, kk) => {
                          return (
                            vv.week ?
                              <RadioButton key={kk} className="week" disabled>{vv.week}</RadioButton> :
                              <RadioButton key={kk} className="day" value={JSON.stringify(vv.value)}>{vv.day} </RadioButton>
                          )
                        })
                      }
                    </div>
                  )
                })
              }
            </RadioGroup>
          </Col>
          <Col span={12}>
            {heightFoodInfo.heightFood ?
              <div>
                <p>{heightFoodInfo.heightFood.title}</p>
                {heightFoodInfo.heightFood.map}
              </div> : console.log('222')}
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
