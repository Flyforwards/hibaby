"use strict"

import React from 'react'
import {message, Button, Icon} from 'antd'
import Page from '../../framework/page'
import './index.scss';
import logo from 'assets/logo2.png'

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page>
                <div className='welcome'>
                    {/*<Icon type='smile-o'/>*/}
                    <img src={logo}/>
                </div>
            </Page>
        )
    }
}

export default Home
