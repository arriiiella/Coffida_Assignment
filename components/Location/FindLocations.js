import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  ToastAndroid,
  TouchableOpacity
} from 'react-native'
import { 
  TextInput, 
  List, 
  Text, 
  Title, 
  Subheading, 
  Searchbar,
  ActivityIndicator, 
  Button, 
  IconButton 
} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RatingRead from '../Modules/RatingRead'
import Filters from '../Modules/Filters'

class FindLocations extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      isVisible: false,
      loadingExtraData: false,
      page:1,
      limit: null,
      listData: [],
      location_id: '',
      query: '',
      overall: null,
      price: null,
      quality: null,
      cleanliness: null,
      search_in: ''

    }

    this.handleOverall = this.handleOverall.bind(this)
    this.handlePrice = this.handlePrice.bind(this)
    this.handleQuality = this.handleQuality.bind(this)
    this.handleCleanliness = this.handleCleanliness.bind(this)
    this.handleSearchIn = this.handleSearchIn.bind(this)
    this.handleLimit = this.handleLimit.bind(this)
  }

  handleOverall(value){ this.setState({overall: value})}
  handlePrice(value){ this.setState({price: value}) }
  handleQuality(value){ this.setState({quality: value}) }
  handleCleanliness(value){ this.setState({cleanliness: value}) }
  handleSearchIn(value){ this.setState({search_in: value}) }
  handleLimit(value){ this.setState({limit: value}) }

  componentDidMount () {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.loggedIn()
    })

    this.searchData()
    this.setState({isVisible: false})
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  
  loggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
      this.props.navigation.navigate('Login');
    }
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

    if(this.state.search_in != '') {
      url += 'search_in=' + this.state.search_in + '&'
    }

    if(this.state.limit > 0) {
      url += 'limit=' + this.state.limit + '&'
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
      })
      .then((response) => {
        this.setState({
          isLoading: false,
          listData: this.state.page === 1 ? response : [...this.state.listData, ...response]
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
        this.setState({ isFavourited: true })
        ToastAndroid.show('Location Favourited!', ToastAndroid.SHORT)
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
          this.setState({ isFavourited: false })
          ToastAndroid.show('Location Unfavourited!', ToastAndroid.SHORT)
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

  LoadMoreLocations = () => {
    this.setState({
      page:this.state.page+1
    },()=>this.searchData())
  }

  render () {
    const navigation = this.props.navigation;

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
          <Filters overall={this.handleOverall} price={this.handlePrice} quality={this.handleQuality} cleanliness={this.handleCleanliness} search_in={this.handleSearchIn} limit={this.handleLimit}/>
          <Button mode='contained' accessibilityLabel='Search Locations'onPress={() => this.searchData()}>Search</Button>
          <FlatList
            data={this.state.listData}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.locationContainer}
                onPress={() =>
                  navigation.navigate('GetLocation', {
                    location_id: item.location_id,      
                  })
                }>
                <Text style={styles.locationDetails}>
                  {item.location_name} 
                </Text>
               <RatingRead text={''} rating={parseInt(item.avg_overall_rating)} size={20} disabled={true}/>
               {/* conditional rendering to determine which icon to display if location is in users favourites or not */}
                {this.state.isFavourited ? <IconButton style={styles.like} icon='heart-outline' color="#6F2A3B" size={16} accessibilityLabel='Unfavourite a location' onPress={()=>this.unfavourite(item.location_id)} /> : <IconButton style={styles.like} icon='heart-outline' color="#6F2A3B" size={16} accessibilityLabel='Favourite a location' onPress={()=>this.favourite(item.location_id)} />}
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
    marginRight: 16,
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
