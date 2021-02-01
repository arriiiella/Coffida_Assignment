import React, {Component} from 'react';
import {TextInput, Button, Appbar, DefaultTheme} from 'react-native-paper';
import {ScrollView, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.loggedIn();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  loggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
      this.props.navigation.navigate('Login');
    }
  };

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
    fontSize: 16,
  },

  buttonContainer: {
    marginTop: 8,
    marginLeft: 120,
    marginRight: 120,
  },
});

export default Profile;
