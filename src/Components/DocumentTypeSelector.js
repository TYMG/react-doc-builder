import React, { Component } from 'react';

class DocumentTypeSelector extends Component {
  constructor(){
        super();
        this.state = {

      }
    }

  static defaultProps = {
    documentTypes: ['Correspondence', 'Endorser Addendum', "Master Promissory Note "]
  }

  render(){
      let documentTypes = this.props.documentTypes.map( docType =>{
        return <option key={docType} value={docType}>{docType}</option>
      })
  return(
      <div className="docSelector">
        <h3>Please select a Document Type from the Drop Down Below</h3>
        <div>
          <label>Document Type:</label><br />
          <select ref="docType">
            {documentTypes}
          </select>
        </div>
      </div>
  );
}
}
export default DocumentTypeSelector;
