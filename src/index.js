import React from 'react';
import { render } from 'react-dom';

import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory'

import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux'

import RootReducer from './Reducers/RootReducer';
import { localThunk } from 'redux-local-state'
import storeSynchronize from 'redux-localstore'



import App from './Routes/App'

import './css/App.css'
import './css/Form.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


//React-local-state
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    RootReducer
  , composeEnhancers(
      applyMiddleware(thunk),
      window.devToolsExtension && process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f
    )
)

//Subscribe Redux Store and replicate to localStorage, so user will can refresh page and keep the App state
storeSynchronize(store)

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [routerMiddleware(history)]

//Add back the local state thunks if needed
//const middleware = [routerMiddleware(history),thunk, localThunk(selectLocalState)]



render(
  <App store={store}/>,
  document.getElementById('root')
)


/*<Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App} />
      </div>
    </ConnectedRouter>
  </Provider>

  */
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
