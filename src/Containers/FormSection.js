import React from'react'
import { Container, Header } from 'semantic-ui-react'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        router:state.router
    }
}

const FormSectionComponent = ({router}) => (
    <div>
        hello world!!!
    </div>
)

const FormSection = connect (
    mapStateToProps,
    null
)(FormSectionComponent)

export default FormSection


