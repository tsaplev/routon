import React from 'react';
import Geosuggest from 'react-geosuggest';
import './index.css';

function LocationInput(props: any) {
  return <Geosuggest {...props} />;
}

export default LocationInput;
