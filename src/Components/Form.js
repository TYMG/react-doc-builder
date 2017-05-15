/*import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

import Validator from '../Library/Validator'

import FormField from './FormField'

import { nextFormSection } from '../actions'


const mapStateToProps = (state) => {
    return {
        form: state.form,
        formNavigator: state.formNavigator,
        documentTypes: state.documentTypes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        returnHomeFromFlow: _ => {
            dispatch(nextFormSection(-1))
        },
        backOneFlowStep: index => {
            dispatch(nextFormSection(index - 1))
        },
        nextFlowStep: index => {
            dispatch(nextFormSection(index + 1))
        }
    }
}


class FormComponent extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    calculateBackLink = _ => {
        let docTypeSections = this.props.docTypeSections
        let hrefParams = this.props.match.params
        let formNavigationIndex = this.props.formNavigator
        let homeHref = '/Document/' + hrefParams.doc + '/' + hrefParams.subDoc
        if (formNavigationIndex - 1 <= 0) // Index out bounds
        {
            return <Link to={homeHref} onClick={ _ => this.props.returnHomeFromFlow(formNavigationIndex)}>Home</Link>
        } else {
            // Calculate the back link
            let prevSection = docTypeSections[formNavigationIndex - 1]
            const prevSectionName = prevSection.name.replace(/ /g, '')
            return <Link to={homeHref +'/' + prevSectionName} onClick={ _ => this.props.backOneFlowStep(formNavigationIndex)}>{prevSection.name}</Link>

        }
    }

    calculateForwardLink = _ => {
        let docTypeSections = this.props.docTypeSections
        let hrefParams = this.props.match.params
        let formNavigationIndex = this.props.formNavigator
        let nextStepHref = '/Document/' + hrefParams.doc + '/' + hrefParams.subDoc + '/'
        if (formNavigationIndex+1 >= docTypeSections.length) // Index out bounds
        {
            return <Link to={nextStepHref + 'Review'} onClick={ _ => this.props.nextFlowStep(formNavigationIndex)}>Review</Link>
        } else {
            // Calculate the back link
            let nextSection = docTypeSections[formNavigationIndex + 1]
            const nextSectionName = nextSection.name.replace(/ /g, '')
            return <Link to={nextStepHref + nextSectionName} onClick={ _ => this.props.nextFlowStep(formNavigationIndex)}>{nextSection.name}</Link>

        }
    }

    renderInputFields = section => {
        let inputFields = undefined
        section.input.map(field => {
            <div>
                <Field name={field.ref} type="text" component={FormField} label={field.input}/>
            </div>
        })
    }


    render(){
        const {section, match, allSections} = this.props
        return (
            <form >
                {this.renderInputFields(section)}
                 <div>
                    <div>
                        <button type="submit" className="next">Next</button>
                    </div>
                    <div>
                        <button type="submit" className="next">Next</button>
                    </div>
                </div>
            </form>
        )
    }   
}

export default reduxForm({
  form: 'documentCreationForm',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  Validator
})(FormComponent)*/