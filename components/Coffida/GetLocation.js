import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Searchbar, ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AirbnbRating} from '../../react-native-ratings/src';

class GetLocation extends Component {
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

    this.getData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getData = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const location_id = this.props.route.params.location_id;
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id, {
      headers: {
        'X-Authorization': token,
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
        console.log('inside block');
      })
      .then((response) => {
        this.setState({
          isLoading: false,
          listData: response,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    const {searchQuery, setSearchQuery} = this.state;
    const onChangeSearch = (query) => setSearchQuery(query);

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Loading Coffee Shop...</Text>
          <ActivityIndicator
            style={styles.activity}
            size="large"
            animating={true}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container} data={this.state.listData}>
         
        </View>
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

  header: {
    paddingVertical: 8,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },

  activity: {
    paddingTop: 150,
  },

  locationContainer: {
    marginTop: 8,
    paddingTop: 32,
    paddingBottom: 32,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: '#D8D8D8',
    flex: 1,
    flexDirection: 'row',
  },

  locationDetails: {
    fontSize: 16,
    justifyContent: 'center',
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  },
});

export default GetLocation;
