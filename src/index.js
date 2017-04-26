import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { browserHistory } from 'react-router'
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Components/Home'
import MasterForm from './Components/MasterForm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

ReactDOM.render(
  <Router>
      <App>
          <Route path="/" component={Home} />
          <Route path="/document/:docType/:subDocType" component={MasterForm}/>
      </App>
    </Router>,
  document.getElementById('root')
);
