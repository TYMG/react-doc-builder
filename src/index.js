import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import changeDocumentTypes from './reducers'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import App from './Components/App';

import documentTypeData from '../documentTypeData.json';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

let store = createStore(changeDocumentTypes,{"documentTypes":documentTypes})

let documentTypes = parseDocumentTypeData()

function parseDocumentTypeData(){
  let docTypes = documentTypeData.documentTypes.map( docType =>{
    return docType;
  })
  return docTypes
}

render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
    document.getElementById('root')
)

// render(
//   <Router>
//       <App>
//           <Route path="/" component={Home} />
//           <Route path="/document/:docType/:subDocType" component={MasterForm}/>
//       </App>
//     </Router>,
//   document.getElementById('root')
// );
