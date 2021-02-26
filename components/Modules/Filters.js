import * as React from 'react'
import { List, TextInput } from 'react-native-paper'
import { AirbnbRating } from '../../react-native-ratings/src'

// parameters passed through will be used to set state to bring back to parent class (FindLocations) for the search endpoint
const Filters = ({ overall, price, quality, cleanliness, search_in, limit }) => {
  // The state is used to determine if list should be expanded or not
  // Set to false initially so starts off being closed
  const [expanded, setExpanded] = React.useState(false)
  const [expandedSub, setExpandedHub] = React.useState(false)

  const handlePress = () => setExpanded(!expanded)
  const handlePressSub = () => setExpandedHub(!expandedSub)

  return (
    <List.Accordion
      title='Filters'
      left={props => <List.Icon {...props} icon='filter' />}
      expanded={expanded}
      onPress={handlePress}
    >
      <List.Section>
        <List.Item title='Overall Rating' />
        <AirbnbRating
          overall={overall}
          selectedColor='#6F2A3B'
          size={20}
          defaultRating={3}
          showRating={false}
          onFinishRating={(value) => overall(value)}
        />
      </List.Section>
      <List.Section>
        <List.Item title='Price Rating' />
        <AirbnbRating
          price={price}
          selectedColor='#6F2A3B'
          size={20}
          defaultRating={3}
          showRating={false}
          onFinishRating={(value) => price(value)}
        />
      </List.Section>
      <List.Section>
        <List.Item title='Quality Rating' />
        <AirbnbRating
          quality={quality}
          selectedColor='#6F2A3B'
          size={20}
          defaultRating={3}
          showRating={false}
          onFinishRating={(value) => quality(value)}
        />
      </List.Section>
      <List.Section>
        <List.Item title='Cleanliness Rating' />
        <AirbnbRating
          cleanliness={cleanliness}
          selectedColor='#6F2A3B'
          size={20}
          defaultRating={3}
          showRating={false}
          onFinishRating={(value) => cleanliness(value)}
        />
      </List.Section>
      <List.Section>
        <List.Accordion
          title='Search In...'
          left={props => <List.Icon {...props} />}
          expanded={expandedSub}
          onPress={handlePressSub}
        >
          <List.Item title='Liked Reviews' onPress={(value) => search_in('reviewed')} />
          <List.Item title='Favourited Locations' onPress={(value) => search_in('favourite')} />
        </List.Accordion>
      </List.Section>
      <List.Section>
        <TextInput
          mode='outlined'
          label='Limit...'
          onChangeText={(value) => limit(value)}
        />
      </List.Section>
    </List.Accordion>
  )
}

export default Filters
