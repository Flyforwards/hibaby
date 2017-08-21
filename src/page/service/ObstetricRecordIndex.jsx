import React, { Component } from 'react';
import CustomerListPage from './CustomerListPage';


/**
 * 婴儿护理记录单客户列表
 */
class Index extends Component {

  render() {
    return (
      <div>
        <CustomerListPage detailLinkUrl="/service/baby-nursing/detail"/>
      </div>
    )
  }
}

export default Index;
