import AsyncStorage from '@react-native-async-storage/async-storage'

const LoggedIn = async () => {
  const value = await AsyncStorage.getItem('@session_token')
  if (value == null) {
    this.props.navigation.navigate('Login')
  }
}

export default LoggedIn
