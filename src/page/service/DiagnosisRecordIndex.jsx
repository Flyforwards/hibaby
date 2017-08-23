import React, { Component } from 'react';
import CustomerListPage from './CustomerListPage';

/**
 * 中医查房记录单
 */
class Index extends Component {
  
  render() {
    return (
      <div>
        <CustomerListPage detailLinkUrl="/service/diagnosis-record/checkRoomDetail" moreLink="&type=2&operatoritem=6"/>
      </div>
    )
  }
}

export default Index;
