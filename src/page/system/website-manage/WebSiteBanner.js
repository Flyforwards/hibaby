/**
 * Created by Flyforwards on 2017/7/11.
 */
import React from 'react';
import { connect } from 'dva';
import './WebsiteBanner.scss';
import { Table, Input, Icon, Button, Popconfirm, Pagination ,Card} from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import moment from 'moment'
import { format } from '../../../utils/index.js';
import { WebsiteClass } from './moduleClass';

class WebSiteBanner extends React.Component{
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
        title: '模块名',
        dataIndex: 'type',
        key: 'type',
        width: '25%',
        render:(text,record,index) => {
          return WebsiteClass[text];
        }

      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: '25%',
        render:(text,record,index) =>{
          return new Date(text).format("yyyy-MM-dd");
        }
      },
        {
          title: '图片大小',
          dataIndex: 'imgSize',
          key: 'imgSize',
          width: '10%',
        }, {
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
      }];
  }

  onDeleteOne(record) {
    this.props.dispatch({
      type:'websiteBanner/deleteBanner',
      payload:{
        'dataId':record,
      }
    })
  }

  componentDidMount() {
    this.props.dispatch({type: 'websiteBanner/getInitialList'});
    this.props.dispatch({type: 'websiteBanner/saveOneList',payload:{}});
  }

  render(){
    const { initialList,loading } = this.props;
    const tableProps = {
      loading:loading,
      dataSource:initialList,
      pagination:false,
    };
    return (
      <Card className="website-banner" style={{overflow:'hidden'}}>
        <div className = "websiteAddBtn" style = {{overflow:'hidden'}}>
          <Link to="/system/website-manage/add">
            <Button className="btnAdd" style={{float:'right',marginBottom:'10px'}}>新增</Button>
          </Link>
        </div>
        <Table className='management-center' bordered columns={ this.columns } {...tableProps} rowKey="id"/>
      </Card>
    )
  }

}


function mapStateToProps(state){
  const {initialList} =state.websiteBanner;
  return{
    loading:state.loading.models.websiteBanner,
    initialList,
  }
}
export default connect(mapStateToProps)(WebSiteBanner);
