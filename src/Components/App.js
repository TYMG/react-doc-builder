import React, { Component } from 'react'
import { withRouter } from 'react-router'

import { Container, Header } from 'semantic-ui-react'

import request from 'request';

/**
Import Components
**/
import AppHeader from './AppHeader'
import DocumentTypeSelector from './DocumentTypeSelector'
import Home from './Home'
import MasterForm from './MasterForm'
import AppFooter from './AppFooter'

import '../App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {

    }
  }



  //
  // findRoute(){
  //   const currDocType = this.state.currentSelection.docType
  //   let docTypeRoute = documentTypeData.documentTypes.find( docType =>{
  //     if(currDocType === docType.name){
  //       return docType.route;
  //     }
  //   })
  //   this.setState({
  //       documentTypeRoute: docTypeRoute.route
  //   },()=>{
  //     const currSubDocType = this.state.currentSelection.subDocType
  //
  //     let path = '/document/'+docTypeRoute.route
  //     if(currSubDocType !== '' && currSubDocType !== 'Select'){
  //       path += '/'+currSubDocType;
  //     }
  //     this.props.history.push(`${path}`)
  //   })
  // }

  selectDocumentType(documentTypeSelected){
    this.setState({
      currentSelection:documentTypeSelected
    }, ()=>{
      this.findRoute();
    });
  }

  updateRoutePath(path){
  }

  createDocument(form){
    console.log("Create Document Function Hit");
    var PATH = window.location.pathname;
    //Check if the document is not null
    var options = {
      url: 'http://localhost:8080'+PATH,
      method: 'POST',
      json: form
    }
    request.post(options);

    // .then((body)=>{
    //   console.log(body)
    //      //Check the Response and Check the Return
    //   })
    // request.post({url:'http://localhost:8080/Document/EA',
    //               form:})
    // .json(document)

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
    return (
      <div>
        <div>
          <DocumentTypeSelector documentTypes={this.state.documentTypes} selectDocumentType={this.selectDocumentType.bind(this)}/>
        </div>
        <div className="app__masterform">
          <Container form>
            {formType}
          </Container>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
