import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Alert } from 'react-native'
import Row from './Row'

export default class HomeScreen extends Component {

  static navigationOptions = {
    title: 'HN',
  };

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      refreshing: false
    }
  }

  async componentWillMount() {
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
          score: '-',
          descendants: '-'
        }
      })
      ids.forEach(async (id, i) => {
        try {
          rows[i] = await this.fetchItem(id)
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

  extractKey = ({id}) => id

  renderItem = ({item}) => {
    return (
      <Row
        item={item}
        nav={this.props.navigation}
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
        renderItem={this.renderItem}
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
