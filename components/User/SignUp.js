import React, { Component } from 'react'
import { TextInput, Button, HelperText, Text } from 'react-native-paper'
import { ScrollView, StyleSheet, ToastAndroid } from 'react-native'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  addUser () {
    const toSend = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }

    return fetch('http://10.0.2.2:3333/api/1.0.0/user', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toSend)
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json()
        } else if (response.status === 400) {
          ToastAndroid.show('Failed Validation', ToastAndroid.SHORT)
        } else {
          ToastAndroid.show('Something went wrong', ToastAndroid.SHORT)
        }
      })
      .then((responseJson) => {
        console.log('User created with ID: ', responseJson)
        this.props.navigation.navigate('Login')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    const navigation = this.props.navigation

    const validateEmail = () => {
      return !this.state.email.includes('@')
    }

    const validatePassword = () => {
      return (this.state.password !== this.state.confirmPassword)
    }
    return (
      <ScrollView
        contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
        style={styles.container}
      >
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          mode='outlined'
          label='First Name...'
          onChangeText={(firstName) => this.setState({ firstName })}
          value={this.state.firstName}
        />
        <TextInput
          mode='outlined'
          label='Last Name...'
          onChangeText={(lastName) => this.setState({ lastName })}
          value={this.state.lastName}
        />
        <TextInput
          mode='outlined'
          label='Email...'
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <HelperText style={styles.error} type='error' visible={validateEmail()}>
          Email address is invalid!
        </HelperText>
        <TextInput
          mode='outlined'
          label='Password...'
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry
          value={this.state.password}
        />
        <TextInput
          mode='outlined'
          label='Confirm Password...'
          onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
          secureTextEntry
          value={this.state.confirmPassword}
        />
        <HelperText style={styles.error} type='error' visible={validatePassword()}>
          Passwords don't match!
        </HelperText>
        <Button
          style={styles.buttonContainer}
          mode='contained'
          accessibilityLabel='Sign Up'
          onPress={() => this.addUser()}
        >
          Sign Up
        </Button>
        <Button
          mode='text'
          accessibilityLabel='Login'
          onPress={() => navigation.navigate('Login')}
        >
          Already have an account? Login
        </Button>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16
  },

  title: {
    paddingVertical: 8,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },

  buttonContainer: {
    marginTop: 24,
    marginLeft: 120,
    marginRight: 120
  },

  signUp: {
    fontSize: 16,
    marginTop: 16,
    marginLeft: 16,
    display: 'flex'
  },

  error: {
    paddingTop: 8,
    marginBottom: 8,
    marginLeft: -8,
    fontSize: 12,
    color: '#6F2A3B'
  }
})

export default SignUp
