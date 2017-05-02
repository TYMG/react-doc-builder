import React, { Component } from 'react';
import { connect } from 'react-redux'
import { modifyDocSubDocTypeSelection } from '../actions'

import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Dropdown } from 'semantic-ui-react'

import { buildDocumentTypeDropDownList } from '../Library/DocumentTypeParser'


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

class HomeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDocType: '',
      currentSubDocType: '',
      activeSubDocTypeDropDown: false,
      documentTypes: [],
      docTypes: [],
      subDocType: []
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

  buildDocumentTypeDropDownList = _ => ( 
    this.props.documentTypes.map( docType =>(
     <option id={docType.route} key={docType.name} value={docType.name}>{docType.name}</option>
   ))

  )

  updateSubDocTypeDropDownOptions = _ => {

  }

  toggleSubDocTypeDropDown = _ => {

  }

  checkDocTypeForSubDocType = (selectedDocType) => {

  }

  documentTypeSelection(e){
     console.log("Hello WOrld")
     /* const selectedDocType = this.refs.docType.value;
      let subDocsTypes = null;
      let subTypeDropDownActive = false;
      if(selectedDocType !== this.state.documentType &&  selectedDocType !== 'Select'){
        this.props.documentTypes.forEach( (dt,index) => {
          if(selectedDocType === dt.name){
            if (dt.subtypes.length!==0) {
              subDocsTypes = this.buildSubDocTypeArray(dt)
              subDocsTypes.unshift(
                <option key='Select'>Select</option>
              );
              subTypeDropDownActive = true
            }
          }
        })
        this.setState({
          documentType:selectedDocType,
          subDocumentType:'Select',
          subTypeDD:subTypeDropDownActive,
          subDocumentTypes:subDocsTypes
        } , function(){
          //This needs return the SubTypes
          this.props.selectDocumentType(
            {
              "docType":selectedDocType,
              "subDocType":'Select'
            });
        })
      }*/
    }

  render() {
    const { match, location, history, documentTypes } = this.props
    const documentTypeDropDownList = this.buildDocumentTypeDropDownList();
    return (
      <div>

        <div>
          <h3>Welcome to Doc Creator!!</h3>
          <div>
            <p>
              <strong>How to:</strong><br />
            </p>

            <ol>
              <li>Select a Document from the drop down below
                <div>
                    <select ref="docType" value={this.state.documentType} onChange={this.documentTypeSelection.bind(this)}>
                    {documentTypeDropDownList}
                     </select>
                </div>
              </li>
              <li>Fill out the fields in the form</li>
              <li>Review; and when ready, Click 'Submit'</li>
              <li>If there are no errors, a Document will be generated and returned</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }


}

const HomeContainer = withRouter(
  connect(
    mapStateToProps,
    null
  )(HomeComponent))



export default HomeContainer



 /*   <Link to="/Document/MPN">Go To Login</Link>*/
