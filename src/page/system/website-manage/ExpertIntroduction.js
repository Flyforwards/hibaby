/**
 * Created by Flyforwards on 2017/7/13.
 */
import React ,{ Component } from 'react';
import { connect } from 'dva';
import './WebsiteBanner.scss';
import { Table, Input, Icon, Button, Popconfirm, Pagination ,Card} from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import moment from 'moment'
import { format } from '../../../utils/index.js';


class ExpertIntroduction extends React.Component{
  constructor(props){
    super(props);
    this.columns = [{
      title:"ID",
      dataIndex:'id',
      key:'id',
      width:"20%",
    },{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: '25%',
    },{
      title: '摘要',
      dataIndex: 'summary',
      key: 'summary',
      width: '25%',
    },{
      title: '正文',
      dataIndex: 'content',
      key: 'content',
      width: '25%',
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          <span>
            {/*<Link disabled={false} className="one-link" to={`/system/website-manage/add?type=${record.type}&id=${record.id}` } style={{marginRight:'30px'}}> 查看 </Link>*/}
            {/*<Popconfirm title="确定删除吗?" onConfirm={() => this.onDeleteOne(record.id)}>*/}
             {/*<Link disabled={false} className="one-link">删除</Link>*/}
            {/*</Popconfirm>*/}

          </span>
        )
      },
      width: '30%'
    }];
    this.state={

    }
  }

  render(){
    return(
      <Card className="website-banner">
        {/*<div className = "websiteAddBtn" style = {{overflow:'hidden'}}>*/}
          {/*<Link to="/system/website-manage/add">*/}
            {/*<Button className="one-button" style={{float:'right',marginBottom:'10px'}}>添加</Button>*/}
          {/*</Link>*/}
        {/*</div>*/}
        {/*<Table className='management-center' bordered columns={ this.columns } {...tableProps} rowKey="id"/>*/}
      </Card>
    )
  }


}

export default ExpertIntroduction
