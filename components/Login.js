import React, {Component} from 'react';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
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

  formField: {
    marginBottom: 8,
  },

  error: {
    paddingTop: 0,
    marginBottom: 16,
    marginLeft: -8,
    fontSize: 16,
  },

  buttonContainer: {
    marginTop: 8,
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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailInput = (email) => {
    this.setState({email: email});
  };

  handlePasswordInput = (password) => {
    this.setState({password: password});
  };

  render() {
    const {email, password} = this.state;

    const hasErrors = () => {
      return !this.state.email.includes('@');
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.formField}
          label="Email"
          onChangeText={this.handleEmailInput}
          value={this.state.email}
        />
        {/* <HelperText style={styles.error} type="error" visible={hasErrors()}>
          Email address is invalid!
        </HelperText> */}
        <TextInput
          style={styles.formField}
          label="Password"
          onChangeText={this.handlePasswordInput}
          value={this.state.password}
        />
        <Button
          style={styles.buttonContainer}
          mode="contained"
          accessibilityLabel="Login">
          Login
        </Button>
        <View>
          <Text style={styles.signUp}>Don't have an account? </Text>
          <Button mode="text" accessibilityLabel="Sign Up">
            Sign up
          </Button>
        </View>
      </View>
    );
  }
}

export default Login;
