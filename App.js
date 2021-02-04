/* eslint-disable */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  Provider as PaperProvider,
  DefaultTheme,
  Appbar,
  Menu,
} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './components/User/Login';
import LogoutScreen from './components/User/Logout';
import SignUpScreen from './components/User/SignUp';
import ProfileScreen from './components/User/Profile';
import LocationScreen from './components/Locations';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#7a1f1f',
    accent: '#F8F8F8',
  },
};

const Stack = createStackNavigator();

function CustomNavigationBar({navigation, previous}) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}>
        <Menu.Item
          onPress={() => {
            navigation.navigate('Login');
          }}
          title="Login"
        />
        <Menu.Item
          onPress={() => {
            navigation.navigate('Profile');
          }}
          title="Profile"
        />
        <Menu.Item
          onPress={() => {
            navigation.navigate('Locations');
          }}
          title="Locations"
        />
        <Menu.Item
          onPress={() => {
            console.log('User Settings');
          }}
          title="User Settings"
        />
        <Menu.Item
          onPress={() => {
            navigation.navigate('Logout');
          }}
          title="Logout"
        />
      </Menu>
      <Appbar.Content title="Coffida" />
      <Appbar.Action
        icon="magnify"
        onPress={() => navigation.navigate('Locations')}
      />
    </Appbar.Header>
  );
}

class App extends Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Profile"
            screenOptions={{
              header: (props) => <CustomNavigationBar {...props} />,
            }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Locations" component={LocationScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Logout" component={LogoutScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}

export default App;
