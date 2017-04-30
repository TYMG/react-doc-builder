import React from'react'
import { Container, Header } from 'semantic-ui-react'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        router:state.router
    }
}

const FormReviewComponent = ({router}) => (
    <div>
        Review YO Form!!!
    </div>
)

const FormReview = connect (
    mapStateToProps,
    null
)(FormReviewComponent)

export default FormReview
