import React, { Component } from 'react';
import { connect } from 'react-redux'
import { modifyDocSubDocTypeSelection } from '../actions'

import { Link } from 'react-router-dom'

import { buildDocumentTypeList, buildSubDocumentTypeList } from '../Library/DocumentTypeParser'


const mapStateToProps = (state) => {
  return {
    documentTypes: state.documentTypes
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

class HomeComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      currentDocType:'',
      currentSubDocType:'',
      activeSubDocTypeDropDown:false,
      documentTypes:buildDocumentTypeList(this.props.documentTypes),
      docTypes:[],
      subDocType:[]
    }
  }

  componentWillMount() {
    //console.log(buildDocumentTypeList(this.props.documentTypes))
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentDocumentType: nextProps.documentType,
      currentSubDocmentType: nextProps.subDocumentType
    })
  }

  updateSubDocTypeDropDownOptions = _ =>{

  }

  toggleSubDocTypeDropDown = _ => {

  }

  checkDocTypeForSubDocType = (selectedDocType) => {

  }



render(){
  const { documentTypes } = this.props
  return (
    <div>
    <h2> Test Home Page </h2>
    <Link to="/Document/MPN">Go To Login</Link>
  </div>
)}


}

const HomeContainer =
  connect(
    mapStateToProps,
    null
  )(HomeComponent)



export default HomeContainer


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
