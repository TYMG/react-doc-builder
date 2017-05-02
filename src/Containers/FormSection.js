import React , { Component } from'react'

import { connect } from 'react-redux'

import { withRouter } from 'react-router'


const mapStateToProps = (state) => {
    return {
        form: state.form
    }
}

class SectionComponent extends Component {
   constructor(props) {
    super(props)
    this.state = {

    }
  }

testInputFields = _ => {
    let inputFields = this.props.inputFields.filter((field) =>{
        return field.active
    })
    return inputFields.map(field => (
        <li key={field.ref}>{field.name}</li>
    ))
}

  render() {
    const { match, inputFields } = this.props
    const inputFieldsList = this.testInputFields()
    return (
        <div>
            <h3>Input Fields</h3>
            <ol>
                 {inputFieldsList}
            </ol>
        </div>
    )
  }
}

const FormSection = withRouter(connect (
    mapStateToProps,
    null
)(SectionComponent))

export default FormSection


