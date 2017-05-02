import React, { Component } from 'react'
import PropTypes from 'prop-types'; // ES6

const historyPush = (path) => {
  history.pushState({}, null, path)
}

const historyReplace = (path) => {
  history.replaceState({}, null, path)
}

class Link extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    replace: PropTypes.bool,
  }

  handleClick = (event) => {
    const { replace, to } = this.props
    event.preventDefault()

    replace ? historyReplace(to) : historyPush(to)
  }

  render() {
    const { to, children} = this.props

    return (
      <a href={to} onClick={this.handleClick}>
        {children}
      </a>
    )
  }
}

export default Link
