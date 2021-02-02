import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, ToastAndroid} from 'react-native';
import {TextInput, Searchbar, ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Locations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
      searchQuery: '',
      setSearchQuery: '',
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

  getData = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch('http://10.0.2.2:3333/api/1.0.0/find', {
      headers: {
        'X-Authorization': value,
      },
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
    const {searchQuery, setSearchQuery} = this.state;

    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading Locations...</Text>
          <ActivityIndicator animating={true} />
        </View>
      );
    } else {
      return (
        <View>
          <FlatList
            data={this.state.listData}
            renderItem={({item}) => (
              <View>
                <Text>{item.location_name}</Text>
              </View>
            )}
            keyExtractor={(item, index) => item.location_id.toString()}
          />
        </View>
      );
    }
  }
}
export default Locations;
