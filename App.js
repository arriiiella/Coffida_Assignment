import React, { Component } from 'react'
import { Provider as PaperProvider, Appbar, DefaultTheme } from 'react-native-paper'
import { StyleSheet } from 'react-native'

import Login from './components/Login'
import SignUp from './components/SignUp'

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

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#7a1f1f',
    accent: '#F8F8F8'
  }
}

class App extends Component {
  render () {
    return (
      <PaperProvider theme={theme}>
        <Appbar.Header style={styles.banner}>
          <Appbar.Content color='white' title='Coffida' />
          <Appbar.Action icon='magnify' onPress={() => {}} />
        </Appbar.Header>
        <SignUp />
      </PaperProvider>
    )
  }
}

export default App
