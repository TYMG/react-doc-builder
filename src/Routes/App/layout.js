import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Switch} from 'react-router-dom';
import Route from '../../Utils/Route'

import Home from '../Home'
import Form from '../Form'
import FormSection from '../../Containers/FormSection'
import FormReview from '../../Containers/FormReview'


const mapStateToProps = (state) => {
  return {
    documentTypes: state.documentTypes
  }
}

const LayoutComponent = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/Document" component={Form}>
        {/*// <div>
        // <Route exact path="/:section" component={FormSection} />
        // <Route exact path="/:review" component={FormReview} />
        // </div>*/}
      </Route>
    </Switch>
  </div>
)

const Layout = connect(
  mapStateToProps,
  null
)(LayoutComponent)

export default LayoutComponent;
