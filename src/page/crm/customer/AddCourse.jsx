"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table, Input,Select,Form ,message} from 'antd'
import { Link} from 'react-router'
import './AddCourse.scss';
import AddCourseModel from './AddCourseModel.jsx'

class AddCourse extends Component {

    constructor(props) {
        super(props)
        this.columns = [{
          title: '服务项目名称',
          dataIndex: 'serviceInfoName',
          key:'serviceInfoName',
          width: "20%",
        }, {
          title: '服务项目价格',
          dataIndex: 'serviceInfoPrice',
          key:'serviceInfoPrice',
          width: "20%",
          render:(text,record,index) => {
            let price = "￥"+record.serviceInfoPrice
            return (
              price
            )
          }
        }, {
          title: '服务项目内容',
          dataIndex: 'serviceInfoContents',
          key:'serviceInfoContents',
          width: "30%",
        },{
          title: '使用/剩余次数',
          dataIndex: 'usageCount',
          key: 'usageCount',
          width: "20%",
          },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          width: '10%',
          render: (text, record, index) => {
            return (
                <span>
                  <Button type="primary">使用</Button>
                </span>
            );
          },
        }];
        this.state = {
          AddCourseVisible: false
        }
    }
    addCourse (){
      this.setState({
        AddCourseVisible: true,
      })
    }
    handleDeleteCancel(){
      this.setState({
        AddCourseVisible: false,
      })
    }
    componentDidMount() {
      console.log("wwwww",this.props.users)
      this.props.dispatch({
          type: 'addCourse/getCustomerPackageById',
          payload: {
             "dataId":5
          }
      });
    }
    render() {
      let addCourseList=[]
      let loadingName = true
      const columns = this.columns;
        return (
            <div className="addCourse">
              <Button type="primary" onClick={this.addCourse.bind(this)}>添加套餐</Button>
              {
                addCourseList
              }
              <div className="addCourseList">
                <p>套餐信息:</p>
                <p className="namep">套餐名称: 套餐名称</p>
                <p className="pricep">套餐价格: ￥1000000</p>
                <p className="typep">套餐类型: 月子套餐</p>
                <br/>
                <div className="viewServiceinfoTable">
                  <p>服务项目:</p>
                  <Table bordered 
                    columns={ columns } 
                    pagination = { false }
                    loading = { loadingName }
                  />
                </div>  
              </div>
              <AddCourseModel
                visible={ this.state.AddCourseVisible}
                onCancel ={ this.handleDeleteCancel.bind(this)}
              />
            </div>
        )
    }
}
function mapStateToProps(state) {
  return {
    users: state.addCourse,
  };
}
export default connect(mapStateToProps)(AddCourse)

