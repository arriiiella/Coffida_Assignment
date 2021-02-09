/* eslint-disable */
import React from 'react';
import {Appbar, Menu} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomNavigationBar = ({navigation, previous}) => {
  const [visible, setVisible] = React.useState(false);
  const [isLoggedIn] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  componentDidMount = () => {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.loggedIn();
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  loggedIn = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    if (token == null) {
      this.props.navigation.navigate('Login');
    } else {
      isLoggedIn: true;
    }
  };

  if ({isLoggedIn} == false) {
    return (
      <Appbar.Header>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="white" onPress={openMenu} />
          }>
          <Menu.Item
            onPress={() => {
              navigation.navigate('Login');
            }}
            title="Login"
          />
        </Menu>
        <Appbar.Action
          icon="magnify"
          onPress={() => navigation.navigate('Locations')}
        />
      </Appbar.Header>
    );
  } else {
    return (
      <Appbar.Header>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="white" onPress={openMenu} />
          }>
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
};

export default CustomNavigationBar;
