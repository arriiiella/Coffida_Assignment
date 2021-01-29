import React, { Component } from 'react'
import { Appbar } from 'react-native-paper'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: 800
  },

  bannerContent: {
    width: 800,
    margin: 0,
    padding: 10
  }
})

class AppBar extends Component {
  render () {
    return (
      <Appbar.Header style={styles.banner}>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Action icon='coffee-outline' />
        <Appbar.Content
          title='Coffida'
          subtitle='Rate your local coffee shops!'
        />
      </Appbar.Header>
    )
  }
}

export default AppBar
