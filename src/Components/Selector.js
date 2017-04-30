import React, { Component } from 'react';
import { Link } from 'react-router'


/*class Selector extends Component {
  constructor(){
        super();
        this.state = {
          documentType:'',
          subDocumentType:'',
          documentTypes:[],
          documentSubTypes:[],
          subTypeDD:false
      }
    }

  // static defaultProps = {
  //   documentTypes: ['Select', 'Correspondence', 'Endorser Addendum', "Master Promissory Note"],
  //   correspondenceTypes: ['RD9002', 'RB9002', 'WCA001']
  // }
  buildDocTypeArray(){
    return this.props.documentTypes.map( docType =>{
     return <option id={docType.route} key={docType.name} value={docType.name}>{docType.name}</option>
   })
  }

  buildSubDocTypeArray(dt){
    return dt.subtypes.map( subtype =>{
      return <option key={subtype.name} value={subtype.name}>{subtype.name}</option>
    })
  }

  componentWillMount(){
    let docTypes = this.buildDocTypeArray();
    docTypes.unshift(
      <option key='Select'>Select</option>
    );
    this.setState({
      documentType:'Select',
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
    }
  }

  subDocumentTypeSelection(){
    const selectedSubDocType = this.refs.subDocType.value;
      if(selectedSubDocType !== this.state.subDocumentType &&  selectedSubDocType !== 'Select'){
        this.setState({
          subDocumentType:selectedSubDocType,
        } , function(){
          //This needs return the SubTypes
          this.props.selectDocumentType(
            {
              "docType":this.state.documentType,
              "subDocType":selectedSubDocType
            });
        })
      }
  }

  renderSubDocTypeSelectors(){
    const activeSubTypeDropDown = this.state.subTypeDD;
    if(activeSubTypeDropDown){
      let subDocTypes = this.state.subDocumentTypes;
      return(
        <div className="inline">
            <label>Sub Document Type:</label>&nbsp;
            <select ref="subDocType" value={this.state.subDocumentType} onChange={this.subDocumentTypeSelection.bind(this)}>
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
            <div className="inline">
              <label>Document Type:</label>&nbsp;
              <select ref="docType" value={this.state.documentType} onChange={this.documentTypeSelection.bind(this)}>
                {docTypes}
              </select>
            </div>
            {this.renderSubDocTypeSelectors()}
            </div>
        </div>
    );
  }
}*/
class Selector extends Component {
  constructor(){
        super();
        this.state = {
          documentType:'',
          subDocumentType:'',
          documentTypes:[],
          documentSubTypes:[],
          subTypeDD:false
      }
    }
    render(){
      return(
        <div>
          Hello world!!!
          </div>
      )
    }
}
/*const Selector = ({ documentTypes , selectDocumentType }) => (
  <div className="docSelector">
          <h3>Please select a Document Type from the Drop Down Below</h3>
          {/*<div>
            <div className="inline">
              <label>Document Type:</label>&nbsp;
              <select ref="docType" value={this.state.documentType} onChange={this.documentTypeSelection.bind(this)}>
                {docTypes}
              </select>
            </div>
            {this.renderSubDocTypeSelectors()}
            </div>
        </div>
)*/

export default Selector
