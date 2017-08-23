import React, { Component } from 'react';
import CustomerListPage from './CustomerListPage';


class Index extends Component {

  render() {
    return (
      <div>
        <CustomerListPage detailLinkUrl="/service/diagnosis-record/checkRoomDetail" moreLink="&type=3&operatoritem=6"/>
      </div>
    )
  }
}

export default Index;
