import React from 'react';
import { render } from 'react-dom';

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux'

import reducer, { selectLocalState } from './Reducers/reducer';
import { localThunk } from 'redux-local-state'

import App from './Containers/App'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


//React-local-state
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers(
    reducer
  ), composeEnhancers(
      applyMiddleware(...middleware)
    )
)

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [routerMiddleware(history),thunk, localThunk(selectLocalState)]

render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */}
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

/*render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
    document.getElementById('root')
)*/

// render(
//   <Router>
//       <App>
//           <Route path="/" component={Home} />
//           <Route path="/document/:docType/:subDocType" component={MasterForm}/>
//       </App>
//     </Router>,
//   document.getElementById('root')
// );
