import React, {Component} from 'react';
import {TextInput, Button, IconButton, Text, Title, Subheading} from 'react-native-paper';
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
      overall: this.props.route.params.item.review.overall_rating,
      price: this.props.route.params.item.review.price_rating,
      quality: this.props.route.params.item.review.quality_rating,
      clenliness: this.props.route.params.item.review.clenliness_rating,
      body: this.props.route.params.item.review.review_body,
    };
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
    this.updateReview();
    this.props.navigation.navigate('GetLocation');
  }

  delete = async (review_id) => {
  const token = await AsyncStorage.getItem('@session_token');
  const location_id = this.props.route.params.item.location.location_id;
  console.log(review_id, location_id)
  return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token,
    },
    body: JSON.stringify(this.state),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
        this.getData();
      } else if (response.status === 401) {
        ToastAndroid.show("You're not logged in", ToastAndroid.SHORT);
        this.props.navigation.navigate('Login');
      } else {
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      }
    })
    .then(async (responseJson) => {
      console.log(responseJson);
      this.props.navigation.navigate('GetLocation');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  
  deleteButton(review_id) {
    this.delete(review_id);
    this.props.navigation.navigate('GetLocation');
  }

  getData = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const location_id = parseInt(this.props.route.params.location_id);
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

  render() {
    const navigation = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.upperContainer}>
          <Text style={styles.header}>Update Review</Text>
          <IconButton style={styles.delete} icon='delete' color="#7a1f1f" size={24} onPress={()=>this.deleteButton(this.props.route.params.item.review.review_id)}/>
        </View>
        <Button icon='camera' color="#7a1f1f" size={24} onPress={()=> navigation.navigate('Photo')}> Add a Photo </Button>
        <View style={styles.rating}>
          <Text style={styles.title}>Overall</Text>
          <AirbnbRating
            selectedColor={'#7a1f1f'}
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
            selectedColor={'#7a1f1f'}
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
            selectedColor={'#7a1f1f'}
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
            selectedColor={'#7a1f1f'}
            reviewSize={16}
            size={32}
            defaultRating={this.props.route.params.item.review.clenliness_rating}
            showRating={false}
            onFinishRating={(clenliness) => this.setState({clenliness})}
          />
        </View>
        <TextInput
          style={styles.body}
          mode="outlined"
          multiline={true}
          label="Review..."
          onChangeText={(body) => this.setState({body})}
          value={this.state.body}
        />
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
    marginBottom: 8,
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
