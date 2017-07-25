/**
 * Created by Flyforwards on 2017/7/11.
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

class WebEndemic extends React.Component{
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
      title: '地方中心名称',
      dataIndex: 'endemicName',
      key: 'endemicName',
      width: '20%'
    },{
      title: '图片',
      dataIndex: 'img1Url',
      key: 'img1Url',
      width: '20%',
      render:(text,record,index) =><img width={180} height={180} src={text} />
    },
      {
      title:'创建时间',
      dataIndex:'createTime',
      key:'createTime',
      width:'20%',
      render:(text,record,index) =>{
        var date = new Date(text).format("yyyy-MM-dd HH:mm:ss");
        return date;
      }
    },{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          <span>
          <Link disabled={false} className="one-link" to={`/system/website-manage/addEndemic?id=${record.id}` } style={{marginRight:'30px'}}> 查看 </Link>
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
      page : this.props.webEndemic.page,
      size : this.props.webEndemic.size
    });
  }
  onTableChange = (pageNumber) =>{
    this.getTableData({
      page : pageNumber,
      size : this.props.webEndemic.size
    });
  }
  getTableData(params = {}){
    //console.log(this.props)
    const {dispatch} = this.props;
    dispatch({
      type: 'webEndemic/getEndemicPageList',
      payload: {
        ...params
      }
    });
  }
  onDeleteOne(record) {
    this.props.dispatch({
      type:'webEndemic/deleteEndemic',
      payload:{
        'dataId':record,
      }
    })
  }
  render(){
    const dataSource = this.props.webEndemic.endemicPageList;
    const pagination = {
      total: this.props.webEndemic.total,
      showQuickJumper: true,
      current: this.props.webEndemic.page,
      pageSize: this.props.webEndemic.size,
      onChange: this.onTableChange.bind(this)
    };
    return(

      <Card className="website-banner">
        <div className = "websiteAddBtn" style = {{overflow:'hidden'}}>
          <Link to="/system/website-manage/addEndemic">
            <Button className="one-button" style={{float:'right',marginBottom:'10px'}}>新增</Button>
          </Link>
        </div>
        {/*<Table className='management-center' bordered columns={ this.columns } {...tableProps} rowKey="id"/>*/}
        <Table
          className="management-center"
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
    webEndemic: state.webEndemic
  };
}

export default connect(mapStateToProps)(WebEndemic);
