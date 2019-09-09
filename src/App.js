import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import './css/Main.css';
import Form from './components/Form.js';
import reducer from './reducers/reducer';

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <Form />
    </Provider>
    );
  };
}

export default App;
