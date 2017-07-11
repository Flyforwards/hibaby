import React from 'react'

import { Router, hashHistory } from 'react-router'

import './base.css'
import './common.scss'

class App extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return <Router routes={routes} history={hashHistory}/>
    }
}

export default App
