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
      dataIndex: 'type',
      key: 'type',
      width: '35%'
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        const detail = !this.props.permissionAlias.contains('GROUP_CHAR_DETAIL');
        return (
          <Link disabled={detail} className="one-link" to={`/system/group-char/detail?dataId=${record.id}` }> 查看 </Link>)
      },
      width: '30%'
    }];
  }






  render(){
    return (
      <Card className="website-banner">
        <div className = "websiteAddBtn" style = {{overflow:'hidden'}}>
          <Link to="">
            <Button className="one-button" style={{float:'right',marginBottom:'10px'}}>添加</Button>
          </Link>
        </div>
        <Table className='management-center' bordered columns={ this.columns }/>
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
