import React from 'react';
import { connect } from 'dva';
import './prepareMeals.scss'
import { message, Button, Radio, Icon, Modal, Form, Row, Col, Input, Select } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Search = Input.Search;
class PrepareMeals extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  
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
  showModal = () => {
    this.setState({
      visible: true
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  
  render() {
    const { prepareMeals } = this.props;
    const { dayInfo, defaultValueRadio, menuInfo } = prepareMeals;
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
                      <li>
                        <Button className="lastBtn" onClick={this.showModal}>编辑/添加</Button>
                        <Modal
                          title="编辑餐单"
                          visible={this.state.visible}
                          onOk={this.handleOk}
                          onCancel={this.handleCancel}
                        >
                          <p>Some contents...</p>
                          <p>Some contents...</p>
                          <p>Some contents...</p>
                        </Modal>
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
