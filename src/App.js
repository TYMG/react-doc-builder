import React, { Component } from 'react';
import request from 'request';
import DocumentTypeSelector from './Components/DocumentTypeSelector'
import Home from './Components/Home'
import MasterForm from './Components/MasterForm'
import EndorserAddendumForm from './Components/EndorserAddendumForm'
import CorrespondenceForm from './Components/CorrespondenceForm'
import MPNForm from './Components/MPNForm'

import logo from './logo.svg';
import './App.css';

import documentTypeData from '../documentTypeData.json';

class App extends Component {

  constructor(){
    super();
    this.state = {

    }
  }

    componentWillMount(){
      this.parseDocumentTypeData();
    }

  parseDocumentTypeData(){
    let test = documentTypeData.documentTypes;
    let docTypes = documentTypeData.documentTypes.map( docType =>{
      let test2 = docType.fields;
      return docType;
    })
    this.setState({
      documentTypes:docTypes
    }, function(){
        console.log(this.state.documentTypes);
    })
  }

  selectDocumentType(documentTypeSelected){
    this.setState({
      currentSelection:documentTypeSelected
    }, ()=>{
      console.log("Values Set")
    });
  }

  createDocument(document){
    console.log("Create Document Function Hit");
    //Check if the document is not null
    var options = {
      url: 'http://localhost:8080/Document/EA',
      method: 'POST',
      json: document
    }
    request.post(options);
    // request.post({url:'http://localhost:8080/Document/EA',
    //               form:})
    // .json(document)
    // .then((body)=>{
    //     //Check the Response and Check the Return
    // })
  }

  renderForm(){
    let form = <Home />;
    const currSelection = this.state.currentSelection;
    if(currSelection !== undefined){
      const currSelectedDocType = currSelection.docType;
      const currSelectedSubDocType = currSelection.subDocType;
      this.state.documentTypes.forEach( (dt,index) => {
        if(dt.name === currSelectedDocType){
          form = <MasterForm documentType={dt} subDocumentType={currSelectedSubDocType} createDocument={this.createDocument.bind(this)}/>
        }
      })
    }
    return form;
  }

  render() {
    let formType = this.renderForm();
    // if(currSelection !== undefined){
    //   const currSelectedDocType = currSelection.docType;
    //   if(currSelection.docType === 'Correspondence'){
    //     formType = <CorrespondenceForm createDocument={this.createDocument.bind(this)}/>;
    //   }else if(currSelection.docType === 'Endorser Addendum'){
    //     formType = <EndorserAddendumForm createDocument={this.createDocument.bind(this)}/>;
    //   }else if(currSelection.docType === 'Master Promissory Note'){
    //     formType = <MPNForm createDocument={this.createDocument.bind(this)}/>;
    //   }
    // }
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to ACDOE Document Creator</h2>
        </div>
        <div>
          <DocumentTypeSelector documentTypes={this.state.documentTypes} selectDocumentType={this.selectDocumentType.bind(this)}/>
        </div>
        <div>
          {formType}
        </div>
      </div>
    );
  }
}

export default App;
