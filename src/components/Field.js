import PropTypes from 'prop-types'
import React, { Component } from 'react'

class Field extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value })
  }

  input(event) {
    this.setState({
      value: event.target.value
    })

    this.props.onChange(this.state.value)
  }

  render() {
    return (
      <div className="field">
        <label>
          {this.props.name}
          <input
            type="text"
            value={this.state.value || ''}
            placeholder={this.props.placeholder}
            readOnly={this.props.readOnly}
            onChange={this.input.bind(this)}
          />
        </label>
      </div>
    )
  }
}

Field.propTypes = {
  onChange: PropTypes.func
}

Field.defaultProps = {
  onChange: () => {}
}

export default Field
