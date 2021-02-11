import React, {Component} from 'react';
import {
  TextInput,
  Button,
  Appbar,
  ActivityIndicator,
  FAB,
  IconButton,
} from 'react-native-paper';
import {View, Text, StyleSheet, ToastAndroid, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
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
    const token = await AsyncStorage.getItem('@session_token');
    if (token == null) {
      this.props.navigation.navigate('Login');
    }
  };

  getData = async () => {
    const id = await AsyncStorage.getItem('@id');
    const user_id = parseInt(id);
    const token = await AsyncStorage.getItem('@session_token');

    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + user_id, {
      headers: {
        ID: user_id,
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
          listData: response,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {email, password} = this.state;

    const navigation = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading Profile...</Text>
          <ActivityIndicator
            animating={true}
            style={styles.activity}
            size="large"
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>
            Welcome Back {this.state.listData.first_name}!
          </Text>
          <IconButton
            style={styles.locations}
            icon="heart"
            color="#7a1f1f"
            size={20}
            onPress={() => console.log('Pressed')}
          />
          <FlatList
            style={styles.reviews}
            data={this.state.listData.reviews}
            renderItem={({item}) => (
              <View>
                <Text>{item.review.review_id}</Text>
                <Text>{item.review.review_body}</Text>
              </View>
            )}
            keyExtractor={(item, index) => item.review.review_id.toString()}
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
    flex: 1,
    justifyContent: 'center',
  },

  header: {
    paddingVertical: 8,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },

  locations: {
    paddingTop: 24,
    marginLeft: 24,
  },

  reviews: {
    marginTop: 38,
  },
});

export default Profile;
