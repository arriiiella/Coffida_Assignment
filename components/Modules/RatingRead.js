import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AirbnbRating } from '../../react-native-ratings/src'

const Rating = ({ text, rating, size }) => {
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
      <AirbnbRating
        selectedColor='#6F2A3B'
        size={size}
        defaultRating={rating}
        isDisabled
        showRating={false}
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
    justifyContent: 'center',
    fontWeight: 'bold'
  }
})
export default Rating
