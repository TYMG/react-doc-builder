import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Redirect } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    documentTypes: state.documentTypes,
    form: state.form
  };
};

class StoreRoute extends Component {

  constructor(props){
    super(props)
  }

  componentWillMount() {}
  componentWillUnmount() {}

  render(){
    const { component, ...rest} = this.props
    return(
      <Route
        {...rest} render = {props =>  React.createElement(component, props) }
        />
    )
  }
}

export default connect(mapStateToProps,null)(StoreRoute)
