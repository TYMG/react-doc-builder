import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

import { connect } from 'react-redux'

import { Route, Link, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'


import { buildDocumentTypeList, buildSubDocumentTypeList, locateDocumentFields, docTypeRoute } from '../../Library/DocumentTypeParser'

import FormHome from '../../Containers/FormHome'
import FormStep from '../../Containers/FormStep'
import FormReview from '../../Containers/FormReview'

const mapStateToProp = (state) => {
  return {
    documentTypes: state.documentTypes,
    documentType: state.documentType
  }
}

class FormComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  createFormStepRoutes = (match) => {
    const docTypePath = this.props.match.path
    let documentFields = locateDocumentFields(this.props.documentTypes, this.props.match.params)
    let filteredDocumentFields = this.filterDocTypeSections(documentFields)
    return (
      filteredDocumentFields.map(section => {
        if (this.checkForActiveFormStep(section)) {
          const sectionName = section.name.replace(/ /g, '')
          return (
            <Route exact={true} key={section.ref} path={`${match.path}/${sectionName}`} render={() => (
              <FormStep section={section} docTypeSections={filteredDocumentFields} />
            )} />
          )
        }
      })
    )
  }

  filterDocTypeSections(documentFields){
    return documentFields.filter(section => (
      this.checkForActiveFormStep(section)
    ))
  }

  checkForActiveFormStep = (section) => {
    let activeSectionForm = true
    let inputFields = section.input.filter((field) => {
      return field.active
    })
    return inputFields.length > 0
  }

  render() {
    const { match, location, history, documentTypes } = this.props
    const formStepRoutes = this.createFormStepRoutes(match)
    return (
      <div>
        <Route strict path={`${match.url}/Review`} component={FormReview} />
        <Route exact path={`${match.url}/`} render={() => (
          <FormHome documentTypeSections={locateDocumentFields(this.props.documentTypes, this.props.match.params)} />
        )} />
        {formStepRoutes}
      </div>
    )
  }
}

const Layout = withRouter(
  connect(
    mapStateToProp,
    null
  )(FormComponent))

export default Layout

/*/*
<div>
          Document Creator Form
          <div>
            <ul>
            {testFormStepLink}
            </ul>
          </div>*/