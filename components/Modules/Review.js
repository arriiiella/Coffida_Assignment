import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Review = ({ text, rating }) => {
  // Shows rating type and value
  return (
    <View style={styles.reviewContainer}>
      <Text style={styles.ratingText}>{text}</Text>
      <Text style={styles.ratingText}>{rating}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  ratingText: {
    fontWeight: 'bold'
  },

  reviewContainer: {
    flex: 1,
    flexDirection: 'row'
  }
})
export default Review
