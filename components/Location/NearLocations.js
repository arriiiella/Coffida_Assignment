import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
  PermissionsAndroid
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
import Geolocation from 'react-native-geolocation-service'

class NearLocations extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      location: null,
      locationPermission: false,
      listData: [],
    }

    this.findCoordinates = this.findCoordinates.bind(this)
  }

  componentDidMount () {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.loggedIn()
    })
    this.findCoordinates()
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

  LoadMoreLocations = () => {
    this.setState({
      page:this.state.page+1
    },()=>this.searchData())
  }

  requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'This app requires access to your location.',
                buttonNegative: 'Cancel',
                buttonPositibe: 'OK',
            },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            ToastAndroid.show('You can access location', ToastAndroid.SHORT)
            return true
        } else {
            console.log('Location permission denied')
            return false
        }
    } catch (error) {
        console.log(error)
    }
  }

  findCoordinates = () => {
    if(!this.state.locationPermission) {
        this.state.locationPermission = this.requestLocationPermission()
    }
    Geolocation.getCurrentPosition(
        (position) => {
            const location = JSON.stringify(position)
            this.setState({location})
            console.log(location)
        }, (error) => {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
        }, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        });
  };

  render () {
    const navigation = this.props.navigation;

    if (this.state.location == null) {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Loading...</Text>
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
        <Button style={styles.button} mode='contained' icon='crosshairs-gps' accessibilityLabel='Get my location' onPress={() => {this.findCoordinates()}}>Get my Location</Button> 
        <Text>{this.state.location}</Text>
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

  button: {
    marginTop: 8,
    marginLeft: 48,
    marginRight: 48
  },

  map: {
    flex: 1
  }
})

export default NearLocations
