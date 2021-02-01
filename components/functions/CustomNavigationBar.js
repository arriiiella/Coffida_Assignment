import React from 'react'
import { Appbar, Menu } from 'react-native-paper'

export function CustomNavigationBar ({ navigation, previous }) {
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
            navigation.navigate('Home')
          }}
          title='Home'
        />
        <Menu.Item
          onPress={() => {
            navigation.navigate('Login')
          }}
          title='Login'
        />
        <Menu.Item
          onPress={() => {
            navigation.navigate('Profile')
          }}
          title='Profile'
        />
        <Menu.Item
          onPress={() => {
            console.log('User Settings')
          }}
          title='User Settings'
        />
        <Menu.Item
          onPress={() => {
            console.log('Logout')
          }}
          title='Logout'
        />
      </Menu>
      <Appbar.Content title='Coffida' />
      <Appbar.Action
        icon='magnify'
        onPress={() => navigation.navigate('Locations')}
      />
    </Appbar.Header>
  )
}
