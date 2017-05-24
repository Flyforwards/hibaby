import React from 'react'

import {Router, hashHistory} from 'react-router'

import './base.css'
import './common.scss'

import {local, session} from 'common.scss/util/storage.js'

import Layout from '../layout/Layout.jsx'
import Home from '../../page/home'
import pageRoutes from '../../page/routeConfig.js'


class App extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return <Router routes={routes} history={hashHistory}/>
    }
}

export default App
