import React from 'react';
import { render } from 'react-dom';
import { Router, Route, BrowserRouter } from 'react-router-dom';
import AppContainer from './components/app-container';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/combine-reducers';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
