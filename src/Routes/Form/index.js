import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppForm from '../../Containers/AppForm'

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
      <div>
        <AppForm store={this.props.store}/>
      </div>
    );
  }
}

export default Form
