import React, {Component} from 'react';
import {TextInput, HelperText, Button, Appbar, DefaultTheme} from 'react-native-paper';
import {ScrollView, Text, StyleSheet, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  login = async () => {
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          ToastAndroid.show('Invalid Email or Password!', ToastAndroid.SHORT);
        } else {
          throw 'Something went wrong';
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
        await AsyncStorage.setItem('@session_token', responseJson.token);
        await AsyncStorage.setItem('@id', responseJson.id.toString());
        this.props.navigation.navigate('Profile');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {email, password} = this.state;

    const navigation = this.props.navigation;

    const validateEmail = () => {
      return !this.state.email.includes('@');
    };

    return (
      <ScrollView
        contentContainerStyle={{flex: 1, justifyContent: 'center'}}
        style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.formField}
          label="Email"
          onChangeText={this.handleEmailInput}
          value={this.state.email}
        />
        <HelperText style={styles.error} type="error" visible={validateEmail()}>
        Email address is invalid!
        </HelperText>
        <TextInput
          style={styles.formField}
          label="Password"
          onChangeText={this.handlePasswordInput}
          value={this.state.password}
          secureTextEntry={true}
        />
        <Button
          style={styles.buttonContainer}
          mode="contained"
          accessibilityLabel="Login"
          onPress={() => this.login()}>
          Login
        </Button>
        <Button
          mode="text"
          accessibilityLabel="Sign Up"
          onPress={() => navigation.navigate('SignUp')}>
          Don't have an account? Sign up
        </Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
    fontSize: 12,
    color: '#6F2A3B'
  },

  buttonContainer: {
    marginTop: 8,
    marginLeft: 120,
    marginRight: 120,
  },
});

export default Login;
