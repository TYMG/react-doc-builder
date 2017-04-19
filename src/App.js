import React, { Component } from 'react';
import request from 'request';
import DocumentTypeSelector from './Components/DocumentTypeSelector'
import EndorserAddendumForm from './Components/EndorserAddendumForm'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {

    }
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
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to ACDOE Document Creator</h2>
        </div>
        <div>
          <DocumentTypeSelector/>
        </div>
        <div>
          <EndorserAddendumForm createDocument={this.createDocument.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;
