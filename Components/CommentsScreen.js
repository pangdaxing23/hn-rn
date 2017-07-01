import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native'

export default class CommentsScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.item.title
  })

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6ef',
    marginTop: 20
  },
})
