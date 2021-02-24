import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  ToastAndroid,
  TouchableOpacity
} from 'react-native'
import { TextInput, List, Text, Title, Subheading, Searchbar, ActivityIndicator, Button, IconButton } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoggedIn from '../Helpers/LoggedIn'
import RatingRead from '../Modules/RatingRead'
import Filters from '../Modules/Filters'

class FindLocations extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      isVisible: false,
      listData: [],
      location_id: '',
      query: '',
      overall: null,
      price: null,
      quality: null,
      cleanliness: null,
    }

    this.handleOverall = this.handleOverall.bind(this)
    this.handlePrice = this.handlePrice.bind(this)
    this.handleQuality = this.handleQuality.bind(this)
    this.handleCleanliness = this.handleCleanliness.bind(this)
  }

  handleOverall(value){ this.setState({overall: value})}
  handlePrice(value){ this.setState({price: value}) }
  handleQuality(value){ this.setState({quality: value}) }
  handleCleanliness(value){ this.setState({cleanliness: value}) }

  componentDidMount () {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      LoggedIn()
    })

    this.getData()
    this.setState({isVisible: false})
  }

  componentWillUnmount () {
    this.unsubscribe()
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

  searchData = async () => {
    let url = 'http://10.0.2.2:3333/api/1.0.0/find?'
    const token = await AsyncStorage.getItem('@session_token');

    if(this.state.query != '') {
      url += 'q=' + this.state.query + '&'
    }

    if(this.state.overall > 0){
      url += 'overall_rating=' + this.state.overall + '&'
    }

    if(this.state.price > 0){
      url += 'price_rating=' + this.state.price + '&'
    }

    if(this.state.quality > 0){
      url += 'quality_rating=' + this.state.quality + '&'
    }

    if(this.state.cleanliness > 0){
      url += 'clenliness_rating=' + this.state.cleanliness + '&'
    }

    return fetch(url, {
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
  }

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

  render () {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Loading Locations...</Text>
          <ActivityIndicator
            style={styles.activity}
            size='large'
            animating
          />
        </View>
      )
    } else {
      return (
        <View>
          <Searchbar
            placeholder='Search Locations'
            onChangeText={(query) => this.setState({query})}
            value={this.state.query}
          />
          <Filters overall={this.handleOverall} price={this.handlePrice} quality={this.handleQuality} cleanliness={this.handleCleanliness}/>
          {console.log(this.state.overall)}
          <Button mode='contained' onPress={() => this.searchData()}>Search</Button>
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
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginLeft: 16,
    marginRight: 16
  },

  header: {
    paddingVertical: 8,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },

  activity: {
    paddingTop: 150
  },

  locationContainer: {
    marginTop: 8,
    paddingTop: 32,
    paddingBottom: 32,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: '#D8D8D8',
    flex: 1
  },

  locationDetails: {
    fontSize: 16,
    justifyContent: 'center'
  },

  like: {
    flex: 1,
    justifyContent: 'flex-end'
  }
})

export default FindLocations
