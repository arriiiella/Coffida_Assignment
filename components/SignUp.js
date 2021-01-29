/* eslint-disable */
import React, {Component} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {View, Text, StyleSheet, Alert} from 'react-native';
import AppBar from './AppBar';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    };
  }

  addUser() {
    const to_send = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
    };

    return fetch('http://10.0.2.2:3333/api/1.0.0/user', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(to_send),
    })
      .then((response) => {
        Alert.alert('Sign Up Complete!!');
        this.getData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          mode="outlined"
          label="First Name..."
          onChangeText={(first_name) => this.setState({first_name})}
          value={this.state.first_name}
        />
        <TextInput
          mode="outlined"
          label="Last Name..."
          onChangeText={(last_name) => this.setState({last_name})}
          value={this.state.lastName}
        />
        <TextInput
          mode="outlined"
          label="Email..."
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          mode="outlined"
          label="Password..."
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <Button
          style={styles.buttonContainer}
          mode="contained"
          accessibilityLabel="Sign Up"
          onPress={() => this.addUser()}>
          Sign Up
        </Button>
        <Text style={styles.signUp}>Already have an account? </Text>
        <Button
          mode="text"
          accessibilityLabel="Login"
          onPress={() => navigation.navigate('Login')}>
          Login
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

export default SignUp;
