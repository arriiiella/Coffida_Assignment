import React, { Component } from 'react'
import { TextInput, Button, IconButton, Text, Title, Subheading } from 'react-native-paper'
import {
  ScrollView,
  StyleSheet,
  Alert,
  ToastAndroid
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

class EditReview extends Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Photo</Text>
        <Button icon='image'>Upload from images</Button>
        <Button icon='camera'>Take picture</Button>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 8,
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

  upperContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 50
  },

  title: {
    flex: 1,
    fontSize: 20,
    paddingVertical: 8,
    marginBottom: 8,
    justifyContent: 'center'
  },

  rating: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 12
  },

  body: {
    paddingTop: 16
  },

  button: {
    margin: 32
  },

  delete: {
    height: 50,
    marginLeft: 70
  }
})

export default EditReview
