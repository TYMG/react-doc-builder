import React, { Component } from 'react';
import { connect } from 'react-redux'

import { modifyDocSubDocTypeSelection } from '../actions'

import { withRouter, Route } from 'react-router-dom'

import { combineReducers } from "redux";

import  Dropdown  from 'react-toolbox/lib/dropdown'


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

const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' }
]

class AppHomeComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      currentDocType:'',
      currentSubDocType:'',
      activeSubDocTypeDropDown:false,
      documentTypes:this.props.documentTypes,
      docTypes:[],
      subDocType:[]
    }
  }

  updateSubDocTypeDropDownOptions = _ =>{

  }

  toggleSubDocTypeDropDown = _ => {

  }

  checkDocTypeForSubDocType = selectedDocType => {

  }

render(){  return (
    <div>
     <Dropdown
        auto
        onChange={this.checkDocTypeForSubDocType(this.state.currentDocType)}
        source={this.state.documentTypes}
        value={this.state.currentDocType}
      />
  <Dropdown placeholder='Document Type' selection options={options} />
  </div>
  )}


}

const AppHome = withRouter(
  connect(
    mapStateToProps,
    null
  )(AppHomeComponent)
)


export default AppHome


 /*<div>
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
  </div>*/