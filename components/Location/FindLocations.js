import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  ToastAndroid,
  TouchableOpacity
} from 'react-native'
import { TextInput, Text, Title, Subheading, Searchbar, ActivityIndicator, Button, IconButton } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoggedIn from '../Helpers/LoggedIn'
import RatingRead from '../Modules/RatingRead';


class FindLocations extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      listData: [],
      location_id: '',
      query: '',
    }
  }

  componentDidMount () {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      LoggedIn()
    })

    this.getData()
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
    const token = await AsyncStorage.getItem('@session_token');
    const q = (this.state.query).toString()
    console.log(q)
    return fetch('http://10.0.2.2:3333/api/1.0.0/find?q=' + q, {
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

  render () {
    if (this.state.isLoading) {
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
          <Searchbar
            placeholder='Search Locations'
            onChangeText={(query) => this.setState({query})}
            value={this.state.query}
          />
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
