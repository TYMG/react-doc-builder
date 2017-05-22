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

class ReferenceForm extends Component {
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

    buildBeginLink = (section) => {

        let firstSection = this.props.documentTypeSections[0].name
        let href = this.props.match.url + '/' + firstSection
        let linkText = "the " + firstSection + " link"
        return <Link to={href} onClick={this.props.beginFormFlow}>{linkText}</Link>
    }

    testInputFields = _ => {
        let inputFields = this.props.section.input.filter((field) => {
            return field.active
        })
        return inputFields.map(field => (
            <li key={field.ref}>{field.name}</li>
        ))
    }

    calculateBackLink = _ => {
        let docTypeSections = this.props.docTypeSections
        let hrefParams = this.props.match.params
        let formNavigationIndex = this.props.formNavigator
        let homeHref = '/Document/' + hrefParams.doc + '/' + hrefParams.subDoc
        if (formNavigationIndex <= 0) // Index out bounds
        {
            return <Link to={homeHref} onClick={ event=> this.props.returnHomeFromFlow(formNavigationIndex, event)}>Home</Link>
        } else {
            // Calculate the back link
            let prevSection = docTypeSections[formNavigationIndex - 1]
            const prevSectionName = prevSection.name.replace(/ /g, '')
            return <Link to={homeHref + '/' + prevSectionName} onClick={ event => this.props.backOneFlowStep(formNavigationIndex,event)}>{prevSection.name}</Link>
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
            return <button type="submit">Review</button>
                
    } else {
            // Calculate the back link
            let nextSection = docTypeSections[formNavigationIndex + 1]
            const nextSectionName = nextSection.name.replace(/ /g, '')
            // return <Link to={nextStepHref +  nextSectionName} onClick={ event => this.submitSectionForm(formNavigationIndex,event)}>{nextSection.name}</Link>
            return <button type="submit">{nextSection.name}</button>
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
            const secName = this.props.docTypeSections[this.props.formNavigator].name
            const firstLetter = secName.substr(0,1).toLowerCase()
            const restOfString = secName.substr(1)
            const restOfStringNoSpace = restOfString.replace(/ /g, '') 
            return firstLetter+restOfStringNoSpace
        }

        renderInputFields = section => (
            section.input.map(field =>
                (<Field key={field.ref} name={field.ref} type="text" component={FormField} label={field.name} />)
            )
        )

        createIAMARadioButton = _ => {
            return (
                {"label":"IAMA",
                 "field":"iama",
                 "option1":"US Citizen",
                 "value1":"US",
                 "option2":"Foreign Born",
                 "value2":"Foreign Born"
                }
            )
        }
        /**
         * Split the Input List
         * 
         * List 1: IAMA, Name, DOB, SSN, Citzenship Status, Alien Registration, Drivers License State, Drivers License Number
         * 
         * List 2: Address Line 1, Address Line 2, City, State, Zipcode, Phone Number
         * 
         * List 3: Mailing Address Line 1, Mailing Address Line 2, Mailing Address City, Mailing Address State, Mailing Address Zipcode
         * 
         */
        render() {
            const { match, section, docTypeSections, form } = this.props
            const inputFieldsList = this.testInputFields()
             const formNavigationIndex = this.props.formNavigator

            return (
                <div className="ref___form-main flexbox-column flex-1">
                    <h3>Input Fields</h3>
                    <div className="ref__form flex-2">
                        <form name="sectionForm" onSubmit={ e => this.handleSubmit(e)}>
                            <FormSection name={this.calculateFormSectionName()}>
                               <div className="reference1__form-section-1">
                                   <Field key="name" name="name" type="text" component={FormField} label="Name" />
                                   <Field key="addressLine1" name="addressLine1" type="text" component={FormField} label="Address Line 1" />
                                   <Field key="addressLine2" name="addressLine2" type="text" component={FormField} label="Address Line 2" />
                                   <Field key="city" name="city" type="text" component={FormField} label="City" />
                                   <Field key="state" name="state" type="text" component={FormField} label="State" />
                                   <Field key="zipCode" name="zipCode" type="text" component={FormField} label="Zip Code" />
                                   <Field key="phoneNumber" name="phoneNumber" type="text" component={FormField} label="Phone Number" />
                                </div>
                            </FormSection>
                    <div className="flexbox-row flex-1">
                        <div className="flex-1">
                            {this.calculateBackLink()}
                        </div>
                        <div className="flex-1">
                            {this.renderForwardLink()}
                        </div>
                        <div className="flex-3"/>
                    </div>       
                        </form>
                    </div>
                </div>
            )
        }
    }

    const Reference = withRouter(connect(
        mapStateToProps,
        mapDispatchToProps
    )(ReferenceForm))


    export default reduxForm({
        form: 'documentCreationForm',
        destroyOnUnmount: false 
    })(Reference)


