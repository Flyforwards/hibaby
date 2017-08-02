"use strict"
import React, {Component} from 'react'
import { connect } from 'dva'
import { Modal, Menu, Row, Col} from 'antd'
import './AddCourse.scss';
import { Link} from 'react-router'
import _ from 'lodash';

const MenuItem = Menu.Item;
class AddCourseModel extends Component {
    constructor(props) {
        super(props)
    }
    handleCancel() {
        this.props.onCancel()
    }
    handleOk() {

    }

    handleAfterClose() {

    }
    handleClick = (e) => {
        this.props.dispatch({
            type: 'addCourse/listByType',
            payload: {
              "dataId":e.key
            }
        });
    }
    componentDidMount() {
        this.asyncValidator = _.debounce(this.asyncValidator, 1000 * 3)
        this.props.dispatch({
            type: 'addCourse/listByType',
            payload: {
              "dataId":43
            }
        });
        this.props.dispatch({
            type: 'addCourse/getDictionary',
            payload: {
              "abName":"TCLX" ,
              "softDelete": 0
            }
        });
    }
    // 在componentDidMount里面使用函数节流防抖等功能
    asyncValidator(rule, value, callback) {
        setTimeout(() => {
            let now = Date.now()
            if (now % 2 === 1) {
                callback()
            } else {
                callback(new Error('自定义验证函数未通过'))
            }
        }, 1000)
    }
    render() {
        let leftList = []
        let rightList = []
        const { visible, getDictionary, listByType} = this.props
        let selectKeys = [];
        if(getDictionary != null){
            getDictionary.map((item)=>{
                leftList.push(<MenuItem key={item.id}>{item.name}</MenuItem>)
            })
          selectKeys = [String(getDictionary[0].id)]
        }
        if(listByType != null){
            listByType.map((item)=>{
                if(item.suiteName){
                 rightList.push(
                    <Link className="rightList" to={{ pathname: '/crm/customer/Add/bindingPackages',query: { dataId:item.id } }}>
                        <p className="tital">{item.name}</p>
                        <p className="room">套房:{item.suiteName}</p>
                        <p className="price">套餐价格:￥{item.price}</p>
                    </Link>)
                }else{
                    rightList.push(
                    <Link className="rightList" to={{ pathname: '/crm/customer/Add/bindingPackages',query: { dataId:item.id } }}>
                        <p className="tital">{item.name}</p>
                        <p className="price">套餐价格:￥{item.price}</p>
                    </Link>)
                }

            })
        }

        return (
            <Modal
                visible={visible}
                title="套餐"
                closable={true}
                afterClose={this.handleAfterClose.bind(this)}
                maskClosable={true}
                wrapClassName={"addCourseModal"}
                onCancel={this.handleCancel.bind(this)}
                footer={null}
                width={ 900 }
            >
            <div className="addCourseModel">
              <Row>
                <Col span="5">
                    <Menu defaultSelectedKeys={selectKeys} onClick={this.handleClick.bind(this)} >
                    { leftList }
                    </Menu>
                </Col>
                <Col span="19">
                  <div style={{ marginLeft: '10px'}}>
                    {
                      rightList
                    }
                  </div>
                </Col>
              </Row>
            </div>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
  const {
    getDictionary,
    listByType
  } = state.addCourse;
  return {
    loading: state.loading.models.addCourse,
    getDictionary,
    listByType
    };
}
export default connect(mapStateToProps)(AddCourseModel)
