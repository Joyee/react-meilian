import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import 'lib-flexible'
import './index.css';
import App from './App'
import store from './store'

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
