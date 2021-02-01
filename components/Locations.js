import React, {Component} from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import {TextInput, Searchbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Locations extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  render() {
    const {searchQuery, setSearchQuery} = this.state;

    return (
      <ScrollView>
        <Searchbar placeholder="Search Locations..." value={searchQuery} />
      </ScrollView>
    );
  }
}
export default Locations;
