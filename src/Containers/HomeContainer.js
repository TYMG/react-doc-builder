import React, { Component } from 'react';
import { connect } from 'react-redux'
import { modifyDocSubDocTypeSelection } from '../actions'

import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Dropdown } from 'semantic-ui-react'

import { buildSubDocumentTypeList,docTypeRoute } from '../Library/DocumentTypeParser'


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
      selectedDocType: '',
      selectedSubDocType: '',
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
    let subDocumentTypeList = buildSubDocumentTypeList(this.state.documentTypes, this.state.selectedDocType)
    let selectOptions = subDocumentTypeList.map(subDocType => {
      return <option id={subDocType} key={subDocType} value={subDocType}>{subDocType}</option>
    })
    selectOptions.unshift(<option key='Select'>Select</option>);
    return selectOptions;
  }

  buildBeginLink = _ => {  
    let toString = "/Document/"+docTypeRoute(this.state.documentTypes,this.state.selectedDocType)
    let linkText = "Begin " + this.state.selectedDocType + " Creation"
      if(this.state.activeSubDocTypeDropDown){
        toString += '/'+this.state.selectedSubDocType
      }
     return <Link to={toString}>{linkText}</Link>
  }

  updateSubDocTypeDropDownOptions = _ => {
    if (this.checkDocTypeForSubDocType(this.state.selectedDocType)) {
      this.setState({
        subDocTypes: this.buildSubDocumentTypeDropDownList(),
        activeSubDocTypeDropDown: true
      },this.checkBeginLinkCriteria.bind(this))
    } else {
      this.setState({
        subDocTypes: [],
        activeSubDocTypeDropDown: false
      },this.checkBeginLinkCriteria.bind(this))
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
    let beginLinkCriteriaMet =false
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
      activeBeginLink:beginLinkCriteriaMet
    })
  }

  subDocumentTypeSelection = () => (
    this.setState({
      selectedSubDocType: this.refs.subDocType.value
    },this.checkBeginLinkCriteria())
  )

  documentTypeSelection = (e) => {
    const newSelectedDocType = this.refs.docType.value;
    console.log(newSelectedDocType)
    this.setState({
      selectedDocType: newSelectedDocType
    }, this.updateSubDocTypeDropDownOptions.bind(this))
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
                  <select ref="docType" value={this.state.selectedDocType} onChange={this.documentTypeSelection}>
                    {documentTypeDropDownList}
                  </select>
                </div>
                {this.state.activeSubDocTypeDropDown &&
                  <div>
                    <select ref="subDocType" value={this.state.subDocumentType} onChange={this.subDocumentTypeSelection}>
                      {this.state.subDocTypes}
                    </select>
                  </div>
                }
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
