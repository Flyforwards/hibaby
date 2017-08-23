import React, { Component } from 'react';
import CustomerListPage from './CustomerListPage';


class Index extends Component {

  render() {
    return (
      <div>
        <CustomerListPage detailLinkUrl="/service/nutrition-evaluate/detail"/>
      </div>
    )
  }
}

export default Index;
