import React, { Component } from 'react';
import CustomerListPage from './CustomerListPage';


class Index extends Component {

  render() {
    return (
      <div>
        <CustomerListPage detailLinkUrl="/service/checkRoomDetail" moreLink="&type=3"/>
      </div>
    )
  }
}

export default Index;
