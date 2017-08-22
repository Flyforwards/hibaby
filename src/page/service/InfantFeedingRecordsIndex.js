import React, { Component } from 'react';
import CustomerListPage from './CustomerListPage';


class Index extends Component {

  render() {
    let urlAddress = location.pathname.indexOf('baby-grow') !== -1? 'baby-grow': (location.pathname.indexOf('baby-feed') !== -1?'baby-feed':'puerpera-body')

    return (
      <div>
        <CustomerListPage detailLinkUrl={`/service/${urlAddress}/detail`}/>
      </div>
    )
  }
}

export default Index;
