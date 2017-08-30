import React, { Component } from 'react';
import CustomerListPage from './CustomerListPage';


/**
 * 产科查房记录单
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
