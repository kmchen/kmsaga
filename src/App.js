import React from 'react';
import './App.css';
import A from "./A";
import B from "./B";
import store from "./redux";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Example - using redux and react-redux</h1>
        <A />
        <B />
      </div>
    </Provider>
  );
}

export default App;
