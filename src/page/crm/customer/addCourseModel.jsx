"use strict"
import React, {Component} from 'react'
import { connect } from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, Button,Menu} from 'antd'
import './AddCourse.scss';
import { Link} from 'react-router'

const SubMenu = Menu.SubMenu;

class AddCourseModel extends Component {
    constructor(props) {
        super(props)
    }
    handleCancel() {
        this.props.onCancel()
    }
    handleOk() {
        
    }
    checkbox() {
        /*console.log("checkbox")*/

    }
    handleAfterClose() {
      
    }
    handleClick = (e) => {
        console.log('Clicked: ', e.key);
    }
    componentDidMount() {
        this.asyncValidator = _.debounce(this.asyncValidator, 1000 * 3)

        this.props.dispatch({
            type: 'addCourse/getDictionary',
            payload: {
              "id":5 ,
              "softDelete": 0,
              "type": 2
            }
        });
    }
    // 在componentDidMount里面使用函数节流防抖等功能
    asyncValidator(rule, value, callback) {
      //  console.log(Date.now())
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
        const {visible} = this.props
        console.log("ssd",this.props.getDictionary)
        if(this.props.getDictionary != null){
            this.props.getDictionary.map((item)=>{
                leftList.push(<Menu.Item key={item.id}>{item.name}</Menu.Item>)
            })
        }
        return (
            <Modal
                visible={visible}
                title="套餐"
                closable={true}
                afterClose={this.handleAfterClose.bind(this)} 
                maskClosable={true}
                onCancel={this.handleCancel.bind(this)}
                footer={null}
                width={ 1000 }
            >
            <div className="AddCourseModel">
                <div className="left">
                    <Menu
                    onClick={this.handleClick.bind(this)}
                    >
                    {leftList}
                    </Menu>
                </div>
                <div className="right">
                    <Link className="rightList" to={{ pathname: '/crm/customer/Add/bindingPackages', query: { userID:5 } }}>
                        <p className="tital">豪华套餐</p>
                        <p className="room">套房:豪华套房</p>
                        <p className="price">套餐价格:￥100000</p>
                    </Link>
                    <a className="rightList"></a>
                    <a className="rightList"></a>
                    <a className="rightList"></a>
                </div>
            </div>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
  const {
    getDictionary
  } = state.addCourse;
  const {
  } = state.addCustomer;
  return {
    loading: state.loading.models.addCourse,
    getDictionary
    };
}
export default connect(mapStateToProps)(AddCourseModel)