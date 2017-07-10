import React, { Component } from 'react';
import Page from '../framework/page'
import { Icon } from 'antd'
import './not-found/style.less'

class noJurisdiction extends Component {

  render() {

    return (
      <Page loading={false} title="没有权限">
      <div className='error-404'>
      <Icon type='frown-o'/>
      <h1>没有权限访问这个菜单</h1>
    </div>
    </Page>
    )
  }
}

export default noJurisdiction;
