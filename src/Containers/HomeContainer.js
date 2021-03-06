import React, { Component } from 'react';
import { connect } from 'react-redux'
import { modifyDocSubDocTypeSelection } from '../actions'

import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Dropdown } from 'semantic-ui-react'

import jsonQuery from 'json-query';
import Helpers from '../Library/Helpers'
import documentTypeData from '../../documentTypeData.json';

import { buildSubDocumentTypeList, docTypeRoute } from '../Library/DocumentTypeParser'


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

class HomeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDocType: 'Select',
      selectedSubDocType: 'Select',
      activeSubDocTypeDropDown: false,
      activeBeginLink: false,
      documentTypes: [],
      docTypes: [],
      subDocTypes: []
    }
  }

  componentWillMount() {
    this.setState({
      documentTypes: this.props.documentTypes
    })
  }

  buildDocumentTypeDropDownList = _ => {
    let selectOptions = this.props.documentTypes.map(docType => (
      <option id={docType.route} key={docType.name} value={docType.name}>{docType.name}</option>
    ))
    selectOptions.unshift(<option key='Select'>Select</option>);

    return selectOptions
  }

  buildSubDocumentTypeDropDownList = _ => {
    var docTypeRouteResult = jsonQuery('documentTypes[route=' + this.state.selectedDocType + '].subTypes[name=' + this.state.selectedDocType + '].fields', {
            data: documentTypeData
        })
    let subDocumentTypeList = buildSubDocumentTypeList(this.state.documentTypes, this.state.selectedDocType)
    let selectOptions = subDocumentTypeList.map(subDocType => {
      return <option id={subDocType} key={subDocType} value={subDocType}>{subDocType}</option>
    })
    selectOptions.unshift(<option key='Select'>Select</option>);
    return selectOptions;
  }

  buildLinkAddress = _ => {
    var docTypeRouteResult = jsonQuery('documentTypes[name=' + this.state.selectedDocType + '].route', {
            data: documentTypeData
        })
    let linkAddress = "/Document/" + docTypeRouteResult.value
    if (this.state.activeSubDocTypeDropDown) {
      linkAddress += '/' + this.state.selectedSubDocType
    }else{
      linkAddress += '/Default'
    }
    return linkAddress
  }

  buildBeginLink = _ => {   
    let linkText = "Begin " + this.state.selectedDocType + " Creation"
    return <Link to={this.buildLinkAddress()}>{linkText}</Link>
  }

  updateSubDocTypeDropDownOptions = _ => {
    if (this.checkDocTypeForSubDocType(this.state.selectedDocType)) {
      this.setState({
        subDocTypes: this.buildSubDocumentTypeDropDownList(),
        activeSubDocTypeDropDown: true
      }, this.checkBeginLinkCriteria.bind(this))
    } else {
      this.setState({
        subDocTypes: [],
        activeSubDocTypeDropDown: false
      }, this.checkBeginLinkCriteria.bind(this))
    }
  }

  checkDocTypeForSubDocType = (selectedDocType) => {
    let result
    this.state.documentTypes.forEach(documentType => {
      if (documentType.name === selectedDocType) {
        result = (documentType.subTypes.length !== 0 && documentType.fields.length === 0)
      }
    })
    return result
  }

  checkBeginLinkCriteria = _ => {
    let beginLinkCriteriaMet = false
    if (this.refs.docType.value !== 'Select') {
      if (this.state.activeSubDocTypeDropDown) {
        if (this.refs.subDocType.value !== 'Select') {
          beginLinkCriteriaMet = true
        }
      } else {
        beginLinkCriteriaMet = true
      }
    }
    this.setState({
      activeBeginLink: beginLinkCriteriaMet
    })
  }

  subDocumentTypeSelection = () => (
    this.setState({
      selectedSubDocType: this.refs.subDocType.value
    }, this.checkBeginLinkCriteria())
  )

  documentTypeSelection = (e) => {
    const newSelectedDocType = this.refs.docType.value;
    this.setState({
      selectedDocType: newSelectedDocType
    }, this.updateSubDocTypeDropDownOptions.bind(this))
  }

  render() {
    const { match, location, history, documentTypes } = this.props
    const documentTypeDropDownList = this.buildDocumentTypeDropDownList();
    return (
        <div className="app__home-container">
          <h1 className="home_header">Welcome to Doc Creator!!</h1>
          <div>
            <p className="home_how-to">
              <strong>How to:</strong><br />
            </p>

            <ol className="home_instructions">
              <li>Select a Document from the drop down below
                <div className="home_doc_type_dropdowns">
                <div className="home__doc_type_dd">
                  <select ref="docType" value={this.state.selectedDocType} onChange={this.documentTypeSelection}>
                    {documentTypeDropDownList}
                  </select>
                </div>
           <div className="home__subdoc_type_dd">
                {this.state.activeSubDocTypeDropDown &&
                    <select ref="subDocType" value={this.state.subDocumentType} onChange={this.subDocumentTypeSelection}>
                      {this.state.subDocTypes}
                    </select>
                }
                 </div>
                </div>
                {this.state.activeBeginLink &&
                  <div>
                    {this.buildBeginLink()}
                  </div>
                }
              </li>
              <li>Fill out the fields in the form</li>
              <li>Review; and when ready, Click 'Submit'</li>
              <li>If there are no errors, a Document will be generated and returned</li>
            </ol>
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
