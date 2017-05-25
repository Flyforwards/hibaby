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
        const { list, loading, pagination, dispatch } = this.props;
        const columns = this.columns;
        const tableProps = {
          loading: loading.effects['packageInfo/listByPage'],
          dataSource : list ,
          pagination,
          onChange (page) {
            const { pathname } = location
            dispatch(routerRedux.push({
              pathname,
              query: {
                page: page.current,
                size: page.pageSize,
              },
            }))
          },
        }
        return (
            <div className="serviceinfo">
                <div className="serviceinfoButton"><Link to="/crm/serviceinfo/addservice"><Button type="primary">添加</Button></Link></div>
                <div className="serviceinfoTabal">
                    <Table {...tableProps} rowKey = { record=>record.id } bordered dataSource={ list } columns={ columns } pagination = {pagination} />
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

function mapStateToProps(state) {
  const {
    list,
    pagination
  } = state.packageInfo;
  return {
    loading: state.loading,
    list,
    pagination
    };
}
export default connect(mapStateToProps)(Serviceinfoed)
