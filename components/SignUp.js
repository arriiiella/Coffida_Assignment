import React, {Component} from 'react';
import {TextInput, HelperText, Button} from 'react-native-paper';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
  },

  title: {
    paddingVertical: 8,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },

  buttonContainer: {
    marginTop: 24,
    marginLeft: 120,
    marginRight: 120,
  },

  signUp: {
    fontSize: 16,
    marginTop: 16,
    marginLeft: 16,
    display: 'flex',
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      pass: '',
      passConfirm: '',
    };
  }

  handleFirstNameInput = (firstName) => {
    this.setState({email: email});
  };

  handleLastNameInput = (lastName) => {
    this.setState({password: password});
  };

  handleEmailInput = (email) => {
    this.setState({email: email});
  };

  handlePasswordInput = (pass) => {
    this.setState({pass: pass});
  };

  render() {
    const {firstName, lastName, email, pass, passConfirm} = this.state;

    const emailValidate = () => {
      return !this.state.email.includes('@');
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          mode="outlined"
          label="First Name..."
          onChangeText={this.handleFirstNameInput}
          value={this.state.firstName}
        />
        <TextInput
          mode="outlined"
          label="Last Name..."
          onChangeText={this.handleLastNameInput}
          value={this.state.password}
        />
        <TextInput
          mode="outlined"
          label="Email..."
          onChangeText={this.handleEmailInput}
          value={this.state.email}
        />
        <TextInput
          mode="outlined"
          label="Password..."
          onChangeText={this.handlePasswordInput}
          value={this.state.pass}
        />
        <Button
          style={styles.buttonContainer}
          mode="contained"
          accessibilityLabel="Sign Up">
          Sign Up
        </Button>
        <Text style={styles.signUp}>Already have an account? </Text>
        <Button mode="text" accessibilityLabel="Login">
          Login
        </Button>
      </View>
    );
  }
}

export default SignUp;
