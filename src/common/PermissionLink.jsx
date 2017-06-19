
import React, {Component} from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types'
import { Link } from 'react-router'

class PermissionLink extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { permissionAlias, testKey} = this.props;
    const disabled = !permissionAlias.contains(testKey);
    const props = _.omit(this.props, 'testKey', 'permissionAlias', 'dispatch');
    return (
      <Link disabled={disabled} {...props}>
      </Link>
    )
  }
}

PermissionLink.propTypes = {
  testKey: PropTypes.string.isRequired,
  permissionAlias: PropTypes.array,
}

function mapStateToProps(state) {
  const { permissionAlias } = state.layout;
  return { permissionAlias };
}


export default connect(mapStateToProps)(PermissionLink);
