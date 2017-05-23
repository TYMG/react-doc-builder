import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'

import jsonQuery from 'json-query';
import Helpers from '../Library/Helpers'
import documentTypeData from '../../documentTypeData.json';

import { nextFormSection, submitCompletedForm, updateBackupForm } from '../actions'

const mapStateToProps = (state) => {
    return {
        form: state.form,
        completedForm: state.backUpForm,
        formNavigator: state.formNavigator,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        returnHomeFromFlow: _ => {
            dispatch(nextFormSection(-1))
        },
        completedReviewSubmitForm: completedForm => {
            dispatch(updateBackupForm(this.state.backUpForm.documentCreationForm.values))
            dispatch(submitCompletedForm(completedForm))
        }
    }
}

class FormReviewComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    /**
     * Calls the Submit Form Dispatcher which should return a promise. Once
     * that promise is fulfilled, the user should be returned to home page.
     */
    handleFormSubmit = (e) => {
        e.preventDefault() // <= THIS LINE IS TO PREVENT THE FORM VALUES FROM BEING ADDED TO THE URL

        this.props.completedReviewSubmitForm(this.props.completedForm)
        /*  let homePath = this.props.match.url
          let lastIndexOfFwdSlash = homePath.lastIndexOf('/')
          let cleanHomeHref = homePath.substring(0,lastIndexOfFwdSlash)
          const location = {
              pathname: cleanHomeHref,
              state: {}
          }
          this.props.history.replace(cleanHomeHref,{}) // <= THIS LINE IS TO PUSH THE NEW URL TO THE HISTORY SO THE ROUTE CAN UPDATE
          //this.props.nextFlowStep(formNavigationIndex)*/
    }

    trimAndCapSectionName = secName => {
        const firstLetter = secName.substr(0, 1).toLowerCase()
        const restOfString = secName.substr(1)
        const restOfStringNoSpace = restOfString.replace(/ /g, '')
        return firstLetter + restOfStringNoSpace
    }


    renderFormSectionField = (sectionName, field) => {
        var formSectionField
        var fieldValue 
        if (field.active) {
            const completedFormSection = this.props.completedForm[this.trimAndCapSectionName(sectionName)]
            if(completedFormSection !== undefined){
                fieldValue = completedFormSection[field.ref]
            }
            formSectionField = <div key={field.ref}>{field.name}:{fieldValue}</div>
        } else {
            formSectionField = <div key={field.ref}>{field.name}:</div>
        }
        return formSectionField
    }

    renderCollapsableFormSection = section => {
        const collaspableFormSection = section.input.map(field =>
            (
                this.renderFormSectionField(section.name, field)
            )
        )
        return (<div key={section.name}>
                <h3>{section.name}</h3>
                {collaspableFormSection}
                 </div>)
    }   


    renderCollapsableFormSections = url => {
        const urlArr = url.path.split('/')
        var result = jsonQuery('documentTypes[route=' + urlArr[2] + '].subTypes[name=' + urlArr[3] + '].fields', {
            data: documentTypeData
        })
        var collaspableFormSections = result.value.map(section => (
                this.renderCollapsableFormSection(section)
            )
        )
        return (<div className="margin-btm-2">{collaspableFormSections}</div>)
    }

    render() {
        const { error, handleSubmit, dispatch, match } = this.props;
        let homePath = this.props.match.url
        let lastIndexOfFwdSlash = homePath.lastIndexOf('/')
        let cleanHomeHref = homePath.substring(0, lastIndexOfFwdSlash)
        return (
            <div>
                <h1>Review YO Form!!!</h1>
                {this.renderCollapsableFormSections(match)}
                <div className="flexbox-row">
                <div className="flex-2"/>                
                <div className="flex-1">
                    {/*<Link to={cleanHomeHref}  onClick={ _ => this.props.completedReviewSubmitForm(this.props.completedForm)}>CREATE DOC</Link>*/}
                    <button className="btn" type="submit" onClick={event => this.handleFormSubmit(event)}>Create Document</button>
                </div>
                <div className="flex-1"/>
                <div className="flex-1">
                    <Link className="btn" to={cleanHomeHref} onClick={_ => this.props.returnHomeFromFlow()}>Start Over</Link>
                </div>
                <div className="flex-1"/>                
                <div className="flex-1">
                    <Link className="btn" to={'/'} onClick={_ => this.props.returnHomeFromFlow()}>Home</Link>
                </div>
                <div className="flex-2"/>
                </div>
            </div>
        )
    }
}


const FormReview = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(FormReviewComponent))


export default reduxForm({
    form: 'documentCreationForm',
    destroyOnUnmount: false
})(FormReview)


