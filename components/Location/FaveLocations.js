import React, {Component} from 'react';
import {
  TextInput,
  Button,
  Appbar,
  ActivityIndicator,
  FAB,
  IconButton,
  Text, 
  Divider,
  Title,
  Headline,
  Subheading
} from 'react-native-paper';
import {View, StyleSheet, ToastAndroid, FlatList, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RatingRead from '../Modules/RatingRead';
import Review from '../Modules/Review';

class FaveLocations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
    };
  }

  componentDidMount() {
    // listen to check if user is logged in
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.loggedIn();
    });

    this.getData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  loggedIn = async () => {
    // checked user is logged in by looking for a session token
    const token = await AsyncStorage.getItem('@session_token');
    if (token == null) {
      this.props.navigation.navigate('Login');
    }
  };

  getData = async () => {
    const id = await AsyncStorage.getItem('@id');
    const user_id = parseInt(id);
    const token = await AsyncStorage.getItem('@session_token');

    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + user_id, {
      headers: {
        ID: user_id,
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
      })
      .then((response) => {
        // response has been returned so loading status has finished
        this.setState({
          isLoading: false,
          listData: response,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const navigation = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Headline style={styles.header}>Loading Favourite Locations...</Headline>
          <ActivityIndicator
            animating={true}
            style={styles.activity}
            size="large"
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Title style={styles.header}>
            Favourite Locations
          </Title>
          <FlatList
            data={this.state.listData.favourite_locations}
            renderItem={({item}) => (
              <View style={styles.reviewContainer}>
                <Text>{item.location_name}</Text>
                <Text>{item.location_town}</Text>
                <Image source={{ uri: item.photo_path }}/>
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
    flex: 1,
    justifyContent: 'center',
  },

  header: {
    paddingVertical: 8,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },

  reviewContainer: {
    backgroundColor: '#D8D8D8',
    borderStyle: 'solid',
    borderColor: '#a9a9a9',
    paddingBottom: 8,
    paddingLeft: 8,
    paddingTop: 8,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default FaveLocations;
