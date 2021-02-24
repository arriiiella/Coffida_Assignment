import * as React from 'react'
import { List } from 'react-native-paper'
import { AirbnbRating } from '../../react-native-ratings/src'

const Filters = ({ overall, price, quality, cleanliness }) => {
  const [expanded, setExpanded] = React.useState(true)

  const handlePress = () => setExpanded(!expanded)

  return (
    <List.Accordion
      left={props => <List.Icon {...props} icon='filter' />}
      expanded={expanded}
      onPress={handlePress}
    >
      <List.Section>
        <List.Item title='Overall Rating' />
        <AirbnbRating
          overall={overall}
          selectedColor='#7a1f1f'
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
          selectedColor='#7a1f1f'
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
          selectedColor='#7a1f1f'
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
          selectedColor='#7a1f1f'
          size={20}
          defaultRating={3}
          showRating={false}
          onFinishRating={(value) => cleanliness(value)}
        />
      </List.Section>
    </List.Accordion>
  )
}

export default Filters
