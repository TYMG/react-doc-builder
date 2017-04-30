import React from 'react'
import AppHeader from '../Components/AppHeader'
import AppFooter from '../Components/AppFooter'
import AppForm from './AppForm'
import AppHome from './AppHome'

import { Container, Header } from 'semantic-ui-react'

import { connect } from 'react-redux'

import { withRouter, Route } from 'react-router-dom'

import '../css/App.css'

const mapStateToProps = (state) => {
    return {
        router: state.router
    }
}

const AppComponent = ({match}) => (
    <div>
        <Container fluid>
            <AppHeader />
            <div>
                <Route exact path="/" component={AppHome} />
                <Route path={`${match.url}/:doc/:subDoc`} component={AppForm}/>
            </div>
            <AppFooter />
        </Container>
    </div>
)

const App = withRouter(
    connect(
        mapStateToProps,
        null
    )(AppComponent)
)
export default App


