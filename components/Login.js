import React, { Component } from 'react';
import { TextInput, Button  } from "react-native-paper";
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },

  title: {
    paddingVertical: 8,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },

  formField: {
    marginBottom: 8
  },

  buttonContainer: {
    marginTop: 8,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleEmailInput = (email) => { 
    this.setState({ email: email });
  };

  handlePasswordInput = (password) => {
    this.setState({ password: password });
  };

  render() {
    const { email, password} = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput style={styles.formField}
          label="Email"
          onChangeText={this.handleEmailInput}
          value={this.state.email}
        />
        <TextInput style={styles.formField}
          label="Password"
          onChangeText={this.handlePasswordInput}
          value={this.state.password}
        />
        <Button  mode="contained"> Login </Button>
      </View>
    );
  }
}

export default Login
