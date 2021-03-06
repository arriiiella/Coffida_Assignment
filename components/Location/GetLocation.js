import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import {TextInput, Text, Headline, Title, Subheading, ActivityIndicator, FAB, Divider, IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RatingRead from '../Modules/RatingRead';
import Review from '../Modules/Review';

class GetLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      locationData: [],
      isLiked: false,
      uri: '',
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

    loggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
      this.props.navigation.navigate('Login');
    }
  };

  getPhoto = async (review_id) => {
    //get photo endpoint using a specific location and review id
    const token = await AsyncStorage.getItem('@session_token');
    const location_id = this.props.route.params.location_id;
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/photo', {
      headers: {
        'X-Authorization': token,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        this.setState({ uri: reponse }, () => {
          console.log(uri);
        });
        uri: response;
      } else if (response.status === 401) {
        ToastAndroid.show("You're not logged in", ToastAndroid.SHORT);
        this.props.navigation.navigate('Login');
      } else {
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getData = async () => {
    // get location information using location id
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
      })
      .then((response) => {
        this.setState({
          isLoading: false,
          // locationData holds the response from API and will be used to display info
          locationData: response,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // like a review
  like = async(review_id) => {
    const token = await AsyncStorage.getItem('@session_token');
    const location_id = this.props.route.params.location_id;
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/like', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // isLike is used for the conditional rendering of the iconButton 
          this.setState({ isLiked: true })
          return response.json()
          this.getData()
          ToastAndroid.show('Review Liked!', ToastAndroid.SHORT)
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

  // unlike a review
  unlike = async (review_id) => {
    const token = await AsyncStorage.getItem('@session_token');
    const location_id = this.props.route.params.location_id;
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/like', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // isLike set to false since review has been unliked
          this.setState({ isLiked: false })
          ToastAndroid.show('Review Unliked!', ToastAndroid.SHORT)
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
    const navigation = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Headline style={styles.header}>Loading Coffee Shop...</Headline>
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
            <Title style={styles.header}>
              {this.state.locationData.location_name}
            </Title>
            <Subheading style={styles.subheading}>{this.state.locationData.location_town}</Subheading>
            <FAB
            style={styles.fab}
            medium
            icon="plus"
            color="#6F2A3B"
            accessibilityLabel="Add Review"
            onPress={() =>
              navigation.navigate('AddReview', {
                location_id: this.state.locationData.location_id,
              })
            }
          />
            <RatingRead text={'Overall'} rating={parseInt(this.state.locationData.avg_overall_rating)} size={20} />
            <RatingRead text={'Price'} rating={parseInt(this.state.locationData.avg_price_rating)} size={20} />
            <RatingRead text={'Quality'} rating={parseInt(this.state.locationData.avg_quality_rating)} size={20} />
            <RatingRead text={'Cleanliness'} rating={parseInt(this.state.locationData.avg_clenliness_rating)} size={20} />
            <Subheading style={styles.subheading}>Reviews</Subheading>
            <FlatList
            data={this.state.locationData.location_reviews}
            renderItem={({item}) => (
              <View style={styles.reviewContainer}>
                <Review text={'Overall: '} rating={item.overall_rating} />
                <Review text={'Price: '} rating={item.price_rating} />
                <Review text={'Quality: '} rating={item.quality_rating} />
                <Review text={'Cleanliness: '} rating={item.clenliness_rating} />
                <Review text={''} rating={item.review_body} />
                {/* display review image by calling endpoint with review id and location id  */}
                <Image source={{uri: 'http://10.0.2.2:3333/api/1.0.0/location/' + this.props.route.params.location_id + '/review/' + item.review_id + '/photo' }} style={styles.image}/>
                {this.state.isLiked ? <IconButton style={styles.like} icon='thumb-up-outline' color="#6F2A3B" size={16} accessibilityLabel='Unlike a Review' onPress={()=>this.unlike(item.review_id)} /> : <IconButton style={styles.like} icon='thumb-up-outline' color="#6F2A3B" size={16} accessibilityLabel='Like a Review' onPress={()=>this.like(item.review_id)} />}
                <Text>{item.likes}</Text>
                <Divider />
              </View>
            )}
            // loops through each review using review id
            keyExtractor={(item, index) => item.review_id.toString()}
          />
          </View>
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

  subheading: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 8
  },

  activity: {
    paddingTop: 150,
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
    top: 0,
    color: '#6F2A3B',
  },

  image: {
    flex: 1, 
    width: '20%',
    alignSelf: 'center'
  }
});

export default GetLocation;
