import React, {Component} from 'react';
import {TextInput, Button, Appbar, DefaultTheme} from 'react-native-paper';
import {
  ScrollView,
  Text,
  StyleSheet,
  ToastAndroid,
  FlatList,
} from 'react-native';
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
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
      this.props.navigation.navigate('Login');
    }
  };

  getData = () => {
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/{usr_id}')
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
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          listData: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {email, password} = this.state;

    const navigation = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <ScrollView
          contentContainerStyle={{flex: 1, justifyContent: 'center'}}
          style={styles.container}>
          <Text style={styles.title}>Error!</Text>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView
          contentContainerStyle={{flex: 1, justifyContent: 'center'}}
          style={styles.container}>
          <FlatList
            data={this.state.listData}
            renderItem={({item}) => (
              <View>
                <Text>{item.location_name}</Text>
              </View>
            )}></FlatList>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginLeft: 16,
    marginRight: 16,
  },
});

export default Profile;
