import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native'
import TopSection from '../components/TopSection'
import { WebBrowser } from 'expo'
import HTMLView from 'react-native-htmlview'

export default class CommentsScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {'comments': []}
  }

  async componentDidMount() {
    await this.fetchComments()
  }

  fetchComment = async (id) => {
    return (await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)).json()
  }

  fetchComments = async () => {
    try {
      let {kids, descendants} = this.props.navigation.state.params
      // fill comments with objects with incrementing ids
      let comments = [...Array(descendants).keys()].map(el => {
        return {
          id: el,
          by: '-',
          text: '',
          time: '-'
        }
      })
      kids.forEach(async (id, i) => {
        try {
          comments[i] = await this.fetchComment(id)
          this.setState((prevState) => {
            return {comments: comments}
          })
        }
        catch (reason) {
          Alert.alert(reason.message)
        }
      })
      return comments
    }
    catch (reason) {
      Alert.alert(reason.message)
    }
  }

  _handlePressButtonAsync = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
  }

  extractKey = ({id}) => id

  _renderItem = ({item}) => {
    const {text, by} = item
    return (
      <View style={styles.listItem}>
        <HTMLView value={text} />
        <Text>{by}</Text>
      </View>
    )
  }

  render() {
    const {title, by, score, url} = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <TopSection
          title={title}
          by={by}
          score={score}
          onPress={() => this._handlePressButtonAsync(url)}
          style={styles.topSection}
        />
        <FlatList
          data={this.state.comments}
          renderItem={this._renderItem}
          keyExtractor={this.extractKey}
          style={styles.list}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6ef',
    padding: 20,
  },
  topSection: {
    flex: 1,
    padding: 20
  },
  list: {
    flex: 3,
    marginTop: 20,
    backgroundColor: '#f6f6ef',
  },
  listItem: {
    backgroundColor: '#f6f6ef'
  },
})
