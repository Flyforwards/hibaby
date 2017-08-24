import React, { Component } from 'react';
import CustomerListPage from './CustomerListPage';


/**
 * 产科查房记录单
 */
class Index extends Component {

  render() {
    return (
      <div>
        <CustomerListPage detailLinkUrl="/service/diagnosis-record/checkRoomDetail" moreLink="&type=3&operatoritem=7"/>
      </div>
    )
  }
}

export default Index;
