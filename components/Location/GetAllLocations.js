import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {TextInput, ActivityIndicator, IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AirbnbRating} from '../../react-native-ratings/src';
import RatingRead from '../Modules/RatingRead';

class GetAllLocations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
      location_id: '',
      isFavourited: false,
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
    return fetch('http://10.0.2.2:3333/api/1.0.0/find', {
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

  favourite = async(location_id) => {
  const token = await AsyncStorage.getItem('@session_token');
  return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/favourite', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        this.setState({ isFavourited: true }, () => {
          console.log(this.state.isFavourited);
        });
        return response.json()
      } else if (response.status === 400) {
        ToastAndroid.show('Failed Validation', ToastAndroid.SHORT)
      } else {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT)
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  unfavourite = async (location_id) => {
    const token = await AsyncStorage.getItem('@session_token');
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/favourite', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ isFavourited: false }, () => {
            console.log(this.state.isFavourited);
          });
          return response.json()
        } else if (response.status === 400) {
          ToastAndroid.show('Failed Validation', ToastAndroid.SHORT)
        } else {
          ToastAndroid.show('Something went wrong', ToastAndroid.SHORT)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
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
          <FlatList
            data={this.state.listData}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.locationContainer}
                onPress={() =>
                  this.props.navigation.navigate('GetLocation', {
                    location_id: item.location_id,      
                  })
                }>
                <Text style={styles.locationDetails}>
                  {item.location_name}
                </Text>
               <RatingRead text={''} rating={parseInt(item.avg_overall_rating)} size={20} disabled={true}/>
                {this.state.isFavourited ? <IconButton style={styles.like} icon='heart' color="#7a1f1f" size={16} onPress={()=>this.unfavourite(item.location_id)} /> : <IconButton style={styles.like} icon='heart-outline' color="#7a1f1f" size={16} onPress={()=>this.favourite(item.location_id)} />}
              </TouchableOpacity>
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
  },

  locationDetails: {
    fontSize: 16,
    justifyContent: 'center',
  },

  like: {
  flex: 1,
  justifyContent: 'flex-end',
},
});

export default GetAllLocations;
