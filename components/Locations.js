import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, ToastAndroid} from 'react-native';
import {TextInput, Searchbar, ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AirbnbRating} from '../react-native-ratings';

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

    this.getData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

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
          <Text style={styles.header}>Loading Locations...</Text>
          <ActivityIndicator
            style={styles.activity}
            size="large"
            animating={true}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Searchbar
            placeholder="Search Locations"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <FlatList
            data={this.state.listData}
            renderItem={({item}) => (
              <View style={styles.locationContainer}>
                <Text style={styles.locationDetails}>{item.location_name}</Text>
                <AirbnbRating
                  style={styles.review}
                  selectedColor={'#7a1f1f'}
                  size={20}
                  defaultRating={item.avg_overall_rating}
                  isDisabled={true}
                  showRating={false}
                  onFinishRating={() => this.state.overall_rating}
                />
              </View>
            )}
            keyExtractor={(item, index) => item.location_id.toString()}
          />
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
});

export default Locations;
