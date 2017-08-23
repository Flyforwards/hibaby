/**
 *对内婴儿游泳预约
 * Created by yangjingjing on 2017/8/23.
 */
import React, { Component } from 'react';
import CustomerListPage from './CustomerListPage';



class Index extends Component {

  render() {
    return (
      <div>
        <CustomerListPage detailLinkUrl="/service/baby-swimming/detail"/>
      </div>
    )
  }
}

export default Index;
