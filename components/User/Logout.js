import React, {Component} from 'react';
import {Button, DefaultTheme} from 'react-native-paper';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
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
    const token = await AsyncStorage.getItem('@session_token');
    if (token == null) {
      this.props.navigation.navigate('Login');
    }
  };

  logout = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          ToastAndroid.show("You're not logged in", ToastAndroid.SHORT);
          this.props.navigation.navigate('Login');
        } else {
          throw 'Something went wrong';
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Are you sure you want to logout?</Text>
        <Button
          style={styles.buttonContainer}
          mode="contained"
          accessibilityLabel="Logout"
          onPress={() => this.logout()}>
          Logout
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
    justifyContent: 'center',
  },

  buttonContainer: {
    marginTop: 8,
    marginLeft: 120,
    marginRight: 120,
  },

  title: {
    paddingVertical: 8,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Profile;
