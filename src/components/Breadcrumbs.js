import React, { Component } from 'react'

class Breadcrumbs extends Component {
  render() {
    return (
      <div className="breadcrumb">
        <span>&gt;&gt; </span>

        {this.props.items.map((item, i) => (
          <span className="link" key={i}>
            {item.name}
            {this.props.items.length > 1 && i !== this.props.items.length - 1
              ? <span> &gt; </span>
              : false}
          </span>
        ))}

      </div>
    )
  }
}

export default Breadcrumbs
