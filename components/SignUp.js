import React, { Component } from 'react';
import { TextInput,  } from "react-native-paper";
import { View,Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  buttonContainer: {
    marginTop: 8,
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      pass: "",
      passConfirm: ""
    };
  }

  handleFirstNameInput = (firstName) => { 
    this.setState({ email: email });
  };

  handleLastNameInput = (lastName) => {
    this.setState({ password: password });
  };

  handleEmailInput = (email) => { 
    this.setState({ email: email });
  };

  handlePasswordInput = (pass) => {
    this.setState({ password: password });
  };

  handlePasswordConfirmInput = (passConfirm) => {
    this.setState({ password: password });
  };

  render() {

    return (
      <View>
        <Text>Sign Up</Text>
        <TextInput
          mode = "outlined"
          label="First Name..."
          onChangeText={this.handleFirstNameInput}
          value={this.state.firstName}
        />
        <TextInput
          mode = "outlined"
          label="Last Name..."
          onChangeText={this.handleLastNameInput}
          value={this.state.password}
        />
        <TextInput
          mode = "outlined"
          label="Email..."
          onChangeText={this.handleEmailInput}
          value={this.state.email}
        />
        <TextInput
          mode = "outlined"
          label="Password..."
          onChangeText={this.handlePasswordInput}
          value={this.state.pass}
        />
        <TextInput
          mode = "outlined"
          label="Confirm Password..."
          onChangeText={this.handlePasswordConfirmInput}
          value={this.state.passConfirm}
        />
      </View>
    );
  }
}

export default SignUp
