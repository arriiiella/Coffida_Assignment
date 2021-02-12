import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import { AirbnbRating } from '../../react-native-ratings/src'

const RatingWrite = () => {
  const [overall, setOverall] = useState(0)
  const [price, setPrice] = useState(0)
  const [quality, setQuality] = useState(0)
  const [cleanliness, setCleanliness] = useState(0)
  const [body, setBody] = React.useState('')

  const calcOverall = (overall) => setOverall(onFinishRating)
  const calcPrice = (price) => setPrice(onFinishRating)
  const calcQuality = (quality) => setQuality(onFinishRating)
  const calcCleanliness = (cleanliness) => setCleanliness(onFinishRating)
  const calcBody = (body) => setOverall(onFinishRating)

  return (
    <View>
      <Text style={styles.text}>Overall: </Text>
      <AirbnbRating
        selectedColor='#7a1f1f'
        size={20}
        defaultRating={3}
        showRating={false}
        onFinishRating={(onFinishRating) => this.calcOverall}
      />
      <Text style={styles.text}>Price: </Text>
      <AirbnbRating
        selectedColor='#7a1f1f'
        size={20}
        defaultRating={3}
        showRating={false}
        onFinishRating={(onFinishRating) => this.calcPrice}
      />
      <Text style={styles.text}>Quality: </Text>
      <AirbnbRating
        selectedColor='#7a1f1f'
        size={20}
        defaultRating={3}
        showRating={false}
        onFinishRating={(onFinishRating) => this.calcQuality}
      />
      <Text style={styles.text}>Cleanliness: </Text>
      <AirbnbRating
        selectedColor='#7a1f1f'
        size={20}
        defaultRating={3}
        showRating={false}
        onFinishRating={(onFinishRating) => this.calcCleanliness}
      />
      <Text style={styles.text}>Quality: </Text>
      <AirbnbRating
        selectedColor='#7a1f1f'
        size={20}
        defaultRating={3}
        showRating={false}
        onFinishRating={(onFinishRating) => this.calcQuality}
      />
      <TextInput
        style={styles.body}
        mode='outlined'
        multiline
        label='Review...'
        onChangeText={(body) => this.setState({ body })}
        value={this.state.body}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingTop: 32,
    paddingBottom: 32,
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
    flexDirection: 'row-reverse'
  },

  text: {
    fontSize: 16,
    justifyContent: 'center'
  }
})
export default RatingWrite
