import React, { Component } from 'react';
import { Text, TextInput, View } from "react-native-paper";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  /* eslint-disable-line null */
  handleEmailInput = (email) => {
    this.setState({ email: email });
  };

  handlePasswordInput = (password) => {
    this.setState({ password: password });
  };

  render() {
    return (
      <View>
        <Text>Login</Text>
        <TextInput
          placeholder="email..."
          onChangeText={this.handleEmailInput}
          value={this.state.email}
        />
        <TextInput
          placeholder="password..."
          onChangeText={this.handlePasswordInput}
          value={this.state.password}
        />
      </View>
    );
  }
}

export default Login;
