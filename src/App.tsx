import React from 'react';
import './App.css';
import { Map } from './components/Route/Map';
import { Table } from './components/Route/Table';
import { Form } from './components/Route/Form';

function App() {
  return (
    <div className="layout">
      <Map />
      <Table />
      <Form />
    </div>
  );
}

export default App;
