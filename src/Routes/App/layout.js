import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Link, Switch} from 'react-router-dom';
import { withRouter } from 'react-router'

import Home from '../Home'
import Form from '../Form'

const mapStateToProps = (state) => {
  return {
    documentTypes: state.documentTypes
  }
}

const LayoutComponent = (props) => (
  <div className='app__layout flexbox-column'>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/Document/:doc/:subDoc"  render={() => (
            <Form />
          )} />
        {/*// <div>
        // <Route exact path="/:section" component={FormSection} />
        // <Route exact path="/:review" component={FormReview} />
        // </div>*/}
    </Switch>
  </div>
)

const Layout = withRouter(connect(
  mapStateToProps,
  null
)(LayoutComponent))

export default LayoutComponent;
