"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table } from 'antd'
import { Link} from 'react-router'
import './serviceinfo.scss'
import Current from '../../Current'
import Delete from './DeleteService.jsx'


class Serviceinfoed extends Component {

    constructor(props) {
        super(props)
        this.columns = [{
          title: '套餐名称',
          dataIndex: 'name',
          key:'name',
        }, {
          title: '服务项',
          dataIndex: 'serviceInfoNameList',
          key:'serviceInfoNameList',
        }, {
          title: '套房',
          dataIndex: 'suiteId',
          key:'suiteId',
        }, {
          title: '套餐价格',
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
                  <Link to={{ pathname: '/crm/serviceinfo/viewservice', query: { data:record.id } }}>查看</Link>
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
     window.location.reload( true )
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'packageInfo/listByPage',
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
        if(this.props.list != null){
            ListLnformation = this.props.list;
              ListLnformation.map((record)=>{
                record.key = record.id;
            });
        }
        return (
            <div className="serviceinfo">
                <div className="serviceinfoButton"><Link to="/crm/serviceinfo/addservice"><Button type="primary">添加</Button></Link></div>
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
function Serviceinfo({
  dispatch,
  list,
  total,
  page,
  results,
  range
}) {
  return ( < div >
    <Serviceinfoed dispatch = {
      dispatch
    }
    list = {
        list
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
    list,
    total,
    page,
    results,
    range
  } = state.packageInfo;
  return {
    loading: state.loading.models.packageInfo,
    list,
    total,
    page,
    results,
    range
    };
}
export default connect(mapStateToProps)(Serviceinfoed)
