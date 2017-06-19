
import React, {Component} from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types'

class PermissionButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { permissionAlias, testKey} = this.props;
    const disabled = !permissionAlias.contains(testKey);
    const props = _.omit(this.props, 'testKey', 'permissionAlias', 'dispatch');
    return (
      <Button disabled={disabled} {...props}>
      </Button>
    )
  }
}



PermissionButton.propTypes = {
  testKey: PropTypes.string.isRequired,
  permissionAlias: PropTypes.array,
}


function mapStateToProps(state) {
  const { permissionAlias } = state.layout;
  return { permissionAlias };
}

export default connect(mapStateToProps)(PermissionButton);
