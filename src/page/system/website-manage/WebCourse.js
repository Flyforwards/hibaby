/**
 * Created by Flyforwards on 2017/7/11.
 */
import React from 'react';
import { connect } from 'dva';
import './WebCourse.scss';
import { Table, Input, Icon, Button, Popconfirm, Pagination ,Card} from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import moment from 'moment'
import Current from '../../Current';
import { format } from '../../../utils/index.js';

class WebCourse extends React.Component{
  constructor(props){
    super(props);
    this.state={
      visible:false,
    },
    this.columns = [{
      title:"ID",
      dataIndex:'id',
      key:'id',
      width:"20%",
    },{
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
      width: '25%'
    }, {
      title: '讲师',
      dataIndex: 'lecturer',
      key: 'lecturer',
      width: '25%'
    },{
      title:'类型',
      dataIndex:'type',
      key:'type',
      width:'25%',
      render:(text,record,index) =>{
        if(text==1){
          return '会员活动';
        }else if(text==2){
          return '常规课程';
        }else{
          return text;
        }
      }
    }, {
      title:'人数限制',
      dataIndex:'number',
      key:'number',
      width:'25%'
    },{
      title:'适合人群',
      dataIndex:'crowd',
      key:'crowd',
      width:'25%'
    },{
      title:'课程时间',
      dataIndex:'courseTime',
      key:'courseTime',
      width:'25%'
    },{
      title:'地址',
      dataIndex:'address',
      key:'address',
      width:'25%'
    }/*,{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          <span>
          <Link disabled={false} className="one-link" to={`/system/website-manage/add?type=${record.type}&id=${record.id}` } style={{marginRight:'30px'}}> 查看 </Link>
          <Popconfirm title="确定删除吗?" onConfirm={() => this.onDeleteOne(record.id)}>
           <Link disabled={false} className="one-link">删除</Link>
          </Popconfirm>

        </span>
        )
      },
      width: '30%'
    }*/];
  }
  componentDidMount(){
    this.getTableData({
      page : this.props.webCourse.page,
      size : this.props.webCourse.size
    });
  }
  onTableChange = (pageNumber) =>{
    this.getTableData({
      page : pageNumber,
      size : this.props.webCourse.size
    });
  }
  getTableData(params = {}){
    const {webCourse} = this.props;
    webCourse({
      type: 'webCourse/getCoursePageList',
      payload: {
        ...params
      }
    });
  }
  render(){
    const dataSource = this.props.webCourse.coursePageList;
    const pagination = {
      total: this.props.webCourse.total,
      showQuickJumper: true,
      current: this.props.webCourse.page,
      pageSize: this.props.webCourse.size,
      onChange: this.onTableChange.bind(this)
    };
    return(

      <Card className="website-banner">
        <div className = "websiteAddBtn" style = {{overflow:'hidden'}}>
          <Link to="/system/website-manage/add">
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
  console.log( "state",state.webCourse);
  return {
    webCourse: state.webCourse
  };
}

export default connect(mapStateToProps)(WebCourse);
