import React from 'react'
import { Appbar, Menu } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CustomNavigationBar = ({ navigation, previous }) => {
  const [visible, setVisible] = React.useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  componentDidMount = () => {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.loggedIn()
    })
  }

  componentWillUnmount = () => {
    this.unsubscribe()
  }

  loggedIn = async () => {
    const token = await AsyncStorage.getItem('@session_token')
    if (token == null) {
      this.props.navigation.navigate('Login')
    }
  }

  return (
    <Appbar.Header>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon='menu' color='white' onPress={openMenu} />}
      >
        <Menu.Item
          onPress={() => {
            navigation.navigate('Profile')
          }}
          title='Profile'
        />
        <Menu.Item
          onPress={() => {
            navigation.navigate('FindLocations')
          }}
          title='Locations'
        />
        <Menu.Item
          onPress={() => {
            navigation.navigate('Logout')
          }}
          title='Logout'
        />
      </Menu>
      <Appbar.Content title='Coffida' />
      <Appbar.Action
        icon='heart-outline' accessibilityLabel='Favourite Locations' onPress={() => {
          navigation.navigate('FaveLocations')
        }}
      />
      <Appbar.Action
        icon='thumb-up-outline' accessibilityLabel='Liked Reviews' onPress={() => {
          navigation.navigate('LikedReviews')
        }}
      />
    </Appbar.Header>
  )
}

export default CustomNavigationBar
