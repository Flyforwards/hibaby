import React, { Component } from 'react';
import CustomerListPage from './CustomerListPage';




class Index extends Component {

  render() {
    return (
      <div>
        <CustomerListPage detailLinkUrl="/service/check-before"/>
      </div>
    )
  }
}

export default Index;
