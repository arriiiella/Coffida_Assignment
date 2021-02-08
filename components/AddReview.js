/* eslint-disable */
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
import {AirbnbRating} from '../react-native-ratings';

class AddReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overall_rating: '',
      price_rating: '',
      quality_rating: '',
      clenliness_rating: '',
      review_body: '',
    };
  }

  addReview() {
    const to_send = {
      overall_rating: this.state.overall_rating,
      price_rating: this.state.price_rating,
      quality_rating: this.state.quality_rating,
      clenliness_rating: this.state.clenliness_ratingd,
      review_body: this.state.review_body,
    };

    return fetch('http://10.0.2.2:3333/api/location/' + loc_id + '/review', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(to_send),
    })
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
            onFinishRating={() => this.state.overall_rating}
          />
        </View>
        <View style={styles.rating}>
          <Text style={styles.title}>Price</Text>
          <AirbnbRating
            selectedColor={'#7a1f1f'}
            reviewSize={16}
            size={32}
            showRating={false}
            onFinishRating={() => this.state.price_rating}
          />
        </View>
        <View style={styles.rating}>
          <Text style={styles.title}>Quality</Text>
          <AirbnbRating
            selectedColor={'#7a1f1f'}
            reviewSize={16}
            size={32}
            showRating={false}
            onFinishRating={() => this.state.quality_rating}
          />
        </View>
        <View style={styles.rating}>
          <Text style={styles.title}>Cleanliness</Text>
          <AirbnbRating
            selectedColor={'#7a1f1f'}
            reviewSize={16}
            size={32}
            showRating={false}
            onFinishRating={() => this.state.cleanliness_rating}
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
          onPress={() => this.addReview()}>
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
