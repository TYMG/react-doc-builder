import React, { Component } from 'react';
import request from 'request';
import DocumentTypeSelector from './Components/DocumentTypeSelector'
import Home from './Components/Home'
import EndorserAddendumForm from './Components/EndorserAddendumForm'
import CorrespondenceForm from './Components/CorrespondenceForm'
import MPNForm from './Components/MPNForm'

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      documentType:""
    }
  }

  selectDocumentType(documentTypeSelected){
    this.setState({
      documentType:documentTypeSelected
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

  render() {
    const docType = this.state.documentType;

    let formType = <Home />;

    if(docType === 'Correspondence'){
      formType = <CorrespondenceForm createDocument={this.createDocument.bind(this)}/>;
    }else if(docType === 'Endorser Addendum'){
      formType = <EndorserAddendumForm createDocument={this.createDocument.bind(this)}/>;
    }else if(docType === 'Master Promissory Note'){
      formType = <MPNForm createDocument={this.createDocument.bind(this)}/>;
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to ACDOE Document Creator</h2>
        </div>
        <div>
          <DocumentTypeSelector selectDocumentType={this.selectDocumentType.bind(this)}/>
        </div>
        <div>
          {formType}
        </div>
      </div>
    );
  }
}

export default App;
