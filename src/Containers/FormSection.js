import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { calculateLinksInFlow } from '../Library/DocumentTypeParser'
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

class SectionComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
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

    render() {
        const { match, section } = this.props
        const inputFieldsList = this.testInputFields()
        const calculateBackLink = this.calculateBackLink()
        return (
            <div>
                <h3>Input Fields</h3>
                <ol>
                    {inputFieldsList}
                </ol>
                <div>
                    <div>
                        {this.calculateBackLink()}
                    </div>
                    <div>
                        {this.calculateForwardLink()}
                    </div>
                </div>
            </div>
        )
    }
}

const FormSection = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SectionComponent))

export default FormSection


