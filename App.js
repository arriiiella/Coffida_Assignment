import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './components/Login'
import SignUpScreen from './components/SignUp'
import AppBar from './components/AppBar'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#7a1f1f',
    accent: '#F8F8F8'
  }
}

const Stack = createStackNavigator()

class App extends Component {
  render () {
    return (
      <PaperProvider theme={theme}>
        <AppBar />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    )
  }
}

export default App
