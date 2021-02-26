import React, {Component} from 'react';
import {
  TextInput, 
  Button, 
  Text, 
  Portal, 
  Modal,
  HelperText
} from 'react-native-paper';
import {
  ScrollView,
  View,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AirbnbRating } from '../../react-native-ratings/src';

class AddReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: true,
      overall: null,
      price: null,
      quality: null,
      cleanliness: null,
      body: '',
    };
  }

  
  profanityFilter = () => {
    const filter = ['cake', 'pastry', 'biscuits', 'tea', 'chocolate', 'pie', 'cookies']
    let i = 0;
    let found = false;

    //loops through the last of 'bad' words
    while (i < filter.length)
    {
      // found is a boolean variable and will be set to true if the current word in filter is included in the review body
      found = this.state.body.toLowerCase().includes(filter[i].toLowerCase());
      if (found) {
        //if found break out of loop
        break;
      } else {
        i++
      }
    }
    // return true or false
    return found;
  }

  addReview = async () => {
    const toSend = {
      overall_rating: parseInt(this.state.overall),
      price_rating: parseInt(this.state.price),
      quality_rating: parseInt(this.state.quality),
      clenliness_rating: parseInt(this.state.cleanliness),
      review_body: this.state.body,
    };

    console.log(toSend)

    const token = await AsyncStorage.getItem('@session_token');
    const location_id = parseInt(this.props.route.params.location_id);
    console.log(token, location_id);
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
        body: JSON.stringify(toSend),
      }
    )
      .then((response) => {
        if (response.status === 201) {
          return response.json();
          ToastAndroid.show('Review Added', ToastAndroid.SHORT)
        } else if (response.status === 401) {
          ToastAndroid.show('Failed Validation', ToastAndroid.SHORT)
        } else {
          ToastAndroid.show('Something went wrong', ToastAndroid.SHORT)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addButton() {
    // before adding review check for profanity
    if (this.profanityFilter()) {
      ToastAndroid.show('You have used an inappropriate word!', ToastAndroid.SHORT)        
    } else {
      // if no 'bad' words then add review
      this.addReview();
      // go back to top of stack (Profile screen)
      this.props.navigation.popToTop();
    }
  }

  render() {
    const navigation = this.props.navigation;

    const validateRatings = () => {
      // if any ratings are null will return true
      return (this.state.overall === null || this.state.price === null || this.state.quality === null || this.state.cleanliness === null)
    }

    const validateReview = () => {
      // if review body is empty will return true
      return (this.state.body === '')
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>New Review</Text>
        <View style={styles.rating}>
          <Text style={styles.title}>Overall</Text>
          <AirbnbRating
            selectedColor={'#6F2A3B'}
            reviewSize={16}
            size={32}
            showRating={false}
            defaultRating={3}
            onFinishRating={(overall) => this.setState({overall})}
          />
        </View>
        <View style={styles.rating}>
          <Text style={styles.title}>Price</Text>
          <AirbnbRating
            selectedColor={'#6F2A3B'}
            reviewSize={16}
            size={32}
            showRating={false}
            defaultRating={3}
            onFinishRating={(price) => this.setState({price})}
          />
        </View>
        <View style={styles.rating}>
          <Text style={styles.title}>Quality</Text>
          <AirbnbRating
            selectedColor={'#6F2A3B'}
            reviewSize={16}
            size={32}
            showRating={false}
            defaultRating={3}
            onFinishRating={(quality) => this.setState({quality})}
          />
        </View>
        <View style={styles.rating}>
          <Text style={styles.title}>Cleanliness</Text>
          <AirbnbRating
            selectedColor={'#6F2A3B'}
            reviewSize={16}
            size={32}
            showRating={false}
            defaultRating={3}
            onFinishRating={(cleanliness) => this.setState({cleanliness})}
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
          accessibilityLabel="Add Review"
          onPress={() => {
            this.addButton();
          }}>
          Add Review
        </Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
  },

  rating: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 12,
  },

  header: {
    paddingVertical: 8,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },

  title: {
    flex: 1,
    fontSize: 20,
    paddingVertical: 8,
    marginBottom: 8,
    justifyContent: 'center',
  },

  body: {
    paddingTop: 16,
  },

  button: {
    margin: 32,
  },

  error: {
  paddingTop: 8,
  marginBottom: 8,
  marginLeft: -8,
  fontSize: 12,
  color: '#6F2A3B'
  }
});

export default AddReview;
