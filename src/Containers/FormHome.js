import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { nextFormSection, clearForm } from '../actions'


const mapStateToProps = (state) => {
    return {
        form: state.form,
        formNavigator: 0
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        beginFormFlow: _ => {
            dispatch(nextFormSection(0))
        },
        jumpToSection: index => {
            dispatch(nextFormSection(index))
        },
        clearForm: _ => {
            dispatch(clearForm())
        }
    }
}

class FormHomeComponent extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.clearForm()
    }


    buildBeginLink = _ => {

        let firstSection = this.props.documentTypeSections[0].name
        const firstSectionName = firstSection.replace(/ /g, '')
        let href = this.props.match.url + '/' + firstSectionName
        let linkText = "the " + firstSection + " link"
        return <Link to={href} onClick={this.props.beginFormFlow}>Link</Link>
    }

    buildDocTypeSectionList = _ => {
        return this.props.documentTypeSections.map((section, index) => {
            const sectionNameUrl = section.name.replace(/ /g, '')
            return (
                <li key={index}>
                    <Link to={`${this.props.match.url}/${sectionNameUrl}`} onClick={_ => this.props.jumpToSection(index)}>{section.name}</Link>
                </li>
            )
        })
    }



    /*testFormStepLink = (match) => {
      const docTypePath = this.props.match.path
      let documentFields = locateDocumentFields(this.props.documentTypes, this.props.match.params)
      return (
        documentFields.map(section => {
          const sectionName = section.name.replace(/ /g, '')
          return (
            <li key={section.ref}>
              <Link to={`${match.url}/${sectionName}`}>{section.name}</Link>
            </li>
          )
        }
        )
      )
    }*/

    render = _ => {
        console.log(this.props.documentTypeSections)
        const { match, location, history, beginFormFlow, docTypeSelection } = this.props
        let docTypeSectionList = this.buildDocTypeSectionList
        return (
            <div className="form__home-main-content">
                <div className="form__home-title">
                    <h2>  {docTypeSelection.subDocType !== undefined ?
                        (docTypeSelection.docType + ': ' + docTypeSelection.subDocType)
                        :
                        (docTypeSelection.docType)
                    } </h2>
                </div>
                <div className="form__home-docType-sections">
                    <div className="home-docType-sections">
                        <div>
                            <h2>Below are the sections the have to be completed</h2>
                        </div>
                        <div className="flex-2">
                            <ol>
                                {this.buildDocTypeSectionList()}
                            </ol>
                        </div>
                        <div className="flex-1">
                            <div>
                                <p>Please click the {this.buildBeginLink()} to begin creating your Document</p>
                            </div>
                            <div className="form__home-return-home">
                                <p>Or click <Link to='/'>Home</Link> to return back to the home page.</p>
                            </div>
                        </div>
                    </div>
                    <div className="home-docType-preview">
                        <h2 className="centered">Document Images</h2>
                        <div className="docType-preview flex-1">Image</div>
                    </div>
                </div>
            </div>
        )
    }
}

const FormHome = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(FormHomeComponent))

export default FormHome
