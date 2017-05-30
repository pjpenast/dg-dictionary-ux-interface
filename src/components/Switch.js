import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Switch.css'

class Switch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: this.props.active
    }
  }

  clickHandler() {
    this.setState(
      {
        active: !this.state.active
      },
      () => {
        this.props.onChange(this.state.active)
      }
    )
  }

  render() {
    let styleButton

    if (!this.state.active) {
      styleButton = {
        left: '1px'
      }
    } else {
      styleButton = {
        right: '1px'
      }
    }

    return (
      <div className="switch" onClick={this.clickHandler.bind(this)}>
        <span style={styleButton} />
      </div>
    )
  }
}

Switch.propTypes = {
  onChange: PropTypes.func
}

Switch.defaultProps = {
  onChange: () => {}
}

export default Switch
