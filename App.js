import 'react-native-gesture-handler'
import React, { Component } from 'react'
import {
  Provider as PaperProvider,
  DefaultTheme
} from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from './components/User/Login'
import LogoutScreen from './components/User/Logout'
import SignUpScreen from './components/User/SignUp'
import ProfileScreen from './components/User/Profile'
import GetAllLocationsScreen from './components/Coffida/GetAllLocations'
import AddReviewScreen from './components/Coffida/AddReview'
import GetLocationScreen from './components/Coffida/GetLocation'

import CustomNavigationBar from './components/Helpers/NavigationBar'

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
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Locations'
            screenOptions={{
              header: (props) => <CustomNavigationBar {...props} />
            }}
          >
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='Locations' component={GetAllLocationsScreen} />
            <Stack.Screen name='GetLocation' component={GetLocationScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
            <Stack.Screen name='Logout' component={LogoutScreen} />
            <Stack.Screen name='AddReview' component={AddReviewScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    )
  }
}

export default App
