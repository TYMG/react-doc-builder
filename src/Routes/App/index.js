import React from 'react';
import { Provider } from 'react-redux';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Layout from './layout';

import AppHeader from '../../Components/AppHeader'
import AppFooter from '../../Components/AppFooter'

const supportsHistory = 'pushState' in window.history;

const App = props => (
      <Provider store={props.store}>
        <BrowserRouter forceRefresh={false} keyLength={12}>
          <div className="app__main">
            <AppHeader/>
            <div className="app__main-content flexbox-column">
              <Layout/>
            </div>
            <AppFooter/>
          </div>
        </BrowserRouter>
      </Provider>
);

export default App;
