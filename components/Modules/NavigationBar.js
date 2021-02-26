import React from 'react'
import { Appbar, Menu } from 'react-native-paper'

// This is called in App.js

const CustomNavigationBar = ({ navigation, previous }) => {
  // State used to determine if menu should be open or not
  const [visible, setVisible] = React.useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

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
