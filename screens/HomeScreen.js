import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Alert } from 'react-native'
import Row from '../components/Row'
import { fetchItem } from '../network/api'

export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      refreshing: false
    }
  }

  async componentDidMount() {
    this._onRefresh()
  }

  fetchIds = async () => {
    return (await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')).json()
  }

  fetchItem = async (id) => {
    return (await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)).json()
  }

  fetchItems = async () => {
    try {
      let ids = await this.fetchIds()
      // fill rows with objects with incrementing ids
      let rows = [...Array(500).keys()].map(el => {
        return {
          id: el,
          title: '',
          score: '',
          descendants: ''
        }
      })
      ids.forEach(async (id, i) => {
        try {
          rows[i] = await fetchItem(id)
          this.setState((prevState) => {
            return {posts: rows}
          })
        }
        catch (reason) {
          Alert.alert(reason.message)
        }
      })
      return rows
    }
    catch (reason) {
      Alert.alert(reason.message)
    }
  }

  onPressRow = (item) => {
    this.props.navigation.navigate('Comments', item)
  }

  extractKey = ({id}) => id

  _renderItem = ({item}) => {
    const { title, score, descendants } = item
    const enabled = title !== ''
    return (
      <Row
        title={title}
        score={score}
        comments={descendants}
        enabled={enabled}
        onPress={() => this.onPressRow(item)}
      />
    )
  }

  _onRefresh = async () => {
    this.setState({refreshing: true})
    await this.fetchItems()
    this.setState({refreshing: false})
  }

  render() {
    const {posts, refreshing} = this.state
    return (
      <FlatList
        style={styles.container}
        data={posts}
        refreshing={refreshing}
        onRefresh={this._onRefresh}
        renderItem={this._renderItem}
        keyExtractor={this.extractKey}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6ef'
  },
})
