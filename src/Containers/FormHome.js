import React , { Component } from'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'


const mapStateToProps = (state) => {
    return {
        form: state.form
    }
}

class FormHomeComponent extends Component {
    constructor(props){
        super(props)
    }

    render = _ => 
    (    <div>
            <h2> Form Home </h2>
            <div>
                <h3>This is the home page for Documentation </h3>
            </div>
        </div>
    )
}

const FormHome = withRouter(connect (
    mapStateToProps,
    null
)(FormHomeComponent))

export default FormHome
