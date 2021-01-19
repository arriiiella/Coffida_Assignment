import React, { Component } from 'react';
import { Text, View } from 'react-native';

import ToDo from './components/ToDo';

class HelloWorldApp extends Component {
  render(){
    return (
        <View>
          <ToDo />
        </View>
    );
  }
}

export default HelloWorldApp;
