import React, { Component } from 'react';
import { connect } from 'react-redux'

import { modifyDocSubDocTypeSelection } from '../actions'

import { withRouter, Route } from 'react-router-dom'

const mapStateToProps = (state) => {
  return {
    documentTypes: state.documentTypes,
    router: state.router
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectDocumentType: (docSubDocSelection) => {
      dispatch(modifyDocSubDocTypeSelection(docSubDocSelection))
    }
  }
}


const AppHomeComponent = ({documentTypes, router}) => (
  <div>
    <h3>Welcome to Doc Creator!!</h3>
    <div>
      <p>
        <strong>How to:</strong><br />
      </p>
      <ol>
        <li>Select a Document from the drop down menu above</li>
        <li>Fill out the fields in the form</li>
        <li>Review; and when ready, Click 'Submit'</li>
        <li>If there are no errors, a Document will be generated and returned</li>
      </ol>
    </div>
  </div>
)

const AppHome = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppHomeComponent)
)


export default AppHome
