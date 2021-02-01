/* eslint-disable */
import React, {Component} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {ScrollView, Text, StyleSheet, Alert, ToastAndroid} from 'react-native';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
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
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          throw 'Failed Validation';
        } else {
          throw 'Something went wrong';
        }
        this.getData();
      })
      .then((responseJson) => {
        console.log('User created with ID: ', responseJson);
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <ScrollView
        contentContainerStyle={{flex: 1, justifyContent: 'center'}}
        style={styles.container}>
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
        <TextInput
          mode="outlined"
          label="Confirm Password..."
          onChangeText={(confirm_password) => this.setState({confirm_password})}
          value={this.state.confirm_password}
        />
        <Button
          style={styles.buttonContainer}
          mode="contained"
          accessibilityLabel="Sign Up"
          onPress={() => this.addUser()}>
          Sign Up
        </Button>
        <Button
          mode="text"
          accessibilityLabel="Login"
          onPress={() => navigation.navigate('Login')}>
          Already have an account? Login
        </Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
