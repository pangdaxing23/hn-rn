import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import TopSection from './TopSection'

export default class CommentsScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Comments'
  })

  fetchComments = async () => {
    let comments = [...Array(this.props).keys()].map(el => {
      return {
        id: el,
        title: '',
        score: '-',
        descendants: '-'
      }
    })
  }

  render() {
    const {item} = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <TopSection item={item} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f6f6ef',
    marginTop: 20
  },
  topSection: {
    flex: 1,
    padding: 20
  },
  bottomSection: {
    flex: 3,
    padding: 15
  },
  postInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 18
  }
})
