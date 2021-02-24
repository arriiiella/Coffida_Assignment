import * as React from 'react'
import { List } from 'react-native-paper'
import { AirbnbRating } from '../../react-native-ratings/src'

const Filters = () => {
  const [expanded, setExpanded] = React.useState(true)
  const [overall, setOverall] = React.useState(null)
  const [price, setPrice] = React.useState(null)
  const [quality, setQuality] = React.useState(null)
  const [cleanliness, setCleanliness] = React.useState(null)

  const handlePress = () => setExpanded(!expanded)
  const handleOverall = (value) => setOverall(value)
  const handlePrice = (value) => setPrice(value)
  const handleQuality = (value) => setQuality(value)
  const handleCleanliness = (value) => setCleanliness(value)

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
          onFinishRating={(overall) => handleOverall({ overall })}
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
          onFinishRating={(price) => handlePrice({ price })}
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
          onFinishRating={(quality) => handleQuality({ quality })}
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
          onFinishRating={(cleanliness) => handleCleanliness({ cleanliness })}
        />
      </List.Section>
    </List.Accordion>
  )
}

export default Filters
