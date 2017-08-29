import React, { Component } from 'react';
import CustomerListPage from './CustomerListPage';

/**
 * 各种查房记录单
 */
class Index extends Component {
  render() {

    const children = '&type=1&operatoritem=5'//儿科查房：type=1;operatorItem=5;
    const diagnosis = '&type=2&operatoritem=6'//中医查房：type=2;operatorItem=6;
    const obstetric = '&type=3&operatoritem=7'//产科查房：type=3;operatorItem=7;
    const puerpera = '&type=4&operatoritem=11'//产妇护理：type=4;operatorItem=11;
    const butler = '&type=5&operatoritem=16' //管家查房：type=5;operatorItem=16;
    const nutrition = '&type=6&operatoritem=18'//营养查房：type=6;operatorItem=18;

    return (
      <div>
        <CustomerListPage detailLinkUrl="/service/diagnosis-record/detail" moreLink={urlAddress}/>
        {
          (location.pathname.indexOf('puerpera-record') !== -1) ?
            <CustomerListPage detailLinkUrl="/service/puerpera-record/detail" moreLink={urlAddress}/> :
            (location.pathname.indexOf('butler-rounds') !== -1) ?
              <CustomerListPage detailLinkUrl="/service/butler-rounds/detail" moreLink={urlAddress}/> :
              (location.pathname.indexOf('nutrition-record') !== -1) ?
                <CustomerListPage detailLinkUrl="/service/nutrition-record/detail" moreLink={urlAddress}/> :
                <CustomerListPage detailLinkUrl="/service/diagnosis-record/detail" moreLink={urlAddress}/>
        }
      </div>
    )
  }
}

export default Index;
