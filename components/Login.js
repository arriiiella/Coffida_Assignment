import React, {Component} from 'react';
import {TextInput, Button, Appbar, DefaultTheme} from 'react-native-paper';
import {View, Text, StyleSheet} from 'react-native';
import AppBar from './AppBar';

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

    const navigation = this.props.navigation;

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
        <Text style={styles.signUp}> Don't have an account?</Text>
        <Button
          mode="text"
          accessibilityLabel="Sign Up"
          onPress={() => navigation.navigate('SignUp')}>
          Sign up
        </Button>
      </View>
    );
  }
}

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

export default Login;
