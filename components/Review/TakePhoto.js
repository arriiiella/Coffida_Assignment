import React, { Component } from 'react'
import { TextInput, Button, IconButton, Text, Title, Subheading } from 'react-native-paper'
import {
  View,
  StyleSheet,
  Alert,
  ToastAndroid
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RNCamera } from 'react-native-camera'

class TakePhoto extends Component {

  sendPhotoToServer = async (data) => {
    const token = await AsyncStorage.getItem('@session_token');
    const location_id = parseInt(this.props.route.params.location_id);
    const review_id = parseInt(this.props.route.params.review_id);
    console.log(location_id, review_id)
    console.log(token)

    console.log(data.uri)
    const url = 'http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/photo'
    console.log(url)
    return fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "image/jpeg",
        "X-Authorization": token
      },
      body: data
    })
    .then((response) => {
      console.log(response, response.status)
      if (response.status === 201) {
        return response
        ToastAndroid.show("Photo Added", ToastAndroid.SHORT);
      } else if (response.status === 401) {
        ToastAndroid.show('Failed Validation', ToastAndroid.SHORT)
      } else {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT)
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  takePicture = async () => {
    if(this.camera) {
      const options = {quality:0.5, base64:true}
      const data = await this.camera.takePictureAsync(options);
      this.sendPhotoToServer(data)
    }
  }

  render() {
    return (
      <View style={{flex:1, width:'100%'}}>
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={styles.preview}
        />
        <Button
          icon='camera' onPress={() => {
            this.takePicture()
          }}
          accessibilityLabel='Take Picture'
        >Take picture
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 8,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})

export default TakePhoto
