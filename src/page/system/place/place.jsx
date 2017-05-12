
"use strict"
import React from 'react';

import {connect} from 'dva';
import './system.scss';
import {Table,Input,Icon,Button,Popconfirm,Pagination} from 'antd';
import {routerRedux} from 'dva/router';
import {Link} from 'react-router';
import Current from '../../Current'

class SystemIndex extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
        title: '序号',
        dataIndex: 'id',
        key: 'id'
      },{
        title: '字段名称',
        dataIndex: 'operatorName',
        key: 'operatorName'
      }, {
        title: '字段描述',
        dataIndex: 'description',
        key: 'description'
      }, {
        title: '最后编辑人',
        dataIndex: 'modifiyId',
        key: 'modifiyId'

      }, {
        title: '最后编辑时间',
        dataIndex: 'modifyTime',
        key: 'modifyTime'
      }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record, index) => {

          return ( < Link to = {
              `/localchar/find`
            } > 查看 </Link>)
          },
        }];
    }
    componentDidMount(){
        console.log(this.columns)
        console.log(this.props)

    }
    render() {
      const columns = this.columns;
      const pagination = {
        total: this.props.total, //数据总条数
        showQuickJumper: true,
        pageSize:10,
        onChange: (current) => {
          this.props.dispatch(routerRedux.push({
            pathname: '/system/localchar',
            query: {
              "page": current,
              "results": 10,
              "type": 2
            },
          }));
        },
      };
      return ( <div className = "
          container2"
         >
        < div className = "buttonwrapper">
            < Link to = "/localchar/add" >
                < Button className="addBtn"> 添加 </Button>
            </Link >
        </div>

        {this.props.list?
        < Table rowKey = "id" bordered dataSource = {this.props.list}
        columns = {columns} pagination = {pagination}/>:null}
        < Current page = {this.props.page}
            totalpage = {this.props.totalpage}
            total = {this.props.total}
            results = {this.props.results}
            range = {this.props.range}
        />
    </div>
    );
  }
}

function place({

  dispatch,
  loading,
  data: list,
  total,
  page,
  results,
  range,
  code
}) {
  return ( < div >
    < SystemIndex dispatch = {
      dispatch
    }
    list = {
      list
    }
    loading = {
      loading
    }

    total = {
      total
    }
    page={page}
    results={results}
    range={range}
    /> </div >
  )

}
function mapStateToProps(state) {
  console.log("abc",state.place)

  const {
    data,
    total,
    page,
    results,
    range,
    code
  } = state.system;

  return {
    loading: state.loading.models.system,
    data,
    total,
    page,
    results,
    range,
    code
  };
}

export default connect(mapStateToProps)(place);
