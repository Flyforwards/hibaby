/**
 * Created by Flyforwards on 2017/7/11.
 */
import React from 'react';
import { connect } from 'dva';
import './WebsiteBanner.scss';
import { Table, Input, Icon, Button, Popconfirm, Pagination ,Card} from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import moment from 'moment';

class WebSiteBanner extends React.Component{
  constructor(props){
    super(props);
    this.columns = [{
      title: '模块名',
      dataIndex: 'type',
      key: 'type',
      width: '35%'
    }, {
      title: '所属类型',
      dataIndex: 'id',
      key: 'id',
      width: '35%'
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          <Link disabled={false} className="one-link" to={`/system/website-manage/add?type=${record.type}&id=${record.id}` }> 查看 </Link>)
      },
      width: '30%'
    }];
    this.dataSorce=[{
      id: '1',
      type: 1,
      address: '西湖区湖底公园1号'
    }, {
      id: '2',
      type: 2,
      address: '西湖区湖底公园1号'
    }];
  }






  render(){

    return (
      <Card className="website-banner">
        <div className = "websiteAddBtn" style = {{overflow:'hidden'}}>
          <Link to="/system/website-manage/add">
            <Button className="one-button" style={{float:'right',marginBottom:'10px'}}>添加</Button>
          </Link>
        </div>
        <Table className='management-center' bordered columns={ this.columns } dataSource={this.dataSorce} />
      </Card>
    )
  }

}


// function mapStateToProps(state){
//
//   return{
//     loading:state.loading.model.websiteBanne,
//   }
// }
export default connect()(WebSiteBanner);
