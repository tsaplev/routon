import React from 'react';
import './App.css';
import { Map } from './components/Route/Map';
import { List } from './components/Route/List';
import { Form } from './components/Route/Form';

function App() {
  return (
    <div className="layout">
      <button onClick={() => { throw new Error("Бесконечность не предел!!")}}>Сломаться!</button>
      <Map />
      <List />
      <Form />
    </div>
  );
}

export default App;
