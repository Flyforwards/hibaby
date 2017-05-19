"use strict"

import React, { Component } from 'react'
import { connect } from 'dva'
import { Icon, Card, Button,Table } from 'antd'
import { Link} from 'react-router'
import './serviceinfo.scss'
import Current from '../../Current'


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
                  <Link to={{ pathname: '/crm/serviceinfo/ViewTheInformation', query: { data:record.id } }}>查看</Link>
                  <a href="#" className="twoA" onClick={this.delete.bind(this,record)}>删除</a>
                </span>
            );
          },
        }];

    }
    //删除
    delete(record) {
    console.log(record)

    // this.props.dispatch({
    //     type: 'packageInfo/listByPage',
    //     payload: {
    //         "dataId":record.id
    //     }
    // })
     this.props.dispatch({
        type: 'packageInfo/listByPage',
        payload: { }
    });
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'packageInfo/listByPage',
            payload: { }
        });
    }
    render() {
        console.log("sds",this.props.total)
        let ListLnformation = []
        const pagination = {
          total:this.props.total,
          showQuickJumper: true,
          defaultPageSize:10,
          onChange: (current) => {
            this.current = current
            this.props.dispatch({
              type: 'organization/organizationList',
              payload: {
                  "name": this.state.userName,
                  "nodeid": this.state.nodeid,
                  "roleId": this.state.character,
                  "status": this.state.status,
                  "page": current,
                  "size": 10,
                  "tissueProperty": this.state.tissueProperty
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
