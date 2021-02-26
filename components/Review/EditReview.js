import React, {Component} from 'react';
import {TextInput, Button, IconButton, Text, Title, Subheading, HelperText} from 'react-native-paper';
import {
  ScrollView,
  View,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AirbnbRating } from '../../react-native-ratings/src'

class EditReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasPhoto: false,
      overall: this.props.route.params.item.review.overall_rating,
      price: this.props.route.params.item.review.price_rating,
      quality: this.props.route.params.item.review.quality_rating,
      clenliness: this.props.route.params.item.review.clenliness_rating,
      body: this.props.route.params.item.review.review_body,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.loggedIn();
    });

    this.getPhoto()
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  loggedIn = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    if (token == null) {
      this.props.navigation.navigate('Login');
    }
  }

  profanityFilter = () => {
    const filter = ['cake', 'pastry', 'biscuits', 'tea', 'chocolate', 'pie', 'cookies']
    let i = 0;
    let found = false;
    while (i < filter.length)
    {
      found = this.state.body.toLowerCase().includes(filter[i].toLowerCase());
      if (found) {
        break;
      } else {
        i++
      }
    }
    return found;
  }

  updateReview = async () => {
    const toSend = {
      overall_rating: this.state.overall,
      price_rating: this.state.price,
      quality_rating: this.state.quality,
      clenliness_rating: this.state.clenliness,
      review_body: this.state.body,
    };

    const token = await AsyncStorage.getItem('@session_token');
    const location_id = this.props.route.params.item.location.location_id;
    const review_id = this.props.route.params.item.review.review_id;

    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id,
      {
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
        body: JSON.stringify(toSend),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          ToastAndroid.show("You're not logged in", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
        }
      })
      .then((response) => {
        console.log('Review Updated');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateButton() {
    if (this.profanityFilter()) {
      ToastAndroid.show('You have used an inappropriate word!', ToastAndroid.SHORT)        
    } else {
      this.updateReview();
      this.props.navigation.popToTop();
    }
  }

  delete = async () => {
    const toSend = {
      overall_rating: this.state.overall,
      price_rating: this.state.price,
      quality_rating: this.state.quality,
      clenliness_rating: this.state.clenliness,
      review_body: this.state.body,
    };
    const location_id = this.props.route.params.item.location.location_id;
    const review_id = this.props.route.params.item.review.review_id;
    const token = await AsyncStorage.getItem('@session_token');
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify(toSend),
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
        ToastAndroid.show("Review Deleted!", ToastAndroid.SHORT);  
      } else if (response.status === 401) {
        ToastAndroid.show("You're not logged in", ToastAndroid.SHORT);
        this.props.navigation.navigate('Login');
      } else {
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      }
    })
    .then(async (responseJson) => {
      console.log(responseJson);
      this.props.navigation.navigate('Profile');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getPhoto = async () => {
    // gets photo to determine if there is a photo there to delete for the conditional rendering of take photo or delete photo
    const token = await AsyncStorage.getItem('@session_token');
    const location_id = this.props.route.params.item.location.location_id;
    const review_id = this.props.route.params.item.review.review_id;    
    
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/photo', {
      headers: {
        'X-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // hasPhoto set to true if photo is found
          this.setState({ hasPhoto: true })          
        } else if (response.status === 401) {
          ToastAndroid.show("You're not logged in", ToastAndroid.SHORT);
          this.props.navigation.navigate('Login');
        } else {
          throw 'Something went wrong';
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deletePhoto = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const location_id = this.props.route.params.item.location.location_id;
    const review_id = this.props.route.params.item.review.review_id;    

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/photo/', {
      method: 'delete',
      headers: {
        'X-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
          ToastAndroid.show("Photo Deleted!", ToastAndroid.SHORT);  
        } else if (response.status === 401) {
          ToastAndroid.show("You're not logged in", ToastAndroid.SHORT);
          this.props.navigation.navigate('Login');
        } else {
          ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  
  deleteButton() {
    // delete review then go back to profile
    this.delete();
    this.props.navigation.popToTop();
  }

  render() {
    const navigation = this.props.navigation;
    
    const validateRatings = () => {
      return (this.state.overall === null || this.state.price === null || this.state.quality === null || this.state.cleanliness === null)
    }

    const validateReview = () => {
      return (this.state.body === '')
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.upperContainer}>
          <Text style={styles.header}>Update Review</Text>
          <IconButton style={styles.delete} icon='delete' color="#6F2A3B" size={24} accessibilityLabel='Delete Review' onPress={()=>this.deleteButton(this.props.route.params.item.location.location_id, this.props.route.params.item.review.review_id)}/>
        </View>
        {/* conditional render delete photo button or take photo button depending if the review already has a photo */}
        {this.state.hasPhoto ? <Button  icon='delete' color="#6F2A3B" size={24} accessibilityLabel='Delete Photo' onPress={()=> 
          this.deletePhoto()}
          > Delete Photo </Button> 
          : <Button icon='camera' color="#6F2A3B" size={24} accessibilityLabel='Take a Photo' onPress={()=> 
          this.props.navigation.navigate('TakePhoto', {location_id: this.props.route.params.item.location.location_id, review_id: this.props.route.params.item.review.review_id})}
          > Take a Photo </Button>}
        <View style={styles.rating}>
          <Text style={styles.title}>Overall</Text>
          <AirbnbRating
            selectedColor={'#6F2A3B'}
            reviewSize={16}
            size={32}
            defaultRating={this.props.route.params.item.review.overall_rating}
            showRating={false}
            onFinishRating={(overall) => this.setState({overall})}
          />
        </View>
        <View style={styles.rating}>
          <Text style={styles.title}>Price</Text>
          <AirbnbRating
            selectedColor={'#6F2A3B'}
            reviewSize={16}
            size={32}
            defaultRating={this.props.route.params.item.review.price_rating}
            showRating={false}
            onFinishRating={(price) => this.setState({price})}
          />
        </View>
        <View style={styles.rating}>
          <Text style={styles.title}>Quality</Text>
          <AirbnbRating
            selectedColor={'#6F2A3B'}
            reviewSize={16}
            size={32}
            defaultRating={this.props.route.params.item.review.quality_rating}
            showRating={false}
            onFinishRating={(quality) => this.setState({quality})}
          />
        </View>
        <View style={styles.rating}>
          <Text style={styles.title}>Cleanliness</Text>
          <AirbnbRating
            selectedColor={'#6F2A3B'}
            reviewSize={16}
            size={32}
            defaultRating={this.props.route.params.item.review.clenliness_rating}
            showRating={false}
            onFinishRating={(clenliness) => this.setState({clenliness})}
          />
        </View>
        <HelperText style={styles.error} type='error' visible={validateRatings()}>
          All ratings must be filled in.
        </HelperText>
        <TextInput
          style={styles.body}
          mode="outlined"
          multiline={true}
          label="Review..."
          onChangeText={(body) => this.setState({body})}
          value={this.state.body}
        />
        <HelperText style={styles.error} type='error' visible={validateReview()}>
          A comment must be included in a review.
        </HelperText>  
        <Button
          mode="contained"
          style={styles.button}
          accessibilityLabel="Update Review"
          onPress={() => {
            this.updateButton();
          }}>
          Update Review
        </Button>
      </ScrollView>
    );
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

  upperContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 50,
  },

  title: {
    flex: 1,
    fontSize: 20,
    paddingVertical: 8,
    marginBottom: 8,
    justifyContent: 'center',
  },

  rating: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 12,
  },

  body: {
    paddingTop: 16,
  },

  button: {
    margin: 32,
  },

  delete: {
    height: 50,
    marginLeft: 70,
  },
});

export default EditReview;
