import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Icon from './Icon'

class NavigationItem extends Component {
  clickHandler() {
    this.props.onClick(this.props.name)
  }

  render() {
    return (
      <li onClick={this.clickHandler.bind(this)}>
        <Icon ico={this.props.ico} />{this.props.name}
      </li>
    )
  }
}

class Navigation extends Component {
  constructor(props) {
    super(props)

    this.updateState(props)
  }

  componentWillReceiveProps(nextProps) {
    this.updateState(nextProps)
  }

  updateState(props) {
    let title, placeholder

    if (props.type === 'hdfs') {
      title = 'STRUCTURE'
      placeholder = 'Find a file, directory or table'
    } else {
      title = 'TABLES'
      placeholder = 'Find a table'
    }

    this.state = {
      title: title,
      placeholder: placeholder,
      items: props.items
    }
  }

  clickItemHandler(item) {
    if (item.icon === 'folder') {
      this.setState({
        items: item.structure
      })

      this.props.onUpdate(item)
    } else {
      this.props.onChange(item.name)
    }
  }

  render() {
    return (
      <div className="navigation">
        <p className="subtitle">{this.state.title}</p>
        <input type="search" placeholder={this.state.placeholder} />

        <ul className="tables">
          {this.state.items.map((i, key) => (
            <NavigationItem
              ico={i.icon}
              key={key}
              name={i.name}
              onClick={name => this.clickItemHandler(i)}
            />
          ))}
        </ul>

      </div>
    )
  }
}

Navigation.propTypes = {
  onChange: PropTypes.func,
  onUpdate: PropTypes.func
}

Navigation.defaultProps = {
  onChange: () => {},
  onUpdate: () => {}
}

export default Navigation
