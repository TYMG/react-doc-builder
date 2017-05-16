import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Layout from './layout'

class Form extends Component {
  constructor(props) {
        super(props)
        this.state = {
                rehydrated:false
        }
    }

  componentWillMount() {}
  componentWillUnmount() {}

  render() {
    return (
      <div className="form__route_index flexbox">
        <Layout store={this.props.store}/>
      </div>
    );
  }
}

export default Form
