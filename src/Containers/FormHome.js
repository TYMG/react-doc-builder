import React , { Component } from'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { nextFormSection , clearForm } from '../actions'


const mapStateToProps = (state) => {
    return {
        form: state.form,
        formNavigator: 0
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    beginFormFlow: _ => {
      dispatch(nextFormSection(1))
    },
    clearForm: _ => {
        dispatch(clearForm())
    }
  }
}

class FormHomeComponent extends Component {
    constructor(props){
        super(props)
    }

    componentWillMount() {
        this.props.clearForm()
    }
    

    buildBeginLink = _ => {  

    let firstSection = this.props.documentTypeSections[0].name
    const firstSectionName = firstSection.replace(/ /g,'')
    let href = this.props.match.url + '/'+ firstSectionName
    let linkText = "the " + firstSection + " link"
    return <Link to={href} onClick={this.props.beginFormFlow}>{linkText}</Link>
  }

    buildDocTypeSectionList = _ => {
     return this.props.documentTypeSections.map( section => (
            <li key={section.name}>{section.name}</li>
        ))
    }

    render = _ => 
    {
        console.log(this.props.documentTypeSections)
        const { match, location, history,beginFormFlow } = this.props
        let docTypeSectionList = this.buildDocTypeSectionList
    return (    <div>
            <h2> Form Home </h2>
            <div>
                <h3>This is the Start page for the Form Builder!!! </h3>
            </div>
            <h4>Below are the sections the have to be completed</h4>
            <div>
                <ol>
                {this.buildDocTypeSectionList()}
                </ol>
            </div>
            <div>
                Please click {this.buildBeginLink()} to begin creating your Document
            </div>
            <div>
                Or click <Link to='/'>Home</Link> to return back to the home page.
            </div>
        </div>
    )}
}

const FormHome = withRouter(connect (
    mapStateToProps,
    mapDispatchToProps
)(FormHomeComponent))

export default FormHome
