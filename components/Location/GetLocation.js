import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {TextInput, ActivityIndicator, FAB, Divider, IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RatingRead from '../Modules/RatingRead';
import Review from '../Modules/Review';

class GetLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      locationData: [],
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
          locationData: response,
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

  postLike = async(review_id) => {
    const token = await AsyncStorage.getItem('@session_token');
    const location_id = this.props.route.params.location_id;
    console.log(review_id)
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/like', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
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

  deleteLike = async (review_id) => {
    const token = await AsyncStorage.getItem('@session_token');
    const location_id = this.props.route.params.location_id;
    console.log(review_id)
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/like', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
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

  likeOnPress = (review_id) => {
    this.postLike(review_id);
    // if(response.status === 200)
    // {
    //   <IconButton style={styles.like} icon='heart' color="#7a1f1f" size={16} onPress={()=>this.likeOnPress(item.review_id)} />
    // }
    // if (response.status !== 200)
    // {
    //   this.deleteLike(review_id);
    // }
  }

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
        <View>
          <View style={styles.container}>
            <Text style={styles.header}>
              {this.state.locationData.location_name}
            </Text>
            <RatingRead text={'Overall'} rating={parseInt(this.state.locationData.avg_overall_rating)} size={20} />
            <RatingRead text={'Price'} rating={parseInt(this.state.locationData.avg_price_rating)} size={20} />
            <RatingRead text={'Quality'} rating={parseInt(this.state.locationData.avg_quality_rating)} size={20} />
            <RatingRead text={'Cleanliness'} rating={parseInt(this.state.locationData.avg_clenliness_rating)} size={20} />

            <Text style={styles.h2}>Reviews</Text>
            <FlatList
            data={this.state.locationData.location_reviews}
            renderItem={({item}) => (
              <View style={styles.reviewContainer}>
                <Review text={'Overall: '} rating={item.overall_rating} />
                <Review text={'Price: '} rating={item.price_rating} />
                <Review text={'Quality: '} rating={item.quality_rating} />
                <Review text={'Cleanliness: '} rating={item.clenliness_rating} />
                <Review text={''} rating={item.review_body} />
                <IconButton style={styles.like} icon='heart-outline' color="#7a1f1f" size={16} onPress={()=>this.likeOnPress(item.review_id)} />
                <IconButton style={styles.like} icon='pencil' size={16} onPress={()=> this.props.navigation.navigate('EditReview', {
                    location_id: this.state.locationData.location_id,
                    review: item,      
                  })} />
                <Divider />
              </View>
            )}
            keyExtractor={(item, index) => item.review_id.toString()}
          />
          </View>
          <FAB
            style={styles.fab}
            medium
            icon="plus"
            color="#7a1f1f"
            accessibilityLabel="Add Review"
            onPress={() =>
              this.props.navigation.navigate('AddReview', {
                location_id: this.state.locationData.location_id,
              })
            }
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

  h2: {
    fontSize: 24
  },

  activity: {
    paddingTop: 150,
  },

  locationDetails: {
    fontSize: 16,
    justifyContent: 'center',
  },

  reviewContainer: {
    backgroundColor: '#D8D8D8',
    borderStyle: 'solid',
    borderColor: '#a9a9a9',
    paddingBottom: 8,
    paddingTop: 8,
    alignContent: 'center',
    justifyContent: 'center',
  },

  like: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default GetLocation;
