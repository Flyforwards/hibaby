import React from 'react';
import {
	Button
} from 'antd';
import './loginIndex.scss';

import logo from './images/logo.png'


class clubSelect extends React.Component {


	render() {
		return (
		 < div className="container">
		 <div className="select">
		 < img className = "findimg" src ={logo}  / >
			< Button type = "primary" > 凯贝姆总部 < /Button>
			< Button type = "primary" > 青岛会所 < /Button>
			< Button type = "primary" > 北京会所 < /Button>
			< Button type = "primary" > 纽约总部 < /Button>
			</div>
			
		< /div>
		)
	}
}



export default clubSelect;