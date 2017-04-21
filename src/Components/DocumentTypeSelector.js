import React, { Component } from 'react';

class DocumentTypeSelector extends Component {
  constructor(){
        super();
        this.state = {
          documentType:'',
          subtypes:[],
          subTypeDD:false
      }
    }

  // static defaultProps = {
  //   documentTypes: ['Select', 'Correspondence', 'Endorser Addendum', "Master Promissory Note"],
  //   correspondenceTypes: ['RD9002', 'RB9002', 'WCA001']
  // }
  buildDocTypeArray(){
    return this.props.documentTypes.map( docType =>{
     return <option key={docType.name} value={docType.name}>{docType.name}</option>
   })
  }

  buildSubDocTypeArray(dt){
    return dt.subtypes.map( subtype =>{
      return <option key={subtype.name} value={subtype.name}>{subtype.name}</option>
    })
  }

  componentWillMount(){
    let docTypes = this.buildDocTypeArray();
    this.setState({
      documentTypes:docTypes
    })
  }

  documentTypeSelection(e){
    const selectedDocType = this.refs.docType.value;
    let subDocsTypes = null;
    let subTypeDropDownActive = false;
    if(selectedDocType !== this.state.documentType &&  selectedDocType !== 'Select'){
      this.props.documentTypes.forEach( (dt,index) => {
        if(selectedDocType === dt.name){
          if (dt.subtypes.length!==0) {
            subDocsTypes = this.buildSubDocTypeArray(dt)
            subTypeDropDownActive = true
          }
        }
      })
      this.setState({
        subTypeDD:subTypeDropDownActive,
        subDocumentTypes:subDocsTypes
      } , function(){
        //This needs return the SubTypes
        this.props.selectDocumentType(this.refs.docType.value);
      })
    }
  }

  renderSubDocTypeSelectors(){
    const activeSubTypeDropDown = this.state.subTypeDD;
    if(activeSubTypeDropDown){
      let subDocTypes = this.state.subDocumentTypes;
      return(
        <div>
            <label>Sub Document Type:</label>
            <select ref="subDocType">
              {subDocTypes}
            </select>
        </div>
      )
    }
  }

  render(){
    let docTypes = this.state.documentTypes;
    return(
        <div className="docSelector">
          <h3>Please select a Document Type from the Drop Down Below</h3>
          <div>
            <div>
              <label>Document Type:</label>&nbsp;
              <select ref="docType" onChange={this.documentTypeSelection.bind(this)}>
                {docTypes}
              </select>
            </div>
            {this.renderSubDocTypeSelectors()}
            </div>
        </div>
    );
  }
}
export default DocumentTypeSelector;
