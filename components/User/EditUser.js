import React, { Component } from 'react'
import { TextInput, Button, Subheading, Title } from 'react-native-paper'
import { ScrollView, StyleSheet, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

class EditUser extends Component {
  constructor (props) {
    super(props)

    this.state = {
      first_name: this.props.route.params.item.first_name,
      last_name: this.props.route.params.item.last_name,
      email: this.props.route.params.item.email,
      password: '',
      confirm_password: ''
    }
  }

  updateUser = async () => {
    const toSend = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
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

    return (
      <ScrollView
        contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
        style={styles.container}
      >
        <Title style={styles.title}>Update User</Title>
        <TextInput
          mode='outlined'
          label='First Name...'
          onChangeText={(first_name) => this.setState({ first_name })}
          value={this.state.first_name}
        />
        <TextInput
          mode='outlined'
          label='Last Name...'
          onChangeText={(last_name) => this.setState({ last_name })}
          value={this.state.last_name}
        />
        <TextInput
          mode='outlined'
          label='Email...'
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
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
          onChangeText={(confirm_password) => this.setState({ confirm_password })}
          secureTextEntry
          value={this.state.confirm_password}
        />
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
