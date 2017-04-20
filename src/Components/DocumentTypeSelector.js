import React, { Component } from 'react';

class DocumentTypeSelector extends Component {
  constructor(){
        super();
        this.state = {
          documentType:{}
      }
    }

  static defaultProps = {
    documentTypes: ['Select', 'Correspondence', 'Endorser Addendum', "Master Promissory Note"]
  }

  documentTypeSelection(e){
    if(this.refs.docType.value !== this.state.documentType){
      this.props.selectDocumentType(this.refs.docType.value);
    }
  }

  render(){
      let docTypes = this.props.documentTypes.map( docType =>{
        return <option key={docType} value={docType}>{docType}</option>
      })
  return(
      <div className="docSelector">
        <h3>Please select a Document Type from the Drop Down Below</h3>
        <div>
          <label>Document Type:</label>&nbsp;
          <select ref="docType" onChange={this.documentTypeSelection.bind(this)}>
            {docTypes}
          </select>
        </div>
      </div>
  );
}
}
export default DocumentTypeSelector;
