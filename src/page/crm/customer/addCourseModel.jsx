"use strict"
import React, {Component} from 'react'
import { connect } from 'dva'
import {Modal, Form, Input, Radio, Select, Checkbox, Icon, Button,Menu,Table} from 'antd'
import './AddCourse.scss';
import { Link} from 'react-router'

const SubMenu = Menu.SubMenu;

class AddCourseModel extends Component {
    constructor(props) {
        super(props)
        this.columns = [{
          title: 'name',
          dataIndex: 'name',
          width: '25%',

        }, {
          title: 'age',
          dataIndex: 'age',
          width: '15%',
          render:(text,record,index) => {
            let suiteName = null
            if(record.suiteName){
                suiteName="套房 :"+record.suiteName
            }

            return (
              suiteName
            )
          }
        }, {
          title: 'address',
          dataIndex: 'address',
          width: '40%',
          render:(text,record,index) => {
            let price ="套餐价格 :"+record.price
            return (
              price
            )
          }
        }]
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
        //console.log('Clicked: ', e.key);
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
        const columns = this.columns;
        const {visible} = this.props
        if(this.props.getDictionary != null){
            this.props.getDictionary.map((item)=>{
                leftList.push(<Menu.Item key={item.id}>{item.name}</Menu.Item>)
            })
        }
        if(this.props.listByType != null){
            // this.props.listByType.map((item)=>{
            //    item.key=item.id
            // })
            // rightList = this.props.listByType
            this.props.listByType.map((item)=>{
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
                   {
                    rightList
                   }
                </div>
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
