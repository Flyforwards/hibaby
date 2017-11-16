import React from 'react'
import { connect } from 'dva'
import {} from 'antd'
import { routerRedux } from 'dva/router'
import { Link } from 'react-router'
import moment from 'moment'

class MyMessageIndex extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  isType(type) {
    switch (type) {
      default:
        return''
    }
  }
  
  render() {
    
    console.log(this.props, '/////////')
    const { messageList } = this.props;
    return (
      <div>
        {
          messageList.map((v, k) => {
            return (
              <div key={k}>
                {this.isType.bind(v.type)}
              
              </div>
            )
          })
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  
  return {
    loading: state.loading,
    ...state.users
  };
}

export default connect(mapStateToProps)(MyMessageIndex) ;
