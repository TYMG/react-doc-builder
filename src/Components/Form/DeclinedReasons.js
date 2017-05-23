import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Field, FormSection, reduxForm } from 'redux-form';

import { Link } from 'react-router-dom'

import { calculateLinksInFlow } from '../../Library/DocumentTypeParser'
import { nextFormSection, updateBackupForm } from '../../actions'

import FormField from './Fields/FormField'
import RadioButton from './Fields/RadioButton'


const mapStateToProps = (state) => {
    return {
        form: state.form,
        formNavigator: state.formNavigator,
        documentTypes: state.documentTypes,
        backUpForm: state.backUpForm
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
        },
        saveFormDraft: values => {
            dispatch(updateBackupForm(values))
        }
    }
}

class DeclinedReasonComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    handleSubmit = (e) => {
        e.preventDefault() // <= THIS LINE IS TO PREVENT THE FORM VALUES FROM BEING ADDED TO THE URL
        this.props.saveFormDraft(this.props.form.documentCreationForm.values)
        this.props.nextFlowStep(this.props.formNavigator)
        const path = this.calculateFormActionLink()
        const location = {
            pathname: path,
            state: {}
        }
        this.props.history.replace(path,{}) // <= THIS LINE IS TO PUSH THE NEW URL TO THE HISTORY SO THE ROUTE CAN UPDATE
        //this.props.nextFlowStep(formNavigationIndex)
    }

    calculateBackLink = _ => {
        let docTypeSections = this.props.docTypeSections
        let hrefParams = this.props.match.params
        let formNavigationIndex = this.props.formNavigator
        let homeHref = '/Document/' + hrefParams.doc + '/' + hrefParams.subDoc
        if (formNavigationIndex <= 0) // Index out bounds
        {
            return <Link className="btn" to={homeHref} onClick={ event=> this.props.returnHomeFromFlow(formNavigationIndex, event)}>Home</Link>
        } else {
            // Calculate the back link
            let prevSection = docTypeSections[formNavigationIndex - 1]
            const prevSectionName = prevSection.name.replace(/ /g, '')
            return <Link className="btn" to={homeHref + '/' + prevSectionName} onClick={ event => this.props.backOneFlowStep(formNavigationIndex,event)}>{prevSection.name}</Link>
        }
    }

    renderForwardLink = _ => {
        let docTypeSections = this.props.docTypeSections
        let hrefParams = this.props.match.params
        let formNavigationIndex = this.props.formNavigator
        let nextStepHref = '/Document/' + hrefParams.doc + '/' + hrefParams.subDoc + '/'
        if (formNavigationIndex + 1 >= docTypeSections.length) // Index out bounds
        {
            //return <Link to={nextStepHref + 'Review'} onClick={ event => this.props.nextFlowStep(formNavigationIndex,event)}>Review</Link>
            return <button className="btn" type="submit">Review</button>
                
    } else {
            // Calculate the back link
            let nextSection = docTypeSections[formNavigationIndex + 1]
            const nextSectionName = nextSection.name.replace(/ /g, '')
            // return <Link to={nextStepHref +  nextSectionName} onClick={ event => this.submitSectionForm(formNavigationIndex,event)}>{nextSection.name}</Link>
            return <button className="btn" type="submit">{nextSection.name}</button>
        }
    }

        calculateFormActionLink = _ => {
            let docTypeSections = this.props.docTypeSections
            let hrefParams = this.props.match.params
            let formNavigationIndex = this.props.formNavigator
            let nextStepHref = '/Document/' + hrefParams.doc + '/' + hrefParams.subDoc + '/'
            if (formNavigationIndex + 1 >= docTypeSections.length) // Index out bounds
            {
                return nextStepHref +  'Review'
            } else {
                // Calculate the back link
                let nextSection = docTypeSections[formNavigationIndex + 1]
                const nextSectionName = nextSection.name.replace(/ /g, '')
                return nextStepHref +  nextSectionName;
            }
        }

        /**
         * THIS WILL CREATE THE SECTION NAME FOR THE FORM STEP
         */
        calculateFormSectionName = _ => {
            const secName = this.props.section.ref
            const firstLetter = secName.substr(0,1).toLowerCase()
            const restOfString = secName.substr(1)
            const restOfStringNoSpace = restOfString.replace(/ /g, '') 
            return firstLetter+restOfStringNoSpace
        }

        render() {
            const { match, section, docTypeSections, form } = this.props
             const formNavigationIndex = this.props.formNavigator

            return (
                <div className="declinedReasons__form-main">
                    <h1 className="form-header">{this.props.section.name}</h1>
                     <hr/>
                        <form name="sectionForm" onSubmit={ e => this.handleSubmit(e)}>
                            <FormSection name={this.calculateFormSectionName()}>
                               <div className="reference1__form-section-1 margin-btm-2">
                                   <Field key="name" name="name" type="text" component={FormField} label="Name" />
                                   <Field key="dob" name="dob" type="text" component={FormField} label="DOB" />
                                   <Field key="ssn" name="ssn" type="text" component={FormField} label="SSN" />
                                   <Field key="addressLine1" name="addressLine1" type="text" component={FormField} label="Address Line 1" />
                                   <Field key="addressLine2" name="addressLine2" type="text" component={FormField} label="Address Line 2" />
                                   <Field key="city" name="city" type="text" component={FormField} label="City" />
                                   <Field key="state" name="state" type="text" component={FormField} label="State" />
                                   <Field key="zipCode" name="zipCode" type="text" component={FormField} label="Zip Code" />
                                   <Field key="phoneNumber" name="phoneNumber" type="text" component={FormField} label="Phone Number" />
                                </div>
                            </FormSection>
                            <div className="flexbox-row flex-1">
                                  <div className="flex-2"/>
                                <div className="flex-1">
                                    {this.calculateBackLink()}
                                </div>
                                <div className="flex-1"/>
                                <div className="flex-1">
                                    {this.renderForwardLink()}
                                </div>
                                 <div className="flex-2"/>
                            </div>       
                        </form>
                    </div>
            )
        }
    }

    const DeclinedReasons = withRouter(connect(
        mapStateToProps,
        mapDispatchToProps
    )(DeclinedReasonComponent))


    export default reduxForm({
        form: 'documentCreationForm',
        destroyOnUnmount: false 
    })(DeclinedReasons)


