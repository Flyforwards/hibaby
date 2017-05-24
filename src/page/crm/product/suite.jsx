"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table } from 'antd'
import { Link} from 'react-router'
import './serviceinfo.scss'
import Current from '../../Current'
import Delete from './DeleteSuite.jsx'


class Suiteed extends Component {

    constructor(props) {
        super(props)
        this.columns = [{
          title: '套房名称',
          dataIndex: 'name',
          key:'name',
        }, {
          title: '房间',
          dataIndex: 'roomNoList',
          key:'roomNoList',
        }, {
          title: '套房简介',
          dataIndex: 'description',
          key:'description',
        }, {
          title: '套房价格',
          dataIndex: 'price',
          key: 'price',
        },{
          title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          width: '10%',
          render: (text, record, index) => {
            return (
                <span>
                  <Link to={{ pathname: '/crm/serviceinfo/viewSuite', query: { suite:record.id } }}>查看</Link>
                  <a href="#" className="twoA" onClick={this.delete.bind(this,record)}>删除</a>
                </span>
            );
          },
        }];
        this.state = {
          DeleteVisible:false,
          ID:null
        }
    }
    //删除
    delete(record) {
      console.log("record",record.id)
      this.setState({
        DeleteVisible:true,
        ID:record.id
      })
    }
    componentWillMount() {
    }
    handleDeleteCancel(){
      this.setState({
          DeleteVisible: false,
      })
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'packageInfo/suiteListByPage',
            payload: { 
              "page":1,
              "size":10
            }
        });
    }
    render() {
        let ListLnformation = []
        const pagination = {
          total:this.props.total,
          showQuickJumper: true,
          defaultPageSize:10,
          onChange: (current) => {
            this.current = current
            this.props.dispatch({
              type: 'packageInfo/listByPage',
              payload: {
                  "page":current,
                  "size":10
              },
            });
          },
        };
        const columns = this.columns;
        if(this.props.suiteListByPage != null){
            ListLnformation = this.props.suiteListByPage;
              ListLnformation.map((record)=>{
                record.key = record.id;
            });
        }
        console.log("suiteListByPage",this.props.suiteListByPage)
        return (
            <div className="serviceinfo">
                <div className="serviceinfoButton"><Link to="/crm/serviceinfo/addSuite"><Button type="primary">添加</Button></Link></div>
                <div className="serviceinfoTabal">
                    <Table bordered dataSource={ListLnformation} columns={ columns } pagination = {pagination} />
                    < Current page = {
                          this.props.page
                        }
                        totalpage = {
                          this.props.totalpage
                        }
                        total = {
                          this.props.total
                        }
                        results = {
                          this.props.results
                        }
                        range = {
                          this.props.range
                        }
                    />
                </div>
                <Delete 
                   visible={ this.state.DeleteVisible }
                   onCancel ={ this.handleDeleteCancel.bind(this) }
                   ID = { this.state.ID }
                  />
            </div>
        )
    }
}
function Suite({
  dispatch,
  suiteListByPage,
  total,
  page,
  results,
  range
}) {
  return ( < div >
    <Suiteed dispatch = {
      dispatch
    }
    lsuiteListByPage = {
      suiteListByPage
    }
    total = {
      total
    }
    page={page}
    results={results}
    range={range}
    /></div>
  )
}
function mapStateToProps(state) {
  const {
    suiteListByPage,
    total,
    page,
    results,
    range
  } = state.packageInfo;
  return {
    loading: state.loading.models.packageInfo,
    suiteListByPage,
    total,
    page,
    results,
    range
    };
}
export default connect(mapStateToProps)(Suiteed)
