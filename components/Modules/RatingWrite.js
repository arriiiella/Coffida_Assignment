import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import { AirbnbRating } from '../../react-native-ratings/src'

const RatingWrite = ({text}) => {
  const [rating, setRating] = React.useState(0)
  const handleRating = (value) => setRating(value)
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
      <AirbnbRating
        selectedColor='#7a1f1f'
        size={20}
        defaultRating={3}
        showRating={false}
        onFinishRating={(value) => this.handleRating({ value })}
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
