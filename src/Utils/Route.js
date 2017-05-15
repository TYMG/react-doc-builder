import React, { Component } from 'react'
import propTypes from 'prop-types'


let instances = []

const register = (comp) => instances.push(comp)
const unregister = (comp) => instances.splice(instances.indexOf(comp), 1)

const historyPush = (path) => {
  history.pushState({}, null, path)
  instances.forEach(instance => instance.forceUpdate())
}

const historyReplace = (path) => {
  history.replaceState({}, null, path)
  instances.forEach(instance => instance.forceUpdate())
}

const matchPath = (pathname, options) => {
  const { exact = false, path } = options

  if (!path) {
    return {
      path: null,
      url: pathname,
      isExact: true
    }
  }

  const match = new RegExp(`^${path}`).exec(pathname)

  if (!match)
    return null

  const url = match[0]
  const isExact = pathname === url

  if (exact && !isExact)
    return null

  return {
    path,
    url,
    isExact,
  }
}

class Route extends Component {
  static propTypes: {
    path: PropTypes.string,
    exact: PropTypes.bool,
    component: PropTypes.func,
    render: PropTypes.func,
  }

  componentWillMount() {
    addEventListener("popstate", this.handlePop)
    register(this)
  }

  componentWillUnmount() {
    unregister(this)
    removeEventListener("popstate", this.handlePop)
  }

  handlePop = () => {
    this.forceUpdate()
  }

  render() {
    const {
      path,
      exact,
      component,
      render,
    } = this.props

    const match = matchPath(location.pathname, { path, exact })

    if (!match)
      return null

    if (component)
      return React.createElement(component, { match })

    if (render)
      return render({ match })

    return null
  }
}

export default Route


