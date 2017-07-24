/**
 * Created by zhurw on 2017/7/19.
 */
import React from 'react';
import { connect } from 'dva';
import './WebCourse.scss';
import { Table, Input, Icon, Button, Popconfirm, Pagination ,Card,DatePicker} from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import moment from 'moment'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import Current from '../../Current';
import { format } from '../../../utils/index.js';

class WebJob extends React.Component{
  constructor(props){
    super(props);
    this.state={
      visible:false,
    },
    this.columns = [{
      title:"ID",
      dataIndex:'id',
      key:'id',
      width:"10%",
    },{
      title: '岗位',
      dataIndex: 'name',
      key: 'name',
      width: '10%'
    }, {
      title:'人数',
      dataIndex:'number',
      key:'number',
      width:'10%'
    },{
      title:'地址',
      dataIndex:'address',
      key:'address',
      width:'10%'
    },{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          <span>
          <Link disabled={false} className="one-link" to={`/system/website-manage/addJob?id=${record.id}` } style={{marginRight:'30px'}}> 查看 </Link>
          <Popconfirm title="确定删除吗?" onConfirm={() => this.onDeleteOne(record.id)}>
           <Link disabled={false} className="one-link">删除</Link>
          </Popconfirm>

        </span>
        )
      },
      width: '30%'
    }];
  }
  componentDidMount(){
    this.getTableData({
      page : this.props.webJob.page,
      size : this.props.webJob.size
    });
  }
  onTableChange = (pageNumber) =>{
    this.getTableData({
      page : pageNumber,
      size : this.props.webJob.size
    });
  }
  getTableData(params = {}){
    //console.log(this.props)
    const {dispatch} = this.props;
    dispatch({
      type: 'webJob/getJobPageList',
      payload: {
        ...params
      }
    });
  }
  onDeleteOne(record) {
    this.props.dispatch({
      type:'webJob/deleteJob',
      payload:{
        'dataId':record,
      }
    })
  }
  render(){
    const dataSource = this.props.webJob.jobPageList || [];
    const pagination = {
      total: this.props.webJob.total,
      showQuickJumper: true,
      current: this.props.webJob.page,
      pageSize: this.props.webJob.size,
      onChange: this.onTableChange.bind(this)
    };
    return(

      <Card className="website-banner">
        <div className = "websiteAddBtn" style = {{overflow:'hidden'}}>
          <Link to="/system/website-manage/addJob">
            <Button className="one-button" style={{float:'right',marginBottom:'10px'}}>新增</Button>
          </Link>
        </div>
        {/*<Table className='management-center' bordered columns={ this.columns } {...tableProps} rowKey="id"/>*/}
        <Table
          bordered
          dataSource={dataSource}
          columns={this.columns}
          pagination={pagination}
        />
      </Card>
    );
  }
}
function mapStateToProps(state) {
  return {
    webJob: state.webJob
  };
}

export default connect(mapStateToProps)(WebJob);
