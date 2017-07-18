/**
 * Created by Flyforwards on 2017/7/11.
 */
import React from 'react';
import { connect } from 'dva';
import './activityEnroll.scss';
import { Table, Input, Icon, Button, Popconfirm, Pagination ,Card,DatePicker} from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import moment from 'moment'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import Current from '../../Current';
import { format } from '../../../utils/index.js';

class ActivityEnroll extends React.Component{
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
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: '10%'
      }, {
        title: '产假人数',
        dataIndex: 'number ',
        key: 'number ',
        width: '10%'
      },{
        title:'停车',
        dataIndex:'parking ',
        key:'parking ',
        width:'10%'
      }, {
        title:'电话',
        dataIndex:'phone',
        key:'phone',
        width:'10%'
      },{
        title:'预产期',
        dataIndex:'produceTime',
        key:'produceTime',
        width:'10%',
        render:(text,record,index) =>{
          var date = new Date(text).format("yyyy-MM-dd");
          return date;
        }
      },{
        title:'门店',
        dataIndex:'store',
        key:'store',
        width:'10%'
      },{
        title:'课程ID',
        dataIndex:'webCourseId ',
        key:'webCourseId ',
        width:'10%'
      },{
        title: '操作',
        dataIndex: 'operation',
        render: (text, record, index) => {
          return (
            <span>
          <Link disabled={false} className="one-link" to={`/system/website-manage/addCourse?id=${record.id}` } style={{marginRight:'30px'}}> 查看 </Link>
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
      page : this.props.activityEnroll.page,
      size : this.props.activityEnroll.size
    });
  }
  onTableChange = (pageNumber) =>{
    this.getTableData({
      page : pageNumber,
      size : this.props.activityEnroll.size
    });
  }
  getTableData(params = {}){
    //console.log(this.props)
    const {dispatch} = this.props;
    dispatch({
      type: 'activityEnroll/getEnrollPageList',
      payload: {
        ...params
      }
    });
  }
  onDeleteOne(record) {
    this.props.dispatch({
      type:'activityEnroll/deleteEnroll',
      payload:{
        'dataId':record,
      }
    })
  }
  render(){
    const dataSource = this.props.activityEnroll.enrollPageList;
    const pagination = {
      total: this.props.activityEnroll.total,
      showQuickJumper: true,
      current: this.props.activityEnroll.page,
      pageSize: this.props.activityEnroll.size,
      onChange: this.onTableChange.bind(this)
    };
    return(

      <Card className="website-banner">
        <div className = "websiteAddBtn" style = {{overflow:'hidden'}}>
          <Link to="/system/website-manage/addActivityEnroll">
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
    activityEnroll: state.activityEnroll
  };
}

export default connect(mapStateToProps)(ActivityEnroll);
