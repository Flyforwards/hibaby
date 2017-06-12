"use strict"

import React from 'react'
import {connect} from 'dva'
import './roomManagementIndex.scss'
import {Link} from 'react-router'
import SearchBar from './SearchBar'
import {Button,Table,Row, Col,pagination,Form,Select} from 'antd'
const Option = Select.Option;
const FormItem = Form.Item;



function ResultsTable(props) {
  const {loading,dataSource} = props;

  const  columns = [
    {title: '房间号', dataIndex: 'roomNo', key: 'roomNo', width:'13%',},
    {title: '主副楼', dataIndex: 'building', key: 'building', width:'13%',},
    {title: '楼层', dataIndex: 'floor', key: 'floor', width:'13%',},
    {title: '区域', dataIndex: 'region', key: 'region', width:'13%',},
    {title: '朝向', dataIndex: 'orientation', key: 'orientation', width:'13%',},
    {title: '套餐', dataIndex: 'remarkInfo', key: 'name', width:'20%',},
    {title: '操作',width:'15%', dataIndex: 'operating',
      render: (text, record, index) => {
        return (
          <div>
            <Link className="firstA" onClick={ this.onLook.bind(this, record)}  > 查看 </Link>
            <Link className="firstB" onClick={ this.onDelete.bind(this, record)}> 删除 </Link>
          </div>
        );
      },
    }
  ]


  const tableProps = {
    loading: loading.effects['roomManagement/listByPage'] !== undefined ? loading.effects['roomManagement/listByPage']:false,
    dataSource : dataSource,
    pagination,
    columns,
  }

  return(
    <div className="tableDiv">
      <Table bordered {...tableProps} />
    </div>
  )
}


class roomManagementIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.dispatch({type: 'roomManagement/listByPage'});
  }

  render() {
    return (
        <div className='roomManagementDiv'>
          <main className="yt-admin-framework-Customer">
            <SearchBar isSearch={true}/>
            <ResultsTable loading={this.props.loading} dataSource={this.props.users.listData}/>
          </main>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    users: state.roomManagement,
  };
}

export default connect(mapStateToProps)(roomManagementIndex) ;
