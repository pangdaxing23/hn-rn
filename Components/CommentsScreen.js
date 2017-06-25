import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native'

export default class CommentsScreen extends Component {

  static navigationOptions = {
    title: 'Comments',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>COMMENTS COMMENTS COMMENTS</Text>
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
