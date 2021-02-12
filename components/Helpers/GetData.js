import AsyncStorage from '@react-native-async-storage/async-storage'
import { ToastAndroid } from 'react-native'

const GetData = async (url) => {
  const token = await AsyncStorage.getItem('@session_token')
  console.log(url)
  return fetch({ url }, {
    headers: {
      'X-Authorization': token
    }
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 401) {
        ToastAndroid.show("You're not logged in", ToastAndroid.SHORT)
        this.props.navigation.navigate('Login')
      } else {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT)
      }
    })
    .then((response) => {
      this.setState({
        isLoading: false,
        listData: response
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export default GetData
