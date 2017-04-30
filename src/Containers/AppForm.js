import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

import { connect } from 'react-redux'

import { withRouter, Route } from 'react-router-dom'

import FormSection from './FormSection'
import FormReview from './FormReview'


/*class MasterForm extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  componentWillMount() {
    this.setState({
      currentDocumentType: this.props.documentType,
      currentSubDocmentType: this.props.subDocumentType
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentDocumentType: nextProps.documentType,
      currentSubDocmentType: nextProps.subDocumentType
    })
  }

  formSubmit(e) {
    this.setState({
      refs: {
        fields: this.refs
      }
    }, function () {
      let result = this.parseForm()
      console.log(JSON.stringify(result))
      this.props.createDocument(result);
    });
    e.preventDefault();
  }

  parseInputs(section) {
    const stateRefs = this.state.refs;
    let inputJson = {};
    section.input.forEach(input => {
      const inputRef = input.ref;
      let inputRefValue = null
      if (input.active) {
        let uniqueRef = input.ref + section.ref;
        inputRefValue = stateRefs.fields[uniqueRef].value;
      }
      inputJson[inputRef] = inputRefValue;
    })
    return inputJson;
  }

  parseSections(docTypeFields) {
    //Loop through the sections
    let sectionJson = {};
    docTypeFields.forEach((section, index) => {
      //Build The Section Header
      const sectionRef = section.ref;
      let sectionInputFields = this.parseInputs(section)
      sectionJson[sectionRef] = sectionInputFields
    })

    return sectionJson;
  }

  parseForm() {
    const currDocType = this.state.currentDocumentType
    const currSubDocType = this.state.currentSubDocmentType

    let formJson = {};
    if (currDocType.fields.length !== 0 && currDocType.subtypes.length === 0) {
      //Loop Through The Fields Creating Input
      formJson = this.parseSections(currDocType.fields)
    } else {
      if (currSubDocType !== 'Select') {
        //This assumes that the current DocType doesnt have any fields
        //Need to the loop through subtypes
        currDocType.subtypes.forEach((sdt, index) => {
          //In the case where
          if (sdt.name === currSubDocType) {
            //Loop Through The Fields Create Input Fields
            formJson = this.parseSections(sdt.fields)

          }
        })
      }
    }
    return formJson
  }


  procesInputs(section) {
    return section.input.map(input => {
      if (input.active) {
        let uniqueRef = input.ref + section.ref;
        return <div key={input.ref}><label>{input.name}:</label>&nbsp;<input type="text" ref={uniqueRef} /><br /></div>
        //  return <option key={subtype.name} value={subtype.name}>{subtype.name}</option>
      }
    })
  }

  processSection(docTypeFields) {
    //Loop through the sections
    return docTypeFields.map((section, index) => {
      //Build The Section Header
      let sectionInputFields = this.procesInputs(section)
      return section =
        <div key={index}><h3>{section.name}</h3><div>{sectionInputFields}</div></div>
    })
  }

  processFormAndFields() {
    const currDocType = this.state.currentDocumentType
    const currSubDocType = this.state.currentSubDocmentType
    let docTypeFieldInputs = null
    if (currDocType.fields.length !== 0 && currDocType.subtypes.length === 0) {
      //Loop Through The Fields Creating Input
      docTypeFieldInputs = this.processSection(currDocType.fields)
    } else {
      if (currSubDocType === 'Select') {
        return this.renderSelectDisplay()
      } else {
        //This assumes that the current DocType doesnt have any fields
        //Need to the loop through subtypes
        currDocType.subtypes.forEach((sdt, index) => {
          //In the case where
          if (sdt.name === currSubDocType) {
            //Loop Through The Fields Create Input Fields
            docTypeFieldInputs = this.processSection(sdt.fields)
          }
        })
      }
    }
    return this.renderFormAndFields(docTypeFieldInputs)
  }

  renderFormAndFields(listOfInputFields) {
    return (
      <form className="form-horizontal" onSubmit={this.formSubmit.bind(this)}>
        <div>
          {this.state.currentSubDocmentType !== 'Select' ? (
            <h2>{this.state.currentDocumentType.name}: {this.state.currentSubDocmentType}</h2>
          ) : (
              <h2>{this.state.currentDocumentType.name}</h2>
            )}
          {listOfInputFields}
        </div>
        <br />
        <input className="btn btn-primary" type="submit" value="Submit" />
        <br />
      </form>
    );
  }

  renderSelectDisplay() {
    return (
      <h3>Please select a Sub Document Type to continue</h3>
    )
  }

  render() {
    const masterForm = this.processFormAndFields()
    return (
      <div>
        {masterForm}
      </div>
    );
  }

}*/

const AppFormComponent = ({match}) => (
  <div>
    <Route path={`${match.url}/:section`} component={FormSection} />
    <Route path={`${match.url}/:review`} component={FormReview} />
  </div>
)

const mapStateToProp = (state) => {
  return {
    router: state.router
  }
}

const AppForm = withRouter(
  connect(
    mapStateToProp,
    null
  )
    (AppFormComponent))

export default AppForm
