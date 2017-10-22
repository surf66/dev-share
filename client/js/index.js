import React from 'react';
import { render } from 'react-dom';
import AppContainer from './components/app-container';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/combine-reducers';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);
