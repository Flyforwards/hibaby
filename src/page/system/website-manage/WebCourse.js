/**
 * Created by Flyforwards on 2017/7/11.
 */
import React from 'react';
import { connect } from 'dva';
import './WebCourse.scss';
import { Table, Input, Icon, Button, Popconfirm, Pagination ,Card} from 'antd';
import { routerRedux } from 'dva/router';
import { Link } from 'react-router';
import moment from 'moment'
import { format } from '../../../utils/index.js';

class WebCourse extends React.Component{
  constructor(props){
    super(props);
    alert(1);
  }
}
