import React, { Component } from 'react'

class Icon extends Component {
  render() {
    return <i className={'fa fa-' + this.props.ico} aria-hidden="true" />
  }
}

export default Icon
