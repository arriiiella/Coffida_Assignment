import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

class SayHello extends Component {
  render() {
    return (
      <View>
        <Text>Hello {this.props.name}</Text>
      </View>
    );
  }
}

class HelloWorldApp extends Component {
  render() {
    return (
      <PaperProvider>
        <View>
          <SayHello name="Ariella" />
        </View>
      </PaperProvider>
    );
  }
}

export default HelloWorldApp;
