import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { nextFormSection } from '../actions'


const mapStateToProps = (state) => {
    return {
        formNavigator: state.formNavigator,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        returnHomeFromFlow: _ => {
            dispatch(nextFormSection(-1))
        }
    }
}

class FormReviewComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let homePath = this.props.match.url
        let lastIndexOfFwdSlash = homePath.lastIndexOf('/')
        let cleanHomeHref = homePath.substring(0,lastIndexOfFwdSlash)
        return (
            <div>
                Review YO Form!!!
        <div>
                    <Link to={cleanHomeHref} onClick={ _ => this.props.returnHomeFromFlow()}>CREATE DOC</Link>
                </div>
                <div>
                    <Link to={cleanHomeHref} onClick={ _ => this.props.returnHomeFromFlow()}>Start Over</Link>
                </div>
                <div>
                    <Link to={'/'} onClick={ _ => this.props.returnHomeFromFlow()}>Home</Link>
                </div>
            </div>
        )
    }
}


const FormReview = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(FormReviewComponent))

export default FormReview
