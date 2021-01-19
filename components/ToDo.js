import React, { Component } from 'react';
import { TextInput, View, Button } from 'react-native';

class ToDo extends Component {

  constructor(props){
    super(props);

    this.state = {
      text: ''
    }
  }

  handleTextInput = (text) => {
    this.setState({text: text})
  }

  render(){
    return (
      <View>
        <TextInput placeholder="Add..." onChangeText={this.handleTextInput} value={this.state.text} />
        <Button title="Add" />
        <FlatList
        data={[
          {key: this.state.text}
        ]}
        renderItem={({item}) => <Text>{item.key}</Text>}
      />
      </View>
    );
  }
}

export default ToDo;