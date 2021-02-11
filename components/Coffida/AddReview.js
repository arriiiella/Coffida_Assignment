import React, {Component} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AirbnbRating} from '../../react-native-ratings/src';

class AddReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overall_rating: null,
      price_rating: null,
      quality_rating: null,
      clenliness_rating: null,
      review_body: '',
      rating: 0,
    };

    this.ratingCompleted = this.ratingCompleted.bind(this.rating);
  }

  ratingCompleted(rating) {
    console.log('Rating is: ' + rating);

    this.setState({
      rating: rating,
    });
  }

  addReview = async () => {
    const toSend = {
      overall_rating: this.state.overall_rating,
      price_rating: this.state.price_rating,
      quality_rating: this.state.quality_rating,
      clenliness_rating: this.state.clenliness_rating,
      review_body: this.state.review_body,
    };

    const token = await AsyncStorage.getItem('@session_token');
    const location_id = this.props.route.params.location_id;
    console.log(token, location_id);
    return fetch(
      'http://10.0.2.2:3333/api/location/' + location_id + '/review',
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
        } else if (response.status === 41) {
          throw 'Failed Validation';
        } else {
          throw 'Something went wrong';
        }
        this.getData();
      })
      .then((responseJson) => {
        console.log('Review created with ID: ', responseJson);
        this.props.navigation.navigate('Profile');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addButton() {
    this.addReview();
    this.props.navigation.navigate('GetLocation');
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>New Review</Text>
        <View style={styles.rating}>
          <Text style={styles.title}>Overall</Text>
          <AirbnbRating
            selectedColor={'#7a1f1f'}
            reviewSize={16}
            size={32}
            showRating={false}
            onFinishRating={() => this.ratingCompleted}
          />
        </View>
        <View style={styles.rating}>
          <Text style={styles.title}>Price</Text>
          <AirbnbRating
            selectedColor={'#7a1f1f'}
            reviewSize={16}
            size={32}
            showRating={false}
            onFinishRating={() => this.ratingCompleted}
          />
        </View>
        <View style={styles.rating}>
          <Text style={styles.title}>Quality</Text>
          <AirbnbRating
            selectedColor={'#7a1f1f'}
            reviewSize={16}
            size={32}
            showRating={false}
            onFinishRating={() => this.ratingCompleted}
          />
        </View>
        <View style={styles.rating}>
          <Text style={styles.title}>Cleanliness</Text>
          <AirbnbRating
            selectedColor={'#7a1f1f'}
            reviewSize={16}
            size={32}
            showRating={false}
            onFinishRating={() => this.ratingCompleted}
          />
        </View>
        <TextInput
          style={styles.body}
          mode="outlined"
          multiline={true}
          label="Review..."
          onChangeText={(review_body) => this.setState({review_body})}
          value={this.state.review_body}
        />
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
});

export default AddReview;
