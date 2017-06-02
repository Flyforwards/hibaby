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
          dataIndex: 'name',
          key:'name',
          width: "20%",
        }, {
          title: '服务项目价格',
          dataIndex: 'price',
          key:'price',
          width: "20%",
          render:(text,record,index) => {
            let price = "￥"+record.price
            return (
              price
            )
          }
        }, {
          title: '服务项目内容',
          dataIndex: 'contents',
          key:'contents',
          width: "30%",
        },{
          title: '使用/剩余次数',
          dataIndex: 'usageCount',
          key: 'usageCount',
          width: "20%",
          render:(text,record,index) => {
            let usageCount =record.icount+"/"+record.usageCount
            return (
              usageCount
            )
          }
          },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          width: '10%',
          render: (text, record, index) => {
            let addName={}
            let dataDetailId = ""
            let visible = false
            if(this.props.getCustomerPackageById != null){
              if(this.props.getCustomerPackageById.length>=1){
                addName=this.props.getCustomerPackageById[0].packageInfoDO
              }
            }
            dataDetailId = this.props.users
            if(record.usageCount<=0){
                visible = true
            }
            return (
                <span>
                  <Button type="primary" onClick={this.addNumber.bind(this,record,addName,dataDetailId)} disabled={visible}>使用</Button>
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
    addNumber(record,addName,dataDetailId){
      console.log("使用",dataDetailId)
      this.props.dispatch({
          type: 'addCourse/useServiceInfo',
          payload: {
            "customerId": 6,
            "packageId": addName.id,
            "serviceId": record.customerId
          }
      });
    }
    handleDeleteCancel(){
      this.setState({
        AddCourseVisible: false,
      })
    }
    componentDidMount() {
      this.props.dispatch({
          type: 'addCourse/getCustomerPackageById',
          payload: {
             "dataId":6
          }
      });
    }
    render() {
      console.log(this.props.getCustomerPackageById)
      let dataList = []
      let loadingName = true
      const columns = this.columns;
      if(this.props.getCustomerPackageById != null){
        if(this.props.getCustomerPackageById.length>=1){
          this.props.getCustomerPackageById.map((item)=>{
            let addCourseList=item.serviceInfoDOs
            let addName=item.packageInfoDO
            addCourseList.map((item)=>{
              // item.key=item.customerId
            })
            loadingName = false
            dataList.push(<div className="addCourseList" key={addName.id}>
                <p>套餐信息:</p>
                <p className="namep">套餐名称: {addName.name}</p>
                <p className="pricep">套餐价格: ￥{addName.price}</p>
                <p className="typep">套餐类型: {addName.type}</p>
                <br/>
                <div className="viewServiceinfoTable">
                  <p>服务项目:</p> <span className="status">状态</span>
                  <Table bordered 
                    columns={ columns } 
                    dataSource={ addCourseList }
                    pagination = { false }
                    loading = { loadingName }
                  />
                </div>  
            </div>)
          })
            
            // loadingName = false
            // dataList.push(<div className="addCourseList" key={addName.id}>
            //     <p>套餐信息:</p>
            //     <p className="namep">套餐名称: {addName.name}</p>
            //     <p className="pricep">套餐价格: ￥{addName.price}</p>
            //     <p className="typep">套餐类型: {addName.type}</p>
            //     <br/>
            //     <div className="viewServiceinfoTable">
            //       <p>服务项目:</p> <span className="status">状态</span>
            //       <Table bordered 
            //         columns={ columns } 
            //         dataSource={ addCourseList }
            //         pagination = { false }
            //         loading = { loadingName }
            //       />
            //     </div>  
            //   </div>)
        }
      }
        return (
            <div className="addCourse">
              <Button type="primary" onClick={this.addCourse.bind(this)}>添加套餐</Button>
              {
                dataList
              }
              <AddCourseModel
                visible={ this.state.AddCourseVisible}
                onCancel ={ this.handleDeleteCancel.bind(this)}
              />
            </div>
        )
    }
}
function mapStateToProps(state) {
  const {
    getCustomerPackageById
  } = state.addCourse;
  return {
    loading: state.loading.models.addCourse,
    getCustomerPackageById,
    users: state.addCustomer
    };
}
export default connect(mapStateToProps)(AddCourse)

