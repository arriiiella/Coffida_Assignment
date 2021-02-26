import React, { Component } from 'react'
import { TextInput, Button, Subheading, Title, HelperText } from 'react-native-paper'
import { ScrollView, StyleSheet, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

class EditUser extends Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: this.props.route.params.item.first_name,
      lastName: this.props.route.params.item.last_name,
      email: this.props.route.params.item.email,
      password: '',
      confirmPassword: ''
    }
  }

  updateUser = async () => {
    // object of the user inputted state to send off to server to edit user 
    const toSend = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }

    const token = await AsyncStorage.getItem('@session_token');
    const user_id = parseInt(this.props.route.params.item.user_id);
    console.log(user_id, token)

    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + user_id, {
      method: 'patch',
      headers: {
        'X-Authorization': token,
        'Content-Type': 'application/json',
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
        console.log('User updated')
        this.props.navigation.navigate('Profile')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  updateButton () {
    this.updateUser()
    this.props.navigation.navigate('Profile')
  }

  render () {
    const navigation = this.props.navigation

    const validateEmail = () => {
      return !this.state.email.includes('@')
    }

    // validation to check password and confirm password match
    const validatePassword = () => {
      return (this.state.password !== this.state.confirmPassword)
    }

    return (
      <ScrollView
        contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
        style={styles.container}
      >
        <Title style={styles.title}>Update User</Title>
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
        <Subheading>Change Password</Subheading>
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
          accessibilityLabel='Update User'
          onPress={() => this.updateButton()}
        >
          Update
        </Button>
      </ScrollView>
    )
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
    fontWeight: 'bold'
  },

  buttonContainer: {
    marginTop: 24,
    marginLeft: 120,
    marginRight: 120
  },
})

export default EditUser
